import type { EstadoPedido, Pedido } from './types'

type ResumenProps = {
  totalPedidos: number
  pedidosPendientes: number
  totalFacturado: number
}

export function ResumenPedidos({
  totalPedidos,
  pedidosPendientes,
  totalFacturado,
}: ResumenProps) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Resumen</h2>
      <p>Total pedidos: {totalPedidos}</p>
      <p>Pedidos pendientes: {pedidosPendientes}</p>
      <p>Total facturado: ${totalFacturado}</p>
    </section>
  )
}

type CrearPedidoProps = {
  nuevoCliente: string
  nuevoTotal: string
  nuevoEstado: EstadoPedido
  onClienteChange: (valor: string) => void
  onTotalChange: (valor: string) => void
  onEstadoChange: (valor: EstadoPedido) => void
  onAgregar: () => void
}

export function CrearPedidoForm({
  nuevoCliente,
  nuevoTotal,
  nuevoEstado,
  onClienteChange,
  onTotalChange,
  onEstadoChange,
  onAgregar,
}: CrearPedidoProps) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Crear pedido</h2>
      <input placeholder="Cliente" value={nuevoCliente} onChange={(e) => onClienteChange(e.target.value)} />
      <input
        placeholder="Total"
        value={nuevoTotal}
        onChange={(e) => onTotalChange(e.target.value)}
        style={{ marginLeft: 8 }}
      />
      <select
        value={nuevoEstado}
        onChange={(e) => onEstadoChange(e.target.value as EstadoPedido)}
        style={{ marginLeft: 8 }}
      >
        <option value="pendiente">pendiente</option>
        <option value="pagado">pagado</option>
        <option value="enviado">enviado</option>
      </select>
      <button onClick={onAgregar} style={{ marginLeft: 8 }}>
        Agregar
      </button>
    </section>
  )
}

type FiltrosProps = {
  filtroTexto: string
  ordenAsc: boolean
  onFiltroChange: (valor: string) => void
  onToggleOrden: () => void
}

export function FiltrosPedidos({ filtroTexto, ordenAsc, onFiltroChange, onToggleOrden }: FiltrosProps) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Filtros y orden</h2>
      <input
        placeholder="Buscar por id, cliente o estado"
        value={filtroTexto}
        onChange={(e) => onFiltroChange(e.target.value)}
      />
      <button onClick={onToggleOrden} style={{ marginLeft: 8 }}>
        Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}
      </button>
    </section>
  )
}

type ListadoProps = {
  pedidos: Pedido[]
  onCambiarEstado: (id: number, estado: EstadoPedido) => void
  onEliminar: (id: number) => void
}

export function ListadoPedidos({ pedidos, onCambiarEstado, onEliminar }: ListadoProps) {
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
