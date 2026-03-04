import type { Pedido, EstadoPedido } from '../types/Pedido'

type ListadoPedidosProps = {
  pedidos: Pedido[]
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
  onEliminar: (id: number) => void
}

function FilaPedido({
  pedido,
  onCambiarEstado,
  onEliminar,
}: {
  pedido: Pedido
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
  onEliminar: (id: number) => void
}) {
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

function ListadoPedidos({ pedidos, onCambiarEstado, onEliminar }: ListadoPedidosProps) {
  return (
    <section style={{ padding: 12, border: '1px solid #ddd' }}>
      <h2>Listado</h2>
      {pedidos.length === 0 ? (
        <p>No hay pedidos</p>
      ) : (
        <table width="100%" cellPadding={8}>
          <thead>
            <tr>
              <th align="left">ID</th>
              <th align="left">Cliente</th>
              <th align="left">Total</th>
              <th align="left">Estado</th>
              <th align="left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((pedido) => (
              <FilaPedido
                key={pedido.id}
                pedido={pedido}
                onCambiarEstado={onCambiarEstado}
                onEliminar={onEliminar}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default ListadoPedidos
