FROM php:8.1-apache

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y git unzip zip

WORKDIR /var/www/html

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/local/bin/
RUN install-php-extensions gd bcmath zip intl opcache

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
