# upload-img

Web application uploading image files.

Stack
-----

- PHP8, Nette
- TypeScript, React, Sass
- Docker, MariaDB


Setup
-----

    cp .env.dist .env
    cp application/config/local.neon.dist application/config/local.neon

Run docker project
------------

	docker-compose build
	docker-compose up

Installation
------------

	cd application
	composer install
	yarn install

Compile assets
--------------

	yarn build
