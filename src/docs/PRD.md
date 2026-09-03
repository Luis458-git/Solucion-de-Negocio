# PRD — Sistema de control de inventario farmacéutico

## 1. Resumen ejecutivo

El producto será una aplicación web frontend para que el personal de una farmacia comunitaria registre, consulte y mantenga actualizado un inventario de medicamentos y suministros médicos. El MVP debe ser ligero, claro y confiable para las tareas diarias de consulta y actualización.

## 2. Problema

Las farmacias pequeñas pueden tener dificultades para conocer las existencias reales, detectar productos próximos a agotarse y mantener actualizados los precios y las cantidades. El sistema busca reducir la consulta manual y mejorar la visibilidad del inventario.

## 3. Objetivo

Desarrollar una aplicación web que permita registrar, consultar, modificar y eliminar medicamentos, identificar automáticamente los niveles críticos de stock y mostrar métricas básicas del inventario.

## 4. Alcance del MVP

El MVP incluirá el registro de medicamentos, la visualización del inventario en una tabla, la validación de los datos del formulario, la identificación visual de stock bajo y productos agotados, la edición de registros, la eliminación con confirmación y las métricas de resumen del inventario.

La búsqueda y el filtrado del inventario se consideran una capacidad prioritaria para una segunda parte del MVP, una vez completado el flujo principal.

## 5. Fuera de alcance

Quedan fuera de esta primera versión la autenticación y gestión de usuarios, el procesamiento de pagos, el sistema de ventas, la gestión de proveedores, las integraciones con sistemas externos de farmacia y cualquier función que no esté justificada por los requerimientos definidos aquí.

La persistencia con `localStorage`, el ordenamiento avanzado, la exportación de reportes y la conexión con una base de datos podrán evaluarse posteriormente, pero no bloquean la primera versión funcional.

## 6. Usuario objetivo

El usuario principal será el personal de una farmacia comunitaria encargado de consultar y mantener actualizado el inventario de medicamentos y suministros.

## 7. Flujo principal

El usuario ingresa a la aplicación, consulta el inventario actual, registra un medicamento mediante el formulario, corrige cualquier error de validación, visualiza el nuevo registro en la tabla, revisa las alertas de stock, edita un registro cuando es necesario y elimina un registro obsoleto previa confirmación.

## 8. Modelo de datos

Cada medicamento deberá manejar, como mínimo, la siguiente información:

| Campo | Tipo | Requerido | Regla |
|---|---|---:|---|
| `id` | String o número | Sí, interno | Debe ser único. |
| `name` | Texto | Sí | No puede estar vacío. |
| `category` | Texto | Sí | No puede estar vacía. |
| `quantity` | Número entero | Sí | Debe ser mayor o igual a cero. |
| `unitPrice` | Número decimal | Sí | Debe ser mayor o igual a cero. |
| `stockStatus` | Valor calculado | No | Se calcula a partir de `quantity`; no se duplica como estado independiente. |

## 9. Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | Registrar un medicamento con nombre, categoría, cantidad y precio unitario. | Must Have |
| RF-02 | Mostrar los medicamentos registrados en una tabla interactiva. | Must Have |
| RF-03 | Validar campos obligatorios y valores numéricos. | Must Have |
| RF-04 | Identificar visualmente medicamentos con stock inferior a cinco unidades. | Must Have |
| RF-05 | Identificar medicamentos con cantidad igual a cero como agotados. | Must Have |
| RF-06 | Permitir editar los datos de un medicamento. | Must Have |
| RF-07 | Permitir eliminar un medicamento previa confirmación. | Must Have |
| RF-08 | Actualizar las métricas después de registrar, editar o eliminar. | Must Have |
| RF-09 | Permitir búsqueda o filtrado del inventario. | Should Have |

## 10. Reglas de negocio

**RN-01 — Stock bajo.** Si la cantidad es menor que cinco, el producto se clasifica como `Stock Bajo`.

**RN-02 — Stock agotado.** Si la cantidad es igual a cero, el producto se clasifica como `Agotado`. Esta regla tiene prioridad visual sobre `Stock Bajo`.

**RN-03 — Stock normal.** Si la cantidad es mayor o igual a cinco, el producto se clasifica como `Stock Normal`.

**RN-04 — Cantidad.** La cantidad debe ser un número entero mayor o igual a cero.

**RN-05 — Precio.** El precio unitario debe ser un número mayor o igual a cero.

