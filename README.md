# Anabella Avena - Ecommerce

El proyecto consta de crear un e-commerce orientado a la venta de trabajos de ilustración y diseños creados por la Ilustradora Anabella Avena, de acuerdo con los líneamientos y requisitos del actual curso de backend que imparte Coderhouse. 

## Comenzando 🚀

esta entrega está desarrollada de acuerdo con las pautas de la entrega final del curso de Backend de coderhouse. comisión 40280
url: "https://github.com/robercepp/proyecto-final-backend"

### Pre-requisitos 📋

- Visual studio code (ultima version estable).
- git.
- node (ultima versión estable).
- nodemon (instalado de forma global).

basicamente se trata de descargar el repositorio ya sea desde un pull desde la consola de git o manualmente y luego descomprimiendo.

### Instalación 🔧

Tras haber descargado el repositorio: 
-Ejecutar Visual studio code,
-Abrir carpeta raíz del proyecto en visual studio code,
-Abrir una consola nueva,
-Tipear "npm install" en la terminal, (esto descargarán las dependencias requeridas para el correcto funcionamiento del proyecto)
-tipear en una consola (del tipo powershell o gitBash, siempre posicionada en el directorio raíz del proyecto) 
```sh
npm run start
```
Para cargar el servidor,
-abrir cualquier explorador (actualizado a la última versión, ej: chrome, edge o firefox),
- tipear en la barra de direcciones del explorador "localhost:8080" (o el puerto indicado según la consola del servidor activo) y presionar "enter" (esto cargará el frontend del proyecto)

## Ejecutando las pruebas ⚙️

Las pruebas están mayormente pensadas para ser realizadas dentro del entorno del frontend ofrecido.

- El servidor creado fué pensado en base a las rúbricas del proyecto final del curso de backend de CoderHouse, este mismo implementa un servidor basado en Express, que tiene funcionalidades tanto de API como un entorno de frontend para manejar las diferentes solicitudes (GET, POST, PUT, DELETE) a la api del mismo. 

- Esta entrega funciona como un entorno de gestión para el manejo de cuentas (tanto de administrador como de cliente), productos, carritos, ordenes de compras y un servicio de mensajería instantanea basada en socket.io

- El servidor está primeramente pensado para trabajar en modo doble, es decir, que puede ser gestionado tanto a través de la api (usuarios, productos, carritos, ordenes) que se diferencia por que sus rutas se encuentran dentro de la rama /api (ej: /api/productos, /api/usuarios, /api/carrito, siempre y cuando el usuario que interviene se encuentre logueado en el sistema.), como en modo frontend, es decir, que al ingresar a su ruta raíz ("http://url:puerto/") se abrirá el entorno gráfico que permita operar con el backend en modo gráfico. 

- Este servidor cuenta con métodos personalizables de arranque de servidor, mediante "YARGS", con parámetros que permiten elegir, el puerto (-p), el modo de arranque (-m "FORK" o "CLUSTER") y el "run" (que setea el servidor en modo de desarrollo "dev" o de producción "prod")
para ejecutar parametros específicos en el arranque del sistema uno debe esciribir en la consola, por ejemplo: 
```sh
 nodemon server.js -p 8000 -m CLUSTER -r prod
```
en este caso estamos solicitando que el servidor se ejecute en el puerto 8000, en modo cluster y en modo de producción, si no se ingresa ningún parámetro, el servidor, por defecto se ejecutará en el puerto 8080, en modo "FORK", y en modo producción ("prod")

nota: el modo "prod" elige como metodo de persistencia el servidor de la base de datos MongoDbAtlas, para almacenar y manejar información, en cambio el modo "dev" (developer) utiliza un método de persistencia basado en archivo .txt alojados localmente. (es importante aclarar que este modo no se implementa al 100% debido a ciertas limitaciones que existen en el uso de "passport" como método de autenticación. este se encuentra seteado para comparar los datos unicamente en los almacenados en MongoDb, por lo que si se buscara un usuario en MongoDb que fué almacenado en un archivo, el servidor nos retornaría error. Por razones así, el modo "dev" solo almacena en archivos el los carritos y los productos)

al ejecutarse el servidor en cualquier modo, la ejecución exitosa del mismo nos retornará un mensaje indicandonos el puerto y los modos de ejecución implementados:

