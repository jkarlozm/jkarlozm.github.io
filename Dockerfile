#Imagen base
FROM nginx:latest

#Definimos deirectorio de trabajo
WORKDIR /usr/share/nginx/html

#Eliminamos archivos en el directorio de trabajo
RUN rm -r *

#Copiado de archivos
COPY . .
