# ARCHITECTURE — Sistema de Inventario Farmacéutico

## Propósito

La aplicación es un MVP frontend de inventario para una farmacia pequeña. La arquitectura debe permitir avanzar desde un prototipo funcional hasta una interfaz visual de tarjetas sin duplicar la lógica ni introducir complejidad empresarial.

## Stack

| Tecnología | Uso |
|---|---|
| React | Componentes, estado e interacción. |
| Vite | Desarrollo y build. |
| JavaScript/JSX | Lenguaje del proyecto. |
| ESLint | Validación estática. |
| CSS | Presentación visual inicial y responsive. |
| Skiper UI | Opcional para componentes visuales concretos. |
| GSAP | Opcional para transiciones no esenciales. |
| `xlsx` | Dependencia prevista para leer archivos Excel durante la fase de importación. |

## Organización

```text
src/
├── app/
├── features/
│   └── inventory/
│       ├── components/
│       │   ├── InventoryCard.jsx
│       │   ├── InventoryDetail.jsx
│       │   ├── InventoryForm.jsx
│       │   ├── InventoryStats.jsx
│       │   └── InventoryTable.jsx
│       ├── hooks/
│       │   └── useInventory.js
│       └── utils/
│           ├── inventoryUtils.js
│           └── inventoryValidation.js
├── pages/
│   └── InventoryPage.jsx
├── shared/
├── styles/
└── docs/
```

`src/docs/` contiene la documentación. La lógica del inventario permanece dentro de `src/features/inventory/`. Las páginas componen la feature y `src/shared/` se reserva para elementos realmente reutilizables.

## Responsabilidades

`useInventory.js` administra una única colección y las operaciones de alta, edición, eliminación y restauración. `inventoryValidation.js` valida los datos. `inventoryUtils.js` calcula el estado del stock y las métricas.

`InventoryPage.jsx` conecta una única instancia de `useInventory()` con el formulario, las métricas, las tarjetas, el detalle y las acciones de confirmación. Los componentes visuales reciben datos y callbacks; no crean otra fuente de verdad.

`InventoryCard.jsx` presenta un producto como tarjeta seleccionable. `MedicationDetail.jsx` muestra la información completa del medicamento seleccionado. `InventoryTable.jsx` conserva su nombre por compatibilidad, pero su contenido visual principal es una cuadrícula de tarjetas.

La confirmación de eliminación y la notificación de deshacer deben formar parte de la interfaz. No se permite `alert()` ni `window.confirm()`.

## Estado

El estado principal es la colección de medicamentos. También pueden existir estados de interfaz para edición, selección, confirmación de eliminación, notificación de deshacer, vista previa de importación y errores.

El `id`, el estado del stock y las métricas deben calcularse o generarse a partir de la colección. No se deben guardar estados duplicados.

## Importación

La futura importación recibirá CSV o Excel, validará columnas y filas, mostrará una vista previa y solo después incorporará los registros válidos mediante las mismas reglas de `useInventory.js`.

La importación no debe duplicar la lógica de validación ni modificar directamente la colección desde un componente visual.

## Reglas de desarrollo

Cada cambio debe implementar una fase pequeña, revisarse y probarse antes de comenzar la siguiente. La IA debe entregar instrucciones y código completo con ruta exacta. El equipo humano copia, ejecuta, revisa y decide.

No se agregan backend, autenticación, pagos, ventas, proveedores ni integraciones externas. Las dependencias nuevas deben justificarse por una necesidad concreta, como lectura de Excel.

## Diseño e interacciones

El flujo funcional se construye antes del pulido visual. Las tarjetas y el detalle deben funcionar sin animaciones. Skiper UI y GSAP se incorporarán después de validar la estructura y deberán respetar accesibilidad y `prefers-reduced-motion`.

## Definición de terminado

Una fase está terminada cuando cumple sus criterios, funciona en un flujo real, el equipo revisó el resultado y `npm run lint` y `npm run build` no presentan errores.