![imagen_0](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/0.jpg)
el servidor también nos indicará que la conexión con el servidor de base de datos "MongoDbAtlas" ha sido exitosa de ser posible.

- Al ingresar a la ruta raíz "/" se abrirá el menú de logueo, el cuál nos permite ingresar al sistema mediante un usuario y contraseña previamente registrado.

![imagen_1](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/1.jpg)

- En caso de no contar con una cuenta activa podemos crear una cuenta nueva ingresando al menú de registro y llenando el fomulario. 

![imagen_3](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/3.jpg)
- A los efectos de ejecutar las pruebas de servidor, es recomendable crear 2 usuarios, uno como administrador y otro como cliente, para evaluar los distintos cambios en el entorno que están adaptados a los distintos tipos de usuarios según sea el caso. 
por ejemplo. un usuario de tipo cliente solo puede administrar su propia cuenta, ver productos, cargarlos al carrito, realizar una orden y ver su propio canal de chat.
En cambio un usuario del tipo Administrador, tiene acceso total al sistema, este puede crear productos nuevos, modificar los existentes, eliminarlos, leer todos los canales de chat y responder a los distintos usuarios etc.

nota: todos los campos son obligatorios al realizar un nuevo registro de cuenta. incluido el del avatar, que debe ser una imagen cuadrada en jpg.

- Una vez habiendo registrado satisfactoriamente una nueva cuenta, el sitio nos redirigirá al menu de loggeo. donde podremos ingresar el email y la contraseña previamente registradas e ingresar al sitio principal de sistema. (ubicado en /productos)

![imagen_4](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/4.jpg)

- en el sitio principal del sistema se puede apreciar los distintos menus para operar el sitio, como para ver el carrito, el chat, las ordenes, cerrar sesión etc. 
mas abajo (para el caso de los administradores unicamente, se puede observar un menú especial de administrador, que muestra links a sitios para crear productos, información del sistema que opera el servidor, los parametros y variables criticas del servidor y el acceso al chat de administradores, que es una instancia que nos permite ver todos los canales de chats, y responder las preguntas que los clientes hagan.)

- Mas abajo se listan los productos que se ofrecen en el sitio en su totalidad. pero estos pueden discriminarse por categoría pulsando el botón correspondiente.
nota: este menú de categorías es dinámico y muestra los botones según hayan distintas categorías. por ejemplo, si creasemos un nuevo producto con una categoría nueva, un nuevo botón aparecería con un enlace a esa categoría y mostrando ese producto solamente, a menos que exista otro producto con la misma categoría.

- Cada tarjeta de producto muestra una breve descripción del producto, una imágen, el tipo de producto que es, su precio y el stock disponible, mas abajo hay un selector de la cantidad de items de ese producto que se pueden agregar al carrito y un botón de "ver producto" que nos permitirá individualizar el producto para ser tratado.

- al presionar el botón "ver producto" veremos los siguientes campos. 

![imagen_5](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/5.jpg)
en esta tarjeta individual, se puede observar que 2 nuevos botónes han aparecido, uno para editar el producto y otro para eliminarlo (estos botones son únicamente accesibles en una cuenta de administrador.)

![imagen_6](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/6.jpg)
al editar un producto, nos aparecerá un formulario prellenado con los datos del producto, estos se pueden modificar, pero no se permite confirmar una modificación con algún campo vacío. sino el servidor no procesará el pedido. 

- el botón superior "carrito" muestra los productos cargador al mismo, con la opción de quitarlos si nos arrepentimos previo a la confirmación.

![imagen_7](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/7.jpg)

el botón del menú "chat" accede al canal propio del cliente, esta parte del sitio es accesible tanto para usuarios del tipo cliente como para administradores. 
en este apartado, el cliente puede enviar sus preguntas al sistema, y estos quedan almacenados en la base de datos con un identificador basado en su correo electrónico.

![imagen_8](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/8.jpg)
nótese que los mensajes del cliente están coloreados siempre en verde están justificados a la derecha, y los mensajes del sistema (usuarios administradores) están coloreados en gris y se encuentran justificados a la izquierda para una mas facil diferenciación.
cada mensaje tiene identificado quien escribe y cuando fué escrito.


- en el menú exclusivo de administradores, se encuentra el botón "chat(admin)" es un acceso al servicio de mensajería general, este permite leer todos los canales registrados y contestar a los usuarios individualmente. (este componente es solo exclusivo para los usuarios administradores)

