## --------------------------------------------------SOLUCIÓN----------------------------------------------------------------

## FormularioPedido.tsx
Al sacar el formulario el componente principal no tiene que gestionar el estado de los inputs de texto, lo cual cumple con el objetivo de separar responsabilidades. Además si en el futuro se quiere cambiar el diseño del formulario, solo se cambia este archivo específico sin afectar la lógica de la tabla y de los filtros. Ahora cuando se escribe en el input de “Cliente”, se renderiza solo el componente de FormularioPedido. Así se separa la capa de presentación, que sería el formulario, de la lógica de negocio que gestiona la lista de pedidos.



## TablaPedido.tsx
Ahora el componente solo afecta  la forma en que se visualiza la lista de pedidos. Al sacar la tabla, se evita tener varias funcionalidades mezcladas en un mismo archivo, así es más fácil implementar cambios de la interfaz sin dañar el contrato de datos con el hook. Además es más fácil reutilizar este componente en otras partes si es necesario. Así se separa la capa de presentación del dominio, y ahora la tabla solo avisa cuando el usuario hace clic en el botón



## EstadisticaPedido.tsx
Al sacar el bloque de estadísticas se cumple con el principio de responsabilidad única, ahora el componente solo afecta el diseño del resumen informativo. Separamos la representación visual del cálculo de los datos. Además, al ser un componente pequeño es más fácil de leer, testear y mantener sin el riesgo de afectar otras funcionalidades como los filtros o el formulario de creación



## Pedido.ts
Se crea una interfaz aparte para manejar el pedido como un tipo, con esto podemos tener una organización por capas ya que el Pedido.ts actúa como el contrato de la capa de dominio lo cual hace que el backend y frontend se comuniquen de manera adecuada sin duplicar código. Además, al moverlo de esta manera se evita el antipatrón de romper el “contrato de clientes” cuando se necesiten realizar cambios en este modelo. Por otro lado también se evita que viole el principio de responsabilidad única, que haría que el componente en el que estaba tenga bloques de código muy largo y que mezcle lógica con definiciones.



## pedidoService.ts
Este archivo funciona como el manual de instrucciones, donde solo se guardan las fórmulas para organizar, filtrar o contar los pedidos sin mezclarlas con los botones o tablas de la pantalla. Lo creamos así para que el sistema esté ordenado por capas y cada parte tenga una tarea única, evitando que el código se vuelva un enredo difícil de entender o arreglar más adelante.



## usePedidos.ts
Este archivo se encarga de recordar los datos y manejar los cambios que ocurren mientras usas la aplicación. Al sacar esta lógica de la interfaz visual, evitamos crear un componente que sea demasiado largo y difícil de leer, lo que ayuda a que el proyecto pueda crecer sin problema

