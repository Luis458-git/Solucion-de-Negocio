# DESIGN — Sistema de Inventario Farmacéutico

## Propósito visual

La interfaz debe sentirse como una herramienta moderna de trabajo para un encargado de farmacia. El inventario debe ser fácil de escanear, entender y actualizar sin parecer un sistema empresarial complejo.

La pantalla principal será un catálogo visual de medicamentos, no una tabla administrativa como presentación principal.

## Composición principal

La página tendrá esta jerarquía:

```text
Encabezado → métricas → acciones principales → tarjetas → detalle seleccionado
```

El encabezado mostrará el propósito de la página y las acciones disponibles. Las métricas resumirán productos, unidades, stock bajo y agotados. Las tarjetas ocuparán el espacio principal.

## Tarjeta de medicamento

Cada tarjeta debe incluir:

| Elemento | Función |
|---|---|
| Imagen cuadrada o placeholder | Dar identificación visual al producto. |
| Categoría | Contextualizar el medicamento. |
| Nombre | Identificar el producto. |
| Cantidad | Mostrar unidades disponibles. |
| Precio | Mostrar el precio unitario. |
| Estado | Comunicar Normal, Bajo o Agotado. |
| Acciones | Permitir editar y solicitar eliminación. |

La tarjeta completa será seleccionable. Los botones internos no deben abrir el detalle por accidente; deben detener la propagación del clic.

## Detalle seleccionado

Al hacer clic en una tarjeta debe abrirse una tarjeta de detalle tipo modal o panel superpuesto. Debe incluir imagen, nombre, categoría, cantidad, precio, estado, editar, eliminar y cerrar.

El detalle debe poder cerrarse mediante el botón X, la tecla Escape y un clic fuera del contenido. Al abrirlo, el foco y el desplazamiento deben manejarse de forma razonable. El detalle no debe depender de alertas del navegador.

## Eliminación y deshacer

La eliminación utilizará una confirmación propia dentro de la interfaz:

```text
¿Seguro que deseas eliminar este medicamento?
[Cancelar] [Eliminar]
```

Después de confirmar, se mostrará una notificación temporal:

```text
Medicamento eliminado. [Deshacer]
```

`alert()` y `window.confirm()` están prohibidos. La acción Deshacer restaurará el registro eliminado mientras la notificación esté disponible.

## Importación

La importación de CSV o Excel se presentará como una acción principal secundaria. El flujo será:

```text
Seleccionar archivo → leer → validar columnas → vista previa → importar
```

No se deben importar filas silenciosamente. El usuario debe saber cuántas filas son válidas y cuáles tienen errores.

## Estados de interfaz

| Estado | Requisito visual |
|---|---|
| Vacío | Explicar que todavía no hay medicamentos y ofrecer registrar o importar. |
| Normal | Estado verde sobrio con texto. |
| Stock bajo | Estado ámbar con texto de reposición. |
| Agotado | Estado rojo con texto claro y prioridad visual. |
| Error | Mensaje junto al campo o acción que falló. |
| Confirmación | Diálogo propio con Cancelar y acción destructiva. |
| Deshacer | Notificación temporal con botón Deshacer. |
| Importación | Vista previa con filas válidas y errores visibles. |

El color nunca será el único medio de comunicación. Los estados importantes utilizarán texto y, si se incorporan, iconos.

## Responsive

En escritorio se utilizará una cuadrícula de tarjetas. En móvil las tarjetas ocuparán el ancho disponible y el detalle podrá comportarse como un panel inferior o modal adaptado. No se debe exigir desplazamiento horizontal para consultar la información principal.

## Pulido visual

Primero se validará la funcionalidad con clases simples. Después se aplicarán fondo neutro, tarjetas elevadas, bordes redondeados, tipografía legible, espacios consistentes y colores semánticos.

La paleta sugerida es marfil o gris cálido como fondo, superficies claras, verde azulado como color principal, ámbar para stock bajo y rojo controlado para agotados.

## Animaciones

Las animaciones serán cortas y funcionales:

| Momento | Animación |
|---|---|
| Entrada de tarjetas | Opacidad y desplazamiento vertical leve. |
| Hover | Elevación y cambio de sombra moderado. |
| Apertura del detalle | Opacidad del fondo y escala suave del panel. |
| Eliminación | Salida breve de la tarjeta y aparición de Deshacer. |
| Actualización de métricas | Cambio visual sutil sin distraer. |

GSAP se incorporará únicamente después de validar la estructura. Las animaciones deben respetar `prefers-reduced-motion`.

## Skiper UI

Skiper UI es opcional. Se podrá utilizar para una tarjeta, panel o interacción visual concreta si es compatible con JSX y no obliga a reestructurar el proyecto. No se debe incorporar un componente solo por decoración.

## Accesibilidad

Las tarjetas seleccionables deben poder activarse con Enter y Espacio. Los botones deben tener nombres claros. El detalle debe tener `role="dialog"`, `aria-modal="true"` y un título identificable. Los errores deben ser comprensibles sin depender del color.
