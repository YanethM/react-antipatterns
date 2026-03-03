import './App.css'
import { usePedidos } from './hooks/usePedidos'
import PedidoSummary from './components/EstadisticasPedido'
import PedidoForm from './components/FormularioPedido'
import PedidoTable from './components/TablaPedidos'

function App() {
  const {
    pedidosFiltrados, stats, filtroTexto, setFiltroTexto,
    ordenAsc, setOrdenAsc, agregarPedido, eliminarPedido, cambiarEstado
  } = usePedidos()

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>

      <PedidoSummary
        total={stats.total}
        pendientes={stats.pendientes}
        facturado={stats.facturado}
      />

      <PedidoForm onAgregar={agregarPedido} />

      <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
        <h2>Filtros y orden</h2>
        <input
          placeholder="Buscar por id, cliente o estado"
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
        />
        <button onClick={() => setOrdenAsc(!ordenAsc)} style={{ marginLeft: 8 }}>
          Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}
        </button>
      </section>

      <PedidoTable
        data={pedidosFiltrados}
        onEliminar={eliminarPedido}
        onCambiarEstado={cambiarEstado}
      />
    </div>
  )
}

export default App
