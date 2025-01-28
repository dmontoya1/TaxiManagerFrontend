# Usa una imagen base de Node.js
FROM node:22-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de package.json e instala las dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copia el resto del código
COPY . .

# Compila la aplicación
RUN npm run build

# Expone el puerto 3000 (puerto predeterminado de Next.js)
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]