#!/bin/bash

set -o errexit
set -o pipefail

if [ -f .env ]; then
    export $(grep -v '^#' .env | sed 's/\r$//' | xargs)
else
    echo "❌ Erro: Arquivo .env não encontrado"
    exit 1
fi

function db:reset {
    echo " -> Copiando schema..."
    
    docker compose cp ./database/schema.sql db_postgres:/tmp/init.sql

    echo " -> Rodando Script SQL..."
    
    docker compose exec -T db_postgres sh -c "PGPASSWORD='${POSTGRES_PASSWORD}' psql -U '${POSTGRES_USER}' -d '${POSTGRES_DB_NAME}' -f /tmp/init.sql"
    
    echo "✅ Sucesso!"
}

"$@"