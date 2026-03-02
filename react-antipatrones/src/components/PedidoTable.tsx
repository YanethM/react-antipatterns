import { useCallback } from 'react'
import type { Pedido } from '../hooks/usePedidos'

type PedidoTableProps = {
  pedidosFiltrados: Pedido[]
  onCambiarEstado: (id: number, estado: Pedido['estado']) => void
  onEliminar: (id: number) => void
}

export function PedidoTable({ pedidosFiltrados, onCambiarEstado, onEliminar }: PedidoTableProps) {
  const handleEstadoChange = useCallback(
    (id: number, estado: string) => {
      onCambiarEstado(id, estado as Pedido['estado'])
    },
    [onCambiarEstado]
  )

  const handleEliminar = useCallback(
    (id: number) => {
      onEliminar(id)
    },
    [onEliminar]
  )

  return (
    <section className="pedido-table">
      <h2>Listado</h2>
      {pedidosFiltrados.length === 0 ? (
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
            {pedidosFiltrados.map((pedido) => (
              <tr key={pedido.id}>
                <td>{pedido.id}</td>
                <td>{pedido.cliente}</td>
                <td>${pedido.total}</td>
                <td>
                  <select value={pedido.estado} onChange={(e) => handleEstadoChange(pedido.id, e.target.value)}>
                    <option value="pendiente">pendiente</option>
                    <option value="pagado">pagado</option>
                    <option value="enviado">enviado</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => handleEliminar(pedido.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
