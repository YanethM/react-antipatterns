import { usePedidos } from '../hooks/usePedidos'
import { useFiltros } from '../hooks/useFilters'
import { PedidosResumen } from './PedidosResumen'
import { PedidosFormulario } from './PedidosFormulario'
import { PedidosFiltros } from './PedidosFiltros'
import { PedidosTabla } from './PedidosTabla'
import { ESTILOS } from '../constants'

/**
 * ANTI-PATRÓN RESUELTO: God component
 * Este componente ahora:
 * 1. Solo orquesta componentes especializados
 * 2. No contiene lógica de negocio (está en servicios)
 * 3. No contiene lógica de state compleja (está en hooks)
 * 4. Cada sección tiene su propio componente
 */
function PedidosGodComponent() {
  // ANTI-PATRÓN RESUELTO: useEffect mal usado + múltiples useState
  // Toda la lógica de state está en hooks personalizados claros y reutilizables
  const { pedidos, agregarPedido, eliminarPedido, cambiarEstadoPedido, totalFacturado, contadorPendientes, cargando }
    = usePedidos()

  // ANTI-PATRÓN RESUELTO: Múltiples useState para filtros
  const { pedidosFiltrados, texto, ordenAsc, cambiarTextoFiltro, cambiarOrden } = useFiltros(
    pedidos
  )

  if (cargando) {
    return <div style={ESTILOS.CONTAINER_PRINCIPAL}>Cargando...</div>
  }

  return (
    <div style={ESTILOS.CONTAINER_PRINCIPAL}>
      <h1>Panel de Pedidos</h1>
      <p>Ver README_Santiago_Melody.md para documentación detallada de anti-patrones solucionados.</p>
      <PedidosResumen
        totalPedidos={pedidos.length}
        pedidosPendientes={contadorPendientes}
        totalFacturado={totalFacturado}
      />
      <PedidosFormulario onAgregar={agregarPedido} />
      <PedidosFiltros
        textoFiltro={texto}
        ordenAsc={ordenAsc}
        onCambiarTexto={cambiarTextoFiltro}
        onCambiarOrden={cambiarOrden}
      />
      <PedidosTabla
        pedidos={pedidosFiltrados}
        onCambiarEstado={cambiarEstadoPedido}
        onEliminar={eliminarPedido}
      />
    </div>
  )
}

export default PedidosGodComponent
