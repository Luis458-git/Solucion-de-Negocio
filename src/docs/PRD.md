# PRD — Sistema de Inventario Farmacéutico

## 1. Propósito de la práctica

El proyecto se desarrolla mediante el ciclo de Vibe Coding:

```text
Describe → Genera → Revisa → Prueba → Refina
```

La IA puede proponer y generar código, pero el equipo humano define el alcance, revisa el resultado, ejecuta las pruebas y asume la responsabilidad final.

## 2. Usuario y problema

El usuario es el encargado de una farmacia pequeña que necesita sustituir registros manuales o inventarios en papel por una forma visual y rápida de consultar sus medicamentos.

El problema central es identificar qué productos existen, cuántas unidades quedan y cuáles necesitan reposición, sin depender de listas desordenadas.

## 3. Objetivo del MVP

Construir una aplicación frontend que permita registrar, consultar, editar y eliminar medicamentos, mostrando el inventario como un catálogo visual de tarjetas.

Cada tarjeta debe mostrar una imagen o placeholder, nombre, categoría, cantidad, precio y estado de stock. Al seleccionar una tarjeta, debe abrirse un detalle con la información completa y las acciones disponibles.

La versión casi final añadirá importación de archivos CSV o Excel para cargar listas preexistentes, con vista previa y validación antes de incorporar registros.

## 4. Criterios de éxito

| ID | Criterio |
|---|---|
| CE-01 | El usuario registra un medicamento válido y lo visualiza como tarjeta. |
| CE-02 | El sistema clasifica correctamente el stock normal, bajo y agotado. |
| CE-03 | El usuario puede abrir el detalle, editar y eliminar sin alertas nativas. |
| CE-04 | El usuario puede deshacer una eliminación reciente. |
| CE-05 | El usuario puede importar una lista válida desde CSV o Excel después de revisar una vista previa. |

## 5. Alcance funcional

El MVP y su versión casi final incluirán un formulario con nombre, categoría, cantidad y precio unitario; tarjetas visuales de medicamentos; detalle seleccionado; edición; confirmación propia para acciones destructivas; opción de deshacer; métricas básicas; estados vacío, error y validación; y clasificación automática del stock.

La importación masiva permitirá seleccionar un archivo `.csv`, `.xlsx` o `.xls`, revisar sus filas, detectar errores y confirmar los registros válidos. Las columnas mínimas serán `name`, `category`, `quantity` y `unitPrice`. `imageUrl` será opcional.

## 6. Fuera de alcance

No se implementarán login, autenticación, backend, base de datos remota, pagos, ventas, proveedores, recetas, facturación ni funciones de administración empresarial.

La persistencia local, reportes, gráficos, filtros avanzados e imágenes cargadas directamente desde archivos son mejoras posteriores y no deben bloquear la versión casi final.

Skiper UI y GSAP pertenecen al pulido visual. Se incorporarán después de que el flujo funcional esté estable.

## 7. Modelo de datos

| Campo | Tipo | Regla |
|---|---|---|
| `id` | String | Único y generado por la aplicación. |
| `name` | String | Obligatorio y no vacío. |
| `category` | String | Obligatoria y no vacía. |
| `quantity` | Integer | Entero mayor o igual que cero. |
| `unitPrice` | Number | Número mayor o igual que cero. |
| `imageUrl` | String opcional | URL opcional para la imagen del medicamento. |
| `stockStatus` | Calculado | No se almacena como estado independiente. |

## 8. Reglas de negocio

`quantity` igual a cero significa `Agotado`. Una cantidad mayor que cero y menor que cinco significa `Stock Bajo`. Una cantidad mayor o igual que cinco significa `Stock Normal`.

La clasificación se calcula a partir de la cantidad. Cada registro conserva un ID único para editarlo, abrir su detalle, eliminarlo o restaurarlo mediante deshacer.

Las alertas nativas del navegador, como `alert()` y `window.confirm()`, están prohibidas. Las confirmaciones deben formar parte de la interfaz y ofrecer Cancelar y Eliminar. Después de eliminar, debe aparecer una notificación temporal con Deshacer.

## 9. Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | Registrar un medicamento válido. | Must Have |
| RF-02 | Mostrar medicamentos como tarjetas. | Must Have |
| RF-03 | Validar campos obligatorios y valores numéricos. | Must Have |
| RF-04 | Clasificar y mostrar el estado del stock. | Must Have |
| RF-05 | Abrir un detalle al seleccionar una tarjeta. | Must Have |
| RF-06 | Editar un medicamento existente. | Must Have |
| RF-07 | Confirmar la eliminación dentro de la interfaz. | Must Have |
| RF-08 | Deshacer una eliminación reciente. | Should Have |
| RF-09 | Mostrar métricas básicas. | Should Have |
| RF-10 | Importar CSV o Excel con vista previa. | Should Have |
| RF-11 | Buscar o filtrar medicamentos. | Could Have |

## 10. Fases de la práctica

| Fase | Resultado |
|---|---|
| Fase 0 — Intención | Usuario, problema, función central y criterios de éxito. |
| Fase 1 — Prototipo | Formulario, datos manuales y presentación inicial. |
| Fase 2 — Funcionalidad central | Registro, validación, tarjetas, detalle, edición, eliminación y métricas. |
| Fase 3 — Importación | Lectura, vista previa y validación de CSV/Excel. |
| Fase 4 — Pulido | Responsive, accesibilidad, estilos, transiciones y componentes visuales. |
| Fase 5 — Prueba final | Demo, criterios de éxito, lint, build, bitácora y reflexión. |

## 11. Requerimientos técnicos

El proyecto utiliza React, Vite, JavaScript/JSX y ESLint. La lógica se organiza por feature dentro de `src/features/inventory/`. Los componentes visuales reciben datos y callbacks, pero no duplican la fuente de verdad.

La validación se realiza después de cada incremento mediante pruebas manuales, `npm run lint` y `npm run build`.

## 12. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-01 | Un medicamento válido aparece como tarjeta después de enviarlo. |
| CA-02 | Una tarjeta se abre y muestra el detalle correcto. |
| CA-03 | Los datos inválidos bloquean el registro y muestran el error correspondiente. |
| CA-04 | La cantidad cero se muestra como Agotado. |
| CA-05 | Una cantidad de uno a cuatro se muestra como Stock Bajo. |
| CA-06 | Una cantidad de cinco o más se muestra como Stock Normal. |
| CA-07 | La edición modifica el registro correcto. |
| CA-08 | La eliminación solicita confirmación dentro de la interfaz. |
| CA-09 | Deshacer restaura el medicamento eliminado. |
| CA-10 | La importación rechaza filas inválidas y permite revisar una vista previa. |
| CA-11 | El usuario puede comprender los estados sin depender únicamente del color. |

## 13. Definición de terminado

Una fase está terminada cuando cumple su objetivo, respeta el alcance, pasa los criterios correspondientes, funciona en un flujo real, fue revisada por el equipo y no introduce regresiones. La IA no puede aprobar su propio trabajo sin revisión humana.
