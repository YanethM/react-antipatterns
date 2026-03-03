interface PedidoSummaryProps {
  total: number
  pendientes: number
  facturado: number
}

const PedidoSummary = ({ total, pendientes, facturado }: PedidoSummaryProps) => {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Resumen</h2>
      <p>Total pedidos: {total}</p>
      <p>Pedidos pendientes: {pendientes}</p>
      <p>Total facturado: ${facturado}</p>
    </section>
  )
}

export default PedidoSummary
