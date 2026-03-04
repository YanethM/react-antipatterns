import { useState } from 'react';
import type { Pedido } from '../types/pedido';

type Props = {
	onAgregar: (cliente: string, total: number, estado: Pedido['estado']) => void;
};

function PedidoForm({ onAgregar }: Props) {
	const [nuevoCliente, setNuevoCliente] = useState('');
	const [nuevoTotal, setNuevoTotal] = useState('');
	const [nuevoEstado, setNuevoEstado] = useState<Pedido['estado']>('pendiente');

	const handleAgregar = () => {
		if (!nuevoCliente.trim() || !nuevoTotal.trim()) return;

		const total = Number(nuevoTotal);
		if (Number.isNaN(total)) return;

		onAgregar(nuevoCliente.trim(), total, nuevoEstado);
		setNuevoCliente('');
		setNuevoTotal('');
		setNuevoEstado('pendiente');
	};

	return (
		<section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
			<h2>Crear pedido</h2>
			<input
				placeholder="Cliente"
				value={nuevoCliente}
				onChange={(e) => setNuevoCliente(e.target.value)}
			/>
			<input
				placeholder="Total"
				value={nuevoTotal}
				onChange={(e) => setNuevoTotal(e.target.value)}
				style={{ marginLeft: 8 }}
			/>
			<select
				value={nuevoEstado}
				onChange={(e) => setNuevoEstado(e.target.value as Pedido['estado'])}
				style={{ marginLeft: 8 }}
			>
				<option value="pendiente">pendiente</option>
				<option value="pagado">pagado</option>
				<option value="enviado">enviado</option>
			</select>
			<button onClick={handleAgregar} style={{ marginLeft: 8 }}>
				Agregar
			</button>
		</section>
	);
}

export default PedidoForm;