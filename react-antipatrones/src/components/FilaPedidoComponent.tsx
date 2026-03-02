import { type Pedido, type EstadoPedido } from '../types/Pedido'

type FilaPedidoProps = {
  pedido: Pedido
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
  onEliminar: (id: number) => void
}

export const FilaPedido = ({ pedido, onCambiarEstado, onEliminar }: FilaPedidoProps) => {
  return (
    <tr>
      <td>{pedido.id}</td>
      <td>{pedido.cliente}</td>
      <td>${pedido.total}</td>
      <td>
        <select
          value={pedido.estado}
          onChange={(e) => onCambiarEstado(pedido.id, e.target.value as EstadoPedido)}
        >
          <option value="pendiente">pendiente</option>
          <option value="pagado">pagado</option>
          <option value="enviado">enviado</option>
        </select>
      </td>
      <td>
        <button onClick={() => onEliminar(pedido.id)}>Eliminar</button>
      </td>
    </tr>
  )
}