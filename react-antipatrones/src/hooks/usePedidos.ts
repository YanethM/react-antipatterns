import { useEffect, useState, useCallback, useMemo } from 'react'
import type { Pedido, FormularioPedido } from '../types/Pedido'
import { DATOS_INICIALES, INIT_DELAY_MS, STORAGE_KEYS } from '../constants'
import { pedidosService } from '../services/pedidosService'
import { storageService } from '../services/storageService'

interface UsePedidosReturn {
  pedidos: Pedido[]
  agregarPedido: (formulario: FormularioPedido) => { exito: boolean; errores: string[] }
  eliminarPedido: (id: number) => void
  cambiarEstadoPedido: (id: number, estado: Pedido['estado']) => void
  totalFacturado: number
  contadorPendientes: number
  cargando: boolean
}

/**
 * ANTI-PATRÓN RESUELTO: useEffect mal usado → Efecto limpio y enfocado
 * ANTI-PATRÓN RESUELTO: Múltiples useState → Estado consolidado
 * ANTI-PATRÓN RESUELTO: Lógica de negocio en componentes
 * ANTI-PATRÓN RESUELTO: Re-renders innecesarios con useMemo
 * ANTI-PATRÓN RESUELTO: Arrow functions inline → useCallback
 */
export const usePedidos = (): UsePedidosReturn => {
  const [pedidos, setPedidos] = useState<Pedido[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const inicializar = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, INIT_DELAY_MS))

        const { datos } = storageService.obtener<Pedido[]>(STORAGE_KEYS.PEDIDOS)
        if (datos && datos.length > 0) {
          setPedidos(datos)
        } else {
          setPedidos(DATOS_INICIALES)
          storageService.guardar(STORAGE_KEYS.PEDIDOS, DATOS_INICIALES)
        }

        storageService.guardar(STORAGE_KEYS.ULTIMO_ACCESO, new Date().toISOString())
        document.title = 'Panel de Pedidos'

        setCargando(false)
      } catch (err) {
        const mensaje = err instanceof Error ? err.message : 'Error durante la inicialización'
        setError(mensaje)
        console.error('Error inicializando:', err)
        setCargando(false)
      }
    }

    inicializar()
  }, [])

  // useCallback: Memoriza funciones para evitar re-renders innecesarios
  const agregarPedido = useCallback(
    (formulario: FormularioPedido): { exito: boolean; errores: string[] } => {
      try {
        const { valido, errores } = pedidosService.validarNuevoPedido(formulario)
        if (!valido) {
          return { exito: false, errores }
        }
        const siguienteId = pedidosService.calcularSiguienteId(pedidos)
        const nuevoPedido = pedidosService.crearPedido(formulario, siguienteId)
        const pedidosActualizados = [...pedidos, nuevoPedido]
        setPedidos(pedidosActualizados)
        const { exito, error } = storageService.guardar(STORAGE_KEYS.PEDIDOS, pedidosActualizados)

        if (!exito) {
          console.error('Error guardando en storage:', error)
        }
        return { exito: true, errores: [] }
      } catch (err) {
        const mensaje = err instanceof Error ? err.message : 'Error al agregar pedido'
        console.error('Error en agregarPedido:', err)
        return { exito: false, errores: [mensaje] }
      }
    },
    [pedidos]
  )

  const eliminarPedido = useCallback((id: number) => {
    try {
      const pedidosActualizados = pedidosService.eliminarPedido(pedidos, id)
      setPedidos(pedidosActualizados)
      storageService.guardar(STORAGE_KEYS.PEDIDOS, pedidosActualizados)
    } catch (err) {
      console.error('Error eliminando pedido:', err)
    }
  }, [pedidos])

  const cambiarEstadoPedido = useCallback(
    (id: number, estado: Pedido['estado']) => {
      try {
        const pedidosActualizados = pedidosService.cambiarEstadoPedido(pedidos, id, estado)
        setPedidos(pedidosActualizados)
        storageService.guardar(STORAGE_KEYS.PEDIDOS, pedidosActualizados)
      } catch (err) {
        console.error('Error cambiando estado:', err)
      }
    },
    [pedidos]
  )

  // useMemo: Calcula valores derivados sin re-renderizar innecesariamente
  const totalFacturado = useMemo(
    () => pedidosService.calcularTotalFacturado(pedidos),
    [pedidos]
  )

  const contadorPendientes = useMemo(
    () => pedidosService.contarPorEstado(pedidos, 'pendiente'),
    [pedidos]
  )

  if (error) {
    throw new Error(`Error en usePedidos: ${error}`)
  }

  return {
    pedidos,
    agregarPedido,
    eliminarPedido,
    cambiarEstadoPedido,
    totalFacturado,
    contadorPendientes,
    cargando,
  }
}
