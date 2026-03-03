import { useState } from 'react'

type EstadoPedido = 'pendiente' | 'pagado' | 'enviado'

interface PedidoFormProps {
    onAgregar: (nuevoPedido: { cliente: string; total: number; estado: EstadoPedido }) => void
}

const PedidoForm = ({ onAgregar }: PedidoFormProps) => {
    const [nuevoCliente, setNuevoCliente] = useState('')
    const [nuevoTotal, setNuevoTotal] = useState('')
    const [nuevoEstado, setNuevoEstado] = useState<EstadoPedido>('pendiente')

    const manejarEnvio = () => {
        if (!nuevoCliente.trim() || !nuevoTotal.trim()) return

        const total = Number(nuevoTotal)
        if (Number.isNaN(total)) return

        onAgregar({
            cliente: nuevoCliente.trim(),
            total,
            estado: nuevoEstado,
        })

        setNuevoCliente('')
        setNuevoTotal('')
        setNuevoEstado('pendiente')
    }

    return (
        <section style={{ marginBottom: 16, padding: 12, border: '1px solid #ddd' }}>
            <h2>Crear pedido</h2>
            <input
                placeholder="Cliente"
                value={nuevoCliente}
                onChange={(e) => setNuevoCliente(e.target.value)}
            />
            <input
                placeholder="Total"
                value={nuevoTotal}
                onChange={(e) => setNuevoTotal(e.target.value)}
                style={{ marginLeft: 8 }}
            />
            <select
                value={nuevoEstado}
                onChange={(e) => setNuevoEstado(e.target.value as EstadoPedido)}
                style={{ marginLeft: 8 }}
            >
                <option value="pendiente">pendiente</option>
                <option value="pagado">pagado</option>
                <option value="enviado">enviado</option>
            </select>
            <button onClick={manejarEnvio} style={{ marginLeft: 8 }}>
                Agregar
            </button>
        </section>
    )
}

export default PedidoForm
