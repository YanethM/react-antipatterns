import React from 'react'

// PROBLEMA: Lógica de filtrado/ordenamiento mezclada con presentación
// IMPACTO: Difícil de reutilizar en otros contextos
// SOLUCIÓN: Componente presentacional que recibe props y callbacks

type Props = {
    filtroTexto: string
    setFiltroTexto: (v: string) => void
    ordenAsc: boolean
    toggleOrden: () => void
}

export default function PedidosFilters({ filtroTexto, setFiltroTexto, ordenAsc, toggleOrden }: Props) {
    return (
        <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
            <h2>Filtros y orden</h2>
            <input
                placeholder="Buscar por id, cliente o estado"
                value={filtroTexto}
                onChange={(e) => setFiltroTexto(e.target.value)}
            />
            <button onClick={toggleOrden} style={{ marginLeft: 8 }}>
                Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}
            </button>
        </section>
    )
}
