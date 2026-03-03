## Integrantes Sofía - Natalia Gallego

# Justificación de la solución 

1. God Component

    * Qué es: un componente que hace “de todo”: renderiza interfaz, maneja estados, contiene reglas de negocio, ejecuta efectos y coordina acciones.

    * Por qué afecta:
        * Mantenibilidad: cualquier cambio pequeño obliga a tocar un archivo grande y frágil.
        * Escalabilidad: al crecer requisitos, el componente crece en complejidad de forma no lineal.
        * Legibilidad: cuesta entender rápidamente responsabilidades y flujo.

    * Cómo se corrigió: se dejó el componente principal solo como orquestador y se dividió la UI en subcomponentes (Resumen, Formulario, Filtros, Listado), cada uno con una responsabilidad concreta.


2. Lógica en componente (UI + negocio mezclados)

    * Qué es: cálculos, validaciones y operaciones de dominio viviendo dentro del componente visual.

    * Por qué afecta:
        * Mantenibilidad: la lógica queda acoplada al render, difícil de modificar sin romper UI.
        * Escalabilidad: reutilizar esa lógica en otra pantalla exige copiar/pegar.
        * Legibilidad: el JSX se vuelve extenso y mezcla “qué se muestra” con “cómo funciona”.

    * Cómo se corrigió: se extrajo la lógica a un custom hook (usePedidos) que centraliza estado, acciones y reglas; la vista solo consume datos/eventos.


3. useEffect mal usado (estado derivado en efecto)

    * Qué es: usar useEffect + setState para valores que se pueden derivar directamente de otro estado.

    * Por qué afecta:
        * Mantenibilidad: introduces más estados a sincronizar manualmente.
        * Escalabilidad: aumentan casos borde y dependencias difíciles de razonar.
        * Legibilidad: el flujo mental se complica (“¿de dónde sale este dato y cuándo se actualiza?”).

    * Cómo se corrigió: el contador de pendientes pasó de estado explícito a valor derivado memoizado (useMemo), eliminando sincronización extra.


4. Código espagueti (responsabilidades cruzadas)

    * Qué es: código donde dominio, estado, efectos y presentación están entrelazados sin capas claras.

    * Por qué afecta:
        * Mantenibilidad: cambios en una parte impactan otras sin límites claros.
        * Escalabilidad: el sistema no admite crecimiento modular.
        * Legibilidad: cuesta ubicar rápidamente “dónde vive” cada cosa.

    * Cómo se corrigió: se separaron capas internas:
        * Tipos/dominio (contratos de datos),
        * Lógica de comportamiento (hook),
        * Presentación (componentes visuales).


5. Re-renders/cómputo innecesario (parcial)

    * Qué es: recalcular filtros, orden y agregados en cada render aunque sus dependencias no cambien.

    * Por qué afecta:
        * Escalabilidad: con más datos el costo de render sube.
        * Mantenibilidad: aparece la tentación de micro-optimizaciones desordenadas.
        * Legibilidad: no queda explícito qué cálculos dependen de qué estado.

    * Cómo se corrigió: se memoizaron cálculos derivados (filtrado+orden, pendientes, total facturado) para que solo se recalculen cuando cambian sus entradas reales.