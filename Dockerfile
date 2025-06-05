FROM php:8.2-cli

# Instala dependências do sistema para o Composer funcionar
RUN apt-get update && apt-get install -y unzip curl git

# Instala o Composer globalmente
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Cria e define o diretório de trabalho
WORKDIR /app

# Copia arquivos de definição do Composer primeiro para cache eficiente
COPY composer.json composer.lock /app/

# Instala as dependências do Composer sem rodar scripts (evita falha por falta de .env.example)
RUN composer install --no-scripts --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Agora copia o restante da aplicação
COPY . /app

# Expõe a porta (Render define a variável $PORT automaticamente)
EXPOSE 10000


# Usa o PHP embutido para rodar o servidor
CMD ["php", "-S", "0.0.0.0:10000", "-t", "."]