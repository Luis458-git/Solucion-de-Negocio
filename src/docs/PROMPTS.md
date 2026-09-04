# Bitácora de prompts

Este archivo registra las iteraciones importantes del proyecto y demuestra la aplicación del ciclo:

```text
Describe → Genera → Revisa → Prueba → Refina
```

La IA genera propuestas y código, pero el equipo humano decide el alcance, revisa el resultado, ejecuta las pruebas y corrige los problemas.

## Fase 0 — Intención

### Iteración 01 — Definición del problema

**Objetivo:** Identificar un problema real de un pequeño negocio y definir un MVP demostrable.

**Decisión humana:** Se eligió ayudar al encargado de una farmacia pequeña a registrar medicamentos y detectar rápidamente cuáles necesitan reposición.

**Función central:** Registrar y consultar el inventario, mostrando automáticamente si el stock es normal, bajo o agotado.

**Criterios de éxito:**

```text
1. Un medicamento válido aparece en el inventario.
2. El stock se clasifica correctamente.
3. El usuario puede editar o eliminar y recibe mensajes claros ante errores.
```

**Estado:** Aprobado.

## Fase 1 — Prototipo

### Iteración 02 — Estructura inicial

**Integrante:** Sebastian  
**Rama:** `sebas`  
**Objetivo:** Crear la estructura feature-based sin alterar el scaffold inicial de Vite.

**Archivos y carpetas principales:**

```text
src/app/
src/features/inventory/components/
src/features/inventory/hooks/
src/features/inventory/utils/
src/pages/
src/shared/components/
src/shared/hooks/
src/shared/lib/
src/styles/
```

**Revisión:** Luis confirmó que la estructura coincide con la arquitectura documentada.

**Validación:**

```text
npm run lint → correcto
npm run build → correcto
```

**Estado:** Aprobado.

### Iteración 03 — Formulario y página inicial

**Integrante:** Luis  
**Rama:** `Luis`, posteriormente integrada en `sebas`  
**Objetivo:** Crear el formulario inicial y conectarlo con la página del inventario.

**Archivos afectados:**

```text
src/features/inventory/components/InventoryForm.jsx
src/pages/InventoryPage.jsx
```

**Revisión:** El formulario permite introducir los datos básicos y la página utiliza la lógica del inventario.

**Estado:** Integrado como prototipo.

## Fase 2 — Funcionalidad central

### Iteración 04 — Lógica base del inventario

**Integrante:** Sebastian  
**Rama:** `sebas`  
**Objetivo:** Crear validaciones, clasificación de stock, métricas derivadas y operaciones de inventario.

**Archivos afectados:**

```text
src/features/inventory/hooks/useInventory.js
src/features/inventory/utils/inventoryUtils.js
src/features/inventory/utils/inventoryValidation.js
```

**Resultado:** Se implementaron el registro, la validación, la generación de ID único, la clasificación del stock y la eliminación básica.

**Revisión:** Se comprobó que el estado se mantiene en una sola instancia del hook y que el stock se calcula a partir de la cantidad.

**Estado:** Aprobado para prototipo.

### Iteración 05 — Tabla y fila de inventario

**Integrante:** Luis  
**Rama:** `Luis`, posteriormente integrada en `sebas`  
**Objetivo:** Mostrar los medicamentos registrados y permitir la acción de eliminar.

**Archivos afectados:**

```text
src/features/inventory/components/InventoryRow.jsx
src/features/inventory/components/InventoryTable.jsx
src/pages/InventoryPage.jsx
src/features/inventory/hooks/useInventory.js
```

**Resultado:** El medicamento registrado aparece en una tabla, se muestra su estado y se puede eliminar. La edición todavía muestra una acción pendiente de completar y la eliminación aún no tiene confirmación.

**Prueba manual:**

```text
Registro válido → funciona.
Medicamento con cantidad 0 → aparece como agotado.
Visualización en tabla → funciona.
Eliminación → funciona de forma básica.
```

**Validación:**

```text
npm run lint → correcto después de la integración.
npm run build → correcto después de la integración.
```

**Estado:** Prototipo funcional básico; requiere refinamiento.

## Siguiente iteración

### Iteración 06 — Edición de medicamentos

**Fecha:** 2026-09-03
**Integrante:** Luis
**Rama:** `sebas`
**Fase:** Fase 2 — Funcionalidad central
**Objetivo:** Permitir seleccionar un medicamento, cargar sus datos en el formulario, guardar los cambios y actualizar la fila correcta.

