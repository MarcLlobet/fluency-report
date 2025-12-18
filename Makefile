.PHONY: start-api
start-api:
	docker compose run --rm php-fpm composer install
	docker compose run --rm php-fpm bin/console doctrine:migrations:migrate --no-interaction
	docker compose up -d
	@echo "========================================"
	@echo "API accessible at http://localhost:8080/"
	@echo "API documentation accessible at http://localhost:8080/api/doc"
	@echo "========================================"

.PHONY: shell
shell:
	docker compose exec -ti php-fpm bash

.PHONY: fixtures
fixtures:
	docker compose run --rm php-fpm bin/console doctrine:fixtures:load
