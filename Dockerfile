# Usar uma imagem base do Node.js (pode ser a versão que você preferir)
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /app

# Copiar o arquivo package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instalar as dependências do projeto
RUN npm install

# Copiar o restante do código para o diretório de trabalho
COPY . .

# Construir o projeto para produção
RUN npm run build

# Expor a porta na qual o Vite vai rodar
EXPOSE 5173

# Comando para rodar o servidor de desenvolvimento do Vite
CMD ["npm", "run", "dev", "--", "--host"]