**Prompt utilizado:**
(El usuario proporcionó instrucciones detalladas para implementar únicamente la edición, respetando la única instancia del hook y conservando el ID original, sin añadir características opcionales.)

**Archivos afectados:**
`src/pages/InventoryPage.jsx`
`src/docs/PROGRESS.md`

**Resultado generado:** Se implementó el estado `editingMedication` en `InventoryPage.jsx`. Se conectaron `handleEdit` y `handleCancel` al formulario, y se modificó `handleSubmit` para alternar entre `addMedication` y `updateMedication`.
**Revisión humana:** Se verificó que `InventoryForm.jsx` ya soportaba la actualización de datos mediante el patrón de estado derivado, y que `useInventory.js` mantenía correctamente el identificador original.
**Problemas encontrados:** Ninguno grave. Se ajustó el código para mantener la arquitectura sin modificar los componentes base.
**Correcciones aplicadas:** Solo orquestación en la página principal.
**Pruebas ejecutadas:** `npm run lint` y `npm run build`. Resultado exitoso.
**Decisión:** Aprobado.

### Iteración 07 — Métricas, alertas y estados de error

**Fecha:** 2026-09-03  
**Integrante:** Equipo  
**Rama:** `sebas`  
**Fase:** Fase 2 — Funcionalidad central  
**Objetivo:** Integrar métricas de inventario, alertas de stock, confirmación de eliminación y manejo de errores sin duplicar la lógica existente ni modificar la configuración del proyecto.

**Prompt utilizado:**

```text
Implementar únicamente métricas de inventario, alertas de stock, confirmación de eliminación y manejo de errores. Crear InventoryStats.jsx, StockAlert.jsx, ConfirmDialog.jsx y ErrorBoundary.jsx; modificar InventoryPage.jsx solo para integrarlos; utilizar las métricas y la lógica existentes; mantener los estados normal, vacío, stock bajo, agotado, validación y error; no añadir búsqueda, filtros, localStorage, GSAP, Skiper UI ni dependencias; actualizar PROGRESS.md y PROMPTS.md.
```

**Archivos afectados:**

```text
src/features/inventory/components/InventoryStats.jsx
src/features/inventory/components/StockAlert.jsx
src/shared/components/ConfirmDialog.jsx
src/shared/components/ErrorBoundary.jsx
src/pages/InventoryPage.jsx
src/docs/PROGRESS.md
src/docs/PROMPTS.md
```

**Resultado generado:** Se añadieron métricas derivadas, alertas para stock normal, bajo y agotado, un diálogo accesible de confirmación y un límite de errores para la interfaz. La página conserva una sola instancia de `useInventory()` y solicita confirmación antes de eliminar.
**Revisión humana:** Completada. Se revisaron los componentes nuevos, la integración en la página, la accesibilidad básica y el alcance de la iteración.
**Problemas encontrados:** `ARCHITECTURE.md` no existe con ese nombre; el documento equivalente del repositorio se llama `ARQUITECTURE.md`. La prueba inicial del `ErrorBoundary` se ejecutaba antes de montar el boundary.
**Correcciones aplicadas:** La prueba `?test-error` se movió a `InventoryPageContent`, componente protegido por `ErrorBoundary`. También se completó la lista documental de archivos afectados. No se instalaron dependencias ni se modificaron `main.jsx`, `App.jsx` o la configuración.
**Pruebas ejecutadas:** `npm run build` → correcto. `npm run lint` y las pruebas manuales de métricas, alertas, eliminación confirmada y `ErrorBoundary` quedan pendientes de ejecución.
**Decisión:** Requiere revisión humana.

## Plantilla para nuevas iteraciones

### Iteración [número] — [Nombre]

**Fecha:** [AAAA-MM-DD]  
**Integrante:** [Nombre]  
**Rama:** [Rama]  
**Fase:** [Fase]  
**Objetivo:** [Qué se quiere lograr.]  

**Prompt utilizado:**

```text
[Prompt completo]
```

**Archivos afectados:**

```text
[Rutas exactas]
```

**Resultado generado:** [Resumen.]  
**Revisión humana:** [Qué se comprobó.]  
**Problemas encontrados:** [Detalles.]  
**Correcciones aplicadas:** [Detalles.]  
**Pruebas ejecutadas:** [Comandos y resultado.]  
**Decisión:** Aprobado / Requiere cambios.
