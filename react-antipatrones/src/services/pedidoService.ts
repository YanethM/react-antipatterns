import type { Pedido } from './../types/Pedido'

export const pedidoService = {
    obtenerDatosIniciales: (): Pedido[] => [
        { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
        { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
        { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
        { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
    ],

    filtrarYOrdenar: (pedidos: Pedido[], filtroTexto: string, ordenAsc: boolean): Pedido[] => {
        const texto = filtroTexto.toLowerCase();
        return pedidos
            .filter((p) =>
                p.cliente.toLowerCase().includes(texto) ||
                p.estado.toLowerCase().includes(texto) ||
                String(p.id).includes(texto)
            )
            .sort((a, b) => (ordenAsc ? a.total - b.total : b.total - a.total));
    },

    calcularStats: (pedidos: Pedido[]) => ({
        total: pedidos.length,
        pendientes: pedidos.filter((p) => p.estado === 'pendiente').length,
        facturado: pedidos.reduce((acc, p) => acc + p.total, 0)
    })
};

