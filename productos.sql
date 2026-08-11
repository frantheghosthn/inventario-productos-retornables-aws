-- =========================================================
-- SISTEMA DE INVENTARIO DE PRODUCTOS RETORNABLES
-- Proyecto: Despliegue de Sistema Web Transaccional en AWS
-- Motor: MySQL / Amazon RDS
-- =========================================================

CREATE DATABASE IF NOT EXISTS inventario_taller;

USE inventario_taller;

-- =========================================================
-- TABLA: productos
-- =========================================================

CREATE TABLE IF NOT EXISTS productos (

    id INT AUTO_INCREMENT PRIMARY KEY,

    nombre VARCHAR(100) NOT NULL,

    marca VARCHAR(100) NOT NULL,

    categoria VARCHAR(100) NOT NULL,

    presentacion VARCHAR(100) NOT NULL,

    stock_lleno INT NOT NULL DEFAULT 0,

    envases_vacios INT NOT NULL DEFAULT 0,

    precio DECIMAL(10,2) NOT NULL,

    descripcion VARCHAR(255),

    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- =========================================================
-- DATOS DE EJEMPLO
-- =========================================================

INSERT INTO productos
(
    nombre,
    marca,
    categoria,
    presentacion,
    stock_lleno,
    envases_vacios,
    precio,
    descripcion
)
VALUES

(
    'Pepsi',
    'Pepsi',
    'Refresco',
    'Retornable 1L',
    120,
    35,
    18.00,
    'Refresco de cola en botella retornable'
),

(
    'Agua Azul',
    'Agua Azul',
    'Agua',
    'Retornable 1L',
    80,
    20,
    12.00,
    'Agua purificada en botella retornable'
),

(
    'Enjoy Naranja',
    'Enjoy',
    'Jugo',
    '500 ml',
    65,
    10,
    15.00,
    'Jugo sabor naranja'
),

(
    'Pepsi',
    'Pepsi',
    'Refresco',
    'Retornable 2L',
    60,
    18,
    30.00,
    'Refresco de cola en botella retornable de 2 litros'
);

-- =========================================================
-- CONSULTA DE VERIFICACIÓN
-- =========================================================

SELECT * FROM productos ORDER BY id DESC;
