# AGENTS.md

## Contexto

Este repositorio contiene un MVP frontend de inventario farmacéutico para una práctica de Vibe Coding. El objetivo es resolver un problema central de un pequeño negocio: registrar medicamentos y detectar rápidamente cuáles necesitan reposición.

El desarrollo sigue el ciclo:

```text
Describe → Genera → Revisa → Prueba → Refina
```

La IA genera propuestas y código, pero el equipo humano dirige, decide, revisa, prueba y asume la responsabilidad final.

## Alcance

El MVP debe registrar, mostrar, validar, editar y eliminar medicamentos. Debe clasificar el stock como normal, bajo o agotado y contemplar estados vacío y error. La búsqueda, las métricas adicionales, la persistencia local, Skiper UI y GSAP son opcionales y no deben bloquear los tres criterios de éxito.

No se deben agregar backend, autenticación, pagos, ventas, proveedores, recetas, integraciones externas ni funcionalidades empresariales no descritas en `PRD.md`.

## Jerarquía

```text
PLANIFICACIÓN → ARQUITECTURA → DESARROLLO → DISEÑO → INTERACCIONES → VALIDACIÓN
```

Debe completarse y validarse una fase antes de avanzar. No se deben mezclar lógica, diseño y animaciones en una sola iteración.

## Reglas técnicas

Se utilizarán React, Vite, JavaScript/JSX y ESLint. No se debe introducir TypeScript. La lógica específica permanece en `src/features/inventory/`; los recursos reutilizables van en `src/shared/`. No se deben crear dependencias nuevas sin justificación.

El estado principal vive en una sola instancia de `useInventory()`. Las métricas, el estado del stock y los resultados filtrados son datos derivados y no deben duplicarse como estados independientes.

## Reglas para asistentes de IA

Antes de proponer código, la IA debe explicar el objetivo de la fase, los archivos que afectará y lo que no hará. No debe crear, borrar, instalar, hacer commit, hacer push ni modificar el repositorio por su cuenta.

Cuando se solicite código, debe entregar cada archivo completo, con su ruta exacta y la acción a realizar. No debe entregar fragmentos ambiguos ni decir “agrega esto donde corresponda”. Si un archivo existente debe cambiarse, debe entregar su contenido completo.

La IA debe detenerse después de la tarea solicitada. No debe continuar automáticamente con la siguiente fase ni implementar funcionalidades no autorizadas.

## Formato obligatorio de código

```text
RUTA: src/ruta/del/archivo.js

ACCIÓN: Crear archivo nuevo / Reemplazar archivo existente / Modificar archivo existente

CÓDIGO COMPLETO:

```javascript
[contenido completo]
```

COMANDOS POWERSHELL:
[comandos necesarios]

VERIFICACIÓN:
[qué debe comprobar el usuario]
```

## Validación humana

Después de cada cambio, el equipo debe revisar el código, probar casos normales y errores, ejecutar `npm run lint`, ejecutar `npm run build` y registrar el resultado en `src/docs/PROMPTS.md` y `src/docs/PROGRESS.md`.

La IA debe señalar cualquier librería, función o comportamiento que no pueda confirmar. No debe inventar APIs ni asumir que una dependencia está instalada.

## Diseño e interacciones

La interfaz debe ser comprensible sin animaciones. Skiper UI y GSAP se incorporarán únicamente durante el pulido y solo si aportan valor. GSAP no debe modificar la lógica de negocio ni competir con Framer Motion sobre el mismo elemento. Las animaciones no esenciales deben respetar `prefers-reduced-motion`.
