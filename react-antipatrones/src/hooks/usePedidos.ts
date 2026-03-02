import { useState } from 'react'
import { type Pedido, type EstadoPedido } from '../types/Pedido'

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  const agregarPedido = (nuevoPedido: Pedido) => {
    setPedidos([...pedidos, nuevoPedido])
  }

  const eliminarPedido = (id: number) => {
    setPedidos(pedidos.filter((p) => p.id !== id))
  }

  const cambiarEstado = (id: number, estado: EstadoPedido) => {
    setPedidos(pedidos.map((p) => (p.id === id ? { ...p, estado } : p)))
  }

  const generarNuevoId = (): number => {
    return pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1
  }

  return {
    pedidos,
    setPedidos,
    agregarPedido,
    eliminarPedido,
    cambiarEstado,
    generarNuevoId,
  }
}
