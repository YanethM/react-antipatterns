import type { Pedido } from '../hooks/usePedidos'

type PedidoSummaryProps = {
  pedidos: Pedido[]
}

export function PedidoSummary({ pedidos }: PedidoSummaryProps) {
  const contadorPendientes = pedidos.filter((p) => p.estado === 'pendiente').length
  const totalFacturado = pedidos.reduce((acc, pedido) => acc + pedido.total, 0)

  return (
    <section className="pedido-summary">
      <h2>Resumen</h2>
      <p>Total pedidos: {pedidos.length}</p>
      <p>Pedidos pendientes: {contadorPendientes}</p>
      <p>Total facturado: ${totalFacturado}</p>
    </section>
  )
}
