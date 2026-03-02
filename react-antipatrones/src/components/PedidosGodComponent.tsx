import { usePedidos } from '../hooks/usePedidos';
import PedidoForm from './PedidoForm';
import PedidosFiltroOrden from './PedidosFiltroOrden';
import PedidosResumen from './PedidosResumen';
import PedidosTabla from './PedidosTabla';

function PedidosGodComponent() {
	const {
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
	} = usePedidos();

	return (
		<div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
			<h1>Panel de Pedidos</h1>
			<p>
				Ejercicio: identifica los antipatrones de diseño presentes en este componente.
			</p>

			<PedidosResumen
				totalPedidos={pedidos.length}
				contadorPendientes={contadorPendientes}
				totalFacturado={totalFacturado}
			/>

			<PedidoForm onAgregar={agregarPedido} />

			<PedidosFiltroOrden
				filtroTexto={filtroTexto}
				onFiltroChange={setFiltroTexto}
				ordenAsc={ordenAsc}
				onToggleOrden={toggleOrden}
			/>

			<PedidosTabla
				pedidos={pedidosFiltrados}
				onCambiarEstado={cambiarEstado}
				onEliminar={eliminarPedido}
			/>
		</div>
	);
}

export default PedidosGodComponent;