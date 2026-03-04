# Respuesta — Identificación y corrección de antipatrones

## 1. Antipatrones identificados en `PedidosGodComponent.tsx`

### 1.1 God Component

Uno de los principales problemas que encontramos en este código fue primordialmente el antipatrón de **God Component**, dado que en este caso se tiene una delegación de todo el flujo de la aplicación en un solo componente en donde podíamos observar operaciones de:

- Carga de datos inicial con una simulación de un fetch.
- Manejo de CRUD completo en este único componente en donde se leían, creaban, actualizaban y eliminaban pedidos.
- Lógica de filtrado y ordenamiento para los pedidos de este sistema.
- Renderizado de 4 secciones diferentes de UI dentro de este componente, los cuales claramente se pueden y deberían trabajar en componentes separados para hacerlos más reutilizables y testeables.

Para el caso del antipatrón de God Component nos encontramos con los siguientes impactos:

**Impacto en mantenibilidad:** En este se tiene un gran impacto dado que manejar toda la funcionalidad de la aplicación en un solo lugar centralizado hace que un error en uno de los procesos termine por colapsar todos los procesos que se tienen dentro de la aplicación.

**Impacto en escalabilidad:** Dado que todo en la aplicación está centralizado en un solo componente, a medida que la aplicación va en aumento y se van agregando más funcionalidades, este terminará creciendo sin límite, lo que lo convertiría a gran escala en un componente casi imposible de mantener y de entender, reduciendo la posibilidad de realizar un testeo dado que se va a componer de demasiadas funcionalidades.

**Impacto en legibilidad:** Al ser un componente con demasiadas líneas que mezclan distintas lógicas de la aplicación, como lógica de negocio y manejo y carga de datos, esto hace que el código se vuelva cada vez menos legible y de difícil seguimiento, dada la gran cantidad de procesos que este estaría llevando a cabo.

---

### 1.2 `useEffect` mal usado

Otro de los problemas identificados en este componente fue el antipatrón de **useEffect mal usado**, dado que se está utilizando un efecto para mantener sincronizado un estado que realmente es un valor derivado y que podría calcularse directamente a partir del estado principal `pedidos`.

En este caso podemos observar que:

- Se define un estado adicional llamado `contadorPendientes`.
- Se utiliza un `useEffect` que se ejecuta cada vez que cambia `pedidos`.
- Dentro del efecto se filtran los pedidos para calcular la cantidad de pendientes.
- Se ejecuta `setContadorPendientes`, generando un nuevo render innecesario.
- Se introduce una sincronización manual entre dos estados que en realidad no deberían estar separados.

Este enfoque agrega complejidad accidental, ya que `contadorPendientes` no es una fuente de verdad independiente sino simplemente un cálculo basado en otro estado.

**Impacto en mantenibilidad:** Al mantener estados sincronizados manualmente se incrementa el riesgo de inconsistencias futuras. Si en algún momento se modifica la lógica del efecto o se agregan condiciones adicionales, el contador podría desincronizarse del estado real de los pedidos.

**Impacto en escalabilidad:** Si se comienza a aplicar este mismo patrón para otros valores derivados (totales, métricas, filtros, etc.), el componente se llenará de efectos innecesarios, complicando el flujo de actualización y dificultando su mantenimiento.

**Impacto en legibilidad:** El desarrollador debe analizar por qué existe un estado adicional cuando podría resolverse con una simple variable calculada dentro del render, lo que hace el código menos intuitivo.

---

### 1.3 Lógica en componente

También identificamos el antipatrón de **Lógica en componente**, ya que el componente no solo se encarga de renderizar la interfaz, sino que también concentra lógica de negocio y efectos secundarios que deberían estar desacoplados.

En este componente se puede observar que:

- Se simula la carga inicial de datos con `setTimeout`.
- Se manipula directamente `localStorage`.
- Se modifica el `document.title`.
- Se ejecutan operaciones relacionadas con la gestión de pedidos (filtrar, agregar, eliminar, actualizar estado).
- Se calculan métricas del sistema.

Todo esto se encuentra dentro del mismo archivo y función principal del componente, lo que implica que la capa de presentación está directamente acoplada a la lógica de negocio y a efectos externos.

**Impacto en mantenibilidad:** Al estar la lógica de negocio acoplada al componente visual, cualquier modificación en las reglas del sistema obliga a intervenir directamente el componente, aumentando el riesgo de afectar el renderizado.

**Impacto en escalabilidad:** Si se requiere reutilizar la lógica de pedidos en otra vista o módulo de la aplicación, no será posible sin duplicar código o realizar refactorizaciones profundas.

**Impacto en legibilidad:** El componente pierde claridad en su propósito principal, ya que mezcla responsabilidades de presentación con responsabilidades de negocio, dificultando su comprensión rápida.

---

### 1.4 Sin manejo de errores

En este caso se identifica el antipatrón de **Sin manejo de errores**, dado que cuando el usuario ingresa datos inválidos en el formulario:

- La función simplemente ejecuta un `return`.
- No se muestra ningún mensaje de error.
- No se informa qué campo es incorrecto.
- No se maneja ningún estado de error.

**Impacto en mantenibilidad:** No existe una estructura clara para gestionar errores, lo que dificulta ampliar las validaciones en el futuro.

**Impacto en escalabilidad:** Si el formulario crece en complejidad, la ausencia de un sistema de manejo de errores hará que la lógica se vuelva desordenada.

**Impacto en legibilidad:** El flujo de ejecución no deja explícito qué ocurre cuando hay un error, generando ambigüedad en el comportamiento del sistema.

---

### 1.5 Código espagueti

Finalmente, se puede identificar una tendencia hacia el antipatrón de **Código espagueti**, debido a la mezcla constante entre lógica, estructura y estilos dentro del mismo componente.

