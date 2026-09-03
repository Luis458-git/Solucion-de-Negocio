# AGENTS.md

## Objetivo

Este proyecto es un sistema frontend de inventario para una farmacia comunitaria. El objetivo del asistente es ayudar a construir una aplicación funcional, comprensible, accesible y alineada con `PRD.md`.

## Stack obligatorio

Se utilizarán React, Vite, JavaScript/JSX, Tailwind CSS, shadcn/ui, Lucide React, ESLint, GSAP y `@gsap/react`. No se debe introducir TypeScript en esta etapa.

## Reglas de trabajo

1. Leer `PRD.md`, `ARCHITECTURE.md`, `DESIGN.md` y `PROGRESS.md` antes de modificar el proyecto.
2. Trabajar en una sola fase y con un alcance pequeño por iteración.
3. No implementar una fase nueva hasta que la actual haya sido revisada y validada.
4. No agregar funcionalidades fuera del PRD sin autorización explícita.
5. No implementar backend, autenticación, pagos, ventas, proveedores ni integraciones externas en el MVP.
6. No agregar dependencias sin explicar su necesidad.
7. No cambiar la arquitectura sin justificar el cambio.
8. Mantener la lógica del inventario dentro de `src/features/inventory/`.
9. Mantener la lógica de negocio separada de los componentes visuales.
10. No crear carpetas o archivos innecesarios.
11. No duplicar estados derivados como `stockStatus`, métricas o listas filtradas.
12. Mantener cada componente con una responsabilidad clara.
13. Reutilizar componentes de `shared/` solo cuando exista una necesidad real.
14. Ejecutar ESLint después de cambios importantes.
15. Ejecutar el build antes de considerar terminada una fase.
16. No eliminar código existente sin explicar la razón.
17. Entregar primero un plan de cambios y después el código.
18. Indicar siempre las rutas exactas de los archivos creados o modificados.

## Estado y reglas de negocio

`useInventory.js` debe contener únicamente el estado necesario. Las métricas y la clasificación del stock deben calcularse a partir de los medicamentos existentes. La cantidad debe ser un entero mayor o igual a cero y el precio debe ser un número mayor o igual a cero.

## UI y accesibilidad

Todos los controles deben tener nombres accesibles, estados de foco visibles y navegación por teclado cuando corresponda. Los estados normal, vacío, error, validación, stock bajo y agotado deben poder entenderse sin depender exclusivamente del color o del movimiento.

## Skiper UI y GSAP

Skiper UI se incorporará únicamente cuando un componente aporte valor real a la interfaz. Los componentes gratuitos deben conservar la atribución requerida. Si un componente se entrega en TSX, debe adaptarse cuidadosamente a JSX.

GSAP solo debe controlar presentación y animaciones. No debe contener lógica de negocio ni modificar directamente la fuente de verdad del inventario. Debe utilizar `useGSAP()` y limpiar las animaciones al desmontar. Se debe respetar `prefers-reduced-motion`.

## Ciclo obligatorio de trabajo

El ciclo de cada fase es:

```text
Describe → Genera → Revisa → Prueba → Refina
```

El asistente debe explicar qué hará, generar cambios limitados, esperar la revisión humana, indicar cómo probarlos y corregir únicamente los problemas encontrados.
