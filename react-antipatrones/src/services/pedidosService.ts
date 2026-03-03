import type { Pedido, FormularioPedido, EstadoPedido } from '../types/Pedido'
import { VALIDACIONES } from '../constants'

/**
 * ANTI-PATRÓN RESUELTO: Lógica de negocio en componentes
 * Toda la lógica de pedidos está aquí, centralizada y testeable
 */
class PedidosService {
  /**
   * Valida un pedido antes de agregarlo
   * ANTI-PATRÓN RESUELTO: No manejar errores async
   */
  validarNuevoPedido(formulario: FormularioPedido): { valido: boolean; errores: string[] } {
    const errores: string[] = []

    const cliente = formulario.cliente.trim()
    if (!cliente) {
      errores.push('El cliente es requerido')
    } else if (cliente.length < VALIDACIONES.CLIENTE_MIN_LENGTH) {
      errores.push(`El cliente debe tener al menos ${VALIDACIONES.CLIENTE_MIN_LENGTH} caracteres`)
    }

    const total = Number(formulario.total)
    if (!formulario.total.trim()) {
      errores.push('El total es requerido')
    } else if (Number.isNaN(total)) {
      errores.push('El total debe ser un número válido')
    } else if (total < VALIDACIONES.TOTAL_MIN) {
      errores.push(`El total debe ser mayor o igual a ${VALIDACIONES.TOTAL_MIN}`)
    } else if (total > VALIDACIONES.TOTAL_MAX) {
      errores.push(`El total no puede exceder ${VALIDACIONES.TOTAL_MAX}`)
    }

    return {
      valido: errores.length === 0,
      errores,
    }
  }

  /**
   * Crea un nuevo pedido validado
   * ANTI-PATRÓN RESUELTO: Código espaguetti → Función pura enfocada
   */
  crearPedido(formulario: FormularioPedido, siguienteId: number): Pedido {
    return {
      id: siguienteId,
      cliente: formulario.cliente.trim(),
      total: Number(formulario.total),
      estado: formulario.estado,
    }
  }

  /**
   * Calcula el siguiente ID disponible
   */
  calcularSiguienteId(pedidos: Pedido[]): number {
    return pedidos.length ? Math.max(...pedidos.map((p) => p.id)) + 1 : 1
  }

  /**
   * Filtra pedidos por texto en cliente, estado o id
   * ANTI-PATRÓN RESUELTO: Código espaguetti → Función declarativa
   */
  filtrarPedidos(pedidos: Pedido[], textoFiltro: string): Pedido[] {
    if (!textoFiltro.trim()) {
      return pedidos
    }

    const texto = textoFiltro.toLowerCase()
    return pedidos.filter((p) => {
      return (
        p.cliente.toLowerCase().includes(texto) ||
        p.estado.toLowerCase().includes(texto) ||
        String(p.id).includes(texto)
      )
    })
  }

  /**
   * Ordena pedidos por total
   * ANTI-PATRÓN RESUELTO: Código espaguetti → Función declarativa
   */
  ordenarPedidos(pedidos: Pedido[], ascendente: boolean): Pedido[] {
    const copia = [...pedidos]
    return copia.sort((a, b) => {
      return ascendente ? a.total - b.total : b.total - a.total
    })
  }

  /**
   * Aplica filtro y ordenamiento en una operación
   * ANTI-PATRÓN RESUELTO: Código espaguetti → Composición de funciones
   */
  filtrarYOrdenarPedidos(
    pedidos: Pedido[],
    textoFiltro: string,
    ascendente: boolean
  ): Pedido[] {
    const filtrados = this.filtrarPedidos(pedidos, textoFiltro)
    return this.ordenarPedidos(filtrados, ascendente)
  }

  /**
   * Calcula el total facturado
   */
  calcularTotalFacturado(pedidos: Pedido[]): number {
    return pedidos.reduce((acc, pedido) => acc + pedido.total, 0)
  }

  /**
   * Cuenta pedidos por estado
   */
  contarPorEstado(pedidos: Pedido[], estado: EstadoPedido): number {
    return pedidos.filter((p) => p.estado === estado).length
  }

  /**
   * Elimina un pedido de la lista
   */
  eliminarPedido(pedidos: Pedido[], idPedido: number): Pedido[] {
    return pedidos.filter((p) => p.id !== idPedido)
  }

  /**
   * Cambia el estado de un pedido
   */
  cambiarEstadoPedido(pedidos: Pedido[], idPedido: number, nuevoEstado: EstadoPedido): Pedido[] {
    return pedidos.map((p) => (p.id === idPedido ? { ...p, estado: nuevoEstado } : p))
  }
}

export const pedidosService = new PedidosService()
