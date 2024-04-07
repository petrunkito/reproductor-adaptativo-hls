
## Explicación


Este es un proyecto que simula la reproducción adaptativa al igual que plataformas como YouTube y Netflix, que descargan fragmentos de un video mientras el usuario ve su contenido, siempre manteniendo una experiencia fluida y descargando bajo de banda el contenido en diferentes resoluciones de video como 240p, 360p, 480p, 720p, 1080p.

El fron-end, es encargado de subir el video al back-end local, para que este lo empieza, ha fragmentar en pedazos de videos más pequeños y en diferentes resoluciones, siempre y cuando el video lo permita.

Luego que el video este en sus diferentes resoluciones, el usuario ya podrá consumir su contenido en múltiples calidades.

## Nota:

Para lograr el fragmentado usamos FFmpeg, que es un software libre que puede grabar, convertir y hacer streaming de audio y vídeo. Incluye libavcodec, una biblioteca de códecs. FFmpeg se puede usar en diferentes sistemas operativos, incluyendo Windows, debes instalarlo y agregar la carpeta bin a las variables de entorno "C:\FFmpeg\bin"

## Importante:

En este proyecto, se ha separado la parte lógica del front-end y el back-end, cada uno en carpetas separadas, además cada aplicación se levanta en un puerto diferente, por ejemplo el front-end se levantará en el puerto 5050 y el back-end en el puerto 3000.

En cada carpeta están los README.md para poder levantar los proyectos; explica como están estructurados; desde que archivo empieza a leer el programa y detalles técnicos de cada uno.

Algo muy importante, una vez instaladas las dependencias y paquetes en cada carpeta, te recomendamos activar primero del demonio de MongoDB.

## Requerimientos previos:

Antes de ejecutar los proyectos, debe usted tener instaladas las siguientes dependencias:

-MongoDB como motor de base de datos versión 6.0.0 también funciona con la última versión.

-Mongosh la CLI de MongoDB para consultar los datos de manera manual(opcional) versión 1.5.4.

-Node.js versión 14.17.1 también funciona con la versión 20.11.1.

-FFmpeg versión 2024-04-04-git-478d97f303 link para Windows 64 bit https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-essentials.7z

-Git versión 2.42.0

## Comienzo rápido:

Para no tener problemas ve a alguna parte de tu computadora, escritorio, documentos, la de tu preferencia y utiliza este comando:
```sh
git clone https://github.com/petrunkito/project-rick-and-morty.git
```

Lo único que tienes que hacer ahora, es instalar las dependencias antes mencionadas y luego, seguir las indicaciones de los archivos README.md, en las carpetas front-end y back-end, si quieres empezar a ejecutar el proyecto inmediatamente, después de seguir estos pasos, ve al apartado de "Comienzo Rápido" en cada archivo README.md del front-end y el back-end, así ejecutar el proyecto de manera inmediata.