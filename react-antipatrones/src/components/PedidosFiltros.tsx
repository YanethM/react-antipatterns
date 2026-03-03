import { ESTILOS } from '../constants'

interface PedidosFiltrosProps {
  textoFiltro: string
  ordenAsc: boolean
  onCambiarTexto: (texto: string) => void
  onCambiarOrden: () => void
}

/**
 * ANTI-PATRÓN RESUELTO: God component → Componente especializado
 * ANTI-PATRÓN RESUELTO: Prop drilling: Props explícitas y claras 
 */
export function PedidosFiltros({
  textoFiltro,
  ordenAsc,
  onCambiarTexto,
  onCambiarOrden,
}: PedidosFiltrosProps) {
  return (
    <section style={ESTILOS.SECCION}>
      <h2>Filtros y orden</h2>

      <input
        placeholder="Buscar por id, cliente o estado"
        value={textoFiltro}
        onChange={(e) => onCambiarTexto(e.target.value)}
        style={ESTILOS.INPUT}
      />

      <button onClick={onCambiarOrden} style={ESTILOS.BOTON}>
        Orden por total: {ordenAsc ? 'ascendente' : 'descendente'}
      </button>
    </section>
  )
}
