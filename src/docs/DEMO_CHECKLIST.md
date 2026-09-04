# Checklist de demo — Inventario Farmacéutico

## Preparación

- Ejecutar `npm run lint`.
- Ejecutar `npm run build`.
- Abrir la aplicación en el navegador.
- Tener preparado un CSV con las columnas `Nombre`, `Categoría`, `Cantidad` y `Precio unitario`.
- Verificar que el navegador no tenga datos antiguos que interfieran con la demostración.

## Demostración funcional

| Paso | Acción | Resultado esperado |
|---|---|---|
| 1 | Registrar un medicamento | Aparece una tarjeta y aumentan las métricas |
| 2 | Registrar el mismo medicamento y categoría | El sistema bloquea el duplicado |
| 3 | Abrir una tarjeta | Aparece el modal de detalle |
| 4 | Editar cantidad desde el modal | La tarjeta y las métricas se actualizan |
| 5 | Cerrar con X, Escape o clic fuera | El modal desaparece |
| 6 | Pulsar Eliminar | Aparece un diálogo propio |
| 7 | Cancelar | El medicamento permanece |
| 8 | Confirmar y pulsar Deshacer | El medicamento se restaura |
| 9 | Importar el CSV | Aparece una vista previa |
| 10 | Confirmar la importación | Las filas válidas aparecen como tarjetas |
| 11 | Importar un duplicado | El duplicado se omite |
| 12 | Recargar la página | El inventario permanece |

## Mensaje de cierre

El MVP sustituye el registro manual en papel por un inventario visual que permite registrar medicamentos, consultar el stock, editar información, eliminar con recuperación, importar listas existentes y conservar los datos localmente.
