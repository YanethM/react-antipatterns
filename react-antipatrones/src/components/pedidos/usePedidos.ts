import { useMemo, useState, useEffect } from 'react'
import type { EstadoPedido, Pedido } from './types'

const datosIniciales: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [filtroTexto, setFiltroTexto] = useState('')
  const [ordenAsc, setOrdenAsc] = useState(true)
  const [nuevoCliente, setNuevoCliente] = useState('')
  const [nuevoTotal, setNuevoTotal] = useState('')
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido>('pendiente')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(datosIniciales)
      localStorage.setItem('ultimoAcceso', new Date().toISOString())
      document.title = 'Panel de pedidos'
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    localStorage.setItem('cantidadPedidos', String(pedidos.length))
  }, [pedidos])

  const contadorPendientes = useMemo(
    () => pedidos.filter((p) => p.estado === 'pendiente').length,
    [pedidos],
  )

  const totalFacturado = useMemo(
    () => pedidos.reduce((acc, pedido) => acc + pedido.total, 0),
    [pedidos],
  )

  const pedidosFiltrados = useMemo(() => {
    return pedidos
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
  }, [pedidos, filtroTexto, ordenAsc])

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

  const cambiarEstado = (id: number, estado: EstadoPedido) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  return {
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
  }
}
