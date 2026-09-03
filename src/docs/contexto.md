Agents
**# AGENTS.md**

**## Objetivo**

Este proyecto es un sistema frontend de inventario para una farmacia comunitaria. El objetivo del asistente es ayudar a construir una aplicación funcional, comprensible, accesible y alineada con \`PRD.md\`.

**## Stack obligatorio**

Se utilizarán React, Vite, JavaScript/JSX, Tailwind CSS, shadcn/ui, Lucide React, ESLint, GSAP y \`@gsap/react\`. No se debe introducir TypeScript en esta etapa.

**## Reglas de trabajo**

1\. Leer \`PRD.md\`, \`ARCHITECTURE.md\`, \`DESIGN.md\` y \`PROGRESS.md\` antes de modificar el proyecto.

2\. Trabajar en una sola fase y con un alcance pequeño por iteración.

3\. No implementar una fase nueva hasta que la actual haya sido revisada y validada.

4\. No agregar funcionalidades fuera del PRD sin autorización explícita.

5\. No implementar backend, autenticación, pagos, ventas, proveedores ni integraciones externas en el MVP.

6\. No agregar dependencias sin explicar su necesidad.

7\. No cambiar la arquitectura sin justificar el cambio.

8\. Mantener la lógica del inventario dentro de \`src/features/inventory/\`.

9\. Mantener la lógica de negocio separada de los componentes visuales.

10\. No crear carpetas o archivos innecesarios.

11\. No duplicar estados derivados como \`stockStatus\`, métricas o listas filtradas.

12\. Mantener cada componente con una responsabilidad clara.

13\. Reutilizar componentes de \`shared/\` solo cuando exista una necesidad real.

14\. Ejecutar ESLint después de cambios importantes.

15\. Ejecutar el build antes de considerar terminada una fase.

16\. No eliminar código existente sin explicar la razón.

17\. Entregar primero un plan de cambios y después el código.

18\. Indicar siempre las rutas exactas de los archivos creados o modificados.

**## Estado y reglas de negocio**

\`useInventory.js\` debe contener únicamente el estado necesario. Las métricas y la clasificación del stock deben calcularse a partir de los medicamentos existentes. La cantidad debe ser un entero mayor o igual a cero y el precio debe ser un número mayor o igual a cero.

**## UI y accesibilidad**

Todos los controles deben tener nombres accesibles, estados de foco visibles y navegación por teclado cuando corresponda. Los estados normal, vacío, error, validación, stock bajo y agotado deben poder entenderse sin depender exclusivamente del color o del movimiento.

**## Skiper UI y GSAP**

Skiper UI se incorporará únicamente cuando un componente aporte valor real a la interfaz. Los componentes gratuitos deben conservar la atribución requerida. Si un componente se entrega en TSX, debe adaptarse cuidadosamente a JSX.

GSAP solo debe controlar presentación y animaciones. No debe contener lógica de negocio ni modificar directamente la fuente de verdad del inventario. Debe utilizar \`useGSAP()\` y limpiar las animaciones al desmontar. Se debe respetar \`prefers-reduced-motion\`.

**## Ciclo obligatorio de trabajo**

El ciclo de cada fase es:

\`\`\`text

Describe → Genera → Revisa → Prueba → Refina

\`\`\`

El asistente debe explicar qué hará, generar cambios limitados, esperar la revisión humana, indicar cómo probarlos y corregir únicamente los problemas encontrados.

Arquitecture
**# Arquitectura del proyecto**

**## Objetivo**

Este repositorio contiene un sistema frontend de control de inventario para una farmacia comunitaria. La arquitectura busca mantener el código fácil de entender, probar y modificar durante el trabajo en pareja y durante las iteraciones con asistentes de IA.

**## Stack obligatorio**

\| Tecnología | Uso |

\|---|---|

\| React | Construcción de la interfaz y componentes. |

\| Vite | Desarrollo local y build del frontend. |

\| JavaScript/JSX | Lenguaje y sintaxis del proyecto. No se utilizará TypeScript en esta etapa. |

\| Tailwind CSS | Estilos y composición visual. |

\| shadcn/ui | Componentes base accesibles y personalizables. |

\| Lucide React | Iconos de interfaz. |

\| ESLint | Revisión estática del código. |

\| GSAP y \`@gsap/react\` | Animaciones controladas, después de validar la interfaz funcional. |

\| Skiper UI | Componentes visuales específicos, cuando aporten valor real. |

**## Arquitectura feature-based híbrida**

La lógica se organiza primero por funcionalidad de negocio y después por tipo de archivo. La funcionalidad del inventario debe permanecer dentro de \`src/features/inventory/\`. Los componentes genéricos se colocan en \`src/shared/\` únicamente cuando exista una necesidad real de reutilización.

**## Estructura principal**

\`\`\`text

src/

├── app/

├── features/

│   └── inventory/

├── pages/

├── shared/

└── styles/

\`\`\`

**## Reglas de dependencias**

\| Capa | Puede utilizar |

\|---|---|

\| \`shared/\` | Solo recursos compartidos y dependencias base; nunca archivos internos de \`features/\`. |

\| \`features/inventory/\` | Sus propios archivos y recursos de \`shared/\`. |

\| \`pages/\` | \`features/\` y \`shared/\`. |

\| \`app/\` | Configuración y orquestación de la aplicación. |

\| \`App.jsx\` | Páginas, rutas, proveedor de errores y configuración global. |

\| \`main.jsx\` | Montaje de React. |

Debe evitarse una cadena como \`feature A → feature B → feature C\`, así como las dependencias circulares.

**## Responsabilidades principales**

\`App.jsx\` orquesta la aplicación, define las rutas y coloca los proveedores globales. No debe contener lógica de negocio del inventario.

\`main.jsx\` es el punto de entrada y montaje de React. No debe contener lógica de presentación ni reglas del inventario.

\`features/inventory/\` contiene el modelo de medicamento, el estado, las validaciones, el cálculo de métricas y los componentes propios de la funcionalidad.

\`pages/Inventory.jsx\` compone la pantalla completa y conecta los componentes de la feature. No debe duplicar las reglas de negocio.

**## Estado**

El estado principal será la colección de medicamentos dentro de \`useInventory.js\`. Las métricas, el estado de stock y los resultados filtrados deben calcularse a partir de los datos existentes. No se deben guardar datos derivados como estados separados.

La persistencia con \`localStorage\` es opcional para una fase posterior y no debe bloquear el MVP inicial.

**## Animaciones**

GSAP controla únicamente la presentación visual. Las operaciones de registrar, editar y eliminar pertenecen a \`useInventory.js\`; las animaciones deben reaccionar a los cambios sin contener lógica de negocio.

Los componentes de Skiper UI y las animaciones de GSAP se incorporarán después de validar la interfaz funcional básica. No se deben controlar las mismas propiedades del mismo elemento con GSAP y Framer Motion simultáneamente.

**## Manejo de errores**

\`ErrorBoundary.jsx\` debe evitar que un error inesperado de renderizado deje la aplicación en blanco. Los errores de validación se muestran cerca del campo correspondiente y los errores de operación deben comunicarse mediante una interfaz clara.

**## Convenciones**

Los componentes React utilizarán PascalCase. Los hooks comenzarán con \`use\`. Las funciones auxiliares y archivos de utilidades utilizarán nombres descriptivos en camelCase. Cada archivo debe tener una responsabilidad clara y mantenerse pequeño.

Antes de agregar una dependencia, se debe comprobar si existe una solución nativa o una utilidad ya instalada. Toda dependencia nueva debe justificarse en \`PROGRESS.md\` o en el commit correspondiente.

Design
**# Diseño del sistema**

**## Principio general**

La interfaz debe priorizar claridad operativa, lectura rápida y consistencia. El sistema debe sentirse moderno por su jerarquía, tipografía, espacio, interacción y calidad del feedback, no por acumular efectos.

**## Identidad visual**

La identidad inicial será la de una herramienta confiable, limpia y profesional para uso interno de una farmacia comunitaria. No se copiará la identidad visual de una marca comercial sin autorización. La interfaz debe transmitir orden, disponibilidad de información y respuesta clara ante problemas de stock.

**## Tipografía**

Se utilizará una tipografía sans-serif legible. Los títulos deben establecer jerarquía sin ocupar más espacio del necesario. Las cifras de métricas deben tener suficiente contraste y tamaño para consultarse rápidamente.

**## Colores**

La paleta debe utilizar un fondo neutro, superficies claras u oscuras coherentes, un color principal para acciones y colores semánticos para estados. El stock agotado no debe comunicarse únicamente con rojo; debe incluir texto e icono. El contraste debe mantenerse en estados normales, hover, focus, error y disabled.

**## Espaciado y composición**

La pantalla principal debe seguir una composición de encabezado, métricas, acciones, filtros, tabla y estados contextuales. El espaciado debe ser consistente y adaptarse a pantallas pequeñas. No se debe imponer una barra lateral, un conjunto de KPI o una tabla si el flujo real no lo necesita.

**## Componentes**

\| Componente | Criterio visual |

\|---|---|

\| Header | Debe indicar el nombre de la pantalla y la acción principal. |

\| InventoryStats | Tarjetas compactas, legibles y con valor semántico. |

\| InventoryForm | Campos agrupados por relación, labels visibles y mensajes junto al error. |

\| InventoryTable | Lectura clara, acciones identificables y adaptación para pantallas estrechas. |

\| StockAlert | Estado comprensible por texto, color e icono. |

\| Button | Jerarquía entre acción principal, secundaria y destructiva. |

\| ConfirmDialog | Debe explicar la consecuencia y ofrecer cancelar como salida clara. |

\| EmptyState | Debe indicar por qué está vacío y cuál es la siguiente acción. |

**## Estados**

La aplicación debe diseñarse para los estados normal, vacío, stock bajo, agotado, error y validación. Los estados deben existir en el diseño antes de incorporar transiciones.

**## Responsive**

La experiencia debe diseñarse primero para pantallas pequeñas y ampliarse mediante breakpoints. En móvil, la tabla puede requerir desplazamiento horizontal controlado o una presentación alternativa por tarjetas, sin ocultar acciones importantes.

**## Accesibilidad**

Todos los controles deben tener etiquetas o nombres accesibles. El foco debe ser visible. Las acciones deben poder utilizarse con teclado. Los mensajes de error deben asociarse con sus campos. Los cambios de estado importantes deben comunicarse mediante texto y, cuando corresponda, \`role="status"\` o \`aria-live\`.

**## Animaciones**

Las animaciones se añadirán después de validar el flujo funcional. Deben comunicar entrada, cambio de estado, navegación o feedback. Se preferirán transformaciones y opacidad, con duraciones breves y easing consistente. No se deben animar constantemente las tablas ni los filtros.

**## Skiper UI**

Se podrá utilizar un componente gratuito de Skiper UI para una tarjeta de resumen, una transición visual o un estado vacío si mejora la interfaz. El componente se adaptará a la paleta del proyecto y se conservará la atribución exigida por su licencia. No se incorporarán componentes únicamente por estar de moda.

**## GSAP**

GSAP se utilizará para animaciones que requieran control preciso, como la entrada de métricas, alertas o filas. Se utilizará \`@gsap/react\` y \`useGSAP()\` para gestionar el ciclo de vida. No se debe controlar el mismo elemento con GSAP y Framer Motion simultáneamente.

¨PRD
**# PRD — Sistema de control de inventario farmacéutico**

**## 1. Resumen ejecutivo**

El producto será una aplicación web frontend para que el personal de una farmacia comunitaria registre, consulte y mantenga actualizado un inventario de medicamentos y suministros médicos. El MVP debe ser ligero, claro y confiable para las tareas diarias de consulta y actualización.

**## 2. Problema**

Las farmacias pequeñas pueden tener dificultades para conocer las existencias reales, detectar productos próximos a agotarse y mantener actualizados los precios y las cantidades. El sistema busca reducir la consulta manual y mejorar la visibilidad del inventario.

**## 3. Objetivo**

Desarrollar una aplicación web que permita registrar, consultar, modificar y eliminar medicamentos, identificar automáticamente los niveles críticos de stock y mostrar métricas básicas del inventario.

**## 4. Alcance del MVP**

El MVP incluirá el registro de medicamentos, la visualización del inventario en una tabla, la validación de los datos del formulario, la identificación visual de stock bajo y productos agotados, la edición de registros, la eliminación con confirmación y las métricas de resumen del inventario.

La búsqueda y el filtrado del inventario se consideran una capacidad prioritaria para una segunda parte del MVP, una vez completado el flujo principal.

**## 5. Fuera de alcance**

Quedan fuera de esta primera versión la autenticación y gestión de usuarios, el procesamiento de pagos, el sistema de ventas, la gestión de proveedores, las integraciones con sistemas externos de farmacia y cualquier función que no esté justificada por los requerimientos definidos aquí.

La persistencia con \`localStorage\`, el ordenamiento avanzado, la exportación de reportes y la conexión con una base de datos podrán evaluarse posteriormente, pero no bloquean la primera versión funcional.

**## 6. Usuario objetivo**

El usuario principal será el personal de una farmacia comunitaria encargado de consultar y mantener actualizado el inventario de medicamentos y suministros.

**## 7. Flujo principal**

El usuario ingresa a la aplicación, consulta el inventario actual, registra un medicamento mediante el formulario, corrige cualquier error de validación, visualiza el nuevo registro en la tabla, revisa las alertas de stock, edita un registro cuando es necesario y elimina un registro obsoleto previa confirmación.

**## 8. Modelo de datos**

Cada medicamento deberá manejar, como mínimo, la siguiente información:

\| Campo | Tipo | Requerido | Regla |

\|---|---|---:|---|

\| \`id\` | String o número | Sí, interno | Debe ser único. |

\| \`name\` | Texto | Sí | No puede estar vacío. |

\| \`category\` | Texto | Sí | No puede estar vacía. |

\| \`quantity\` | Número entero | Sí | Debe ser mayor o igual a cero. |

\| \`unitPrice\` | Número decimal | Sí | Debe ser mayor o igual a cero. |

\| \`stockStatus\` | Valor calculado | No | Se calcula a partir de \`quantity\`; no se duplica como estado independiente. |

**## 9. Requerimientos funcionales**

\| ID | Requerimiento | Prioridad |

\|---|---|---|

\| RF-01 | Registrar un medicamento con nombre, categoría, cantidad y precio unitario. | Must Have |

\| RF-02 | Mostrar los medicamentos registrados en una tabla interactiva. | Must Have |

\| RF-03 | Validar campos obligatorios y valores numéricos. | Must Have |

\| RF-04 | Identificar visualmente medicamentos con stock inferior a cinco unidades. | Must Have |

\| RF-05 | Identificar medicamentos con cantidad igual a cero como agotados. | Must Have |

\| RF-06 | Permitir editar los datos de un medicamento. | Must Have |

\| RF-07 | Permitir eliminar un medicamento previa confirmación. | Must Have |

\| RF-08 | Actualizar las métricas después de registrar, editar o eliminar. | Must Have |

\| RF-09 | Permitir búsqueda o filtrado del inventario. | Should Have |

**## 10. Reglas de negocio**

**\*\*RN-01 — Stock bajo.\*\*** Si la cantidad es menor que cinco, el producto se clasifica como \`Stock Bajo\`.

**\*\*RN-02 — Stock agotado.\*\*** Si la cantidad es igual a cero, el producto se clasifica como \`Agotado\`. Esta regla tiene prioridad visual sobre \`Stock Bajo\`.

**\*\*RN-03 — Stock normal.\*\*** Si la cantidad es mayor o igual a cinco, el producto se clasifica como \`Stock Normal\`.

**\*\*RN-04 — Cantidad.\*\*** La cantidad debe ser un número entero mayor o igual a cero.

**\*\*RN-05 — Precio.\*\*** El precio unitario debe ser un número mayor o igual a cero.

**\*\*RN-06 — Campos obligatorios.\*\*** No se permite registrar ni actualizar un medicamento con nombre, categoría, cantidad o precio vacío.

**\*\*RN-07 — Identificador.\*\*** Cada registro debe conservar un identificador único para permitir edición y eliminación sin depender del nombre del medicamento.

**## 11. Métricas mínimas**

La pantalla debe mostrar métricas calculadas a partir del arreglo real de medicamentos. Como mínimo se recomienda mostrar el total de productos, el total de unidades, la cantidad de productos con stock bajo y la cantidad de productos agotados. Las métricas no deben almacenarse como estados duplicados.

**## 12. Requerimientos no funcionales**

\| ID | Requerimiento |

\|---|---|

\| RNF-01 | Utilizar React + Vite, JavaScript/JSX y ESLint. |

\| RNF-02 | Utilizar arquitectura feature-based híbrida. |

\| RNF-03 | Mantener una responsabilidad clara por componente. |

\| RNF-04 | Mantener únicamente el estado necesario y calcular los datos derivados. |

\| RNF-05 | Revisar imports, sintaxis, lint, pruebas y build antes de terminar una funcionalidad. |

\| RNF-06 | Los errores inesperados de renderizado no deben producir una pantalla en blanco. |

\| RNF-07 | Los controles interactivos deben tener etiquetas accesibles, navegación por teclado y estados visuales claros. |

\| RNF-08 | No almacenar secretos ni credenciales privadas en el frontend o repositorio. |

\| RNF-09 | Las animaciones no deben impedir la lectura, interacción o comprensión del inventario. |

\| RNF-10 | Respetar \`prefers-reduced-motion\` para reducir o desactivar animaciones no esenciales. |

**## 13. Priorización MoSCoW**

\| Prioridad | Elementos |

\|---|---|

\| Must Have | Registro, tabla, validaciones, alertas, edición, eliminación y métricas. |

\| Should Have | Búsqueda y filtrado. |

\| Could Have | Persistencia con \`localStorage\`, ordenamiento y exportación. |

\| Won't Have | Autenticación, pagos, ventas, proveedores e integraciones externas en este MVP. |

**## 14. Estados de interfaz**

La aplicación debe contemplar un estado normal con inventario disponible, un estado vacío cuando no existan registros, un estado de stock bajo, un estado agotado, un estado de error durante operaciones inesperadas y un estado de validación para datos incorrectos o campos incompletos.

Cada estado importante debe comunicarse mediante texto, color, estructura e iconos. La animación puede reforzar el cambio, pero nunca debe ser el único medio de comunicación.

**## 15. Criterios de aceptación**

\| ID | Criterio |

\|---|---|

\| CA-01 | Al enviar datos válidos, el medicamento aparece en la tabla y las métricas se actualizan. |

\| CA-02 | Si faltan campos obligatorios, el registro se bloquea y se muestran mensajes claros. |

\| CA-03 | Un medicamento con menos de cinco unidades muestra el estado \`Stock Bajo\`. |

\| CA-04 | Un medicamento con cero unidades muestra el estado \`Agotado\`. |

\| CA-05 | Al guardar cambios de edición, la información actualizada aparece inmediatamente. |

\| CA-06 | Al confirmar una eliminación, el registro desaparece y las métricas se actualizan. |

\| CA-07 | La búsqueda o el filtrado, cuando estén implementados, muestran únicamente los registros correspondientes. |

\| CA-08 | El flujo principal puede utilizarse con teclado y los controles poseen nombres accesibles. |

**## 16. Arquitectura técnica**

La aplicación utilizará React + Vite con JavaScript/JSX y ESLint. La funcionalidad del inventario permanecerá dentro de \`features/inventory/\`. Los componentes genéricos reutilizables se ubicarán en \`shared/\`. \`App.jsx\` orquestará la aplicación y \`main.jsx\` será únicamente el punto de entrada y montaje de React.

Skiper UI se utilizará únicamente para componentes visuales que aporten valor real. GSAP se utilizará para animaciones controladas y separadas de la lógica de datos. No se deben animar las mismas propiedades del mismo elemento con GSAP y Framer Motion al mismo tiempo.

**## 17. Proceso de validación**

Después de cada funcionalidad se deben revisar imports y sintaxis, ejecutar ESLint, ejecutar las pruebas disponibles, realizar el build de producción, probar el flujo principal, validar los criterios de aceptación, comprobar los estados vacío y error, revisar accesibilidad básica y confirmar que no existan regresiones.

**## 18. Definición de terminado**

Una funcionalidad se considera terminada cuando cumple el objetivo solicitado, satisface sus criterios de aceptación, funciona mediante el flujo real del usuario, pasa las validaciones correspondientes y no introduce regresiones.

Progress
**# Progreso del proyecto**

**## Estado actual**

**\*\*Fase actual:\*\*** Fase 0 — Preparación documental.

**\*\*Estado:\*\*** En preparación. Todavía no se ha modificado la estructura técnica ni se ha implementado la funcionalidad del inventario.

**\*\*Última actualización:\*\*** 2026-09-03.

**## Regla de avance**

No se debe pasar a la siguiente fase hasta que la fase actual haya sido revisada por ambos integrantes, probada y aprobada. Cada avance debe quedar registrado en este archivo y en \`PROMPTS.md\`.

**## Fase 0 — Preparación**

\- [ ] Crear o confirmar el proyecto Vite.

\- [ ] Confirmar React y JSX.

\- [ ] Confirmar ESLint.

\- [ ] Confirmar Tailwind CSS.

\- [ ] Confirmar shadcn/ui y \`components.json\`.

\- [ ] Confirmar la estructura de carpetas.

\- [ ] Ejecutar \`npm run lint\`.

\- [ ] Ejecutar \`npm run build\`.

\- [ ] Registrar la sesión en \`PROMPTS.md\`.

**## Fase 1 — Lógica del inventario**

\- [ ] Definir el modelo de medicamento.

\- [ ] Implementar el registro.

\- [ ] Implementar la edición.

\- [ ] Implementar la eliminación.

\- [ ] Implementar las validaciones.

\- [ ] Implementar la clasificación del stock.

\- [ ] Implementar las métricas calculadas.

**## Fase 2 — Formulario**

\- [ ] Crear \`InventoryForm.jsx\`.

\- [ ] Crear campos de nombre, categoría, cantidad y precio.

\- [ ] Mostrar mensajes de validación.

\- [ ] Validar teclado y accesibilidad.

**## Fase 3 — Tabla**

\- [ ] Crear \`InventoryTable.jsx\`.

\- [ ] Crear \`InventoryRow\.jsx\`.

\- [ ] Mostrar acciones de edición y eliminación.

\- [ ] Mostrar estados del stock.

\- [ ] Implementar estado vacío.

**## Fase 4 — Estados y métricas**

\- [ ] Crear \`InventoryStats.jsx\`.

\- [ ] Crear \`StockAlert.jsx\`.

\- [ ] Crear \`ConfirmDialog.jsx\`.

\- [ ] Crear o integrar \`ErrorBoundary.jsx\`.

\- [ ] Validar estados normal, vacío, error, validación, bajo y agotado.

**## Fase 5 — Búsqueda y filtros**

\- [ ] Implementar búsqueda por nombre.

\- [ ] Implementar filtro por categoría o estado.

\- [ ] Validar que los datos originales no se dupliquen como estado derivado.

**## Fase 6 — Diseño base**

\- [ ] Aplicar tokens visuales.

\- [ ] Aplicar Tailwind CSS.

\- [ ] Integrar componentes base de shadcn/ui.

\- [ ] Integrar iconos Lucide.

\- [ ] Validar responsive.

\- [ ] Validar accesibilidad.

**## Fase 7 — Skiper UI**

\- [ ] Seleccionar un componente gratuito con una necesidad justificada.

\- [ ] Revisar dependencias y licencia.

\- [ ] Adaptar TSX a JSX si es necesario.

\- [ ] Integrarlo en \`shared/\` o en la feature correspondiente.

\- [ ] Validar apariencia, accesibilidad y build.

**## Fase 8 — GSAP**

\- [ ] Instalar \`gsap\` y \`@gsap/react\`.

\- [ ] Implementar animaciones necesarias.

\- [ ] Añadir limpieza mediante \`useGSAP()\`.

\- [ ] Respetar \`prefers-reduced-motion\`.

\- [ ] Confirmar que no haya conflicto con Framer Motion.

**## Fase 9 — Cierre**

\- [ ] Ejecutar ESLint.

\- [ ] Ejecutar pruebas disponibles.

\- [ ] Ejecutar build.

\- [ ] Verificar criterios de aceptación.

\- [ ] Revisar errores y estados vacíos.

\- [ ] Realizar demo.

\- [ ] Actualizar README y reflexión.

**## Registro de cambios**

\| Fecha | Integrante | Cambio | Validación | Estado |

\|---|---|---|---|---|

\| 2026-09-03 | Equipo | Creación de documentación inicial. | Pendiente de revisión conjunta. | En revisión |

**# Bitácora de prompts**

Este archivo registra el ciclo de trabajo con asistentes de IA. Cada integrante debe añadir una entrada después de una sesión importante. No se debe completar de memoria al final.

**## Ciclo de trabajo**

\`\`\`text

Describe → Genera → Revisa → Prueba → Refina

\`\`\`

**## Reglas de registro**

Cada entrada debe indicar quién trabajó, en qué rama, qué archivos estaban involucrados, cuál fue el objetivo, qué prompt se utilizó, qué generó la IA, qué revisó la persona y cómo se validó el resultado.

**## Fase 0 — Preparación**

**### Iteración 01 — Documentación inicial**

**\*\*Fecha:\*\*** 2026-09-03  

**\*\*Integrante:\*\*** [Nombre]  

**\*\*Rama:\*\*** [nombre-de-la-rama]  

**\*\*Objetivo:\*\*** Crear y revisar la documentación base del proyecto.  

**\*\*Prompt utilizado:\*\***

\`\`\`text

[Copiar aquí el prompt utilizado]

\`\`\`

**\*\*Archivos creados o modificados:\*\***

\`\`\`text

[Lista de rutas]

\`\`\`

**\*\*Resultado de la IA:\*\***

[Describir brevemente el resultado.]

**\*\*Revisión humana:\*\***

[Indicar qué se revisó, qué se aceptó y qué se cambió.]

**\*\*Problemas encontrados:\*\***

[Registrar errores, contradicciones o decisiones pendientes.]

**\*\*Correcciones realizadas:\*\***

[Registrar las correcciones.]

**\*\*Validación:\*\***

\- [ ] Revisión del compañero.

\- [ ] \`npm run lint\`.

\- [ ] \`npm run build\`.

\- [ ] Revisión de documentos.

**\*\*Resultado:\*\*** Pendiente / Aprobado / Requiere cambios.

**## Fase 1 — Lógica del inventario**

**### Iteración 01**

**\*\*Fecha:\*\*** [AAAA-MM-DD]  

**\*\*Integrante:\*\*** [Nombre]  

**\*\*Rama:\*\*** [nombre-de-la-rama]  

**\*\*Objetivo:\*\*** [Objetivo concreto.]  

**\*\*Prompt:\*\***

\`\`\`text

[Prompt]

\`\`\`

**\*\*Resultado de la IA:\*\*** [Resumen.]  

**\*\*Revisión humana:\*\*** [Revisión.]  

**\*\*Problemas:\*\*** [Problemas.]  

**\*\*Correcciones:\*\*** [Correcciones.]  

**\*\*Validación:\*\*** [Comandos y resultado.]  

**\*\*Estado:\*\*** Pendiente / Aprobado / Requiere cambios.

**## Plantilla para nuevas iteraciones**

**### Iteración [número]**

**\*\*Fecha:\*\*** [AAAA-MM-DD]  

**\*\*Integrante:\*\*** [Nombre]  

**\*\*Rama:\*\*** [Rama]  

**\*\*Fase:\*\*** [Fase]  

**\*\*Objetivo:\*\*** [Qué se quiere lograr.]  

**\*\*Prompt utilizado:\*\***

\`\`\`text

[Prompt completo]

\`\`\`

**\*\*Archivos afectados:\*\*** [Rutas.]  

**\*\*Resultado generado:\*\*** [Resumen.]  

**\*\*Revisión humana:\*\*** [Qué se comprobó.]  

**\*\*Problemas encontrados:\*\*** [Detalles.]  

**\*\*Correcciones aplicadas:\*\*** [Detalles.]  

**\*\*Pruebas ejecutadas:\*\*** [Comandos y resultado.]  

**\*\*Decisión:\*\*** Aprobado / Requiere cambios.

**# Reflexión del proyecto**

Este documento se completará al finalizar el desarrollo y la presentación. Su propósito es analizar el proceso de trabajo con IA y distinguir las decisiones humanas de los resultados generados.

**## 1. Tiempo de desarrollo**

¿Cuánto tiempo estimamos que habría tomado realizar el proyecto sin IA?

[Respuesta]

¿Cuánto tiempo tomó utilizando IA?

[Respuesta]

¿Qué fases consumieron más tiempo y por qué?

[Respuesta]

**## 2. Errores de la IA**

¿En qué momentos la IA generó código incorrecto, innecesario o incompatible con el proyecto?

[Respuesta]

¿Cómo detectamos cada error?

[Respuesta]

¿Cómo lo corregimos y qué aprendimos?

[Respuesta]

**## 3. Trabajo humano frente a trabajo de IA**

¿Qué decisiones de producto, arquitectura y diseño tomamos nosotros?

[Respuesta]

¿Qué partes generó la IA?

[Respuesta]

¿Qué partes tuvimos que revisar, adaptar o reescribir?

[Respuesta]

**## 4. Rol del desarrollador**

¿Cómo cambió nuestra percepción del trabajo de un desarrollador al utilizar IA?

[Respuesta]

¿Qué conocimientos fueron necesarios para evaluar las respuestas de la IA?

[Respuesta]

¿Qué riesgos identificamos al aceptar código generado sin revisión?

[Respuesta]

**## 5. Conclusión**

[Conclusión del equipo sobre el ciclo Describe → Genera → Revisa → Prueba → Refina.]