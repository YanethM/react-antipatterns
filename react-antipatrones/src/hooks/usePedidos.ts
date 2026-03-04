import { useEffect, useMemo, useState, useCallback } from 'react';
import type { Pedido } from '../types/pedido';
import { useDocumentTitle } from './useDocumentTitle';

export function usePedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>(() => {
        try {
            const raw = localStorage.getItem('pedidos_v1');
            if (raw) return JSON.parse(raw) as Pedido[];
        } catch (e) {
            console.error('Error al parsear pedidos desde localStorage', e);
        }
        return [];
    });

    const [filtroTexto, setFiltroTexto] = useState('');
    const [ordenAsc, setOrdenAsc] = useState(true);
    useEffect(() => {
        localStorage.setItem('pedidos_v1', JSON.stringify(pedidos));
        localStorage.setItem('cantidadPedidos', String(pedidos.length));
    }, [pedidos]);

    useEffect(() => {
        localStorage.setItem('ultimoAcceso', new Date().toISOString());
    }, []);

    useDocumentTitle('Panel de pedidos');

    const pedidosFiltrados = useMemo(() => {
        const texto = filtroTexto.toLowerCase();
        const filtrados = pedidos.filter((p) => {
            return (
                p.cliente.toLowerCase().includes(texto) ||
                p.estado.toLowerCase().includes(texto) ||
                String(p.id).includes(texto)
            );
        });
        return filtrados.sort((a, b) => (ordenAsc ? a.total - b.total : b.total - a.total));
    }, [pedidos, filtroTexto, ordenAsc]);

    const contadorPendientes = useMemo(() => pedidos.filter((p) => p.estado === 'pendiente').length, [pedidos]);
    const totalFacturado = useMemo(() => pedidos.reduce((acc, p) => acc + p.total, 0), [pedidos]);

    const agregarPedido = useCallback((cliente: string, total: number, estado: Pedido['estado']) => {
        setPedidos((prev) => {
            const siguienteId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
            return [...prev, { id: siguienteId, cliente, total, estado }];
        });
    }, []);

    const eliminarPedido = useCallback((id: number) => {
        setPedidos((prev) => prev.filter((p) => p.id !== id));
    }, []);

    const cambiarEstado = useCallback((id: number, estado: Pedido['estado']) => {
        setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
    }, []);

    const toggleOrden = useCallback(() => setOrdenAsc((prev) => !prev), []);

    return {
        pedidos,
        pedidosFiltrados,
        filtroTexto,
        setFiltroTexto,
        ordenAsc,
        toggleOrden,
        contadorPendientes,
        totalFacturado,
        agregarPedido,
        eliminarPedido,
        cambiarEstado,
    };
}
