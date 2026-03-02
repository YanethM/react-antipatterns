import { type Pedido } from '../types/Pedido'
import { useCrearPedido } from '../hooks/useCrearPedido'

type CrearPedidoProps = {
  generarNuevoId: () => number
  onPedidoCreado: (pedido: Pedido) => void
}

export const CrearPedido = ({ generarNuevoId, onPedidoCreado }: CrearPedidoProps) => {
  const {
    nuevoCliente,
    setNuevoCliente,
    nuevoTotal,
    setNuevoTotal,
    nuevoEstado,
    setNuevoEstado,
    limpiarFormulario,
    validarFormulario,
  } = useCrearPedido()

  const handleAgregar = () => {
    const { valido, total } = validarFormulario()
    if (!valido || !total) return

    const nuevoPedido: Pedido = {
      id: generarNuevoId(),
      cliente: nuevoCliente.trim(),
      total,
      estado: nuevoEstado,
    }

    onPedidoCreado(nuevoPedido)
    limpiarFormulario()
  }

  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Crear pedido</h2>
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
        onChange={(e) => setNuevoEstado(e.target.value as Pedido['estado'])}
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