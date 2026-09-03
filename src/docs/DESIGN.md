# Diseño del sistema

## Propósito visual

La interfaz debe comunicar rápidamente qué medicamentos existen y cuáles necesitan reposición. El diseño debe ser claro, legible y demostrable en una sesión. La apariencia moderna se logrará mediante jerarquía, espacio, tipografía, contraste y mensajes útiles antes de añadir efectos.

## Usuario

El usuario principal es el encargado de una farmacia pequeña. La pantalla debe permitir registrar un medicamento, consultar la lista y reconocer el estado del stock sin instrucciones complejas.

## Prototipo antes del pulido

La primera versión visual puede utilizar clases CSS sencillas. No se deben introducir Tailwind, shadcn/ui, Skiper UI o GSAP si todavía no está completo el flujo funcional de alta, consulta, edición y eliminación.

## Composición principal

La página debe organizarse en un encabezado, un formulario de registro, una lista o tabla de medicamentos y estados contextuales. Las métricas pueden añadirse después como un dato útil para el negocio, siempre que no distraigan del flujo principal.

## Componentes y estados

| Elemento | Responsabilidad |
|---|---|
| `InventoryForm` | Capturar datos y mostrar validaciones. |
| `InventoryTable` | Mostrar los medicamentos. |
| `InventoryRow` | Mostrar un medicamento y sus acciones. |
| `StockAlert` | Comunicar stock bajo o agotado. |
| `InventoryStats` | Mostrar una métrica útil calculada. |
| `EmptyState` | Explicar qué hacer cuando no hay registros. |
| `ConfirmDialog` | Confirmar acciones destructivas si se incorpora. |

Se deben contemplar los estados normal, vacío, validación, stock bajo, agotado y error. Los estados importantes deben comunicarse con texto e iconos; el color y la animación solo pueden reforzar el mensaje.

## Responsive y accesibilidad

La interfaz debe funcionar en pantallas pequeñas y grandes. Los controles deben tener labels o nombres accesibles, foco visible y navegación por teclado. Los mensajes de error deben aparecer cerca del campo correspondiente. Una tabla móvil puede usar desplazamiento horizontal controlado o una presentación alternativa, pero no debe ocultar las acciones.

## Pulido visual

La fase de pulido se realizará después de cumplir los criterios centrales del PRD. En esa fase se podrá definir una paleta neutra con colores semánticos para el stock, una tipografía legible, espaciado consistente y estados hover, focus, disabled y error.

## Skiper UI

Skiper UI es opcional. Solo se incorporará un componente gratuito si mejora una necesidad concreta, como una tarjeta de resumen o un estado vacío. Antes de integrarlo se revisarán sus dependencias, su compatibilidad con JSX y la atribución requerida.

## GSAP

GSAP es opcional y se utilizará después de validar la interfaz. Podrá animar entradas breves de métricas, alertas o elementos importantes. No debe animar la lógica ni ser necesario para comprender el inventario. Se debe utilizar `useGSAP()`, limpiar las animaciones y respetar `prefers-reduced-motion`.
