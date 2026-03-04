import { useMemo, useState } from 'react'
import type { Pedido } from '../types/Pedido'

/**
 * Hook personalizado que encapsula la lógica de filtrado y ordenamiento de pedidos.
 */
export function useFiltrosPedidos(pedidos: Pedido[]) {
  const [filtroTexto, setFiltroTexto] = useState('')
  const [ordenAsc, setOrdenAsc] = useState(true)

  const pedidosFiltrados = useMemo(() => {
    const texto = filtroTexto.toLowerCase()
    return pedidos
      .filter(
        (p) =>
          p.cliente.toLowerCase().includes(texto) ||
          p.estado.toLowerCase().includes(texto) ||
          String(p.id).includes(texto)
      )
      .sort((a, b) => (ordenAsc ? a.total - b.total : b.total - a.total))
  }, [pedidos, filtroTexto, ordenAsc])

  const alternarOrden = () => setOrdenAsc((prev) => !prev)

  return {
    filtroTexto,
    setFiltroTexto,
    ordenAsc,
    alternarOrden,
    pedidosFiltrados,
  }
}
