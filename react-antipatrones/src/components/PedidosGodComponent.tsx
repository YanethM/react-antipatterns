import { useEffect, useState } from 'react'
import { ResumenPedidos } from './ResumenPedidosComponent'
import { CrearPedido } from './CrearPedidoComponent'
import { FiltrosPedidos } from './FiltrarPedidosComponent'
import { usePedidos } from '../hooks/usePedidos'
import { type Pedido } from '../types/Pedido' 
import { useFiltrosPedidos } from '../hooks/useFiltrarPedidos'
import { TablaPedidos } from './TablaPedidosComponent'

const datosIniciales: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

function PedidosGodComponent() {
  const [contadorPendientes, setContadorPendientes] = useState(0)
  const { pedidos, setPedidos, agregarPedido, eliminarPedido, cambiarEstado, generarNuevoId } =
    usePedidos()
  const { filtroTexto, setFiltroTexto, ordenAsc, toggleOrden, pedidosFiltrados } =
    useFiltrosPedidos(pedidos)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(datosIniciales)
      localStorage.setItem('ultimoAcceso', new Date().toISOString())
      document.title = 'Panel de pedidos'
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    setContadorPendientes(pedidos.filter((p: Pedido) => p.estado === 'pendiente').length)
    localStorage.setItem('cantidadPedidos', String(pedidos.length))
  }, [pedidos])


  const totalFacturado = pedidos.reduce((acc: number, pedido: Pedido) => acc + pedido.total, 0)

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>
      <p>Ejercicio: identifica los antipatrones de diseño presentes en este componente.</p>


      <ResumenPedidos
        totalPedidos={pedidos.length}
        pedidosPendientes={contadorPendientes}
        totalFacturado={totalFacturado}
      />

      <CrearPedido 
        generarNuevoId={generarNuevoId}
        onPedidoCreado={agregarPedido} 
      />

      <FiltrosPedidos
        filtroTexto={filtroTexto}
        onFiltroChange={setFiltroTexto}
        ordenAsc={ordenAsc}
        onToggleOrden={toggleOrden}
      />

      
      <TablaPedidos
        pedidos={pedidosFiltrados}
        onCambiarEstado={cambiarEstado}
        onEliminar={eliminarPedido}
      />
    </div>
  )
}

export default PedidosGodComponent
