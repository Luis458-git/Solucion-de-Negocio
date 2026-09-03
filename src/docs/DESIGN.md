# Diseño del sistema

## Principio general

La interfaz debe priorizar claridad operativa, lectura rápida y consistencia. El sistema debe sentirse moderno por su jerarquía, tipografía, espacio, interacción y calidad del feedback, no por acumular efectos.

## Identidad visual

La identidad inicial será la de una herramienta confiable, limpia y profesional para uso interno de una farmacia comunitaria. No se copiará la identidad visual de una marca comercial sin autorización. La interfaz debe transmitir orden, disponibilidad de información y respuesta clara ante problemas de stock.

## Tipografía

Se utilizará una tipografía sans-serif legible. Los títulos deben establecer jerarquía sin ocupar más espacio del necesario. Las cifras de métricas deben tener suficiente contraste y tamaño para consultarse rápidamente.

## Colores

La paleta debe utilizar un fondo neutro, superficies claras u oscuras coherentes, un color principal para acciones y colores semánticos para estados. El stock agotado no debe comunicarse únicamente con rojo; debe incluir texto e icono. El contraste debe mantenerse en estados normales, hover, focus, error y disabled.

## Espaciado y composición

La pantalla principal debe seguir una composición de encabezado, métricas, acciones, filtros, tabla y estados contextuales. El espaciado debe ser consistente y adaptarse a pantallas pequeñas. No se debe imponer una barra lateral, un conjunto de KPI o una tabla si el flujo real no lo necesita.

## Componentes

| Componente | Criterio visual |
|---|---|
| Header | Debe indicar el nombre de la pantalla y la acción principal. |
| InventoryStats | Tarjetas compactas, legibles y con valor semántico. |
| InventoryForm | Campos agrupados por relación, labels visibles y mensajes junto al error. |
| InventoryTable | Lectura clara, acciones identificables y adaptación para pantallas estrechas. |
| StockAlert | Estado comprensible por texto, color e icono. |
| Button | Jerarquía entre acción principal, secundaria y destructiva. |
| ConfirmDialog | Debe explicar la consecuencia y ofrecer cancelar como salida clara. |
| EmptyState | Debe indicar por qué está vacío y cuál es la siguiente acción. |

## Estados

La aplicación debe diseñarse para los estados normal, vacío, stock bajo, agotado, error y validación. Los estados deben existir en el diseño antes de incorporar transiciones.

## Responsive

La experiencia debe diseñarse primero para pantallas pequeñas y ampliarse mediante breakpoints. En móvil, la tabla puede requerir desplazamiento horizontal controlado o una presentación alternativa por tarjetas, sin ocultar acciones importantes.

## Accesibilidad

Todos los controles deben tener etiquetas o nombres accesibles. El foco debe ser visible. Las acciones deben poder utilizarse con teclado. Los mensajes de error deben asociarse con sus campos. Los cambios de estado importantes deben comunicarse mediante texto y, cuando corresponda, `role="status"` o `aria-live`.

## Animaciones

Las animaciones se añadirán después de validar el flujo funcional. Deben comunicar entrada, cambio de estado, navegación o feedback. Se preferirán transformaciones y opacidad, con duraciones breves y easing consistente. No se deben animar constantemente las tablas ni los filtros.

## Skiper UI

Se podrá utilizar un componente gratuito de Skiper UI para una tarjeta de resumen, una transición visual o un estado vacío si mejora la interfaz. El componente se adaptará a la paleta del proyecto y se conservará la atribución exigida por su licencia. No se incorporarán componentes únicamente por estar de moda.

## GSAP

GSAP se utilizará para animaciones que requieran control preciso, como la entrada de métricas, alertas o filas. Se utilizará `@gsap/react` y `useGSAP()` para gestionar el ciclo de vida. No se debe controlar el mismo elemento con GSAP y Framer Motion simultáneamente.
