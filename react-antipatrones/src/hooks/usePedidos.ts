import { useCallback, useEffect, useReducer } from 'react'

export type Pedido = {
  id: number
  cliente: string
  total: number
  estado: 'pendiente' | 'pagado' | 'enviado'
}

type PedidosState = {
  pedidos: Pedido[]
  filtroTexto: string
  ordenAsc: boolean
}

type PedidosAction =
  | { type: 'CARGAR_PEDIDOS'; payload: Pedido[] }
  | { type: 'AGREGAR_PEDIDO'; payload: Pedido }
  | { type: 'ELIMINAR_PEDIDO'; payload: number }
  | { type: 'CAMBIAR_ESTADO'; payload: { id: number; estado: Pedido['estado'] } }
  | { type: 'SET_FILTRO'; payload: string }
  | { type: 'TOGGLE_ORDEN' }

const initialState: PedidosState = {
  pedidos: [],
  filtroTexto: '',
  ordenAsc: true,
}

function pedidosReducer(state: PedidosState, action: PedidosAction): PedidosState {
  switch (action.type) {
    case 'CARGAR_PEDIDOS':
      return { ...state, pedidos: action.payload }
    case 'AGREGAR_PEDIDO':
      return { ...state, pedidos: [...state.pedidos, action.payload] }
    case 'ELIMINAR_PEDIDO':
      return { ...state, pedidos: state.pedidos.filter((p) => p.id !== action.payload) }
    case 'CAMBIAR_ESTADO':
      return {
        ...state,
        pedidos: state.pedidos.map((p) =>
          p.id === action.payload.id ? { ...p, estado: action.payload.estado } : p
        ),
      }
    case 'SET_FILTRO':
      return { ...state, filtroTexto: action.payload }
    case 'TOGGLE_ORDEN':
      return { ...state, ordenAsc: !state.ordenAsc }
    default:
      return state
  }
}

export function usePedidos(datosIniciales: Pedido[]) {
  const [state, dispatch] = useReducer(pedidosReducer, initialState)

  // Inicializar datos
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({ type: 'CARGAR_PEDIDOS', payload: datosIniciales })
      localStorage.setItem('ultimoAcceso', new Date().toISOString())
      document.title = 'Panel de pedidos'
    }, 300)

    return () => clearTimeout(timeout)
  }, [datosIniciales])

  // Guardar cantidad en localStorage
  useEffect(() => {
    localStorage.setItem('cantidadPedidos', String(state.pedidos.length))
  }, [state.pedidos.length])

  // Pedidos filtrados y ordenados
  const pedidosFiltrados = state.pedidos
    .filter((p) => {
      const texto = state.filtroTexto.toLowerCase()
      return (
        p.cliente.toLowerCase().includes(texto) ||
        p.estado.toLowerCase().includes(texto) ||
        String(p.id).includes(texto)
      )
    })
    .sort((a, b) => {
      if (state.ordenAsc) return a.total - b.total
      return b.total - a.total
    })

  return {
    pedidos: state.pedidos,
    pedidosFiltrados,
    filtroTexto: state.filtroTexto,
    ordenAsc: state.ordenAsc,
    actions: {
      agregarPedido: useCallback((pedido: Pedido) => {
        dispatch({ type: 'AGREGAR_PEDIDO', payload: pedido })
      }, []),
      eliminarPedido: useCallback((id: number) => {
        dispatch({ type: 'ELIMINAR_PEDIDO', payload: id })
      }, []),
      cambiarEstado: useCallback((id: number, estado: Pedido['estado']) => {
        dispatch({ type: 'CAMBIAR_ESTADO', payload: { id, estado } })
      }, []),
      setFiltro: useCallback((texto: string) => {
        dispatch({ type: 'SET_FILTRO', payload: texto })
      }, []),
      toggleOrden: useCallback(() => {
        dispatch({ type: 'TOGGLE_ORDEN' })
      }, []),
    },
  }
}
