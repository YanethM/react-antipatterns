export type Pedido = {
	id: number;
	cliente: string;
	total: number;
	estado: 'pendiente' | 'pagado' | 'enviado';
};