**RN-06 — Campos obligatorios.** No se permite registrar ni actualizar un medicamento con nombre, categoría, cantidad o precio vacío.

**RN-07 — Identificador.** Cada registro debe conservar un identificador único para permitir edición y eliminación sin depender del nombre del medicamento.

## 11. Métricas mínimas

La pantalla debe mostrar métricas calculadas a partir del arreglo real de medicamentos. Como mínimo se recomienda mostrar el total de productos, el total de unidades, la cantidad de productos con stock bajo y la cantidad de productos agotados. Las métricas no deben almacenarse como estados duplicados.

## 12. Requerimientos no funcionales

| ID | Requerimiento |
|---|---|
| RNF-01 | Utilizar React + Vite, JavaScript/JSX y ESLint. |
| RNF-02 | Utilizar arquitectura feature-based híbrida. |
| RNF-03 | Mantener una responsabilidad clara por componente. |
| RNF-04 | Mantener únicamente el estado necesario y calcular los datos derivados. |
| RNF-05 | Revisar imports, sintaxis, lint, pruebas y build antes de terminar una funcionalidad. |
| RNF-06 | Los errores inesperados de renderizado no deben producir una pantalla en blanco. |
| RNF-07 | Los controles interactivos deben tener etiquetas accesibles, navegación por teclado y estados visuales claros. |
| RNF-08 | No almacenar secretos ni credenciales privadas en el frontend o repositorio. |
| RNF-09 | Las animaciones no deben impedir la lectura, interacción o comprensión del inventario. |
| RNF-10 | Respetar `prefers-reduced-motion` para reducir o desactivar animaciones no esenciales. |

## 13. Priorización MoSCoW

| Prioridad | Elementos |
|---|---|
| Must Have | Registro, tabla, validaciones, alertas, edición, eliminación y métricas. |
| Should Have | Búsqueda y filtrado. |
| Could Have | Persistencia con `localStorage`, ordenamiento y exportación. |
| Won't Have | Autenticación, pagos, ventas, proveedores e integraciones externas en este MVP. |

## 14. Estados de interfaz

La aplicación debe contemplar un estado normal con inventario disponible, un estado vacío cuando no existan registros, un estado de stock bajo, un estado agotado, un estado de error durante operaciones inesperadas y un estado de validación para datos incorrectos o campos incompletos.

Cada estado importante debe comunicarse mediante texto, color, estructura e iconos. La animación puede reforzar el cambio, pero nunca debe ser el único medio de comunicación.

## 15. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-01 | Al enviar datos válidos, el medicamento aparece en la tabla y las métricas se actualizan. |
| CA-02 | Si faltan campos obligatorios, el registro se bloquea y se muestran mensajes claros. |
| CA-03 | Un medicamento con menos de cinco unidades muestra el estado `Stock Bajo`. |
| CA-04 | Un medicamento con cero unidades muestra el estado `Agotado`. |
| CA-05 | Al guardar cambios de edición, la información actualizada aparece inmediatamente. |
| CA-06 | Al confirmar una eliminación, el registro desaparece y las métricas se actualizan. |
| CA-07 | La búsqueda o el filtrado, cuando estén implementados, muestran únicamente los registros correspondientes. |
| CA-08 | El flujo principal puede utilizarse con teclado y los controles poseen nombres accesibles. |

## 16. Arquitectura técnica

La aplicación utilizará React + Vite con JavaScript/JSX y ESLint. La funcionalidad del inventario permanecerá dentro de `features/inventory/`. Los componentes genéricos reutilizables se ubicarán en `shared/`. `App.jsx` orquestará la aplicación y `main.jsx` será únicamente el punto de entrada y montaje de React.

Skiper UI se utilizará únicamente para componentes visuales que aporten valor real. GSAP se utilizará para animaciones controladas y separadas de la lógica de datos. No se deben animar las mismas propiedades del mismo elemento con GSAP y Framer Motion al mismo tiempo.

## 17. Proceso de validación

Después de cada funcionalidad se deben revisar imports y sintaxis, ejecutar ESLint, ejecutar las pruebas disponibles, realizar el build de producción, probar el flujo principal, validar los criterios de aceptación, comprobar los estados vacío y error, revisar accesibilidad básica y confirmar que no existan regresiones.

## 18. Definición de terminado

Una funcionalidad se considera terminada cuando cumple el objetivo solicitado, satisface sus criterios de aceptación, funciona mediante el flujo real del usuario, pasa las validaciones correspondientes y no introduce regresiones.