En este componente se observa que:

- Se combinan estructuras de presentación con lógica condicional.
- No existe separación clara entre diseño visual y comportamiento.
- El JSX comienza a crecer en extensión y complejidad visual.

Esta mezcla de responsabilidades dentro del mismo bloque de código reduce la claridad estructural del componente.

**Impacto en mantenibilidad:** Cualquier cambio visual requiere modificar directamente el componente principal, aumentando el riesgo de afectar otras partes del código.

**Impacto en escalabilidad:** No se facilita la reutilización de estilos ni la construcción de una identidad visual consistente a medida que la aplicación crece.

**Impacto en legibilidad:** El componente se vuelve visualmente saturado, dificultando distinguir rápidamente qué parte corresponde a lógica y cuál corresponde a presentación.


## 2. Refactorización propuesta

Se descompuso el God Component en una arquitectura modular siguiendo el **principio de responsabilidad única**:

### 2.1 Cambios realizados y justificación
El punto de partida fue un componente que hacía demasiado: cargaba datos, manejaba
formularios, calculaba resúmenes, filtraba listas y además pintaba toda la interfaz,
todo en un mismo lugar. Eso no está mal cuando el proyecto es muy pequeño, pero se
convierte en un problema real en cuanto el código crece o llega alguien nuevo al equipo.
La refactorización buscó distribuir esas responsabilidades de forma que cada pieza del
código tenga un único propósito claro.

### Separar los tipos en su propio archivo

Lo primero fue sacar las definiciones de tipos (como qué es un Pedido y qué estados
puede tener) a un archivo independiente. La razón es sencilla: esos tipos los necesita
más de un archivo, y si están definidos en un solo lugar, cualquier cambio futuro se
hace una sola vez. Evita tener que buscar en varios archivos si algo cambia.

### Crear hooks personalizados

En lugar de dejar toda la lógica dentro del componente, se crearon dos hooks: uno que
maneja todo lo relacionado con los pedidos (crearlos, actualizarlos, eliminarlos, guardar
en localStorage) y otro que maneja exclusivamente el filtrado y el ordenamiento. La idea
detrás de esto es que la lógica de negocio no debería mezclarse con la parte visual. Si
mañana cambia la forma en que se filtran los pedidos, solo hay que tocar ese hook, sin
riesgo de romper el formulario o el resumen.

### Eliminar el estado innecesario con `useEffect`

Este fue uno de los cambios más importantes. Antes había una variable llamada
`contadorPendientes` que guardaba cuántos pedidos estaban en estado "pendiente". El
problema es que ese número no necesita guardarse en ningún lado: se puede calcular
directamente mirando la lista de pedidos en cualquier momento. Sin embargo, estaba
almacenada como estado, y cada vez que la lista de pedidos cambiaba, un efecto secundario
actualizaba ese contador, lo que hacía que el componente se renderizara dos veces seguidas
sin ningún motivo. La solución fue reemplazarlo por un `useMemo`, que simplemente calcula
el valor cuando la lista cambia, sin generar ese render extra ni correr el riesgo de que
el contador quede desactualizado.

### Separar los `useEffect` por responsabilidad

Antes había un efecto que hacía tres cosas a la vez: cargaba los datos iniciales, guardaba
la fecha de acceso en localStorage y cambiaba el título de la pestaña del navegador.
Aunque funciona, mezclar todo eso en un mismo lugar hace que sea difícil modificar una
cosa sin tocar las otras. La refactorización separó esas responsabilidades en efectos
distintos, cada uno con un único propósito. Así, si en el futuro se reemplaza la carga de
datos con una llamada real a una API, ese cambio está bien contenido.

### Dividir la interfaz en componentes más pequeños

La pantalla completa se dividió en componentes independientes: uno para el resumen de
métricas, uno para el formulario de creación, uno para los filtros y uno para el listado
de pedidos. Cada uno recibe exactamente los datos que necesita y no sabe nada de los
demás. Esto facilita entender qué hace cada sección con solo mirarla, y también hace más
fácil realizar pruebas sobre cada parte por separado.

### Validación con mensajes de error visibles

Antes, si el usuario dejaba el formulario incompleto o ponía un valor inválido, simplemente
no pasaba nada: el formulario no se enviaba pero tampoco aparecía ninguna explicación. Eso
es confuso para quien usa la aplicación. Ahora el componente del formulario muestra mensajes
concretos debajo de cada campo cuando algo está mal, como "El nombre del cliente es
obligatorio" o "El total debe ser un número válido y no negativo". Es un cambio pequeño
pero que mejora mucho la experiencia de uso.

### El componente orquestador

Finalmente, se creó un componente llamado `PanelPedidos` que actúa como el punto de entrada
de toda esta sección. Su trabajo es conectar los hooks con los componentes visuales, pero
sin contener lógica de negocio propia.

### 2.2 Corrección del antipatrón de `useEffect`

**Antes:**
```tsx
const [contadorPendientes, setContadorPendientes] = useState(0)

useEffect(() => {
  setContadorPendientes(pedidos.filter((p) => p.estado === 'pendiente').length)
}, [pedidos])
```

**Corregido:**
```tsx
const contadorPendientes = useMemo(
  () => pedidos.filter((p) => p.estado === 'pendiente').length,
  [pedidos]
)
```

Esto elimina un render extra innecesario y simplifica la lógica.

### 2.3 Mejora en manejo de errores del formulario

**Antes:** La función `agregarPedido` simplemente hacía `return` sin informar al usuario.

**Corregido:** El componente `FormularioPedido` muestra mensajes de error claros:
- "El nombre del cliente es obligatorio."
- "El total es obligatorio."
- "El total debe ser un número válido y no negativo."
