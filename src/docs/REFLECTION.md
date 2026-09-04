# Reflexión del proyecto

## 1. Tiempo de desarrollo

Sin IA, un proyecto con formulario, validaciones, tarjetas, modal, importación CSV/Excel, persistencia y estilos responsive habría requerido varios días de trabajo para un desarrollador en formación. Con IA, el equipo pudo avanzar con mayor rapidez, pero el tiempo no desapareció: se trasladó a la revisión, las pruebas, la corrección de errores y la coordinación entre ramas.

El tiempo exacto utilizado por el equipo debe completarse con los datos reales de la práctica:

```text
Tiempo estimado sin IA: [completar]
Tiempo real utilizando IA: [completar]
```

Las fases que más tiempo consumieron fueron la integración de tarjetas y modal, la importación masiva y la corrección de casos que no se detectan solo leyendo el código. La importación, por ejemplo, parecía terminada hasta que se probó un CSV real con el encabezado `Categoría`.

## 2. Errores de la IA

La IA generó varias propuestas que requirieron revisión humana. En un momento entregó componentes con props que ya no se utilizaban, lo que produjo errores de ESLint. También propuso un `setState` síncrono dentro de un `useEffect`, rechazado por las reglas de React del proyecto.

Además, la primera integración de importación mostraba la vista previa, pero no conectaba completamente las filas válidas con el estado del inventario. Otro problema apareció cuando el lector CSV no reconocía correctamente la tilde de `Categoría`.

Estos errores se detectaron ejecutando `npm run lint`, `npm run build` y probando la aplicación con un archivo real. La corrección consistió en revisar el repositorio actual, reemplazar archivos completos, probar nuevamente y no aceptar una respuesta de IA solo porque parecía razonable.

## 3. Trabajo humano frente al trabajo de IA

El equipo humano tomó las decisiones principales de producto: resolver inventarios en papel, mantener una aplicación de una sola página, utilizar tarjetas en lugar de una tabla, editar dentro del detalle, bloquear alertas nativas, incorporar Deshacer, aceptar archivos Excel y adaptar la moneda a Costa Rica.

La IA ayudó a proponer estructuras, componentes, estilos, validaciones, lectura de archivos y alternativas de implementación. Sin embargo, el equipo decidió qué funcionalidades quedaban fuera: login, backend, dashboard complejo, pagos, ventas y funcionalidades que no eran necesarias para el problema central.

La revisión humana también determinó cuándo una solución no era adecuada. Por ejemplo, se rechazó repetir archivos que ya estaban aplicados, se exigieron archivos completos con rutas exactas y se comprobó la diferencia entre el estado documentado y el estado real del repositorio.

## 4. Rol del desarrollador

El proyecto cambió nuestra percepción del desarrollador. Ya no se trata únicamente de escribir cada línea manualmente, sino de comprender el problema, describirlo con precisión, revisar la solución, probarla y asumir la responsabilidad por el resultado.

Para evaluar el código generado fueron necesarios conocimientos de React, hooks, estado, props, eventos, CSS, accesibilidad, validación de datos, Git, npm y lectura de errores de ESLint y Vite.

El principal riesgo de aceptar código generado sin revisión es creer que una interfaz terminada visualmente también está terminada funcionalmente. En este proyecto, el build podía pasar aunque la importación no estuviera conectada, y una vista previa podía mostrarse aunque todas las filas fueran inválidas por un problema de codificación.

## 5. Conclusión

El ciclo `Describe → Genera → Revisa → Prueba → Refina` fue la parte más importante de la práctica. Describir el problema permitió mantener un alcance pequeño. Generar código aceleró la construcción. Revisar permitió detectar decisiones incompatibles. Probar con comandos y archivos reales reveló errores que no eran evidentes. Refinar convirtió un prototipo básico en un MVP más útil para una farmacia pequeña.

La conclusión principal es que la IA funciona mejor como colaborador técnico bajo dirección humana. Puede producir código rápidamente, pero el desarrollador debe decidir qué construir, comprobar que funciona, detectar riesgos y explicar las decisiones del proyecto.
