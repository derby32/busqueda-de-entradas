# Check-in de Entradas

Este proyecto implementa un servidor local para validar entradas de eventos. Incluye una pagina web con un campo de texto donde se escanea el codigo de la entrada.

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

Los codigos de ejemplo incluidos son:
- `ABC123` (VIP)
- `DEF456` (General)
- `GHI789` (Premium)

Cada codigo solo puede utilizarse una vez.
