# 🥤 Sistema de Inventario de Productos Retornables

## Descripción

Sistema web transaccional desarrollado para administrar el inventario de productos retornables, como refrescos, agua y jugos.

La aplicación permite registrar, consultar, modificar y eliminar productos, además de controlar la cantidad de productos llenos y los envases vacíos disponibles.

El sistema fue desarrollado y desplegado utilizando servicios de Amazon Web Services (AWS), implementando una arquitectura de tres capas.

---

## Objetivo

Diseñar, desarrollar y desplegar una aplicación web funcional en la nube que permita realizar operaciones CRUD sobre una base de datos alojada en Amazon RDS.

El proyecto demuestra la integración entre una interfaz web, un servidor de aplicaciones y una base de datos relacional.

---

## Funcionalidades

- Registrar productos.
- Consultar productos registrados.
- Editar productos.
- Eliminar productos.
- Controlar productos llenos.
- Controlar envases vacíos.
- Clasificar productos por categoría.
- Registrar marca y presentación.
- Registrar precio.
- Agregar descripción.
- Visualizar estadísticas generales del inventario.

---

## Productos de ejemplo

El sistema incluye productos como:

- Pepsi retornable 1L.
- Pepsi retornable 2L.
- Agua Azul retornable 1L.
- Enjoy Naranja 500 ml.

---

## Tecnologías utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript
- Amazon S3

### Backend

- Node.js
- Express.js
- Nginx
- Amazon EC2

### Base de datos

- MySQL
- Amazon RDS

### Infraestructura

- Amazon VPC
- Security Groups
- Amazon S3
- Amazon EC2
- Amazon RDS

---

# Arquitectura de tres capas

El sistema utiliza una arquitectura de tres capas, separando la presentación, la lógica de negocio y la persistencia de datos.

## 1. Capa de presentación

La capa de presentación está formada por los archivos HTML, CSS y JavaScript.

Estos archivos proporcionan la interfaz gráfica utilizada por el usuario para administrar el inventario.

La aplicación está alojada en un bucket de Amazon S3 utilizando Static Website Hosting.

Amazon S3 permite almacenar y servir los archivos estáticos del frontend desde Internet.

---

## 2. Capa de lógica

La capa de lógica está implementada mediante Node.js y Express.js.

El backend está alojado en una instancia de Amazon EC2 con Ubuntu Server.

El servidor recibe las solicitudes HTTP realizadas desde el frontend y procesa las operaciones CRUD.

Nginx funciona como servidor web y proxy inverso, recibiendo las solicitudes HTTP y dirigiéndolas hacia la aplicación Node.js.

La API REST utiliza diferentes métodos HTTP:

- GET: consultar productos.
- POST: crear productos.
- PUT: actualizar productos.
- DELETE: eliminar productos.

---

## 3. Capa de datos

La capa de datos utiliza Amazon RDS con MySQL.

RDS almacena permanentemente la información de los productos.

La tabla principal utilizada por el sistema es:

productos

Sus principales campos son:

- id
- nombre
- marca
- categoria
- presentacion
- stock_lleno
- envases_vacios
- precio
- descripcion
- fecha_creacion

El backend se conecta a RDS utilizando variables de entorno para evitar colocar las credenciales directamente dentro del código fuente.

---

# Flujo de funcionamiento

El funcionamiento general del sistema es:

Usuario
    ↓
Amazon S3
    ↓
Frontend HTML / CSS / JavaScript
    ↓
Nginx en Amazon EC2
    ↓
Node.js + Express
    ↓
Amazon RDS MySQL

Cuando el usuario realiza una operación, el frontend envía una solicitud HTTP a la API.

La API procesa la solicitud y consulta o modifica la información almacenada en Amazon RDS.

Posteriormente, el resultado es enviado nuevamente al frontend para mostrarse al usuario.

---

# Servicios de AWS utilizados

## Amazon S3

Amazon S3 se utiliza para alojar los archivos estáticos del frontend.

Almacena:

- index.html
- app.js
- style.css

También permite publicar el sitio mediante Static Website Hosting.

---

## Amazon EC2

Amazon EC2 proporciona el servidor virtual donde se ejecuta el backend.

En esta instancia se instalaron y configuraron:

- Ubuntu Server
- Node.js
- Express.js
- Nginx

EC2 permite ejecutar nuestra aplicación backend en la nube.

---

## Amazon RDS

Amazon RDS proporciona el servicio administrado de base de datos MySQL.

Su función es almacenar de forma persistente la información del inventario.

El backend utiliza RDS para realizar las operaciones de lectura, inserción, actualización y eliminación.

---

## Amazon VPC

Amazon VPC proporciona la red virtual donde se encuentran los recursos de AWS.

Permite controlar la comunicación entre los diferentes componentes de la infraestructura.

La base de datos RDS se mantiene dentro de la infraestructura de red de AWS y el acceso se controla mediante las reglas de seguridad correspondientes.

---

## Security Groups

Los Security Groups funcionan como un firewall virtual para los recursos de AWS.

Permiten controlar qué tráfico puede entrar o salir de las instancias.

En el proyecto se utilizan para controlar el acceso al servidor EC2 y a la base de datos RDS.

El objetivo es permitir únicamente las conexiones necesarias para el funcionamiento de la aplicación.

---

## Nginx

Nginx funciona como servidor web y proxy inverso.

Recibe las solicitudes HTTP dirigidas al servidor EC2 y las comunica con la aplicación Node.js que se ejecuta internamente en el puerto 3000.

