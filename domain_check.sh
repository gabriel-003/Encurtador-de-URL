#!/bin/bash

DOMAIN="$1"

if [[ -z "$DOMAIN" ]]; then
  echo "Domínio não definido"
  exit 1
fi

# Timeout para domínios de lenta resposta
whois_output=$(timeout 10 whois "$DOMAIN" 2>/dev/null)

exdate=$(echo "$whois_output" | grep -i '^expires:' | awk '{print $2}')

if [[ -z "$exdate" ]]; then
  echo "0"
  exit 1
fi

# Converter e calcular
expire=$(date -d "$exdate" '+%s' 2>/dev/null)
today=$(date '+%s')

if [[ -z "$expire" || "$expire" -le "$today" ]]; then
  echo "0"
else
  echo $(( (expire - today) / 86400 ))
fi
