import React, { useMemo, useState } from 'react'
import usePedidos from '../hooks/usePedidos'
import PedidosSummary from './PedidosSummary'
import PedidoForm from './PedidoForm'
import PedidosFilters from './PedidosFilters'
import PedidosList from './PedidosList'

function PedidosGodComponent() {
  // PROBLEMA: God Component (demasiadas responsabilidades en un solo componente)
  // IMPACTO: Baja legibilidad y mantenibilidad (difícil entender qué hace)
  // SOLUCIÓN: Dividir en contenedor + subcomponentes presentacionales
  const { pedidos, agregarPedido, eliminarPedido, cambiarEstado, contadorPendientes, totalFacturado } = usePedidos()
  const [filtroTexto, setFiltroTexto] = useState('')
  const [ordenAsc, setOrdenAsc] = useState(true)

  // PROBLEMA: Cálculos sin memoización (filter + sort en cada render)
  // IMPACTO: Escalabilidad baja con listas grandes, renders innecesarios
  // SOLUCIÓN: Memoizar con useMemo
  const pedidosFiltrados = useMemo(() => {
    const texto = filtroTexto.toLowerCase()
    return pedidos
      .filter((p) => p.cliente.toLowerCase().includes(texto) || p.estado.toLowerCase().includes(texto) || String(p.id).includes(texto))
      .sort((a, b) => (ordenAsc ? a.total - b.total : b.total - a.total))
  }, [pedidos, filtroTexto, ordenAsc])

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>
      <p>Ejercicio: identifica los antipatrones de diseño presentes en este componente.</p>

      <PedidosSummary totalCount={pedidos.length} pendingCount={contadorPendientes} totalFacturado={totalFacturado} />

      <PedidoForm onAdd={agregarPedido} />

      <PedidosFilters filtroTexto={filtroTexto} setFiltroTexto={setFiltroTexto} ordenAsc={ordenAsc} toggleOrden={() => setOrdenAsc((v) => !v)} />

      <PedidosList pedidos={pedidosFiltrados} onEliminar={eliminarPedido} onCambiarEstado={cambiarEstado} />
    </div>
  )
}

export default PedidosGodComponent
