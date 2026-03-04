import { useState } from 'react'
import type { EstadoPedido } from '../types/Pedido'

type FormularioPedidoProps = {
  onAgregar: (cliente: string, total: number, estado: EstadoPedido) => void
}

function FormularioPedido({ onAgregar }: FormularioPedidoProps) {
  const [nuevoCliente, setNuevoCliente] = useState('')
  const [nuevoTotal, setNuevoTotal] = useState('')
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido>('pendiente')
  const [error, setError] = useState<string | null>(null)

  const handleAgregar = () => {
    setError(null)

    if (!nuevoCliente.trim()) {
      setError('El nombre del cliente es obligatorio.')
      return
    }

    if (!nuevoTotal.trim()) {
      setError('El total es obligatorio.')
      return
    }

    const total = Number(nuevoTotal)
    if (Number.isNaN(total) || total < 0) {
      setError('El total debe ser un número válido y no negativo.')
      return
    }

    onAgregar(nuevoCliente.trim(), total, nuevoEstado)

    setNuevoCliente('')
    setNuevoTotal('')
    setNuevoEstado('pendiente')
  }

  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Crear pedido</h2>
      {error && <p style={{ color: 'red', margin: '0 0 8px' }}>{error}</p>}
      <input
        placeholder="Cliente"
        value={nuevoCliente}
        onChange={(e) => setNuevoCliente(e.target.value)}
      />
      <input
        placeholder="Total"
        value={nuevoTotal}
        onChange={(e) => setNuevoTotal(e.target.value)}
        style={{ marginLeft: 8 }}
      />
      <select
        value={nuevoEstado}
        onChange={(e) => setNuevoEstado(e.target.value as EstadoPedido)}
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

export default FormularioPedido
