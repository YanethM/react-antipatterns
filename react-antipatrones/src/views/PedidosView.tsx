import { usePedidos } from '../hooks/usePedidos'
import type { Pedido } from '../hooks/usePedidos'
import { FormularioPedido } from '../components/FormularioPedido'
import { ResumenPedidos } from '../components/ResumenPedidos'
import { FiltrosPedidos } from '../components/FiltrosPedidos'
import { TablaPedidos } from '../components/TablaPedidos'

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
      <ResumenPedidos stats={stats} />
      <FormularioPedido onAgregar={acciones.agregarPedido} />
      <FiltrosPedidos filtros={filtros} />
      <TablaPedidos pedidos={pedidos} acciones={acciones} />
    </div>
  )
}