import type { EstadoPedido, Pedido } from './types'

type Props = {
  pedidos: Pedido[]
  onEliminar: (id: number) => void
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
}

export function PedidosListado({ pedidos, onEliminar, onCambiarEstado }: Props) {
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
              <tr key={pedido.id}>
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
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}