/* -----------------------------------------------
   Seed para la aplicación "Registro de Autos"
   1. Crea BD y tablas si no existen
   2. Inserta 3 usuarios con bcrypt hash
   3. Inserta 6 autos repartidos entre los usuarios
   ----------------------------------------------- */

-----------------------------------------------------------------
-- 1) Creación de la base de datos ------------------------------
-----------------------------------------------------------------
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'RegistroAutos')
BEGIN
    CREATE DATABASE RegistroAutos;
END
GO

USE RegistroAutos;
GO

-----------------------------------------------------------------
-- 2) Tablas ----------------------------------------------------
-----------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'users')
BEGIN
    CREATE TABLE users (
        id            INT            IDENTITY(1,1) PRIMARY KEY,
        username      VARCHAR(100)   NOT NULL UNIQUE,
        password_hash VARCHAR(255)   NOT NULL,
        email         VARCHAR(255)   NOT NULL UNIQUE,
        created_at    DATETIME       DEFAULT (GETDATE())
    );
END
GO

IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'cars')
BEGIN
    CREATE TABLE cars (
        id         INT           IDENTITY(1,1) PRIMARY KEY,
        user_id    INT           NOT NULL,
        brand      VARCHAR(100)  NOT NULL,
        model      VARCHAR(100)  NOT NULL,
        year       INT           NOT NULL,
        plate      VARCHAR(10)   NOT NULL UNIQUE,
        color      VARCHAR(50)   NOT NULL,
        created_at DATETIME      DEFAULT (GETDATE()),
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
END
GO

-----------------------------------------------------------------
-- 3) Datos de prueba -------------------------------------------
-----------------------------------------------------------------
/* 3.1  Usuarios (hashes bcrypt de ejemplo -- cámbialos en prod) */
IF NOT EXISTS (SELECT * FROM users)
BEGIN
    INSERT INTO users (username, password_hash, email) VALUES
      ('juan',   '$2b$10$uLJ1QwVopPp3Iybx4z8MbeTe7R/u6B0EQwwrs1KCSmEj8UQSTKx3K', 'juan@example.com'),
      ('maria',  '$2b$10$96X/3akEGRmY7ZNoX4D/gOEJ91hrJKD50fbwcu9.tsoCprctXKDyK', 'maria@example.com'),
      ('pedro',  '$2b$10$YCuJmS/J3Ifmh0lEAGrHjePb5NZX.DYxKspICxKlE2e7CpD6we0Ha', 'pedro@example.com');
END
GO

/* 3.2  Autos (cada usuario con 2 autos) */
IF NOT EXISTS (SELECT * FROM cars)
BEGIN
    DECLARE @juanId  INT = (SELECT id FROM users WHERE username = 'juan');
    DECLARE @mariaId INT = (SELECT id FROM users WHERE username = 'maria');
    DECLARE @pedroId INT = (SELECT id FROM users WHERE username = 'pedro');

    INSERT INTO cars (user_id, brand, model, year, plate, color) VALUES
      (@juanId,  'Toyota',  'Corolla',   2020, 'ABC123', 'Rojo'),
      (@juanId,  'Mazda',   'CX-5',      2023, 'XYZ789', 'Azul'),
      (@mariaId, 'Honda',   'Civic',     2019, 'DEF456', 'Negro'),
      (@mariaId, 'Ford',    'Mustang',   2022, 'GHI321', 'Amarillo'),
      (@pedroId, 'Chevrolet','Onix',     2018, 'JKL654', 'Blanco'),
      (@pedroId, 'Nissan',  'Sentra',    2021, 'MNO987', 'Gris');
END
GO

PRINT '✅ Base "RegistroAutos" creada y poblada con datos de prueba';
