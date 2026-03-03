/**
 * Constantes globales de la aplicación
 * SOLUCIÓN ANTI-PATRÓN: Variables hardcodeadas
 */

import type { Pedido } from './types/Pedido'

// ✅ ANTI-PATRÓN RESUELTO: Variables hardcodeadas → Constantes nombradas
export const DATOS_INICIALES: Pedido[] = [
  { id: 1, cliente: 'Ana', total: 120, estado: 'pendiente' },
  { id: 2, cliente: 'Luis', total: 340, estado: 'pagado' },
  { id: 3, cliente: 'Carla', total: 80, estado: 'enviado' },
  { id: 4, cliente: 'Diego', total: 560, estado: 'pendiente' },
]

// Tiempos
export const INIT_DELAY_MS = Number(import.meta.env.VITE_INIT_DELAY_MS || 300)

// LocalStorage keys
export const STORAGE_KEYS = {
  ULTIMO_ACCESO: 'ultimoAcceso',
  CANTIDAD_PEDIDOS: 'cantidadPedidos',
  PEDIDOS: 'pedidos',
} as const

// Validaciones
export const VALIDACIONES = {
  CLIENTE_MIN_LENGTH: 2,
  TOTAL_MIN: 0,
  TOTAL_MAX: 1000000,
} as const

// Títulos y textos
export const TEXTOS = {
  TITULO_PRINCIPAL: 'Panel de Pedidos',
  PLACEHOLDER_BUSCAR: 'Buscar por id, cliente o estado',
  PLACEHOLDER_CLIENTE: 'Cliente',
  PLACEHOLDER_TOTAL: 'Total',
  NO_HAY_PEDIDOS: 'No hay pedidos',
  Sin_ERRORES: 'Sin errores',
} as const

// Estilos reutilizables (evitar estilos inline)
export const ESTILOS = {
  CONTAINER_PRINCIPAL: {
    maxWidth: 950,
    margin: '0 auto',
    fontFamily: 'sans-serif',
  } as const,
  SECCION: {
    marginBottom: 16,
    padding: 12,
    border: '1px solid #ddd',
  } as const,
  INPUT: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  } as const,
  BOTON: {
    padding: '8px 16px',
    marginLeft: 8,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  } as const,
  SELECT: {
    marginLeft: 8,
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '14px',
  } as const,
} as const

// Estados de carga
export const ESTADOS_CARGA = {
  IDLE: 'idle',
  CARGANDO: 'cargando',
  EXITOSO: 'exitoso',
  ERROR: 'error',
} as const
