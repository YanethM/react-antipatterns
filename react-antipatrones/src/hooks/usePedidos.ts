import { useEffect, useMemo, useState } from 'react'
import { DATOS_INICIALES } from '../types/Pedido'
import type { Pedido, EstadoPedido } from '../types/Pedido'

/**
 * Hook personalizado que encapsula toda la lógica de estado y operaciones CRUD
 * de los pedidos, separando la lógica de negocio de la presentación.
 */
export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([])

  // Carga inicial de datos y efectos secundarios de inicialización
  useEffect(() => {
    const timeout = setTimeout(() => {
      setPedidos(DATOS_INICIALES)
      localStorage.setItem('ultimoAcceso', new Date().toISOString())
    }, 300)

    return () => clearTimeout(timeout)
  }, [])

  // Actualizar título del documento cuando cambian los pedidos
  useEffect(() => {
    document.title = 'Panel de pedidos'
  }, [])

  // Persistir cantidad de pedidos en localStorage
  useEffect(() => {
    localStorage.setItem('cantidadPedidos', String(pedidos.length))
  }, [pedidos])

  // Estado derivado calculado directamente (sin useEffect + useState innecesario)
  const contadorPendientes = useMemo(
    () => pedidos.filter((p) => p.estado === 'pendiente').length,
    [pedidos]
  )

  const totalFacturado = useMemo(
    () => pedidos.reduce((acc, pedido) => acc + pedido.total, 0),
    [pedidos]
  )

  const agregarPedido = (cliente: string, total: number, estado: EstadoPedido) => {
    const siguienteId = pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1
    setPedidos((prev) => [...prev, { id: siguienteId, cliente, total, estado }])
  }

  const eliminarPedido = (id: number) => {
    setPedidos((prev) => prev.filter((p) => p.id !== id))
  }

  const cambiarEstado = (id: number, estado: EstadoPedido) => {
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