Esto permite que los usuarios accedan a la aplicación mediante HTTP sin tener que utilizar directamente el puerto 3000.

---

## Node.js

Node.js proporciona el entorno de ejecución utilizado para ejecutar el backend.

Permite procesar las solicitudes provenientes del frontend y comunicarse con la base de datos MySQL.

---

## Express.js

Express.js es el framework utilizado para construir la API REST.

Se encarga de definir las rutas y procesar las solicitudes HTTP del sistema.

---

## MySQL

MySQL es el sistema gestor de bases de datos utilizado por Amazon RDS.

Permite almacenar y administrar la información estructurada del inventario.

---

# Seguridad

El proyecto implementa medidas básicas de seguridad para proteger la infraestructura y las credenciales.

## Variables de entorno

Las credenciales de la base de datos no se almacenan directamente dentro del código fuente.

El backend utiliza un archivo .env para almacenar los parámetros de conexión:

DB_HOST
DB_USER
DB_PASSWORD
DB_NAME
DB_PORT

El archivo .env no debe publicarse en repositorios públicos.

---

## Protección de la base de datos

La base de datos se encuentra administrada mediante Amazon RDS.

El acceso a la base de datos se controla mediante Security Groups.

El objetivo es que la base de datos no sea utilizada directamente por los usuarios finales.

Las solicitudes hacia la base de datos son realizadas por el backend.

---

# Operaciones CRUD

El sistema implementa las cuatro operaciones principales de una aplicación transaccional.

## Crear

Método HTTP:

POST

Permite registrar un nuevo producto en la base de datos.

---

## Consultar

Método HTTP:

GET

Permite obtener la lista de productos registrados.

---

## Actualizar

Método HTTP:

PUT

Permite modificar la información de un producto existente.

---

## Eliminar

Método HTTP:

DELETE

Permite eliminar un producto del inventario.

---

# Endpoints principales

La API utiliza la siguiente ruta principal:

/api/productos

## Obtener productos

GET /api/productos

## Crear producto

POST /api/productos

## Actualizar producto

PUT /api/productos/:id

## Eliminar producto

DELETE /api/productos/:id

---

# Funcionamiento del sistema

El usuario accede al frontend publicado en Amazon S3.

Desde la interfaz puede administrar los productos del inventario.

Cuando realiza una operación, JavaScript envía una solicitud HTTP a la API.

La solicitud llega al servidor EC2 y es procesada por Nginx y Node.js.

Node.js utiliza Express para procesar la solicitud y posteriormente se conecta con Amazon RDS.

RDS ejecuta la operación correspondiente en MySQL.

El resultado regresa al backend y posteriormente al frontend para actualizar la información mostrada al usuario.

---

# Administración del backend

El backend Node.js se ejecuta como un servicio de Linux mediante systemd.

El servicio utilizado es:

inventario-taller

Esto permite que el backend pueda iniciarse automáticamente y mantenerse ejecutándose en segundo plano.

Nginx también se encuentra configurado como servicio del sistema.

---

# Pruebas realizadas

Durante el desarrollo se realizaron diferentes pruebas para verificar el funcionamiento de la aplicación.

## Prueba de conexión con la API

Se verificó que el backend respondiera correctamente mediante solicitudes HTTP.

## Prueba de base de datos

Se verificó la conexión entre Node.js y Amazon RDS.

## Prueba de lectura

Se consultaron los productos almacenados en la base de datos.

## Prueba de creación

Se registraron nuevos productos desde la interfaz web.

## Prueba de actualización

Se modificaron productos existentes desde la interfaz.

## Prueba de eliminación

Se eliminaron productos desde la interfaz.

## Prueba del frontend

Se verificó que la aplicación pudiera accederse mediante la URL pública de Amazon S3.

---

# Estructura del proyecto

La estructura principal del proyecto es:

inventario-taller-aws/

    frontend/

        index.html
        app.js
        style.css

    server.js
    db.js
    package.json
    package-lock.json
    productos.sql
    README.md

El directorio frontend contiene la interfaz gráfica.

El archivo server.js contiene la API REST y la lógica del backend.

El archivo db.js contiene la configuración de conexión con Amazon RDS mediante variables de entorno.

El archivo package.json contiene las dependencias utilizadas por Node.js.

El archivo productos.sql contiene la estructura documentada de la base de datos.

El README.md contiene la documentación del proyecto.

---

# Archivo SQL

El archivo productos.sql contiene:

- Creación de la base de datos.
- Creación de la tabla productos.
- Definición de los campos.
- Datos de ejemplo.
- Consulta de verificación.

Este archivo permite documentar la estructura utilizada en Amazon RDS.

---

# URL pública

La aplicación se encuentra publicada mediante Amazon S3.

URL:

http://inventario-taller-aws-2026-802593033090.s3-website.us-east-2.amazonaws.com

---

# Estado del proyecto

El sistema se encuentra funcional y desplegado.

Se verificaron las siguientes funcionalidades:

CRUD completo: OK

Frontend público: OK

Backend Node.js: OK

Nginx: OK

Conexión con RDS: OK

Base de datos MySQL: OK

Amazon S3: OK

Arquitectura de tres capas: OK

---

# Autor

Proyecto académico desarrollado para la asignatura de Sistemas Operativos.

Tema:

Sistema de Inventario de Productos Retornables.

Tecnologías principales:

AWS
Node.js
Express.js
Nginx
MySQL
Amazon S3
Amazon EC2
Amazon RDS
