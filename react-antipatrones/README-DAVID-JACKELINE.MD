### Cambios aplicados

- Separación en componentes pequeños: PedidosResumen, PedidoForm, PedidosFiltroOrden y PedidosTabla.
- Extracción de la lógica a un hook usePedidos:
  - Maneja la lista de pedidos, filtros, orden, contadores y acciones (agregar/eliminar/cambiar).
  - Persiste en localStorage y calcula valores derivados con useMemo.
  - Usa useCallback para estabilizar funciones y evitar renders innecesarios.
- Creación de un hook auxiliar useDocumentTitle para encapsular la gestión del título.
- Eliminación del array datosIniciales; el estado arranca vacío y se lee desde localStorage.
- Eliminación del setTimeout artificial.
