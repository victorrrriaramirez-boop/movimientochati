# UMBRA — web de restaurante

Web demostrativa de una sola página, en español, con animaciones ligadas al desplazamiento, fotografía a pantalla completa, diseño adaptable y opción de movimiento reducido. No requiere instalación ni compilación.

## Antes de publicarla

Sustituye «UMBRA» y los textos de ejemplo por los datos reales del restaurante. En `index.html`, cambia `reservas@ejemplo.com` por el correo de reservas real; el botón actual abre una solicitud por correo y no confirma mesas ni incorpora un sistema de reservas. Confirma ciudad, carta, horarios, dirección, redes y textos legales antes de añadirlos. Las fotografías se cargan desde Unsplash; para una web definitiva, sustitúyelas por fotos propias y revisa sus condiciones de uso.

## Publicar en GitHub y Vercel

1. Descomprime el ZIP. En GitHub, crea un repositorio nuevo e incorpora los tres archivos (`index.html`, `styles.css` y `script.js`) junto con este README en la raíz del repositorio. Puedes usar **Add file → Upload files → Commit changes**.
2. En [Vercel](https://vercel.com/new), selecciona **Import Git Repository**, conecta GitHub si se solicita y elige ese repositorio.
3. Mantén el directorio raíz como `./`. Vercel detecta una página HTML estática: no hace falta comando de compilación ni instalar dependencias. Pulsa **Deploy**.
4. Para añadir un dominio, entra en **Project → Settings → Domains** y sigue las instrucciones DNS que muestre Vercel. Cada cambio enviado a la rama de producción generará una nueva versión.

## Modificar imágenes y colores

Las tres URLs de imágenes están en `styles.css`: `.hero-image`, `.dish-photo` y `.space-photo`. El color de acento está en la variable `--accent`. El archivo `script.js` controla la barra de progreso, las apariciones y las transformaciones suaves al desplazarse.

## Vista local

Abre `index.html` en un navegador o ejecuta `python3 -m http.server 8000` desde esta carpeta y visita `http://localhost:8000`.

## Referencias visuales

Inspiración de composición oscura y tipografía monumental: Refero Styles. Inspiración de movimiento y narrativa visual: Lusion, Active Theory y Unseen. Esta implementación es una propuesta original, no una reproducción de sus recursos o código.
