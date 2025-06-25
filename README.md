# Check-in de Entradas

Este proyecto implementa un servidor local para validar entradas de eventos a partir de un archivo `tickets.csv`. Incluye una pagina web con un campo de texto donde se escanea el codigo de la entrada.

## Instalacion

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar el servidor:
   ```bash
   node server.js
   ```

El servidor estara disponible en `http://localhost:3000`.

## Uso

1. Abrir la URL del servidor en un navegador.
2. El campo de texto tiene el foco por defecto. Escanee el codigo de barras o escribalo manualmente y presione **Enter**.
3. Se mostrara si la entrada es valida, su tipo y si ya fue utilizada.
4. Para descargar el CSV actualizado visite `http://localhost:3000/export`.

Los codigos se definen en `tickets.csv` con la estructura:

```
numero de codigo,preventa,tipo de entrada,hora de ingreso,observaciones
ABC123,No,VIP,,
DEF456,Si,General,,
GHI789,No,Premium,,
```

La columna **hora de ingreso** se actualiza automaticamente cuando se valida un codigo. Si este campo esta vacio significa que la entrada aun no ingreso. Cada codigo solo puede utilizarse una vez.
