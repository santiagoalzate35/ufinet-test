#!/usr/bin/env bash
set -euo pipefail

/opt/mssql/bin/sqlservr &

echo "$(date) ⏳ Esperando a que SQL Server acepte conexiones …"

# Espera hasta que responda (-C = confiar en el cert. autofirmado)
until sqlcmd -S localhost -U sa -P "${MSSQL_SA_PASSWORD}" -C \
             -Q "SET NOCOUNT ON; SELECT 1" -l 5 >/dev/null 2>&1
do
  sleep 2
done

echo "✅ Conexión OK, ejecutando init.sql"

# Ejecuta el seed con la misma bandera -C
sqlcmd -S localhost -U sa -P "${MSSQL_SA_PASSWORD}" -C -l 30 \
       -i /usr/src/app/init.sql

echo "🚀 Base de datos lista. Manteniendo contenedor activo."
wait
