# Ejercicio: Identificación de problemas de diseño
# Presentado por
## Luis Miguel Henao y Mariana López

Proyecto base en React + TypeScript para práctica de análisis de código.

## Requisitos

- Node.js 20 o superior
- npm

## Cómo ejecutar

1. Instalar dependencias:

```bash
npm install
```

2. Iniciar el proyecto en modo desarrollo:

```bash
npm run dev
```

3. Abrir en el navegador la URL que aparece en terminal (normalmente `http://localhost:5173`).

## Qué hace este proyecto

Muestra una interfaz de gestión de pedidos con operaciones de listado, creación, filtrado, orden y cambio de estado.

## Qué deben hacer los estudiantes

- Revisar el código del componente principal de la interfaz.
- Identificar problemas de diseño en la implementación.
    ### El componente tiene demasiadas responsabilidades concentradas en un solo lugar, no tiene responsabilidad única. El CRUD completo de pedidos está en un solo componente, los filtros deberían estar en un hook separado, se deben crear hooks adicionales por cada funcionalidad del CRUD para mejorar la escalabilidad, tampoco hay una estructura definida, se declaran tipos en los componentes y no en un archivo de contantes (por ejemplo el tipo Pedido)
- Justificar por qué esos problemas afectan mantenibilidad, escalabilidad o legibilidad.
    ### Esto afecta la mantenibilidad porque cualquier cambio en la lógica de pedidos puede afectar a toda la interfaz, lo que aumenta el riesgo de introducir errores. Afecta la escalabilidad porque a medida que se agregan más funcionalidades, el componente se volverá cada vez más difícil de manejar. 
    
    
    ### Afecta la legibilidad porque el código se vuelve más difícil de entender y seguir, especialmente para alguien nuevo que quiera ingresar al proyecto o para aquellos que no están familiarizados con el proyecto.
- Proponer una refactorización sin cambiar el comportamiento funcional visible.
