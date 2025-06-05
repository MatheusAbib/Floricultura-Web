FROM php:8.2-cli

RUN apt-get update && apt-get install -y unzip curl git zip libzip-dev

# Instala o Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

WORKDIR /app

# Copia somente os arquivos necessários para o Composer instalar as dependências
COPY composer.json composer.lock /app/

RUN composer install --no-scripts --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Copia o restante do projeto
COPY . /app

EXPOSE 10000

CMD ["php", "-S", "0.0.0.0:10000", "-t", "."]
