#!/bin/sh
set -eu

TEMPLATE_PATH="/usr/share/nginx/html/env.template.js"
OUTPUT_PATH="/usr/share/nginx/html/env.js"

if [ -f "$TEMPLATE_PATH" ]; then
  envsubst '${VITE_COMPANY_NAME} ${VITE_API_BASE_URL}' < "$TEMPLATE_PATH" > "$OUTPUT_PATH"
fi
