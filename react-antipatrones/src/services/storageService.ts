/**
 * ANTI-PATRÓN RESUELTO: No manejar errores async
 * Todas las operaciones de storage tienen try-catch
 */
class StorageService {
  
  guardar<T>(clave: string, datos: T): { exito: boolean; error?: string } {
    try {
      const serializado = JSON.stringify(datos)
      localStorage.setItem(clave, serializado)
      return { exito: true }
    } catch (error) {
      let codigo = 500
      if (error instanceof Error) {
        if (error.name === 'QuotaExceededError') codigo = 413
        else if (error.name === 'TypeError') codigo = 400
        else if (error.name === 'SecurityError') codigo = 503
      }
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido'
      console.error(`[${codigo}] Error guardando en storage (${clave}):`, error)
      return { exito: false, error: `[${codigo}] ${mensajeError}` }
    }
  }

  obtener<T>(clave: string, porDefecto?: T): { datos?: T; error?: string } {
    try {
      const item = localStorage.getItem(clave)
      if (!item) {
        return { datos: porDefecto }
      }
      const datos = JSON.parse(item) as T
      return { datos }
    } catch (error) {
      let codigo = 500
      if (error instanceof Error) {
        if (error.name === 'SyntaxError') codigo = 400
        else if (error.name === 'SecurityError') codigo = 503
      }
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido'
      console.error(`[${codigo}] Error obteniendo de storage (${clave}):`, error)
      return { datos: porDefecto, error: `[${codigo}] ${mensajeError}` }
    }
  }

  eliminar(clave: string): { exito: boolean; error?: string } {
    try {
      localStorage.removeItem(clave)
      return { exito: true }
    } catch (error) {
      let codigo = 500
      if (error instanceof Error && error.name === 'SecurityError') codigo = 503
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido'
      console.error(`[${codigo}] Error eliminando de storage (${clave}):`, error)
      return { exito: false, error: `[${codigo}] ${mensajeError}` }
    }
  }

  limpiar(): { exito: boolean; error?: string } {
    try {
      localStorage.clear()
      return { exito: true }
    } catch (error) {
      let codigo = 500
      if (error instanceof Error && error.name === 'SecurityError') codigo = 503
      const mensajeError = error instanceof Error ? error.message : 'Error desconocido'
      console.error(`[${codigo}] Error limpiando storage:`, error)
      return { exito: false, error: `[${codigo}] ${mensajeError}` }
    }
  }
}

export const storageService = new StorageService()
