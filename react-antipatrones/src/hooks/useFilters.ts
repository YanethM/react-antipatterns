import { useState, useCallback, useMemo } from 'react'
import type { Pedido, FiltrosState } from '../types/Pedido'
import { pedidosService } from '../services/pedidosService'

interface UseFiltrosReturn extends FiltrosState {
  pedidosFiltrados: Pedido[]
  cambiarTextoFiltro: (texto: string) => void
  cambiarOrden: () => void
}

/**
 * ANTI-PATRÓN RESUELTO: Múltiples useState → Estado consolidado
 * ANTI-PATRÓN RESUELTO: Re-renders innecesarios con useMemo
 * ANTI-PATRÓN RESUELTO: Arrow functions inline → useCallback
 */
export const useFiltros = (pedidos: Pedido[]): UseFiltrosReturn => {
  const [estado, setEstado] = useState<FiltrosState>({
    texto: '',
    ordenAsc: true,
  })

  // useCallback: Memoriza funciones
  const cambiarTextoFiltro = useCallback((texto: string) => {
    setEstado((prev) => ({ ...prev, texto }))
  }, [])

  const cambiarOrden = useCallback(() => {
    setEstado((prev) => ({ ...prev, ordenAsc: !prev.ordenAsc }))
  }, [])

  // useMemo: Evita recalcular si pedidos no cambian
  const pedidosFiltrados = useMemo(
    () => pedidosService.filtrarYOrdenarPedidos(pedidos, estado.texto, estado.ordenAsc),
    [pedidos, estado.texto, estado.ordenAsc]
  )

  return {
    ...estado,
    pedidosFiltrados,
    cambiarTextoFiltro,
    cambiarOrden,
  }
}
