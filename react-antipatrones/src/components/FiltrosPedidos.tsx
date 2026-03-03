import { memo } from 'react'

interface Props {
  filtros: {
    filtroTexto: string
    setFiltroTexto: (t: string) => void
    ordenAsc: boolean
    setOrdenAsc: (o: boolean) => void
  }
}

export const FiltrosPedidos = memo(function FiltrosPedidos({ filtros }: Props) {
  return (
    <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
      <h2>Filtros y orden</h2>
      <input
        placeholder="Buscar..."
        value={filtros.filtroTexto}
        onChange={(e) => filtros.setFiltroTexto(e.target.value)}
      />
      <button onClick={() => filtros.setOrdenAsc(!filtros.ordenAsc)} style={{ marginLeft: 8 }}>
        Orden: {filtros.ordenAsc ? 'ascendente' : 'descendente'}
      </button>
    </section>
  )
})