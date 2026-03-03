export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado'

export type Pedido = {
  id: number
  cliente: string
  total: number
  estado: EstadoPedido
}

export type FormularioPedido = {
  cliente: string
  total: string
  estado: EstadoPedido
}

export type FiltrosState = {
  texto: string
  ordenAsc: boolean
}
