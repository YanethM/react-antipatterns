import { useCallback } from 'react'

type PedidoFilterProps = {
  filtroTexto: string
  ordenAsc: boolean
  onFiltroChange: (texto: string) => void
  onOrdenToggle: () => void
}

export function PedidoFilter({
  filtroTexto,
  ordenAsc,
  onFiltroChange,
  onOrdenToggle,
}: PedidoFilterProps) {
  const handleFiltroChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onFiltroChange(e.target.value)
    },
    [onFiltroChange]
  )

  return (
    <section className="pedido-filter">
      <h2>Filtros y orden</h2>
      <div className="filter-group">
        <input
          placeholder="Buscar por id, cliente o estado"
          value={filtroTexto}
          onChange={handleFiltroChange}
        />
        <button onClick={onOrdenToggle}>Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}</button>
      </div>
    </section>
  )
}
