import { useState, useEffect, useMemo } from 'react'

export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado'

export type Pedido = {
  id: number
  cliente: string
  total: number
  estado: EstadoPedido
}

export function usePedidos(datosIniciales: Pedido[]) {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [filtroTexto, setFiltroTexto] = useState('')
  const [ordenAsc, setOrdenAsc] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(datosIniciales)
      localStorage.setItem('ultimoAcceso', new Date().toISOString())
      document.title = 'Panel de pedidos'
    }, 300)
    return () => clearTimeout(timeout)
  }, [datosIniciales])

  useEffect(() => {
    if (pedidos.length > 0) {
      localStorage.setItem('cantidadPedidos', String(pedidos.length))
    }
  }, [pedidos])

  const agregarPedido = (cliente: string, total: number, estado: EstadoPedido) => {
    const siguienteId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1
    setPedidos([...pedidos, { id: siguienteId, cliente, total, estado }])
  }

  const eliminarPedido = (id: number) => {
    setPedidos(pedidos.filter((p) => p.id !== id))
  }

  const cambiarEstado = (id: number, estado: EstadoPedido) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

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
      .sort((a, b) => (ordenAsc ? a.total - b.total : b.total - a.total))
  }, [pedidos, filtroTexto, ordenAsc])

  const stats = useMemo(() => ({
    total: pedidos.length,
    pendientes: pedidos.filter((p) => p.estado === 'pendiente').length,
    facturado: pedidos.reduce((acc, p) => acc + p.total, 0)
  }), [pedidos])

  return {
    pedidos: pedidosFiltrados,
    stats,
    filtros: { filtroTexto, setFiltroTexto, ordenAsc, setOrdenAsc },
    acciones: { agregarPedido, eliminarPedido, cambiarEstado }
  }
}