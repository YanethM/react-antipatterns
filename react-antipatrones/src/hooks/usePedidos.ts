import { useEffect, useState } from 'react'
import type { Pedido } from '../components/pedidos/types'

const datosIniciales: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

function generarId(pedidos: Pedido[]): number {
  return pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1
}

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(datosIniciales)
      document.title = 'Panel de pedidos'
    }, 300)
    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    localStorage.setItem('cantidadPedidos', String(pedidos.length))
    localStorage.setItem('ultimoAcceso', new Date().toISOString())
  }, [pedidos])

  const contadorPendientes = pedidos.filter((p) => p.estado === 'pendiente').length
  const totalFacturado = pedidos.reduce((acc, p) => acc + p.total, 0)

  const agregarPedido = (nuevoPedido: Omit<Pedido, 'id'>) => {
    setPedidos((prev) => [
      ...prev,
      { id: generarId(prev), ...nuevoPedido },
    ])
  }

  const eliminarPedido = (id: number) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id))
  }

  const cambiarEstado = (id: number, estado: Pedido['estado']) => {
    setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  return {
    pedidos,
    contadorPendientes,
    totalFacturado,
    agregarPedido,
    eliminarPedido,
    cambiarEstado,
  }
}