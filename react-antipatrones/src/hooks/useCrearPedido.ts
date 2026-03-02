import { useState } from 'react'
import { type EstadoPedido } from '../types/Pedido'

export const useCrearPedido = () => {
  const [nuevoCliente, setNuevoCliente] = useState('')
  const [nuevoTotal, setNuevoTotal] = useState('')
  const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido>('pendiente')

  const limpiarFormulario = () => {
    setNuevoCliente('')
    setNuevoTotal('')
    setNuevoEstado('pendiente')
  }

  const validarFormulario = (): { valido: boolean; total?: number } => {
    if (!nuevoCliente.trim() || !nuevoTotal.trim()) {
      return { valido: false }
    }

    const total = Number(nuevoTotal)
    if (Number.isNaN(total) || total <= 0) {
      return { valido: false }
    }

    return { valido: true, total }
  }

  return {
    nuevoCliente,
    setNuevoCliente,
    nuevoTotal,
    setNuevoTotal,
    nuevoEstado,
    setNuevoEstado,
    limpiarFormulario,
    validarFormulario,
  }
}
