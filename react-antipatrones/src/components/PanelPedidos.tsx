import { usePedidos } from '../hooks/usePedidos'
import { useFiltrosPedidos } from '../hooks/useFiltrosPedidos'
import ResumenPedidos from './ResumenPedidos'
import FormularioPedido from './FormularioPedido'
import FiltrosPedidos from './FiltrosPedidos'
import ListadoPedidos from './ListadoPedidos'

/**
 * Componente principal del Panel de Pedidos.
 * Compone los subcomponentes y conecta los hooks.
 * No contiene lógica de negocio ni manejo de estado local propio.
 */
function PanelPedidos() {
  const {
    pedidos,
    contadorPendientes,
    totalFacturado,
    agregarPedido,
    eliminarPedido,
    cambiarEstado,
  } = usePedidos()

  const { filtroTexto, setFiltroTexto, ordenAsc, alternarOrden, pedidosFiltrados } =
    useFiltrosPedidos(pedidos)

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>

      <ResumenPedidos
        totalPedidos={pedidos.length}
        contadorPendientes={contadorPendientes}
        totalFacturado={totalFacturado}
      />

      <FormularioPedido onAgregar={agregarPedido} />

      <FiltrosPedidos
        filtroTexto={filtroTexto}
        onFiltroChange={setFiltroTexto}
        ordenAsc={ordenAsc}
        onAlternarOrden={alternarOrden}
      />

      <ListadoPedidos
        pedidos={pedidosFiltrados}
        onCambiarEstado={cambiarEstado}
        onEliminar={eliminarPedido}
      />
    </div>
  )
}

export default PanelPedidos
