## Antipatrones identificados

### 1. God Component
Un solo componente hacía todo. Cualquier cambio en una parte (por ejemplo, el formulario) obligaba a tocar el mismo archivo que maneja la tabla, el resumen y los filtros.

### 2. Estado derivado innecesario
```ts
// ❌ Antes
const [contadorPendientes, setContadorPendientes] = useState(0)

useEffect(() => {
  setContadorPendientes(pedidos.filter((p) => p.estado === 'pendiente').length)
}, [pedidos])
```
`contadorPendientes` es una consecuencia directa de `pedidos`. Guardarlo en un `useState` generaba un render extra innecesario y riesgo de desincronización.

```ts
// ✅ Después
const contadorPendientes = pedidos.filter((p) => p.estado === 'pendiente').length
```

### 3. Efectos secundarios mezclados en un solo `useEffect`
```ts
// ❌ Antes: tres responsabilidades en un solo efecto
useEffect(() => {
  setPedidos(datosIniciales)
  localStorage.setItem('ultimoAcceso', new Date().toISOString())
  document.title = 'Panel de pedidos'
}, [])
```

```ts
// ✅ Después: cada efecto tiene una sola responsabilidad
useEffect(() => {
  setPedidos(datosIniciales)
  document.title = 'Panel de pedidos'
}, [])

useEffect(() => {
  localStorage.setItem('cantidadPedidos', String(pedidos.length))
  localStorage.setItem('ultimoAcceso', new Date().toISOString())
}, [pedidos])
```

### 4. Estado del formulario en el componente padre
Los campos `nuevoCliente`, `nuevoTotal` y `nuevoEstado` vivían en el componente principal, contaminándolo con detalles internos del formulario. El padre no necesita saber cómo se construye un pedido, solo recibir el resultado final.

### 5. `setState` sin función updater
```ts
// ❌ Antes: puede generar closure stale
setPedidos([...pedidos, nuevoPedido])

// ✅ Después: siempre trabaja sobre el estado más reciente
setPedidos((prev) => [...prev, nuevoPedido])
```

---

## Nueva estructura de archivos

```
src/
  hooks/
    usePedidos.ts           → CRUD de pedidos + localStorage
    useFiltrosPedidos.ts    → filtro de texto y ordenamiento
  components/
    pedidos/
      types.ts              → tipos Pedido y EstadoPedido
      PedidosResumen.tsx    → sección de estadísticas
      PedidosFormulario.tsx → formulario de creación
      PedidosFiltros.tsx    → búsqueda y orden
      PedidosListado.tsx    → tabla con acciones
      PedidosPage.tsx       → orquestador
```

---

## Responsabilidad de cada archivo

### `types.ts`
Define los tipos compartidos `Pedido` y `EstadoPedido`. Al estar en un archivo separado, cualquier componente o hook puede importarlos sin crear dependencias circulares.

### `usePedidos.ts`
Encapsula toda la lógica de negocio: carga inicial, sincronización con `localStorage`, y las operaciones CRUD. Expone los valores derivados `contadorPendientes` y `totalFacturado` calculados al vuelo, sin estado extra.

### `useFiltrosPedidos.ts`
Maneja el estado de UI de filtros (`filtroTexto`, `ordenAsc`) y devuelve `pedidosFiltrados` calculado con `useMemo` para evitar recálculos innecesarios.

### `PedidosFormulario.tsx`
Gestiona su propio estado interno (`cliente`, `total`, `estado`). El componente padre solo interactúa con él a través de la prop `onAgregar`, sin necesidad de conocer los detalles del formulario.

### `PedidosPage.tsx`
Es el único componente que conoce tanto los hooks como los componentes hijos. No tiene lógica propia: su única responsabilidad es conectar el estado con la UI.

