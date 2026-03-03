import { memo } from 'react'

interface Props {
  stats: { total: number; pendientes: number; facturado: number }
}

export const ResumenPedidos = memo(function ResumenPedidos({ stats }: Props) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Resumen</h2>
      <p>Total pedidos: {stats.total}</p>
      <p>Pedidos pendientes: {stats.pendientes}</p>
      <p>Total facturado: ${stats.facturado}</p>
    </section>
  )
})