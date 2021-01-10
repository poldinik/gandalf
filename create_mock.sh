#!/bin/bash


echo "Crea dati mock per una prova"

# crea utente di prova
curl -H "Content-Type: application/json" --data '{"username":"user1","password":"123", "email":"user1@mail.com"}' http://localhost:8888/api/v1/token/register

# ottiene token
BEARER=$(curl -H "Content-Type: application/json" --data '{"username":"user1","password":"123", "email":"user1@mail.com"}' http://localhost:8888/api/v1/token/ | jq -r '.access_token')

# crea un progetto di prova
#curl -H "Content-Type: application/json" -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsImlhdCI6MTYxMDMwODkxNCwiZXhwIjoxNjEwMzE0OTE0fQ.eyJlbWFpbCI6InVzZXIxQG1haWwuY29tIiwiYWRtaW4iOjB9.Izsi1tfg1d4zBetrfA5fGFijReshXzgUrbn72riV_OA" --data '{"name":"progettodiprova"}' http://localhost:8888/api/v1/projects/
PROJECTID=$(curl -H "Content-Type: application/json" -H "Authorization: ${BEARER}" --data '{"name":"progettodiprova"}' http://localhost:8888/api/v1/projects/ | jq -r '.id')

# crea un tool di prova
TOOLID=$(curl -H "Content-Type: application/json" -H "Authorization: ${BEARER}" --data '{"name":"jpegio", "description": "dct coefficients", "endpoint": "http://localhost:8889/api/v1/jpegio", "method": "POST", "supportedDataTypes": [], "supportedDataFormats":[], "references": []}' http://localhost:8888/api/v1/tools/ | jq -r '.id')

echo "${BEARER}"
echo "projectId: ${PROJECTID}"
echo "toolId: ${PROJECTID}"

# lancio un'analisi
curl --request POST -H "Authorization: ${BEARER}" 'http://localhost:8888/api/v1/projects/1/start' -d "tools=1"
