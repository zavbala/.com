# Quick checks for the man-page endpoint (proxy.ts + app/man).
# Override the target with: make test URL=https://zavbala.com

NEXT  := node_modules/.bin/next
PORT  ?= 3000
URL   ?= http://localhost:$(PORT)

.PHONY: dev prod test man json html neofetch llms

# --- servers ---
dev: ## Run the dev server
	$(NEXT) dev --port $(PORT)

prod: ## Build and run the production server
	$(NEXT) build && $(NEXT) start --port $(PORT)

# --- checks (run against $(URL)) ---
test: man json html neofetch llms ## Run every check
	@echo "\n✓ all checks passed against $(URL)"

man: ## curl as a terminal -> plain-text man page
	@echo "==> curl $(URL) (curl UA)"
	@curl -fsS $(URL) | head -8
	@curl -fsSI $(URL) | grep -qi 'content-type: text/plain' \
		&& echo "  ok: served text/plain" || (echo "  FAIL: not text/plain"; exit 1)

json: ## fetch the structured JSON
	@echo "==> curl $(URL)/man?format=json"
	@curl -fsS "$(URL)/man?format=json" | head -c 200; echo
	@curl -fsS -H 'Accept: application/json' $(URL)/man | grep -q '"title":"jeremy"' \
		&& echo "  ok: JSON via Accept header" || (echo "  FAIL: no JSON"; exit 1)

neofetch: ## the neofetch-style system card
	@echo "==> curl $(URL)/neofetch"
	@curl -fsS -A 'curl/8.0' $(URL)/neofetch
	@curl -fsS -A 'curl/8.0' $(URL)/neofetch | grep -q 'jeremy@zavbala' \
		&& echo "  ok: rendered card" || (echo "  FAIL: no card"; exit 1)

llms: ## the llms.txt summary for AI crawlers
	@echo "==> curl $(URL)/llms.txt"
	@curl -fsS $(URL)/llms.txt | head -3
	@curl -fsS $(URL)/llms.txt | grep -q '^# ' \
		&& echo "  ok: markdown llms.txt" || (echo "  FAIL: not markdown"; exit 1)

html: ## a browser still gets HTML
	@echo "==> curl $(URL) (browser UA)"
	@curl -fsS -A 'Mozilla/5.0' $(URL) | grep -o '<title>[^<]*</title>' | head -1
	@curl -fsSI -A 'Mozilla/5.0' $(URL) | grep -qi 'content-type: text/html' \
		&& echo "  ok: served text/html" || (echo "  FAIL: not text/html"; exit 1)
