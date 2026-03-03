import { useState } from 'react'
import type { Pedido, FormularioPedido } from '../types/Pedido'
import { ESTILOS } from '../constants'

interface PedidosFormularioProps {
  onAgregar: (formulario: FormularioPedido) => { exito: boolean; errores: string[] }
}

/**
 * ANTI-PATRÓN RESUELTO: God component → Componente especializado
 * ANTI-PATRÓN RESUELTO: Callback hell → Manejo claro de eventos
 * ANTI-PATRÓN RESUELTO: Lógica de negocio en componentes → Solo presentación
 */
export function PedidosFormulario({ onAgregar }: PedidosFormularioProps) {
  const [formulario, setFormulario] = useState<FormularioPedido>({
    cliente: '',
    total: '',
    estado: 'pendiente',
  })
  const [errores, setErrores] = useState<string[]>([])

  // ANTI-PATRÓN RESUELTO: Arrow functions inline → funcion extractada
  const limpiarFormulario = () => {
    setFormulario({ cliente: '', total: '', estado: 'pendiente' })
    setErrores([])
  }

  // ANTI-PATRÓN RESUELTO: Callback hell → Uso async/await
  const manejarSubmit = async () => {
    const resultado = onAgregar(formulario)

    if (resultado.exito) {
      limpiarFormulario()
    } else {
      setErrores(resultado.errores)
    }
  }

  return (
    <section style={ESTILOS.SECCION}>
      <h2>Crear pedido</h2>

      {errores.length > 0 && (
        <div style={{ color: 'red', marginBottom: '12px', padding: '8px', backgroundColor: '#fee' }}>
          <ul style={{ margin: 0 }}>
            {errores.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <input
        placeholder="Cliente"
        value={formulario.cliente}
        onChange={(e) => setFormulario({ ...formulario, cliente: e.target.value })}
        style={ESTILOS.INPUT}
      />

      <input
        placeholder="Total"
        value={formulario.total}
        onChange={(e) => setFormulario({ ...formulario, total: e.target.value })}
        style={{ ...ESTILOS.INPUT, marginLeft: 8 }}
      />

      <select
        value={formulario.estado}
        onChange={(e) =>
          setFormulario({ ...formulario, estado: e.target.value as Pedido['estado'] })
        }
        style={ESTILOS.SELECT}
      >
        <option value="pendiente">pendiente</option>
        <option value="pagado">pagado</option>
        <option value="enviado">enviado</option>
      </select>

      <button onClick={manejarSubmit} style={ESTILOS.BOTON}>
        Agregar
      </button>
    </section>
  )
}
