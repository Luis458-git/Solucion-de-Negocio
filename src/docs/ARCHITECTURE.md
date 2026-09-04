# Arquitectura del proyecto

## Propósito

La aplicación es un MVP frontend de inventario farmacéutico para una práctica de Vibe Coding. La arquitectura debe ser sencilla, comprensible y suficiente para demostrar el problema central: registrar medicamentos y detectar su nivel de stock.

## Stack

| Tecnología | Uso |
|---|---|
| React | Componentes e interfaz. |
| Vite | Desarrollo y build. |
| JavaScript/JSX | Lenguaje del proyecto. No se usa TypeScript. |
| ESLint | Validación estática. |
| CSS/Tailwind | Presentación visual cuando se incorpore la fase de pulido. |
| Skiper UI | Opcional, únicamente en pulido y si aporta valor. |
| GSAP | Opcional, únicamente para animaciones no esenciales después de validar la funcionalidad. |

## Organización

```text
src/
├── app/
├── features/
│   └── inventory/
│       ├── components/
│       ├── hooks/
│       └── utils/
├── pages/
├── shared/
├── styles/
└── docs/
```

`src/docs/` contiene la documentación del proyecto. La lógica del inventario permanece dentro de `src/features/inventory/`. Las páginas componen features y `src/shared/` se reserva para elementos reutilizables.

## Responsabilidades

`useInventory.js` administra la colección y las operaciones de alta, edición y eliminación. `inventoryValidation.js` valida los datos. `inventoryUtils.js` calcula el estado del stock y las métricas derivadas. Los componentes visuales reciben datos y callbacks; no duplican la fuente de verdad.

`InventoryPage.jsx` conecta una única instancia de `useInventory()` con el formulario, la tabla y las métricas. `App.jsx` monta la página cuando corresponda, pero no contiene reglas del inventario. `main.jsx` se limita al punto de entrada de React.

## Estado

El estado mínimo es la colección de medicamentos. El `id`, el estado del stock, las métricas y los resultados de búsqueda deben calcularse o generarse a partir de esa colección. No se deben mantener estados duplicados.

La persistencia local no forma parte del MVP obligatorio. Se podrá evaluar como reto opcional después de cumplir los tres criterios de éxito.

## Reglas de desarrollo

Cada cambio debe implementarse en una sola fase, revisarse y probarse antes de comenzar el siguiente. La IA debe entregar instrucciones y código completo con la ruta del archivo; el equipo humano copia, ejecuta, revisa y decide si acepta el cambio.

No se agregarán backend, autenticación, pagos, ventas, proveedores ni integraciones externas. No se añadirán dependencias sin justificar su necesidad.

## Diseño e interacciones

El flujo funcional se construye antes del pulido visual. Skiper UI y GSAP no deben ocultar errores ni sustituir mensajes de texto. Si se utiliza GSAP, debe integrarse mediante `@gsap/react`, mantenerse separado de la lógica y respetar `prefers-reduced-motion`.

## Definición de terminado

Una fase está terminada cuando sus criterios de aceptación se cumplen, la interfaz funciona en un flujo real, el equipo revisó el resultado y `npm run lint` y `npm run build` no presentan errores.
