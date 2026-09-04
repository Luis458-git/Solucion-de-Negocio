# PROMPTS — Bitácora de Vibe Coding

Este archivo registra las iteraciones importantes del proyecto y aplica el ciclo:

```text
Describe → Genera → Revisa → Prueba → Refina
```

La IA genera propuestas y código, pero el equipo humano define el alcance, copia el código, ejecuta las pruebas, detecta errores y decide si continúa.

## Iteración 01 — Definición del problema

**Objetivo:** Resolver el problema de inventarios manuales en una farmacia pequeña.

**Decisión humana:** Crear una aplicación que permita registrar medicamentos, consultar cantidades y detectar productos que necesitan reposición.

**Criterios iniciales:** Registrar, clasificar stock y editar/eliminar con mensajes claros.

**Estado:** Aprobado.

## Iteración 02 — Estructura inicial

**Responsable:** Sebastian  
**Rama:** `sebas`

Se creó la estructura feature-based sin alterar el scaffold inicial de Vite.

**Validación:**

```text
npm run lint → correcto
npm run build → correcto
```

**Estado:** Aprobado.

## Iteración 03 — Formulario y página inicial

**Responsable:** Luis  
**Rama:** `Luis`, integrada posteriormente en `sebas`.

Se creó el formulario y se conectó con la página inicial del inventario.

**Estado:** Integrado.

## Iteración 04 — Lógica base

**Responsable:** Sebastian  
**Rama:** `sebas`.

Se implementaron:

```text
useInventory.js
inventoryUtils.js
inventoryValidation.js
```

La lógica permite registrar, validar, generar IDs, clasificar stock, editar y eliminar.

**Estado:** Aprobado para prototipo.

## Iteración 05 — Tabla y edición

**Responsable:** Luis  
**Rama:** `Luis`, integrada posteriormente en `sebas`.

Se agregaron la tabla, las filas y la edición del medicamento. Se probó registrar, editar, eliminar y clasificar stock.

**Estado:** Aprobado.

## Iteración 06 — Métricas

**Responsable:** Sebastian  
**Rama:** `sebas`.

Se agregó:

```text
src/features/inventory/components/InventoryStats.jsx
```

Las métricas muestran productos registrados, unidades totales, stock bajo y agotados.

**Estado:** Publicado y funcional.

## Iteración 07 — Primera versión de tarjetas

**Responsable:** Sebastian  
**Rama:** `sebas`.

Se creó una primera versión de `InventoryCard.jsx` y se adaptó `InventoryTable.jsx` para mostrar tarjetas.

**Problemas detectados:**

- `InventoryPage.jsx` aún no conectaba `onSelect`.
- `MedicationDetail.jsx` se publicó incompleto.
- La eliminación todavía utilizaba `window.confirm()`.
- No existía Deshacer.

**Decisión:** No aprobar todavía. Corregir antes de aplicar estilos.

## Iteración 08 — Corrección de tarjetas y detalle

**Objetivo:** Reemplazar la publicación parcial por tarjetas seleccionables, detalle funcional, confirmación propia y Deshacer.

**Archivos previstos:**

```text
src/features/inventory/components/InventoryCard.jsx
src/features/inventory/components/InventoryTable.jsx
src/features/inventory/components/MedicationDetail.jsx
src/features/inventory/hooks/useInventory.js
src/pages/InventoryPage.jsx
```

**Reglas:**

```text
No usar alert().
No usar window.confirm().
No instalar Skiper UI ni GSAP todavía.
Entregar archivos completos y rutas exactas.
Ejecutar npm run lint y npm run build.
```

**Estado:** En corrección.

## Iteración 09 — Importación masiva

**Objetivo:** Sustituir inventarios en papel mediante importación CSV/Excel.

**Flujo previsto:**

```text
Seleccionar archivo → leer → validar → vista previa → importar registros válidos
```

**Columnas mínimas:**

```text
name | category | quantity | unitPrice
```

`imageUrl` será opcional. La dependencia `xlsx` se instalará únicamente al comenzar esta iteración.

**Estado:** Pendiente después de estabilizar tarjetas y detalle.

## Iteración 10 — Pulido visual

**Objetivo:** Aplicar estilos modernos y responsive sin modificar la lógica.

**Posibles herramientas:**

```text
CSS/Tailwind → layout y diseño base
shadcn/ui → dialog, botones y componentes accesibles
Skiper UI → componente visual concreto
GSAP → transiciones no esenciales
```

**Estado:** Pendiente.

## Iteración 11 — Validación final

Se probará la aplicación como propietario de una farmacia:

```text
Registrar medicamento.
Abrir tarjeta.
Editar medicamento.
Cancelar eliminación.
Eliminar y deshacer.
Importar archivo válido.
Revisar filas inválidas.
Confirmar actualización de métricas.
Ejecutar npm run lint.
Ejecutar npm run build.
```

**Estado:** Pendiente.

## Formato obligatorio para futuras iteraciones

Cada prompt debe indicar objetivo, contexto, archivos permitidos, archivos prohibidos, criterios de éxito y formato de entrega. Cada respuesta de código debe incluir ruta exacta, acción y contenido completo listo para copiar y pegar.
