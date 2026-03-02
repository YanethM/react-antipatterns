import type { Pedido } from '../types/pedido';

type Props = {
	pedidos: Pedido[];
	onCambiarEstado: (id: number, estado: Pedido['estado']) => void;
	onEliminar: (id: number) => void;
};

function PedidosTabla({ pedidos, onCambiarEstado, onEliminar }: Props) {
	if (pedidos.length === 0) {
		return (
			<section style={{ padding: 12, border: '1px solid #ddd' }}>
				<h2>Listado</h2>
				<p>No hay pedidos</p>
			</section>
		);
	}

	return (
		<section style={{ padding: 12, border: '1px solid #ddd' }}>
			<h2>Listado</h2>
			<table width="100%" cellPadding={8}>
				<thead>
					<tr>
						<th align="left">ID</th>
						<th align="left">Cliente</th>
						<th align="left">Total</th>
						<th align="left">Estado</th>
						<th align="left">Acciones</th>
					</tr>
				</thead>
				<tbody>
					{pedidos.map((pedido) => (
						<tr key={pedido.id}>
							<td>{pedido.id}</td>
							<td>{pedido.cliente}</td>
							<td>${pedido.total}</td>
							<td>
								<select
									value={pedido.estado}
									onChange={(e) =>
										onCambiarEstado(pedido.id, e.target.value as Pedido['estado'])
									}
								>
									<option value="pendiente">pendiente</option>
									<option value="pagado">pagado</option>
									<option value="enviado">enviado</option>
								</select>
							</td>
							<td>
								<button onClick={() => onEliminar(pedido.id)}>Eliminar</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</section>
	);
}

export default PedidosTabla;