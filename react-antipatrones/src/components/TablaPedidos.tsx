import { memo } from 'react'
import { FilaPedido } from './FilaPedido'
import type { Pedido, EstadoPedido } from '../hooks/usePedidos'

interface Props {
  pedidos: Pedido[]
  acciones: {
    eliminarPedido: (id: number) => void
    cambiarEstado: (id: number, estado: EstadoPedido) => void
  }
}

export const TablaPedidos = memo(function TablaPedidos({ pedidos, acciones }: Props) {
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
          {pedidos.map((p) => (
            <FilaPedido 
              key={p.id} 
              pedido={p} 
              onEliminar={acciones.eliminarPedido} 
              onCambiarEstado={acciones.cambiarEstado} 
            />
          ))}
        </tbody>
      </table>
    </section>
  )
})