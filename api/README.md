Reproductor Adaptativo
======================

Dependencias:

nodejs:v20.10.0

* * *

mongodb: MongoDB:7.0.4

* * *

Mongosh:2.1.1(para ver la los registros en la base de datos)

* * *

FFmpeg para window: https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z (https://es.wikihow.com/instalar-FFmpeg-en-Windows)

* * *

Las versiones antes mencionadas, son compatibles con el proyecto del reproductor adaptativo. Para que el proyecto no tenga ningun problema, la ruta hacia el proyecto no debe contener espacios ni caracteres extraños asi:

* * *

C:\\proyecto\\reproductoradaptativohls (correcto)

C:\\nuevo proyecto\\reproductoradaptativohls (incorrecto)

C:\\proy-ecto\\reproductor-adaptativo-hls (incorrecto)

* * *

Una vez instalada mongodb, ffmpeg, mongosh, nodejs, lo que resta es ir a la raiz del proyecto, e instalar las dependencias de nodejs con el comando "npm i".

Y por ultimo, para empezar a ejecutar el proyecto, tenemos que iniciar el demonio de mongodb, por defecto este proyecto usara la base de datos "reproductor", esto lo podemos cambiar en el archivo "db.config.json" que se encuentra en la carpeta "config", aunque, puede ser la base de datos que usted desee(evite borrar su propia base de datos, se recomienda cambiar la base de datos en caso de que se pueda sobreescribir con otra base de datos).

Dato importante:
En nuestro proyecto, tenemos que crear la carpeta "uploads" y dentro de esta la carpeta "temp", estas son fundamentales, para que el programa pueda guardar los videos fragmentados, y luego eliminar el video original.

* * *
Para inicializar el projecto, solo utilice el comando nmp start, esto ejecuara el proyecto en el puerto 3000

