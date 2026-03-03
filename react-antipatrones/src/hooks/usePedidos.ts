import { useState, useEffect, useMemo } from 'react'
import type { Pedido, EstadoPedido } from './../types/Pedido'
import { pedidoService } from '../services/pedidoService';

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [filtroTexto, setFiltroTexto] = useState('');
  const [ordenAsc, setOrdenAsc] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(pedidoService.obtenerDatosIniciales());
      localStorage.setItem('ultimoAcceso', new Date().toISOString());
      document.title = 'Panel de pedidos';
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    localStorage.setItem('cantidadPedidos', String(pedidos.length));
  }, [pedidos]);

  const pedidosFiltrados = useMemo(() =>
    pedidoService.filtrarYOrdenar(pedidos, filtroTexto, ordenAsc),
    [pedidos, filtroTexto, ordenAsc]
  );

  const stats = useMemo(() =>
    pedidoService.calcularStats(pedidos),
    [pedidos]
  );

  const agregarPedido = (nuevo: Omit<Pedido, 'id'>) => {
    const siguienteId = pedidos.length ? Math.max(...pedidos.map(p => p.id)) + 1 : 1;
    setPedidos([...pedidos, { ...nuevo, id: siguienteId }]);
  };

  const eliminarPedido = (id: number) => setPedidos(p => p.filter(item => item.id !== id));

  const cambiarEstado = (id: number, estado: EstadoPedido) =>
    setPedidos(p => p.map(item => item.id === id ? { ...item, estado } : item));

  return { pedidosFiltrados, stats, filtroTexto, setFiltroTexto, ordenAsc, setOrdenAsc, agregarPedido, eliminarPedido, cambiarEstado };
}

