# Progreso del proyecto

## Estado actual

**Fase actual:** Fase 0 — Preparación documental.

**Estado:** En preparación. Todavía no se ha modificado la estructura técnica ni se ha implementado la funcionalidad del inventario.

**Última actualización:** 2026-09-03.

## Regla de avance

No se debe pasar a la siguiente fase hasta que la fase actual haya sido revisada por ambos integrantes, probada y aprobada. Cada avance debe quedar registrado en este archivo y en `PROMPTS.md`.

## Fase 0 — Preparación

- [ ] Crear o confirmar el proyecto Vite.
- [ ] Confirmar React y JSX.
- [ ] Confirmar ESLint.
- [ ] Confirmar Tailwind CSS.
- [ ] Confirmar shadcn/ui y `components.json`.
- [ ] Confirmar la estructura de carpetas.
- [ ] Ejecutar `npm run lint`.
- [ ] Ejecutar `npm run build`.
- [ ] Registrar la sesión en `PROMPTS.md`.

## Fase 1 — Lógica del inventario

- [ ] Definir el modelo de medicamento.
- [ ] Implementar el registro.
- [ ] Implementar la edición.
- [ ] Implementar la eliminación.
- [ ] Implementar las validaciones.
- [ ] Implementar la clasificación del stock.
- [ ] Implementar las métricas calculadas.

## Fase 2 — Formulario

- [ ] Crear `InventoryForm.jsx`.
- [ ] Crear campos de nombre, categoría, cantidad y precio.
- [ ] Mostrar mensajes de validación.
- [ ] Validar teclado y accesibilidad.

## Fase 3 — Tabla

- [ ] Crear `InventoryTable.jsx`.
- [ ] Crear `InventoryRow.jsx`.
- [ ] Mostrar acciones de edición y eliminación.
- [ ] Mostrar estados del stock.
- [ ] Implementar estado vacío.

## Fase 4 — Estados y métricas

- [ ] Crear `InventoryStats.jsx`.
- [ ] Crear `StockAlert.jsx`.
- [ ] Crear `ConfirmDialog.jsx`.
- [ ] Crear o integrar `ErrorBoundary.jsx`.
- [ ] Validar estados normal, vacío, error, validación, bajo y agotado.

## Fase 5 — Búsqueda y filtros

- [ ] Implementar búsqueda por nombre.
- [ ] Implementar filtro por categoría o estado.
- [ ] Validar que los datos originales no se dupliquen como estado derivado.

## Fase 6 — Diseño base

- [ ] Aplicar tokens visuales.
- [ ] Aplicar Tailwind CSS.
- [ ] Integrar componentes base de shadcn/ui.
- [ ] Integrar iconos Lucide.
- [ ] Validar responsive.
- [ ] Validar accesibilidad.

## Fase 7 — Skiper UI

- [ ] Seleccionar un componente gratuito con una necesidad justificada.
- [ ] Revisar dependencias y licencia.
- [ ] Adaptar TSX a JSX si es necesario.
- [ ] Integrarlo en `shared/` o en la feature correspondiente.
- [ ] Validar apariencia, accesibilidad y build.

## Fase 8 — GSAP

- [ ] Instalar `gsap` y `@gsap/react`.
- [ ] Implementar animaciones necesarias.
- [ ] Añadir limpieza mediante `useGSAP()`.
- [ ] Respetar `prefers-reduced-motion`.
- [ ] Confirmar que no haya conflicto con Framer Motion.

## Fase 9 — Cierre

- [ ] Ejecutar ESLint.
- [ ] Ejecutar pruebas disponibles.
- [ ] Ejecutar build.
- [ ] Verificar criterios de aceptación.
- [ ] Revisar errores y estados vacíos.
- [ ] Realizar demo.
- [ ] Actualizar README y reflexión.

## Registro de cambios

| Fecha | Integrante | Cambio | Validación | Estado |
|---|---|---|---|---|
| 2026-09-03 | Equipo | Creación de documentación inicial. | Pendiente de revisión conjunta. | En revisión |
