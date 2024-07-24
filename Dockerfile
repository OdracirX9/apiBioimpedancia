# Usa la imagen base de Puppeteer
FROM ghcr.io/puppeteer/puppeteer:20.5.0

# Configura las variables de entorno para Puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia los archivos necesarios
COPY package*.json ./
COPY tsconfig.json ./

# Instala las dependencias
RUN npm ci

# Copia el resto de los archivos del proyecto
COPY . .

# Crear el directorio dist y cambiar permisos
RUN mkdir -p /usr/src/app/dist && chown -R node:node /usr/src/app/dist

# Construye el proyecto
RUN npm run build

# Expone el puerto que utiliza tu aplicación
EXPOSE 4100

# Define el comando por defecto para ejecutar la aplicación
CMD ["npm", "run", "start"]
