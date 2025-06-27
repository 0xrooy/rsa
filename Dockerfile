FROM php:7.4-apache

# Install mysqli
RUN docker-php-ext-install mysqli

# Enable mod_rewrite if needed (optional for routing)
RUN a2enmod rewrite

# Copy your code into the container
COPY . /var/www/html
