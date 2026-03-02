import { useCrearPedido } from "../hooks/useCrearPedidos"
import { type Pedido } from "../types/Pedido"

type CrearPedidoProps = {
  pedidos: Pedido[]
  onPedidoCreado: (pedido: Pedido) => void
}

export const CrearPedido = ({ pedidos, onPedidoCreado }: CrearPedidoProps) => {

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

    const siguienteId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1

    const nuevoPedido: Pedido = {
      id: siguienteId,
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
