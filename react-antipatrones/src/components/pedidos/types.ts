export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado'

export type Pedido = {
  id: number
  cliente: string
  total: number
  estado: EstadoPedido
}