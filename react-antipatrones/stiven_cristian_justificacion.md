## Justificacion 

1. se modifica el componente principal por ser god component ya que gestionaba pedidos, controlaba formularios y realizaba filtros 

    se divide en 4 componentes 

2. existian demasiadas variables de estados indenpendientes 

    se agruparon los objetos 

3. uso de useEfect con multiples responsabilidades, cargaban datos, los guarbada en el localStorage y cambiaba el title

    se separo el uso de useEffects 

4. estaba los style unificados en el documento, se podria considerar codigo espagueti

    se separa en un archivo css global

5.  contadorPendientes se calcula pero se guarda en estado. Debería ser un valor derivado.

    Eliminarlo y calcular solo cuando se necesite.
