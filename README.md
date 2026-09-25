# Altagracia — web con scrolltelling

Web estática basada en el archivo `index(4).html` facilitado. Mantiene el nombre, la ubicación en Valdemoro, la propuesta de cocina peruana y mediterránea y los 29 platos con descripciones y precios del documento original.

## Qué incluye

- Apertura cinematográfica, partículas y movimiento de portada.
- Tres escenas fotográficas que cambian durante el desplazamiento.
- Transición hacia la carta mediante una ventana que se expande.
- Aparición progresiva de títulos, bloques y platos; barra de progreso, menú móvil y detalles de interacción con el cursor.
- Adaptación a móvil y tratamiento específico para `prefers-reduced-motion`.
- HTML, CSS y JavaScript sin compilación ni dependencias de código externas.

## Archivos

- `index.html`: contenido y carta.
- `motion.css`: estilo y efectos añadidos al diseño del documento.
- `motion.js`: secuencias ligadas al scroll e interacciones.

## Antes de publicar

1. Revisa la carta y los precios vigentes. Se han trasladado del documento adjunto sin modificarlos.
2. El logo del HTML recibido apuntaba a `assets/logo-altagracia.png`, pero el archivo no venía adjunto. Lo he sustituido por un nombre tipográfico. Si dispones del logo oficial, incorpóralo y cambia el elemento `.brand-wordmark`.
3. Las fotos se cargan desde las direcciones que venían en el HTML original. Para una publicación definitiva, conviene sustituirlas por archivos de Altagracia autorizados y alojados dentro del proyecto. Si cambian las direcciones externas, podrían dejar de mostrarse.
4. La reserva online está pendiente de un proveedor real; la web lo indica y no simula confirmaciones ni disponibilidad.
5. Confirma los textos legales y cualquier dato comercial antes de utilizar el sitio públicamente.

## Subir a GitHub y conectar con Vercel

1. Descomprime el ZIP y crea un repositorio nuevo en GitHub.
2. Sube los cuatro archivos del proyecto a la raíz con **Add file → Upload files → Commit changes**. No subas solamente `index.html`: necesita también `motion.css` y `motion.js`.
3. En [Vercel](https://vercel.com/new), pulsa **Import Git Repository**, conecta GitHub y selecciona el repositorio.
4. Mantén el directorio raíz como `./`; no hace falta framework ni comando de compilación. Pulsa **Deploy**.
5. Si tienes dominio, añádelo en **Project → Settings → Domains** y aplica los registros DNS que te indique Vercel.

## Vista local

Desde esta carpeta, ejecuta `python3 -m http.server 8000` y abre `http://localhost:8000`.
