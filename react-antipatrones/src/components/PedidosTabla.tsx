import { memo, useCallback } from 'react'
import type { Pedido } from '../types/Pedido'
import { ESTILOS, TEXTOS } from '../constants'

interface PedidosTablaProps {
  pedidos: Pedido[]
  onCambiarEstado: (id: number, estado: Pedido['estado']) => void
  onEliminar: (id: number) => void
}
/**
 * Componente memo: Evita re-renders si props no cambian
 * ANTI-PATRÓN RESUELTO: God component → Componente especializado
 * ANTI-PATRÓN RESUELTO: Re-renders innecesarios con memo
 */
export const PedidosTabla = memo(function PedidosTabla({
  pedidos,
  onCambiarEstado,
  onEliminar,
}: PedidosTablaProps) {
  if (pedidos.length === 0) {
    return (
      <section style={ESTILOS.SECCION}>
        <h2>Listado</h2>
        <p>{TEXTOS.NO_HAY_PEDIDOS}</p>
      </section>
    )
  }

  return (
    <section style={ESTILOS.SECCION}>
      <h2>Listado</h2>
      <table width="100%" cellPadding={8} style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
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
})

const FilaPedido = memo(function FilaPedido({
  pedido,
  onCambiarEstado,
  onEliminar,
}: {
  pedido: Pedido
  onCambiarEstado: (id: number, estado: Pedido['estado']) => void
  onEliminar: (id: number) => void
}) {
  // useCallback: Evita crear nuevas funciones en cada render
  const manejarCambioEstado = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onCambiarEstado(pedido.id, e.target.value as Pedido['estado'])
    },
    [pedido.id, onCambiarEstado]
  )

  const manejarEliminar = useCallback(() => {
    onEliminar(pedido.id)
  }, [pedido.id, onEliminar])

  return (
    <tr style={{ borderBottom: '1px solid #eee' }}>
      <td>{pedido.id}</td>
      <td>{pedido.cliente}</td>
      <td>${pedido.total}</td>
      <td>
        <select
          value={pedido.estado}
          onChange={manejarCambioEstado}
          style={ESTILOS.SELECT}
        >
          <option value="pendiente">pendiente</option>
          <option value="pagado">pagado</option>
          <option value="enviado">enviado</option>
        </select>
      </td>
      <td>
        <button onClick={manejarEliminar} style={ESTILOS.BOTON}>
          Eliminar
        </button>
      </td>
    </tr>
  )
})
