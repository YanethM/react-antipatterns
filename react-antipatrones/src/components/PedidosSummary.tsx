import React from 'react'

// PROBLEMA: Lógica y presentación acopladas en un mismo componente
// IMPACTO: Difícil testear, reutilizar o cambiar diseño
// SOLUCIÓN: Componente presentacional puro (solo props, sin estado)

type Props = {
    totalCount: number
    pendingCount: number
    totalFacturado: number
}

export default function PedidosSummary({ totalCount, pendingCount, totalFacturado }: Props) {
    return (
        <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
            <h2>Resumen</h2>
            <p>Total pedidos: {totalCount}</p>
            <p>Pedidos pendientes: {pendingCount}</p>
            <p>Total facturado: ${totalFacturado}</p>
        </section>
    )
}
