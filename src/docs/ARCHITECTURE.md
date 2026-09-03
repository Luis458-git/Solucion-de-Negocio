# Arquitectura del proyecto

## Objetivo

Este repositorio contiene un sistema frontend de control de inventario para una farmacia comunitaria. La arquitectura busca mantener el código fácil de entender, probar y modificar durante el trabajo en pareja y durante las iteraciones con asistentes de IA.

## Stack obligatorio

| Tecnología | Uso |
|---|---|
| React | Construcción de la interfaz y componentes. |
| Vite | Desarrollo local y build del frontend. |
| JavaScript/JSX | Lenguaje y sintaxis del proyecto. No se utilizará TypeScript en esta etapa. |
| Tailwind CSS | Estilos y composición visual. |
| shadcn/ui | Componentes base accesibles y personalizables. |
| Lucide React | Iconos de interfaz. |
| ESLint | Revisión estática del código. |
| GSAP y `@gsap/react` | Animaciones controladas, después de validar la interfaz funcional. |
| Skiper UI | Componentes visuales específicos, cuando aporten valor real. |

## Arquitectura feature-based híbrida

La lógica se organiza primero por funcionalidad de negocio y después por tipo de archivo. La funcionalidad del inventario debe permanecer dentro de `src/features/inventory/`. Los componentes genéricos se colocan en `src/shared/` únicamente cuando exista una necesidad real de reutilización.

## Estructura principal

```text
src/
├── app/
├── features/
│   └── inventory/
├── pages/
├── shared/
└── styles/
```

## Reglas de dependencias

| Capa | Puede utilizar |
|---|---|
| `shared/` | Solo recursos compartidos y dependencias base; nunca archivos internos de `features/`. |
| `features/inventory/` | Sus propios archivos y recursos de `shared/`. |
| `pages/` | `features/` y `shared/`. |
| `app/` | Configuración y orquestación de la aplicación. |
| `App.jsx` | Páginas, rutas, proveedor de errores y configuración global. |
| `main.jsx` | Montaje de React. |

Debe evitarse una cadena como `feature A → feature B → feature C`, así como las dependencias circulares.

## Responsabilidades principales

`App.jsx` orquesta la aplicación, define las rutas y coloca los proveedores globales. No debe contener lógica de negocio del inventario.

`main.jsx` es el punto de entrada y montaje de React. No debe contener lógica de presentación ni reglas del inventario.

`features/inventory/` contiene el modelo de medicamento, el estado, las validaciones, el cálculo de métricas y los componentes propios de la funcionalidad.

`pages/Inventory.jsx` compone la pantalla completa y conecta los componentes de la feature. No debe duplicar las reglas de negocio.

## Estado

El estado principal será la colección de medicamentos dentro de `useInventory.js`. Las métricas, el estado de stock y los resultados filtrados deben calcularse a partir de los datos existentes. No se deben guardar datos derivados como estados separados.

La persistencia con `localStorage` es opcional para una fase posterior y no debe bloquear el MVP inicial.

## Animaciones

GSAP controla únicamente la presentación visual. Las operaciones de registrar, editar y eliminar pertenecen a `useInventory.js`; las animaciones deben reaccionar a los cambios sin contener lógica de negocio.

Los componentes de Skiper UI y las animaciones de GSAP se incorporarán después de validar la interfaz funcional básica. No se deben controlar las mismas propiedades del mismo elemento con GSAP y Framer Motion simultáneamente.

## Manejo de errores

`ErrorBoundary.jsx` debe evitar que un error inesperado de renderizado deje la aplicación en blanco. Los errores de validación se muestran cerca del campo correspondiente y los errores de operación deben comunicarse mediante una interfaz clara.

## Convenciones

Los componentes React utilizarán PascalCase. Los hooks comenzarán con `use`. Las funciones auxiliares y archivos de utilidades utilizarán nombres descriptivos en camelCase. Cada archivo debe tener una responsabilidad clara y mantenerse pequeño.

Antes de agregar una dependencia, se debe comprobar si existe una solución nativa o una utilidad ya instalada. Toda dependencia nueva debe justificarse en `PROGRESS.md` o en el commit correspondiente.
