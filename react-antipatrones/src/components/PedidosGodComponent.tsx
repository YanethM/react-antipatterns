import { useEffect, useState } from 'react'

type Pedido = {
  id: number
  cliente: string
  total: number
  estado: 'pendiente' | 'pagado' | 'enviado'
}

const datosIniciales: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

function PedidosGodComponent() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [filtroTexto, setFiltroTexto] = useState('')
  const [ordenAsc, setOrdenAsc] = useState(true)
  const [nuevoCliente, setNuevoCliente] = useState('')
  const [nuevoTotal, setNuevoTotal] = useState('')
  const [nuevoEstado, setNuevoEstado] = useState<'pendiente' | 'pagado' | 'enviado'>('pendiente')
  const [contadorPendientes, setContadorPendientes] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(datosIniciales)
      localStorage.setItem('ultimoAcceso', new Date().toISOString())
      document.title = 'Panel de pedidos'
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    setContadorPendientes(pedidos.filter((p) => p.estado === 'pendiente').length)
    localStorage.setItem('cantidadPedidos', String(pedidos.length))
  }, [pedidos])

  const pedidosFiltrados = pedidos
    .filter((p) => {
      const texto = filtroTexto.toLowerCase()
      return (
        p.cliente.toLowerCase().includes(texto) ||
        p.estado.toLowerCase().includes(texto) ||
        String(p.id).includes(texto)
      )
    })
    .sort((a, b) => {
      if (ordenAsc) return a.total - b.total
      return b.total - a.total
    })

  const agregarPedido = () => {
    if (!nuevoCliente.trim() || !nuevoTotal.trim()) return

    const total = Number(nuevoTotal)
    if (Number.isNaN(total)) return

    const siguienteId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1

    setPedidos([
      ...pedidos,
      { id: siguienteId, cliente: nuevoCliente.trim(), total, estado: nuevoEstado },
    ])

    setNuevoCliente('')
    setNuevoTotal('')
    setNuevoEstado('pendiente')
  }

  const eliminarPedido = (id: number) => {
    setPedidos(pedidos.filter((p) => p.id !== id))
  }

  const cambiarEstado = (id: number, estado: Pedido['estado']) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  const totalFacturado = pedidos.reduce((acc, pedido) => acc + pedido.total, 0)

  return (
    <div style={{ maxWidth: 950, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>Panel de Pedidos</h1>
      <p>Ejercicio: identifica los antipatrones de diseño presentes en este componente.</p>

      <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
        <h2>Resumen</h2>
        <p>Total pedidos: {pedidos.length}</p>
        <p>Pedidos pendientes: {contadorPendientes}</p>
        <p>Total facturado: ${totalFacturado}</p>
      </section>

      <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
        <h2>Crear pedido</h2>
        <input
          placeholder="Cliente"
          value={nuevoCliente}
          onChange={(e) => setNuevoCliente(e.target.value)}
        />
        <input
          placeholder="Total"
          value={nuevoTotal}
          onChange={(e) => setNuevoTotal(e.target.value)}
          style={{ marginLeft: 8 }}
        />
        <select
          value={nuevoEstado}
          onChange={(e) => setNuevoEstado(e.target.value as Pedido['estado'])}
          style={{ marginLeft: 8 }}
        >
          <option value="pendiente">pendiente</option>
          <option value="pagado">pagado</option>
          <option value="enviado">enviado</option>
        </select>
        <button onClick={agregarPedido} style={{ marginLeft: 8 }}>
          Agregar
        </button>
      </section>

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

      <section style={{ padding: 12, border: '1px solid #ddd' }}>
        <h2>Listado</h2>
        {pedidosFiltrados.length === 0 ? (
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
              {pedidosFiltrados.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.cliente}</td>
                  <td>${pedido.total}</td>
                  <td>
                    <select
                      value={pedido.estado}
                      onChange={(e) => cambiarEstado(pedido.id, e.target.value as Pedido['estado'])}
                    >
                      <option value="pendiente">pendiente</option>
                      <option value="pagado">pagado</option>
                      <option value="enviado">enviado</option>
                    </select>
                  </td>
                  <td>
                    <button onClick={() => eliminarPedido(pedido.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  )
}

export default PedidosGodComponent
