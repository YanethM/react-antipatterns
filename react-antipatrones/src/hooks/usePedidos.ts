import { useEffect, useState } from 'react';
import type { Pedido } from '../types/pedido';

const datosIniciales: Pedido[] = [
	{ id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
	{ id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
	{ id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
	{ id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
];

export function usePedidos() {
	const [pedidos, setPedidos] = useState<Pedido[]>([]);
	const [filtroTexto, setFiltroTexto] = useState('');
	const [ordenAsc, setOrdenAsc] = useState(true);

	// Carga inicial y efectos secundarios de entrada
	useEffect(() => {
		const timeout = setTimeout(() => {
			setPedidos(datosIniciales);
			localStorage.setItem('ultimoAcceso', new Date().toISOString());
			document.title = 'Panel de pedidos';
		}, 300);

		return () => clearTimeout(timeout);
	}, []);

	// Sincroniza localStorage cuando cambia la lista de pedidos
	useEffect(() => {
		localStorage.setItem('cantidadPedidos', String(pedidos.length));
	}, [pedidos]);

	// Valores derivados
	const pedidosFiltrados = pedidos
		.filter((p) => {
			const texto = filtroTexto.toLowerCase();
			return (
				p.cliente.toLowerCase().includes(texto) ||
				p.estado.toLowerCase().includes(texto) ||
				String(p.id).includes(texto)
			);
		})
		.sort((a, b) => (ordenAsc ? a.total - b.total : b.total - a.total));

	const contadorPendientes = pedidos.filter((p) => p.estado === 'pendiente').length;
	const totalFacturado = pedidos.reduce((acc, p) => acc + p.total, 0);

	// Acciones
	const agregarPedido = (cliente: string, total: number, estado: Pedido['estado']) => {
		const siguienteId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1;
		setPedidos((prev) => [...prev, { id: siguienteId, cliente, total, estado }]);
	};

	const eliminarPedido = (id: number) => {
		setPedidos((prev) => prev.filter((p) => p.id !== id));
	};

	const cambiarEstado = (id: number, estado: Pedido['estado']) => {
		setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)));
	};

	const toggleOrden = () => setOrdenAsc((prev) => !prev);

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