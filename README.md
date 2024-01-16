'introduccion'

Este proyecto es una aplicacion web, en la que puedes subir tus videos, y consumirlo de manera adaptativa como si fuese un video de youtube o netflix.

Para entrar en materia y saber como funciona esta aplicacion tomaremos el ejemplo de youtube.

Has notado que al ver un video en youtube, este se presenta en diferentes calidades(1080p, 720p, 480p, 360p, 240p, 144p ) y ademas cuando empieza a reproducirse el video, ves una barra gris que siempre avanza mas rapido de lo que se reproduce el video?, pues esta indica cuanto has descargado del video. pero ¿porque no se descarga todo el video de una sola vez?, esto se debe a que descargarlo todo llevaria mucho tiempo y por consiguiente arruinar la experiencia del usuario, es por eso que siempre se descarga una parte, y amedida que vallas avanzando se van descargando y agregando mas partes al video, esto tiene claras ventajas, ya que la primera parte del contenido se visualiza mas rapido y mejora la experiencia del usuario; se descarga solo lo que vallas consumiendo por lo que ahorraras datos del usuario.


cuando subes un video de una calidad de 1080p a youtube, este es fragmentado en pequeños pedazos de videos normalmente de 4 a 6 segundos, y si el video tiene una calidad alta como en este ejemplo, cada fragmento estaria en cada calidad de video de 1080p, 720p, 480p, 360p, 240p, 144p, pero aclaro, si el video que subiste tiene una calidad de 360p, este no podra fragmentarse en calidades superiores.

eso quiere decir que en los servidores de youtube, hay mas de un video almacenado y ademas en diferentes resoluciones. pero ¿acaso esto no es muy costo en terminos de almacenamiento?, ¿no seria mejor almacenar un video y fragmentar el video en tiempo real a cada usuario?. estas son buenas preguntas, pero la verdad es que la capacidad computacional de fragmentar los videos en pedazos y en cada resolucion es mucho mas costoso que solo sacrificar un poco mas de espacio en disco, ademas que sacrificarias la experiencia del usuario por el tiempo que este proceso tomaria, por eso es mejor tener el video almacenado y fragmentado en diferentes resoluciones y entregar cada fragmento al usuario a medida que lo necesite.


'¿como funciona este proyecto?'

Este proyecto es algo similar al ejemplo anterior, subes un video desde el front-end, la api del back-end lo recibe y lo empieza a fragmentar en las diferentes resoluciones, una vez tu video este listo, se almacena la informacion del video en la base de datos, luego lo podras reproducir en el front-end, y apreciar que a medida que vallas avanzando en tu video, el cliente le ira pidiendo cierta cantidad de fragmentos a la api y los ira incertando en tu reproductor, para que tengas una experiencia de usuario fluida.


este proyecto fue hecho de tal manera, que el front-end y el back-end esten separados, y cada uno se pueda ejecutar en un puerto diferente:

front-end(carpeta "cliente"): por defecto se inicia en el puerto 5050
back-end(carpeta "api"): por defecto se inicia en el puerto 3000

!importante: si deseas construir tu propio reproductor adaptativo de manera mas facil, te recomiendo usar la libreria hls.js que la puedes encontrar en github y npm. por motivos personales este proyecto no utiliza esta libreria ya que el objetivo era aprender el funcionamiento de la reproduccion adaptativa.


datos a tener en cuenta

Para poder usar este proyecto, debes tener instaladas estas tecnologias: 

--ffmpeg: es un marco de codigo abierto disponible para linux, window y mac, que nos ayudara al proceso de fragmentar el video en pequeños pedazos y resoluciones
--node.js: nuestro entorno de ejecucion para javascript en el lado del servidor
--mongodb: la base de datos que ocupamos para este proyecto

estas son las versiones probadas para este proyecto

ffmpeg: version: 2024-01-14-git-34a47b97de(https://www.gyan.dev/ffmpeg/builds/ffmpeg-git-full.7z) para windows
nodejs: version: v14.17.1(https://nodejs.org/dist/v14.17.1/node-v14.17.1-x64.msi) para windows
mongodb: version: 6.0.0(https://www.mongodb.com/try/download/community)

Empecemos!:

en esta apartado te enseñare como puedes empezar a usar este proyecto

primero debes tener instalado ffmpeg aqui tienes unos tutoriales para instalarlo dependiendo de tu sistema operativo: 
window(https://es.wikihow.com/instalar-FFmpeg-en-Windows)
linux(https://phoenixnap.com/kb/ffmpeg-mac)

luego solo te restaria instalar nodejs y mongodb, e irte a una parte de tu computadora y ejecutar el siguiente comando en tu consola de git:  git clone https://github.com/petrunkito/reproductor-adaptativo-hls.git, de esta manera clonaras el proyecto y podras empezar a usarlo.


como te mencione antes, este proyecto esta dividido en dos partes, front-end(client) y el back-end(api) cada uno se levanta en un puerto diferente, lo siguiente es leer el README.md del front-end y el back-end especialmente en el apartado 'Empecemos!', y aqui se te guiara de como instalar las dependencias y empezar a usar el proyecto. y buena suerte.
