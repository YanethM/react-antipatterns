import { useState, memo } from 'react'
import type { EstadoPedido } from '../hooks/usePedidos'

interface Props {
  onAgregar: (cliente: string, total: number, estado: EstadoPedido) => void
}

export const FormularioPedido = memo(function FormularioPedido({ onAgregar }: Props) {
  const [cliente, setCliente] = useState('')
  const [total, setTotal] = useState('')
  const [estado, setEstado] = useState<EstadoPedido>('pendiente')

  const handleSubmit = () => {
    // Corrección del bug: Evita que el total vacío se convierta en 0
    if (!cliente.trim() || !total.trim()) return
    
    const numTotal = Number(total)
    if (Number.isNaN(numTotal)) return
    
    onAgregar(cliente, numTotal, estado)
    
    // Limpieza completa del estado interno
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
        className="input-margin"
      />
      <label htmlFor="estado">Estado:</label>
      <select 
        id="estado"
        value={estado} 
        onChange={(e) => setEstado(e.target.value as EstadoPedido)} 
        className="select-margin"
      >
        <option value="pendiente">pendiente</option>
        <option value="pagado">pagado</option>
        <option value="enviado">enviado</option>
      </select>
      <button onClick={handleSubmit} className="button-margin">Agregar</button>
    </section>
  )
})