# Usar imagem oficial do PHP com Apache
FROM php:8.1-apache

# Instalar dependências e Composer
RUN apt-get update && apt-get install -y \
    git unzip zip \
    && docker-php-ext-install pdo pdo_mysql mysqli

# Instalar Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar arquivos do projeto
COPY . /var/www/html/

# Dar permissões corretas (ajuste se necessário)
RUN chown -R www-data:www-data /var/www/html/

# Rodar composer install
RUN composer install --no-dev --optimize-autoloader

# Expor porta 80
EXPOSE 80

# Rodar Apache em foreground
CMD ["apache2-foreground"]
