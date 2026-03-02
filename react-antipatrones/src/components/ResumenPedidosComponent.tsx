type ResumenProps = {
  totalPedidos: number;
  pedidosPendientes: number;
  totalFacturado: number;
};

export const ResumenPedidos = ({
  totalPedidos,
  pedidosPendientes,
  totalFacturado,
}: ResumenProps) => {
  return (
    <section
      style={{ marginBottom: 16, padding: 12, border: "1px solid #ddd" }}
    >
      <h2>Resumen</h2>
      <p>Total pedidos: {totalPedidos}</p>
      <p>Pedidos pendientes: {pedidosPendientes}</p>
      <p>Total facturado: ${totalFacturado}</p>
    </section>
  );
};
