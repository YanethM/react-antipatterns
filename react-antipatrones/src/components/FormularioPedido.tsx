import { useState } from 'react'
import type { EstadoPedido }  from '../hooks/usePedidos'

export function FormularioPedido({ onAgregar }: { onAgregar: Function }) {
  const [cliente, setCliente] = useState('')
  const [total, setTotal] = useState('')
  const [estado, setEstado] = useState<EstadoPedido>('pendiente')

  const handleSubmit = () => {
    const numTotal = Number(total)
    if (!cliente.trim() || isNaN(numTotal)) return
    onAgregar(cliente, numTotal, estado)
    setCliente('')
    setTotal('')
  }

  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Crear pedido</h2>
      <input placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
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
      <button onClick={handleSubmit} style={{ marginLeft: 8 }}>Agregar</button>
    </section>
  )
}