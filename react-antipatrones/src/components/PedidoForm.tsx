import { useCallback, useState } from 'react'
import type { Pedido } from '../hooks/usePedidos'

type PedidoFormProps = {
  pedidos: Pedido[]
  onAgregar: (pedido: Pedido) => void
}

export function PedidoForm({ pedidos, onAgregar }: PedidoFormProps) {
  const [nuevoCliente, setNuevoCliente] = useState('')
  const [nuevoTotal, setNuevoTotal] = useState('')
  const [nuevoEstado, setNuevoEstado] = useState<Pedido['estado']>('pendiente')

  const handleAgregar = useCallback(() => {
    if (!nuevoCliente.trim() || !nuevoTotal.trim()) return

    const total = Number(nuevoTotal)
    if (Number.isNaN(total)) return

    const siguienteId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1

    onAgregar({ id: siguienteId, cliente: nuevoCliente.trim(), total, estado: nuevoEstado })

    // Limpiar formulario
    setNuevoCliente('')
    setNuevoTotal('')
    setNuevoEstado('pendiente')
  }, [nuevoCliente, nuevoTotal, nuevoEstado, pedidos, onAgregar])

  return (
    <section className="pedido-form">
      <h2>Crear pedido</h2>
      <div className="form-group">
        <input
          placeholder="Cliente"
          value={nuevoCliente}
          onChange={(e) => setNuevoCliente(e.target.value)}
        />
        <input
          placeholder="Total"
          value={nuevoTotal}
          onChange={(e) => setNuevoTotal(e.target.value)}
        />
        <select value={nuevoEstado} onChange={(e) => setNuevoEstado(e.target.value as Pedido['estado'])}>
          <option value="pendiente">pendiente</option>
          <option value="pagado">pagado</option>
          <option value="enviado">enviado</option>
        </select>
        <button onClick={handleAgregar}>Agregar</button>
      </div>
    </section>
  )
}
