FROM php:8.4-fpm

ARG UID=1000
ARG GID=1000

RUN apt-get update && \
    apt-get -y --no-install-recommends install \
    zip unzip git && \
    apt-get clean

COPY --from=composer:2 /usr/bin/composer /usr/local/bin/composer

RUN usermod -u $UID www-data && groupmod -g $GID www-data
RUN chown -R www-data:www-data /var/www
USER www-data
