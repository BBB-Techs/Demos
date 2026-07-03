#!/bin/bash
# Builds a static (Server-Action-free) export of the site for GitHub Pages hosting.
#
# Why a separate build: the real site uses a Next.js Server Action (app/actions.ts) for
# the contact form, and `output: "export"` doesn't support Server Actions at all — Next
# errors at build time if one is even present. Rather than threading env-var branches
# through the real component (fragile: static `import` statements always get bundled
# regardless of which branch runs), this script builds from a throwaway copy of the repo
# with app/actions.ts removed and Contact.tsx swapped for the client-only ContactStatic.tsx.
# The real source tree (this repo) is untouched.
#
# Usage: npm run build:pages
# Output: ./out (base path baked in for /Demos/CarrCompany/preview)
set -euo pipefail

BASE_PATH="${1:?Usage: build-static-preview.sh <base-path, e.g. /Demos/CarrCompany/preview>}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
# Build inside the project (not /tmp): macOS's /tmp is itself a symlink to /private/tmp,
# and Turbopack's filesystem-root check rejects a node_modules symlink reached through it.
TMP="$ROOT/.build-tmp"
rm -rf "$TMP"
mkdir -p "$TMP"

echo "Copying project to $TMP (excluding node_modules/.next/.git/out)..."
rsync -a \
  --exclude node_modules --exclude .next --exclude .git --exclude out \
  --exclude .claude/settings.local.json \
  "$ROOT"/ "$TMP"/

echo "Swapping in the static-safe contact form and dropping the Server Action..."
rm -f "$TMP/app/actions.ts"
cp "$TMP/components/ContactStatic.tsx" "$TMP/components/Contact.tsx"
sed -i.bak 's/function ContactStatic/function Contact/' "$TMP/components/Contact.tsx"
rm -f "$TMP/components/Contact.tsx.bak" "$TMP/components/ContactStatic.tsx"

echo "Linking node_modules from the real project (skip a slow reinstall)..."
ln -s "$ROOT/node_modules" "$TMP/node_modules"

echo "Building static export with basePath=$BASE_PATH ..."
(cd "$TMP" && GH_PAGES_EXPORT=true NEXT_PUBLIC_BASE_PATH="$BASE_PATH" npx next build)

echo "Copying build output to $ROOT/out ..."
rm -rf "$ROOT/out"
cp -R "$TMP/out" "$ROOT/out"
rm -rf "$TMP"

echo "$ROOT/out"
