import React, { useState } from 'react'
import type { Pedido } from '../hooks/usePedidos'

// PROBLEMA: Múltiples inputs de estado (nuevoCliente, nuevoTotal, nuevoEstado) en el componente padre
// IMPACTO: Más variables, más complejo de mantener
// SOLUCIÓN: Encapsular el estado temporal del formulario en este componente

type Props = {
    onAdd: (cliente: string, total: number, estado: Pedido['estado']) => void
}

export default function PedidoForm({ onAdd }: Props) {
    // Estado local temporal del formulario (no necesita persistencia)
    const [cliente, setCliente] = useState('')
    const [total, setTotal] = useState('')
    const [estado, setEstado] = useState<Pedido['estado']>('pendiente')

    // Validación dentro del componente: es responsabilidad del formulario
    // Conversión de string a number: localiza el parseo en un lugar
    const handleAdd = () => {
        const nTotal = Number(total)
        if (!cliente.trim() || Number.isNaN(nTotal)) return
        onAdd(cliente.trim(), nTotal, estado)
        setCliente('')
        setTotal('')
        setEstado('pendiente')
    }

    return (
        <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
            <h2>Crear pedido</h2>
            <input placeholder="Cliente" value={cliente} onChange={(e) => setCliente(e.target.value)} />
            <input
                placeholder="Total"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                style={{ marginLeft: 8 }}
            />
            <select value={estado} onChange={(e) => setEstado(e.target.value as Pedido['estado'])} style={{ marginLeft: 8 }}>
                <option value="pendiente">pendiente</option>
                <option value="pagado">pagado</option>
                <option value="enviado">enviado</option>
            </select>
            <button onClick={handleAdd} style={{ marginLeft: 8 }}>
                Agregar
            </button>
        </section>
    )
}
