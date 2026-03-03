import { memo } from 'react'
import type { Pedido, EstadoPedido } from '../hooks/usePedidos'

interface Props {
  pedido: Pedido
  onEliminar: (id: number) => void
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
}

export const FilaPedido = memo(function FilaPedido({ pedido, onEliminar, onCambiarEstado }: Props) {
  return (
    <tr>
      <td>{pedido.id}</td>
      <td>{pedido.cliente}</td>
      <td>${pedido.total}</td>
      <td>
        <select 
          aria-label="Estado del pedido"
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
})