# PROGRESS — Sistema de Inventario Farmacéutico

## Estado actual

**Fase de la práctica:** Fase 2 — Funcionalidad central, avanzando hacia Fase 3 — Importación y Fase 4 — Pulido.

**Rama de desarrollo:** `sebas`.

**Rama `main`:** No se utilizará durante el desarrollo. Solo se revisará al finalizar y validar el proyecto completo.

**Estado:** Alpha funcional con métricas y una primera versión de tarjetas. La publicación actual de tarjetas y detalle requiere corrección antes de considerarse aprobada.

## Fuente de verdad

Los documentos se encuentran en `src/docs/`. La jerarquía es:

```text
PLANIFICACIÓN → ARQUITECTURA → DESARROLLO → DISEÑO → INTERACCIONES → VALIDACIÓN
```

La metodología es:

```text
Describe → Genera → Revisa → Prueba → Refina
```

## Fases completadas

### Fase 0 — Intención

Completada. El usuario es el encargado de una farmacia pequeña y el problema es sustituir inventarios manuales por una consulta visual y rápida.

### Fase 1 — Prototipo

Completada. El scaffold React + Vite, la estructura feature-based, el formulario, la tabla inicial y la lógica base fueron creados y validados.

## Fase 2 — Funcionalidad central

En progreso.

### Funcionalidades implementadas

| Funcionalidad | Estado |
|---|---|
| Registrar medicamento | Funciona |
| Validar nombre, categoría, cantidad y precio | Funciona |
| Generar ID único | Funciona con `crypto.randomUUID()` |
| Clasificar stock | Funciona |
| Mostrar métricas | Implementado |
| Editar medicamento | Implementado y probado |
| Eliminar medicamento | Implementado |
| Mostrar tarjetas | Primera versión publicada |
| Seleccionar tarjeta | En corrección |
| Mostrar detalle | En corrección |
| Confirmación sin alertas nativas | Pendiente de integrar |
| Deshacer eliminación | Pendiente de integrar |

### Correcciones inmediatas

La rama `sebas` publicó una primera versión de `InventoryCard.jsx`, pero `InventoryPage.jsx` todavía no conecta `onSelect`, `MedicationDetail.jsx` está incompleto y permanece `window.confirm()`.

La siguiente corrección debe:

1. Reemplazar `MedicationDetail.jsx` por un componente completo.
2. Conectar `selectedMedication` desde `InventoryPage.jsx`.
3. Reemplazar `window.confirm()` por un diálogo propio.
4. Agregar una notificación de Deshacer.
5. Pasar el medicamento completo a la acción de eliminación.

## Fase 3 — Importación

Pendiente.

La función prioritaria para resolver inventarios en papel será importar archivos `.csv`, `.xlsx` o `.xls`, mostrar una vista previa, validar columnas y filas, y permitir importar registros válidos. La dependencia `xlsx` todavía no está instalada.

## Fase 4 — Pulido e interacciones

Pendiente.

Después de estabilizar tarjetas, detalle e importación se aplicarán estilos responsive, accesibilidad, transiciones, Skiper UI y GSAP de forma progresiva.

## Validaciones realizadas

| Validación | Resultado |
|---|---|
| Scaffold React + Vite | Correcto |
| Estructura feature-based | Correcta |
| `npm run lint` | Correcto en validaciones anteriores |
| `npm run build` | Correcto en validaciones anteriores |
| Registro manual | Funciona |
| Clasificación de stock | Funciona |
| Edición | Funciona |
| Métricas | Implementadas |
| Tarjetas | Publicadas, requieren corrección de integración |
| Detalle | Pendiente de corregir |
| Confirmación y deshacer | Pendientes |

## Coordinación

Una persona implementa una tarea pequeña y la otra revisa. No se modifican los mismos archivos en paralelo. Cada push debe revisarse antes de hacer pull o continuar con otra fase.

## Próxima aprobación

La próxima fase se aprobará cuando el usuario pueda:

```text
Abrir una tarjeta.
Cerrar el detalle con X, Escape y clic fuera.
Editar desde el detalle.
Cancelar una eliminación dentro de la interfaz.
Eliminar y restaurar con Deshacer.
Ejecutar npm run lint y npm run build sin errores.
```
