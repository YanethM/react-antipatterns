import { useState } from 'react'
import type { EstadoPedido, Pedido } from './types'

type Props = {
  onAgregar: (pedido: Omit<Pedido, 'id'>) => void
}

export function PedidosFormulario({ onAgregar }: Props) {
  const [cliente, setCliente] = useState('')
  const [total, setTotal] = useState('')
  const [estado, setEstado] = useState<EstadoPedido>('pendiente')

  const handleAgregar = () => {
    const totalNum = Number(total)
    if (!cliente.trim() || !total.trim() || Number.isNaN(totalNum)) return

    onAgregar({ cliente: cliente.trim(), total: totalNum, estado })

    setCliente('')
    setTotal('')
    setEstado('pendiente')
  }

  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Crear pedido</h2>
      <input
        placeholder="Cliente"
        value={cliente}
        onChange={(e) => setCliente(e.target.value)}
      />
      <input
        placeholder="Total"
        value={total}
        onChange={(e) => setTotal(e.target.value)}
        style={{ marginLeft: 8 }}
      />
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value as EstadoPedido)}
        style={{ marginLeft: 8 }}
      >
        <option value="pendiente">pendiente</option>
        <option value="pagado">pagado</option>
        <option value="enviado">enviado</option>
      </select>
      <button onClick={handleAgregar} style={{ marginLeft: 8 }}>
        Agregar
      </button>
    </section>
  )
}