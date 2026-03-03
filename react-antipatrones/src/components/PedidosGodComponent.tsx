import {
  CrearPedidoForm,
  FiltrosPedidos,
  ListadoPedidos,
  ResumenPedidos,
} from './pedidos/PedidosView'
import { usePedidos } from './pedidos/usePedidos'

function PedidosGodComponent() {
  const {
    pedidos,
    filtroTexto,
    ordenAsc,
    nuevoCliente,
    nuevoTotal,
    nuevoEstado,
    contadorPendientes,
    totalFacturado,
    pedidosFiltrados,
    setFiltroTexto,
    setOrdenAsc,
    setNuevoCliente,
    setNuevoTotal,
    setNuevoEstado,
    agregarPedido,
    eliminarPedido,
    cambiarEstado,
  } = usePedidos()

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>
      <p>Ejercicio: identifica los antipatrones de diseño presentes en este componente.</p>
      <ResumenPedidos
        totalPedidos={pedidos.length}
        pedidosPendientes={contadorPendientes}
        totalFacturado={totalFacturado}
      />

      <CrearPedidoForm
        nuevoCliente={nuevoCliente}
        nuevoTotal={nuevoTotal}
        nuevoEstado={nuevoEstado}
        onClienteChange={setNuevoCliente}
        onTotalChange={setNuevoTotal}
        onEstadoChange={setNuevoEstado}
        onAgregar={agregarPedido}
      />

      <FiltrosPedidos
        filtroTexto={filtroTexto}
        ordenAsc={ordenAsc}
        onFiltroChange={setFiltroTexto}
        onToggleOrden={() => setOrdenAsc(!ordenAsc)}
      />

      <ListadoPedidos
        pedidos={pedidosFiltrados}
        onCambiarEstado={cambiarEstado}
        onEliminar={eliminarPedido}
      />
    </div>
  )
}

export default PedidosGodComponent