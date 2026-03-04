import { useMemo, useState } from 'react'
import type { Pedido } from '../components/pedidos/types'

export function useFiltrosPedidos(pedidos: Pedido[]) {
  const [filtroTexto, setFiltroTexto] = useState('')
  const [ordenAsc, setOrdenAsc] = useState(true)

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

  const toggleOrden = () => setOrdenAsc((prev) => !prev)

  return {
    filtroTexto,
    setFiltroTexto,
    ordenAsc,
    toggleOrden,
    pedidosFiltrados,
  }
}