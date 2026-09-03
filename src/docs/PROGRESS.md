# Progreso del proyecto

## Estado actual

**Fase de la práctica:** Fase 2 — Funcionalidad central.

**Estado:** Prototipo básico funcional. El sistema permite registrar medicamentos, mostrarlos en una tabla, clasificar su stock y eliminarlos. La edición, la confirmación de eliminación, las métricas y el pulido visual siguen pendientes.

**Rama de desarrollo:** `sebas`.

**Rama `main`:** No se utilizará durante el desarrollo. Solo se revisará al terminar y validar el proyecto completo.

**Última actualización:** 2026-09-03.

## Fuente de verdad

Los documentos del proyecto se encuentran en `src/docs/`. La jerarquía es:

```text
PLANIFICACIÓN → ARQUITECTURA → DESARROLLO → DISEÑO → INTERACCIONES → VALIDACIÓN
```

La metodología de cada iteración es:

```text
Describe → Genera → Revisa → Prueba → Refina
```

## Fase 0 — Intención

**Estado:** Completada.

El usuario objetivo es el encargado de una farmacia pequeña. El problema central es identificar rápidamente qué medicamentos están disponibles y cuáles necesitan reposición.

La función central del MVP es registrar y consultar el inventario, mostrando automáticamente si cada medicamento está normal, bajo o agotado.

Los criterios de éxito son:

| ID | Criterio |
|---|---|
| CE-01 | Registrar un medicamento válido y verlo en el inventario. |
| CE-02 | Clasificar correctamente el stock normal, bajo y agotado. |
| CE-03 | Editar o eliminar un medicamento y recibir mensajes claros ante datos inválidos. |

## Fase 1 — Prototipo

**Estado:** Completada.

El scaffold original de React + Vite se encuentra funcionando. Se creó la estructura feature-based y se conservaron los archivos iniciales de Vite.

La interfaz inicial contiene un formulario y una página de inventario básica.

## Fase 2 — Funcionalidad central

**Estado:** En progreso.

### Ya implementado

| Funcionalidad | Estado |
|---|---|
| Registrar medicamento | Funciona |
| Validar datos básicos | Funciona |
| Generar ID único | Funciona mediante `crypto.randomUUID()` |
| Mostrar registros en tabla | Funciona |
| Clasificar stock | Funciona |
| Mostrar estado vacío | Funciona |
| Eliminar registro | Funciona sin confirmación todavía |

### Archivos principales

```text
src/features/inventory/hooks/useInventory.js
src/features/inventory/utils/inventoryUtils.js
src/features/inventory/utils/inventoryValidation.js
src/features/inventory/components/InventoryForm.jsx
src/features/inventory/components/InventoryRow.jsx
src/features/inventory/components/InventoryTable.jsx
src/pages/InventoryPage.jsx
```

### Pendiente en esta fase

| Funcionalidad | Estado |
|---|---|
| Editar un medicamento desde la interfaz | Pendiente |
| Confirmar antes de eliminar | Pendiente |
| Mostrar una métrica útil | Pendiente |
| Conectar la página con `App.jsx` si todavía no está conectada | Pendiente de comprobar |
| Probar casos de error y edición | Pendiente |

La próxima tarea debe ser una sola mejora funcional: implementar la edición de un medicamento sin agregar estilos avanzados ni animaciones.

## Fase 3 — Pulido

**Estado:** Pendiente.

Después de completar y probar la funcionalidad central se mejorarán coherencia visual, mensajes, responsive, accesibilidad y una métrica útil para el negocio.

## Fase 4 — Interacciones opcionales

**Estado:** Pendiente.

Skiper UI y GSAP solo se incorporarán si el MVP ya cumple los criterios de éxito. No son necesarios para aprobar la funcionalidad central. Cualquier animación debe respetar `prefers-reduced-motion` y no puede ser el único medio para comunicar un estado.

## Fase 5 — Validación final

**Estado:** Pendiente.

Se probará la aplicación como si se fuera el dueño del negocio: registro válido, datos inválidos, stock normal, bajo y agotado, edición, eliminación, estado vacío y mensajes claros. También se ejecutarán `npm run lint` y `npm run build`.

## Validaciones realizadas

| Validación | Resultado |
|---|---|
| Scaffold React + Vite | Correcto |
| Estructura feature-based | Correcta |
| `npm run lint` inicial | Correcto |
| `npm run build` inicial | Correcto |
| Registro básico | Funciona |
| Visualización en tabla | Funciona |
| Clasificación de stock | Funciona |
| Edición | Pendiente |
| Revisión posterior de lint/build | Debe ejecutarse después del último pull |

## Coordinación del equipo

Ambos integrantes trabajan sobre la rama de desarrollo sincronizada. Una persona implementa una tarea pequeña y la otra revisa el resultado. No se deben hacer implementaciones paralelas de los mismos archivos.

Cada iteración debe indicar qué generó la IA, qué revisó el equipo, qué pruebas se ejecutaron y si la fase fue aprobada. El trabajo no se considera terminado solo porque compile.

## Registro de cambios

| Fecha | Integrante | Rama | Cambio | Validación | Estado |
|---|---|---|---|---|---|
| 2026-09-03 | Equipo | `main` | Documentación inicial y scaffold. | Lint y build correctos. | Base creada |
| 2026-09-03 | Usuario | `sebas` | Estructura de carpetas. | Revisión del compañero, lint y build. | Aprobado |
| 2026-09-03 | Usuario | `sebas` | Lógica base del inventario. | Registro y validaciones básicas. | Aprobado para continuar |
| 2026-09-03 | Luis | `Luis` → `sebas` | Formulario, tabla, fila y conexión inicial. | Pull integrado; lint y build correctos. | En progreso |
