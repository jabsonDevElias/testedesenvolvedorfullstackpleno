# Dockerfile para o backend

# Use a imagem do Node.js como base
FROM node:20

# Crie o diretório de trabalho no container
WORKDIR /app

# Copie os arquivos do projeto para o container
COPY ./backend/package.json ./backend/package-lock.json ./

# Instale as dependências do projeto, incluindo o nodemon
RUN npm install
RUN npm install -g nodemon  # Instala o nodemon globalmente

# Copie o restante dos arquivos do backend para o container
COPY ./backend ./

# Exponha a porta que o servidor backend vai rodar
EXPOSE 5000

# Comando para rodar o servidor com nodemon
CMD ["nodemon", "src/server.js"]
