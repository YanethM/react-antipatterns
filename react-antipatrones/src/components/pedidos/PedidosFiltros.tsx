type Props = {
  filtroTexto: string
  ordenAsc: boolean
  onFiltroChange: (texto: string) => void
  onToggleOrden: () => void
}

export function PedidosFiltros({ filtroTexto, ordenAsc, onFiltroChange, onToggleOrden }: Props) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Filtros y orden</h2>
      <input
        placeholder="Buscar por id, cliente o estado"
        value={filtroTexto}
        onChange={(e) => onFiltroChange(e.target.value)}
      />
      <button onClick={onToggleOrden} style={{ marginLeft: 8 }}>
        Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}
      </button>
    </section>
  )
}