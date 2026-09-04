# PROMPTS — Bitácora de Vibe Coding

Este archivo registra las iteraciones importantes del proyecto y aplica el ciclo:

```text
Describe → Genera → Revisa → Prueba → Refina
```

La IA generó propuestas y código, pero el equipo humano definió el alcance, revisó los archivos, ejecutó las pruebas, detectó errores y decidió qué cambios conservar.

## Iteración 01 — Definición del problema

**Objetivo:** Resolver el problema de inventarios manuales en una farmacia pequeña.

**Decisión humana:** Crear una aplicación que permita registrar medicamentos, consultar cantidades y detectar productos que necesitan reposición.

**Criterios iniciales:** Registrar medicamentos, clasificar el stock y editar o eliminar con mensajes claros.

**Estado:** Aprobado.

## Iteración 02 — Estructura inicial

Se creó la estructura feature-based sin alterar el scaffold inicial de Vite.

**Decisión humana:** Mantener una sola página, sin login, backend ni dashboard complejo, porque el MVP debía resolver una única necesidad central.

**Validación:**

```text
npm run lint → correcto
npm run build → correcto
```

**Estado:** Aprobado.

## Iteración 03 — Formulario y lógica base

Se creó el formulario de medicamentos y el hook `useInventory.js`.

Se implementaron el registro, la validación de nombre, categoría, cantidad y precio, la generación de IDs, la clasificación automática del stock y las métricas.

**Revisión humana:** Se comprobó que no se introdujeran librerías innecesarias ni llamadas a servicios externos.

**Estado:** Aprobado.

## Iteración 04 — Tarjetas y detalle

Se reemplazó la tabla simple por un catálogo de tarjetas con imagen o placeholder, nombre, categoría, cantidad, precio y estado de stock.

Al seleccionar una tarjeta se abre un modal con la información completa y acciones de edición y eliminación.

**Problemas detectados:** La primera versión tenía integración incompleta, edición en el formulario principal y una semántica poco accesible en la tarjeta.

**Refinamiento:** La edición se trasladó al modal de detalle y la tarjeta se separó en un área de apertura y botones independientes.

**Estado:** Corregido y aprobado.

## Iteración 05 — Confirmación propia y Deshacer

Se eliminó el uso de `alert()` y `window.confirm()`.

Se añadió un diálogo propio de confirmación y una notificación temporal con botón `Deshacer` durante cinco segundos.

**Validación humana:** Se comprobó cancelar, confirmar, deshacer y recargar después de eliminar.

**Estado:** Aprobado.

## Iteración 06 — Moneda y reglas del negocio

El proyecto se adaptó a Costa Rica.

Se reemplazó la moneda mexicana por colones costarricenses mediante `Intl.NumberFormat` con configuración `es-CR` y moneda `CRC`.

También se añadió prevención de medicamentos duplicados usando nombre y categoría como combinación de identificación del producto.

**Estado:** Aprobado.

## Iteración 07 — Importación CSV y Excel

**Objetivo:** Sustituir registros manuales en papel mediante carga masiva.

**Flujo implementado:**

```text
Seleccionar archivo → leer → validar → vista previa → importar registros válidos
```

Se instalaron y utilizaron los formatos `.csv`, `.xls` y `.xlsx` mediante `xlsx`.

Se reconocen encabezados en español e inglés, incluyendo `Nombre`, `Categoría`, `Cantidad` y `Precio unitario`.

**Error detectado:** El encabezado `Categoría` no se reconocía correctamente en ciertos CSV.

**Corrección:** Los CSV se leen como texto UTF-8 y los archivos XLS/XLSX como datos binarios.

**Estado:** Aprobado con un archivo de prueba que contiene tres filas válidas y un duplicado.

## Iteración 08 — Persistencia local

Se añadió `localStorage` para que los medicamentos registrados o importados permanezcan después de recargar la página.

**Decisión humana:** Mantener la persistencia local y no crear backend, login ni base de datos porque el alcance del laboratorio es un MVP de una sola página.

**Estado:** Aprobado.

## Iteración 09 — Diseño visual

Se aplicaron estilos modernos y responsive para tarjetas, métricas, formulario, modal, diálogo de eliminación, importador y notificación de Deshacer.

Se conservaron estados visuales diferenciados para stock normal, bajo y agotado.

**Estado:** Aprobado.

## Iteración 10 — Accesibilidad y transiciones

Se corrigió la semántica de la tarjeta para evitar botones anidados dentro de otro elemento interactivo.

Se añadieron transiciones CSS para tarjetas, modal, diálogo y notificación. Las animaciones respetan `prefers-reduced-motion`.

**Decisión humana:** No incorporar GSAP ni Skiper UI si no aportan una mejora clara al MVP.

**Estado:** Aprobado.

## Iteración 11 — Validación final

Se validaron los siguientes flujos:

```text
Registrar medicamento.
Abrir tarjeta con clic, Enter y barra espaciadora.
Editar desde el detalle.
Intentar crear un duplicado.
Cancelar una eliminación.
Eliminar y restaurar con Deshacer.
Importar un CSV.
Detectar filas inválidas y duplicados.
Confirmar actualización de métricas.
Recargar y comprobar persistencia.
Ejecutar npm run lint.
Ejecutar npm run build.
```

**Resultado:** `lint` y `build` pasan sin errores. El build muestra únicamente una advertencia informativa de tamaño del bundle causada por `xlsx`.

**Estado:** Aprobado.

## Aprendizaje principal

La IA aceleró la generación de código, pero el resultado solo fue confiable después de revisar archivos, ejecutar comandos, probar casos reales y corregir errores como el encabezado UTF-8, el `setState` dentro de un efecto y los props sin uso.
