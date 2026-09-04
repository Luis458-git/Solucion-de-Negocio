# PROGRESS — Sistema de Inventario Farmacéutico

## Estado actual

**Fase de la práctica:** Fase 4 — Pulido, validación y preparación de la demo.

**Rama de desarrollo:** `sebas`.

**Rama `main`:** No se utilizará durante el desarrollo. Solo se revisará al finalizar y validar el proyecto completo.

**Estado:** MVP funcional con registro manual, tarjetas, detalle, edición dentro del modal, validación, prevención de duplicados, moneda costarricense, eliminación con confirmación propia, Deshacer, importación CSV/Excel, persistencia local y transiciones accesibles.

## Fuente de verdad

Los documentos se encuentran en `src/docs/`. La jerarquía es:

```text
PLANIFICACIÓN → ARQUITECTURA → DESARROLLO → DISEÑO → INTERACCIONES → VALIDACIÓN
```

La metodología aplicada es:

```text
Describe → Genera → Revisa → Prueba → Refina
```

## Fases completadas

### Fase 0 — Intención

Completada. El usuario es el encargado de una farmacia pequeña y el problema es sustituir inventarios manuales en papel por una consulta visual, rápida y práctica.

### Fase 1 — Prototipo

Completada. Se creó y validó el scaffold React + Vite, la estructura feature-based, el formulario, las tarjetas, los componentes compartidos y la lógica base.

### Fase 2 — Funcionalidad central

Completada. El inventario permite registrar, validar, editar, eliminar, restaurar y clasificar medicamentos.

### Fase 3 — Importación

Completada. Se instaló `xlsx` y se implementó la importación de archivos `.csv`, `.xls` y `.xlsx`. El flujo lee el archivo, reconoce encabezados en español e inglés, valida las filas, muestra una vista previa, importa registros válidos y omite duplicados.

Los archivos CSV se leen como texto UTF-8 para reconocer correctamente encabezados con tildes, como `Categoría`.

### Fase 4 — Pulido e interacciones

En validación final. Se aplicaron estilos responsive, moneda costarricense, persistencia local, mejoras de accesibilidad y transiciones CSS no esenciales. Las animaciones respetan `prefers-reduced-motion`.

GSAP y Skiper UI no son necesarios para cumplir el MVP y no deben incorporarse si agregan complejidad o rompen la accesibilidad.

## Funcionalidades implementadas

| Funcionalidad | Estado |
|---|---|
| Registrar medicamento | Funciona |
| Validar nombre, categoría, cantidad y precio | Funciona |
| Generar ID único | Funciona con `crypto.randomUUID()` |
| Clasificar stock normal, bajo y agotado | Funciona |
| Mostrar métricas | Funciona |
| Mostrar tarjetas de medicamentos | Funciona |
| Abrir detalle | Funciona con clic, Enter y barra espaciadora |
| Editar dentro del detalle | Funciona |
| Evitar medicamentos duplicados | Funciona por nombre y categoría |
| Mostrar precios en colones costarricenses | Funciona con `Intl.NumberFormat` para `es-CR` |
| Confirmación sin alertas nativas | Funciona con diálogo propio |
| Eliminar medicamento | Funciona |
| Deshacer eliminación | Funciona durante cinco segundos |
| Importar CSV | Funciona |
| Importar XLS/XLSX | Funciona |
| Vista previa de importación | Funciona |
| Omitir duplicados al importar | Funciona |
| Persistencia tras recargar | Funciona con `localStorage` |
| Responsive | Implementado |
| Transiciones suaves | Implementadas con CSS |
| Respeto a reducción de movimiento | Implementado |

## Validaciones realizadas

| Validación | Resultado |
|---|---|
| `npm run lint` | Correcto, sin errores |
| `npm run build` | Correcto |
| Registro manual | Probado |
| Edición desde el modal | Probado |
| Bloqueo de duplicados | Probado |
| Moneda costarricense | Probada |
| Eliminación con confirmación propia | Probada |
| Deshacer eliminación | Probado |
| Importación CSV | Probada con archivo de Costa Rica |
| Encabezado `Categoría` con tilde | Corregido y probado |
| Persistencia después de recargar | Probada |
| Tarjetas con teclado | Implementadas |
| Transiciones con reducción de movimiento | Implementadas |

## Advertencia conocida

El build puede mostrar una advertencia de bundle superior a 500 kB debido a la dependencia `xlsx`. No es un error: `lint` y `build` terminan correctamente. La optimización del bundle queda fuera del alcance principal del MVP y solo debe realizarse si existe tiempo para una fase posterior.

## Pendientes de cierre

1. Revisar visualmente escritorio y móvil.
2. Confirmar que la importación muestra filas válidas, duplicados omitidos y precios en colones.
3. Confirmar que los datos sobreviven a una recarga.
4. Actualizar la bitácora de prompts con las últimas iteraciones.
5. Completar la reflexión de la práctica.
6. Preparar una demostración de aproximadamente dos minutos.

## Guion breve de demostración

```text
1. Registrar un medicamento manualmente.
2. Mostrar su tarjeta y el estado del stock.
3. Abrir el detalle y editar la cantidad desde el modal.
4. Intentar crear el mismo medicamento para demostrar el bloqueo de duplicados.
5. Importar un CSV con varias filas.
6. Mostrar la vista previa y la omisión del duplicado.
7. Recargar la página para demostrar la persistencia.
8. Eliminar un medicamento y recuperarlo con Deshacer.
```

## Coordinación

Una persona implementa una tarea pequeña y la otra revisa. No se modifican los mismos archivos en paralelo. Cada push debe revisarse antes de hacer pull o continuar con otra fase.

## Criterios de éxito del MVP

```text
El encargado puede registrar medicamentos sin usar papel.
El encargado puede localizar rápidamente productos con stock bajo o agotado.
El encargado puede cargar una lista existente desde CSV o Excel.
Los datos no desaparecen al recargar la página.
La interfaz no depende de alertas o confirmaciones nativas del navegador.
```
