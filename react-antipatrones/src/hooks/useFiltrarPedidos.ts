import { useMemo, useState } from 'react'
import { type Pedido } from '../types/Pedido'

export const useFiltrosPedidos = (pedidos: Pedido[]) => {
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
      .sort((a, b) => {
        if (ordenAsc) return a.total - b.total
        return b.total - a.total
      })
  }, [pedidos, filtroTexto, ordenAsc])

  const toggleOrden = () => setOrdenAsc(!ordenAsc)

  return {
    filtroTexto,
    setFiltroTexto,
    ordenAsc,
    toggleOrden,
    pedidosFiltrados,
  }
}