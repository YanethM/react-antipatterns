import { useCallback, useEffect, useMemo, useState } from 'react'

export type Pedido = {
    id: number
    cliente: string
    total: number
    estado: 'pendiente' | 'pagado' | 'enviado'
}

const datosIniciales: Pedido[] = [
    { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
    { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
    { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
    { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

export default function usePedidos() {
    const [pedidos, setPedidos] = useState<Pedido[]>([])

    // PROBLEMA: Efectos secundarios mezclados en el componente
    // IMPACTO: Hace el código más difícil de entender (lógica + vista juntas)
    // SOLUCIÓN: Encapsularlos aquí en el hook
    useEffect(() => {
        const timeout = setTimeout(() => {
            setPedidos(datosIniciales)
            localStorage.setItem('ultimoAcceso', new Date().toISOString())
            document.title = 'Panel de pedidos'
        }, 300)

        return () => clearTimeout(timeout)
    }, [])

    useEffect(() => {
        localStorage.setItem('cantidadPedidos', String(pedidos.length))
    }, [pedidos])

    // PROBLEMA: Validación dispersa en el componente
    // IMPACTO: Difícil de reutilizar la lógica, propenso a duplicación
    // SOLUCIÓN: Encapsular CRUD aquí para reutilización
    const agregarPedido = useCallback((cliente: string, total: number, estado: Pedido['estado']) => {
        // Valida entrada antes de agregar (previene datos inválidos)
        if (!cliente.trim() || Number.isNaN(total)) return

        setPedidos((prev) => {
            const siguienteId = prev.length ? Math.max(...prev.map((p) => p.id)) + 1 : 1
            return [...prev, { id: siguienteId, cliente: cliente.trim(), total, estado }]
        })
    }, [])

    const eliminarPedido = useCallback((id: number) => {
        setPedidos((prev) => prev.filter((p) => p.id !== id))
    }, [])

    const cambiarEstado = useCallback((id: number, estado: Pedido['estado']) => {
        setPedidos((prev) => prev.map((p) => (p.id === id ? { ...p, estado } : p)))
    }, [])

    // PROBLEMA: Estado derivado "contadorPendientes" duplicado (riesgo de inconsistencia)
    // IMPACTO: Escalabilidad baja, bugs potenciales si el estado se desincroniza
    // SOLUCIÓN: Calcularlo con useMemo (siempre consistente con pedidos)
    const contadorPendientes = useMemo(() => pedidos.filter((p) => p.estado === 'pendiente').length, [pedidos])

    const totalFacturado = useMemo(() => pedidos.reduce((acc, p) => acc + p.total, 0), [pedidos])

    return {
        pedidos,
        agregarPedido,
        eliminarPedido,
        cambiarEstado,
        contadorPendientes,
        totalFacturado,
    }
}
