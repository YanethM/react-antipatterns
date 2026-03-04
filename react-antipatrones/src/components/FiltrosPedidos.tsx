type FiltrosPedidosProps = {
  filtroTexto: string
  onFiltroChange: (texto: string) => void
  ordenAsc: boolean
  onAlternarOrden: () => void
}

function FiltrosPedidos({
  filtroTexto,
  onFiltroChange,
  ordenAsc,
  onAlternarOrden,
}: FiltrosPedidosProps) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Filtros y orden</h2>
      <input
        placeholder="Buscar por id, cliente o estado"
        value={filtroTexto}
        onChange={(e) => onFiltroChange(e.target.value)}
      />
      <button onClick={onAlternarOrden} style={{ marginLeft: 8 }}>
        Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}
      </button>
    </section>
  )
}

export default FiltrosPedidos
