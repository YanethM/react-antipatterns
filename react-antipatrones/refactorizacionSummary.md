# Refactor: PedidosGodComponent
# Nicolas Jimenez - Juan Jose Gamboa

## Problemas Detectados → Soluciones Aplicadas

### 1. **God Component** (Múltiples responsabilidades)
- **PROBLEMA**: Un componente hace todo (estado, efectos, lógica, UI)
- **IMPACTO**: Código de ~200 líneas, difícil de entender y mantener
- **SOLUCIÓN**: Dividir en hook (`usePedidos`) + subcomponentes presentacionales

---

### 2. **Estado Derivado Duplicado**
- **PROBLEMA**: `contadorPendientes` como estado aparte
- **IMPACTO**: Riesgo de inconsistencia (escalabilidad baja), estado desincronizado
- **SOLUCIÓN**: Calcular con `useMemo` (siempre consistente)

---

### 3. **Cálculos sin Memoización**
- **PROBLEMA**: `pedidosFiltrados` (filter + sort) se recalcula en cada render
- **IMPACTO**: Escalabilidad baja con listas grandes, renders innecesarios
- **SOLUCIÓN**: Memoizar con `useMemo`

---

### 4. **Efectos Secundarios Dispersos**
- **PROBLEMA**: `localStorage`, `document.title`, `setTimeout` en el componente
- **IMPACTO**: Difícil entender dónde ocurren los efectos, mezcla lógica con UI
- **SOLUCIÓN**: Encapsular en el hook `usePedidos`

---

### 5. **Lógica y Presentación Acopladas**
- **PROBLEMA**: Componentes manejan datos, validación y UI juntos
- **IMPACTO**: Baja legibilidad, no reutilizable, difícil testear
- **SOLUCIÓN**: Componentes presentacionales puros (props → UI)

---

### 6. **Múltiples Variables de Entrada**
- **PROBLEMA**: 5 variables de estado para un simple formulario (cliente, total, estado)
- **IMPACTO**: Componente padre más complejo, propenso a errores
- **SOLUCIÓN**: Encapsular estado temporal en `PedidoForm`

---

## Estructura Resultado

```
src/
├── hooks/usePedidos.ts          → Estado + CRUD + Efectos
├── components/
│   ├── PedidosGodComponent.tsx  → Contenedor (orquesta)
│   ├── PedidosSummary.tsx       → Presentacional (totales)
│   ├── PedidoForm.tsx           → Presentacional (formulario)
│   ├── PedidosFilters.tsx       → Presentacional (búsqueda)
│   └── PedidosList.tsx          → Presentacional (tabla)
```

---

## Mejoras

| Métrica | Antes | Después |
|--------|-------|---------|
| Líneas (PedidosGodComponent) | ~200 | ~50 |
| Responsabilidades | God Component | Hook + Presentacionales |
| Testabilidad | Difícil | Fácil (hook aislado) |
| Reutilización | Ninguna | Hook reutilizable |
| Estado derivado | Duplicado | Memoizado |

---

## Documento generado por IA luego de la refactorizacion ##