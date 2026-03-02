import { usePedidos } from '../hooks/usePedidos'
import type { Pedido } from '../hooks/usePedidos'
import { FormularioPedido } from '../components/FormularioPedido'

const DATOS_INICIALES: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

export default function PedidosView() {
  const { pedidos, stats, filtros, acciones } = usePedidos(DATOS_INICIALES)

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>

      <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
        <h2>Resumen</h2>
        <p>Total pedidos: {stats.total}</p>
        <p>Pedidos pendientes: {stats.pendientes}</p>
        <p>Total facturado: ${stats.facturado}</p>
      </section>

      <FormularioPedido onAgregar={acciones.agregarPedido} />

      <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
        <h2>Filtros y orden</h2>
        <input
          placeholder="Buscar..."
          value={filtros.filtroTexto}
          onChange={(e) => filtros.setFiltroTexto(e.target.value)}
        />
        <button onClick={() => filtros.setOrdenAsc(!filtros.ordenAsc)} style={{ marginLeft: 8 }}>
          Orden: {filtros.ordenAsc ? 'ascendente' : 'descendente'}
        </button>
      </section>

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
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.cliente}</td>
                <td>${p.total}</td>
                <td>
                  <select 
                    value={p.estado} 
                    onChange={(e) => acciones.cambiarEstado(p.id, e.target.value as any)}
                  >
                    <option value="pendiente">pendiente</option>
                    <option value="pagado">pagado</option>
                    <option value="enviado">enviado</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => acciones.eliminarPedido(p.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

