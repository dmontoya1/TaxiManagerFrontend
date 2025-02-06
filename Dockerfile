# Stage 1: Builder
FROM node:22-slim AS builder
WORKDIR /app

# Instalar dependencias de desarrollo
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del código y compilar la aplicación
COPY . .
RUN npm run build

# Stage 2: Runner
FROM node:22-slim
WORKDIR /app

# Establecer el entorno de producción
ENV NODE_ENV=production

# Copiar únicamente lo necesario
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Instalar solo dependencias de producción
RUN npm ci --only=production

# Exponer el puerto (solo es informativo)
EXPOSE 8080

# Iniciar la aplicación usando el puerto definido en $PORT
CMD ["npm", "start"]
