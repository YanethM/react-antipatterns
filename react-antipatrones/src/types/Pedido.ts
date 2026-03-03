export type EstadoPedido = 'pendiente' | 'pagado' | 'enviado';

export interface Pedido {
  id: number;
  cliente: string;
  total: number;
  estado: EstadoPedido;
}
