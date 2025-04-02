# Usa a imagem oficial do Node.js
FROM node:20-alpine 

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos essenciais para instalar dependências
COPY frontend/package.json frontend/package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do projeto
COPY frontend .

# Exposição da porta do Vite
EXPOSE 5173

# Comando para rodar o Vite
CMD ["npm", "run", "dev"]
