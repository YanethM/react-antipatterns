import { usePedidos } from '../../hooks/usePedidos'
import { useFiltrosPedidos } from '../../hooks/useFiltrosPedidos'
import { PedidosResumen } from './PedidosResumen'
import { PedidosFormulario } from './PedidosFormulario'
import { PedidosFiltros } from './PedidosFiltros'
import { PedidosListado } from './PedidosListado'

export default function PedidosPage() {
  const { pedidos, contadorPendientes, totalFacturado, agregarPedido, eliminarPedido, cambiarEstado } =
    usePedidos()

  const { filtroTexto, setFiltroTexto, ordenAsc, toggleOrden, pedidosFiltrados } =
    useFiltrosPedidos(pedidos)

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>

      <PedidosResumen
        totalPedidos={pedidos.length}
        contadorPendientes={contadorPendientes}
        totalFacturado={totalFacturado}
      />

      <PedidosFormulario onAgregar={agregarPedido} />

      <PedidosFiltros
        filtroTexto={filtroTexto}
        ordenAsc={ordenAsc}
        onFiltroChange={setFiltroTexto}
        onToggleOrden={toggleOrden}
      />

      <PedidosListado
        pedidos={pedidosFiltrados}
        onEliminar={eliminarPedido}
        onCambiarEstado={cambiarEstado}
      />
    </div>
  )
}