import { type Pedido, type EstadoPedido } from '../types/Pedido'
import { FilaPedido } from './FilaPedidoComponent'

type TablaPedidosProps = {
  pedidos: Pedido[]
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
  onEliminar: (id: number) => void
}

export const TablaPedidos = ({
  pedidos,
  onCambiarEstado,
  onEliminar,
}: TablaPedidosProps) => {
  if (pedidos.length === 0) {
    return (
      <section style={{ padding: 12, border: '1px solid #ddd' }}>
        <h2>Listado</h2>
        <p>No hay pedidos</p>
      </section>
    )
  }

  return (
    <section style={{ padding: 12, border: '1px solid #ddd' }}>
      <h2>Listado</h2>
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
    </section>
  )
}