type Props = {
  totalPedidos: number
  contadorPendientes: number
  totalFacturado: number
}

export function PedidosResumen({ totalPedidos, contadorPendientes, totalFacturado }: Props) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Resumen</h2>
      <p>Total pedidos: {totalPedidos}</p>
      <p>Pedidos pendientes: {contadorPendientes}</p>
      <p>Total facturado: ${totalFacturado}</p>
    </section>
  )
}