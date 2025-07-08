FROM php:7.4-apache

# Install required PHP extensions
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Enable Apache mod_rewrite (for clean URLs if needed later)
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy project files into container
COPY ./html/ /var/www/html/

# Optional: Give proper permissions (useful if files get locked)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html
