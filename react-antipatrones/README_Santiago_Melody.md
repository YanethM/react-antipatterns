# Refactorización de Anti-Patrones

Este actividad resuelve **los anti-patrones** encontrados en React, transformando un "God Component" monolítico en una arquitectura modular, mantenible y escalable.

**Resultado:**
- Arquitectura escalable y modular
- Mejor rendimiento (re-renders optimizados)
- Mejor testabilidad (servicios y hooks independientes)
- Mejor mantenibilidad (responsabilidades claras)


## Anti-Patrones Detectados y Solucionados

### 1. **God Component**
**Problema:** Un único componente hacía TODO: state, lógica de negocio, filtrado, rendering.

**Solución:**
- Separación en **5 componentes especializados**:
  - `PedidosGodComponent.tsx` - Componente Central
  - `PedidosResumen.tsx` - Componente para el resumen
  - `PedidosFormulario.tsx` - Formulario de creación
  - `PedidosFiltros.tsx` - Filtros y ordenamiento
  - `PedidosTabla.tsx` - Listado

**Archivos:**
- [src/components/PedidosGodComponent.tsx](src/components/PedidosGodComponent.tsx) (refactorizado como centro)
- [src/components/PedidosResumen.tsx](src/components/PedidosResumen.tsx)
- [src/components/PedidosFormulario.tsx](src/components/PedidosFormulario.tsx)
- [src/components/PedidosFiltros.tsx](src/components/PedidosFiltros.tsx)
- [src/components/PedidosTabla.tsx](src/components/PedidosTabla.tsx)

---

### 2. **Código Espaguetti**
**Problema:** Lógica de filtrado, ordenamiento y validación mezclada en el componente.

**Solución:**
- Servicio `PedidosService` con métodos claros y reutilizables
- Cada operación en su propia función
- Fácil de testear y reutilizar

**Archivo:** [src/services/pedidosService.ts](src/services/pedidosService.ts)

### 3. **Callback Hell**
**Problema:** Funciones flecha anónimas inline creadas en cada render.

**Solución:**
- `useCallback` en componentes/hooks para memorizar funciones
- Funciones claras y concisas 
- Manejadores claros en los componentes

**Archivos:** [src/hooks/usePedidos.ts](src/hooks/usePedidos.ts), 
[src/hooks/useFilters.ts](src/hooks/useFilters.ts)


### 4. **God Object / God Service**
**Problema:** Un único servicio hace múltiples responsabilidades.

**Solución:**
- `PedidosService` - Lógica de negocio de pedidos
- `StorageService` - Operaciones de localStorage
- Cada servicio tiene UNA responsabilidad clara

**Servicios creados:**
- [src/services/pedidosService.ts](src/services/pedidosService.ts) - Validación, filtrado, ordenamiento
- [src/services/storageService.ts](src/services/storageService.ts) - Persistencia de datos

### 5. **No Manejar Errores Async**
**Problema:** Operaciones asíncronas sin try-catch.

**Solución:**
- Try-catch en todas las operaciones async
- Retorno de objeto con `{ exito, error?` 

**Archivo:** [src/services/storageService.ts](src/services/storageService.ts)

### 6. **Prop Drilling Excesivo**
**Problema:** Muchos props pasados a través de múltiples niveles.

**Solución:**
- Hooks personalizados (`usePedidos`, `useFiltros`) que encapsulan state
- Props explícitas y claras (solo lo necesario)


### 7. **Lógica de Negocio en Componentes**
**Problema:** Validación, filtrado y cálculos dentro del componente.

**Solución:**
- Servicios puros en `PedidosService`
- Hooks que usan servicios
- Componentes solo renderean UI

**Separación:**

| Responsabilidad | Ubicación |
|---|---|
| Lógica de negocio | `src/services/pedidosService.ts` |
| Gestión de state | `src/hooks/usePedidos.ts`, `src/hooks/useFilters.ts` |
| UI y presentación | Componentes en `src/components/` |

### 8. **Re-Renders Innecesarios**
**Problema:** Componentes re-renderean sin necesidad.

**Solución:**
- `useMemo` para valores derivados (totalFacturado, contadorPendientes)
- `useCallback` para funciones memorizadas
- `memo()` wrapper en componentes puros (PedidosTabla, FilaPedido)
`

**Archivos:** [src/hooks/usePedidos.ts](src/hooks/usePedidos.ts), [src/components/PedidosTabla.tsx](src/components/PedidosTabla.tsx)


### 9. **useEffect Mal Usado**
**Problema:** 
- Múltiples useEffect haciendo múltiples cosas
- Lógica compleja en efectos


**Solución:**
- Un useEffect enfocado en inicialización
- useMemo en lugar de useEffect
- Lógica clara y separada


**Archivo:** [src/hooks/usePedidos.ts](src/hooks/usePedidos.ts)
