import { usePedidos, type Pedido } from '../hooks/usePedidos'
import { PedidoSummary } from './PedidoSummary'
import { PedidoForm } from './PedidoForm'
import { PedidoFilter } from './PedidoFilter'
import { PedidoTable } from './PedidoTable'
import '../styles/global.css'

const datosIniciales: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

function PedidosGodComponent() {
  const { pedidos, pedidosFiltrados, filtroTexto, ordenAsc, actions } = usePedidos(datosIniciales)

  return (
    <div className="pedidos-container">
      <h1>Panel de Pedidos</h1>
      <p className="description">
        Componente refactorizado: ahora dividido en componentes más pequeños sin antipatrones.
      </p>

      <PedidoSummary pedidos={pedidos} />

      <PedidoForm pedidos={pedidos} onAgregar={actions.agregarPedido} />

      <PedidoFilter
        filtroTexto={filtroTexto}
        ordenAsc={ordenAsc}
        onFiltroChange={actions.setFiltro}
        onOrdenToggle={actions.toggleOrden}
      />

      <PedidoTable
        pedidosFiltrados={pedidosFiltrados}
        onCambiarEstado={actions.cambiarEstado}
        onEliminar={actions.eliminarPedido}
      />
    </div>
  )
}

export default PedidosGodComponent
