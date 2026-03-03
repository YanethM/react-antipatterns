import { ESTILOS } from '../constants'

interface PedidosResumenProps {
  totalPedidos: number
  pedidosPendientes: number
  totalFacturado: number
}

/**
 * ANTI-PATRÓN RESUELTO: God component → Componente especializado
 * ANTI-PATRÓN RESUELTO: Prop drilling: Props explícitas y claras
 */
export function PedidosResumen({
  totalPedidos,
  pedidosPendientes,
  totalFacturado,
}: PedidosResumenProps) {
  return (
    <section style={ESTILOS.SECCION}>
      <h2>Resumen</h2>
      <p>Total pedidos: {totalPedidos}</p>
      <p>Pedidos pendientes: {pedidosPendientes}</p>
      <p>Total facturado: ${totalFacturado}</p>
    </section>
  )
}