![imagen_9](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/9.jpg)

- Botón del menú de administrador "+ producto" permite añadir un nuevo producto a la base de datos. 

![imagen_10](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/10.jpg)
nota: todos los campos son obligatorios para que el servidor procese la petición de ingreso del producto al sistema. 
el campo de la imágen toma una url de una imagen previamente subida a internet, ya sea almacenada de forma publica en algún servidor o linkeada directamente desde algún servicio de busqueda tipo google.

- El botón de "Info de sistema" muestra un listado con las características de donde se está corriendo el servidor, así como los parametros del servidor iniciado. 

![imagen_11](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/11.jpg)

- El menú de administrador también cuenta con el botón "server(config)" que muestra un listado con las variables que toma el servidor para su funcionamiento, como el Puerto por defecto, su instancia por defecto, su modo de ejecución por defecto así también como los parametros de ecriptación y urls y keys necesarias para la utilización de servicios de mensajería y almacenamiento de terceros. 

![imagen_12](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/12.jpg)

- El botón de "ordenes" ubicado junto a los botones de ir al home, carrito y chat, del menú superior, nos permite acceder al apartado donde se pueden observar todas las órdenes confirmadas según cliente.

![imagen_13](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/13.jpg)
aquí se puede observar que cada orden está identificada según orden de aparición, la fecha y la hora de solicitud y los items y cantidades solicitadas. 

## Descripciones generales del servidor 🛠️

- El servidor tiene 2 ramas de rutas diferenciadas, una de api (api) y otra para manejar las solicitudes de visualización en frontend (main)
donde "main", hace referencia al manejo de solicitudes especiales que requieren una renderización por motor de plantillas, y "api" que maneja unicamente la recepción y envío de información en formato JSON.

![imagen_14](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/14.jpg)

- El servidor dispone de un servicio de autenticación basado en "Passport" que verifica las credenciales de los usuarios logueados contrastandolos contra la información de usuarios almacenados en MongoDbAtlas.

- Las contraseñas se encuentran encriptadas mendiante una semilla para mayor seguridad.

- El tiempo de sesión activo puede configurarse mediante variables de entorno generales (archivo .env) por defecto está seteado para que dure 24 horas.

- Ante una solicitud de una dirección no implementada, el servidor renderiza una plantilla en pug informando que la dirección solicitada no se encuentra. 

![imagen_15](https://github.com/robercepp/proyecto-final-backend/blob/main/docs/15.jpg)

- Todas las rutas de tipo api tienen implementadas un sistema de chequeo de respuesta, esto se basa en codigos de respuesta html. 
si el id de respuesta no fuese "200" (envío exitoso) ese devolverá una vista basada en ejs, incluyendo el código de error y el error en sí. 

- El servidor implementa un sistema de capas MVC (modelo, vista controlador) con un sistema de factory para el uso de base de datos en Productos y en Carritos.
también implementa un sistema de DTOs (data transfer object) donde hubo oportunidad para mejorar la economía en transmisión de datos.

## Construido con 🛠️

Visual studio code

## Dependencias utilizadas 🛠️

    "bcryptjs": "2.4.3",
    "body-parser": "1.20.2",
    "connect-mongo": "5.0.0",
    "cookie-parser": "1.4.6",
    "dotenv": "16.0.3",
    "ejs": "3.1.9",
    "express": "4.18.2",
    "express-flash": "0.0.2",
    "express-handlebars": "7.0.4",
    "express-session": "1.17.3",
    "mongoose": "6.8.4",
    "multer": "1.4.5-lts.1",
    "nodemailer": "6.9.1",
    "passport": "0.4.1",
    "passport-local": "1.0.0",
    "pug": "3.0.2",
    "socket.io": "4.6.1",
    "twilio": "4.9.0",
    "winston": "3.8.2",
    "yargs": "17.7.1"

    nota: "Toastify" y "Sweet Alert" son usados del lado de frontend para amenizar las alertas visuales e informar de ciertos sucesos dentro del servidor tales como logeos exitosos, cargas y eliminacion de productos en el carrito y así también como registros de usuarios nuevos como de confirmación de compras en el carrito. 

## Autores ✒️

* **Robertino Cepparo** - *Trabajo Inicial* - [robercepp](https://github.com/robercepp)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC) - (use bajo su propio riesgo)
😊
