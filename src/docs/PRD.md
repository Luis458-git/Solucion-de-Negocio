# PRD — MVP de inventario farmacéutico

## 1. Intención de la práctica

Este proyecto se desarrolla mediante el ciclo de Vibe Coding:

```text
Describe → Genera → Revisa → Prueba → Refina
```

La IA puede generar propuestas y código, pero las decisiones, la revisión, las pruebas y la responsabilidad final corresponden al equipo.

## 2. Usuario y problema

El usuario objetivo es el encargado de una farmacia pequeña. El problema central es que necesita conocer rápidamente qué medicamentos están disponibles y cuáles requieren reposición, sin depender de registros manuales desordenados.

## 3. Objetivo del MVP

Construir una aplicación frontend sencilla que permita registrar medicamentos y consultar su estado de inventario, identificando automáticamente si tienen stock normal, bajo o agotado.

El MVP debe ser demostrable en una sesión y debe resolver un solo problema central. No busca ser un sistema empresarial completo ni una plataforma oficial de una marca comercial.

## 4. Criterios de éxito

La práctica se considerará exitosa si se cumplen estos tres criterios:

| ID | Criterio |
|---|---|
| CE-01 | El usuario registra un medicamento válido y este aparece en el inventario. |
| CE-02 | El sistema clasifica correctamente el stock normal, bajo y agotado. |
| CE-03 | El usuario puede editar o eliminar un medicamento y recibe mensajes claros ante datos inválidos. |

## 5. Alcance funcional

El MVP incluirá un formulario con nombre, categoría, cantidad y precio unitario; una tabla o lista de medicamentos; validación de campos; clasificación del stock; edición; eliminación; un estado vacío y una métrica útil para el negocio, como el total de productos registrados.

La búsqueda y los filtros son opcionales y solo se incorporarán si las funciones centrales ya están terminadas y validadas.

## 6. Fuera de alcance

No se implementarán autenticación, backend, base de datos, pagos, ventas, proveedores, recetas, integración con sistemas externos, localStorage, reportes avanzados ni funciones de administración empresarial. Tampoco se utilizará la identidad de una marca comercial como si existiera una afiliación oficial.

Skiper UI y GSAP pertenecen a la fase de pulido. No deben retrasar ni sustituir la funcionalidad central.

## 7. Modelo de datos

Cada medicamento tendrá como mínimo:

| Campo | Tipo | Regla |
|---|---|---|
| `id` | String | Único y generado por la aplicación. |
| `name` | String | Obligatorio y no vacío. |
| `category` | String | Obligatoria y no vacía. |
| `quantity` | Integer | Entero mayor o igual que cero. |
| `unitPrice` | Number | Número mayor o igual que cero. |
| `stockStatus` | Calculado | No se almacena como estado independiente. |

## 8. Reglas de negocio

`quantity` igual a cero significa `Agotado`. Una cantidad mayor que cero y menor que cinco significa `Stock Bajo`. Una cantidad mayor o igual que cinco significa `Stock Normal`. La clasificación se calcula a partir de `quantity`, y `Agotado` tiene prioridad visual sobre cualquier otra condición.

El nombre, la categoría, la cantidad y el precio son obligatorios. No se aceptan cantidades negativas, decimales en la cantidad ni precios negativos. Cada registro conserva un identificador único para editarlo o eliminarlo sin depender del nombre.

## 9. Requerimientos funcionales

| ID | Requerimiento | Prioridad |
|---|---|---|
| RF-01 | Registrar un medicamento válido. | Must Have |
| RF-02 | Mostrar los medicamentos registrados. | Must Have |
| RF-03 | Validar campos obligatorios y valores numéricos. | Must Have |
| RF-04 | Clasificar y mostrar el estado del stock. | Must Have |
| RF-05 | Editar un medicamento existente. | Must Have |
| RF-06 | Eliminar un medicamento. | Must Have |
| RF-07 | Mostrar un estado vacío y mensajes de error claros. | Must Have |
| RF-08 | Mostrar una métrica útil del inventario. | Should Have |
| RF-09 | Buscar o filtrar medicamentos. | Could Have |

## 10. Fases de la práctica

| Fase | Resultado |
|---|---|
| Fase 0 — Intención | Usuario, problema central, función principal y criterios de éxito. |
| Fase 1 — Prototipo | Estructura inicial, formulario y presentación básica. |
| Fase 2 — Funcionalidad central | Guardar, mostrar, validar, editar y eliminar, una función a la vez. |
| Fase 3 — Pulido | Coherencia visual, responsive, accesibilidad y un dato útil. |
| Fase 4 — Prueba final | Demo, criterios de éxito, lint, build, revisión humana y reflexión. |

## 11. Requerimientos técnicos

El proyecto utilizará React, Vite, JavaScript/JSX y ESLint. La lógica se organizará por feature dentro de `src/features/inventory/`, mientras que los recursos reutilizables vivirán en `src/shared/`. Los estilos y las animaciones no deben mezclarse con las reglas de negocio.

La validación se realizará después de cada incremento mediante revisión humana, pruebas manuales, `npm run lint` y `npm run build`.

## 12. Criterios de aceptación

| ID | Criterio |
|---|---|
| CA-01 | Un medicamento válido aparece después de enviarlo. |
| CA-02 | Los datos inválidos bloquean el registro y muestran el error correspondiente. |
| CA-03 | La cantidad cero se muestra como `Agotado`. |
| CA-04 | Una cantidad de uno a cuatro se muestra como `Stock Bajo`. |
| CA-05 | Una cantidad de cinco o más se muestra como `Stock Normal`. |
| CA-06 | La edición modifica el registro correcto. |
| CA-07 | La eliminación retira el registro correcto. |
| CA-08 | El usuario puede entender la interfaz y sus errores sin depender únicamente del color. |

## 13. Definición de terminado

Una fase está terminada cuando cumple su objetivo, respeta el alcance, pasa los criterios correspondientes, funciona en el flujo real, fue revisada por el equipo y no introduce regresiones. La IA no puede aprobar su propio trabajo sin revisión humana.
