## ORDERS 

docker compose up -d

## Dev
1. clonar repositorio
2. instalar dependencias
3. crear un archivo `.env` como se muestra en `env.template`
4. Levantar servidor de NATS `docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats`
5. Levantar los microservicios 
6. ejecutar el comando `npm run start:dev`

## Nast
`docker run -d --name nats-main -p 4222:4222 -p 6222:6222 -p 8222:8222 nats`
