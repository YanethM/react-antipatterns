export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado'

export type Pedido = {
  id: number
  cliente: string
  total: number
  estado: EstadoPedido
}

export const DATOS_INICIALES: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]
