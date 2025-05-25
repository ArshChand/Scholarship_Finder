#!/usr/bin/env bash
set -o errexit

# Install dependencies
npm install

# Ensure Puppeteer downloads Chrome to the project-local cache
npx puppeteer browsers install chrome

PUPPETEER_CACHE_DIR=/opt/render/.cache/puppeteer
mkdir -p $PUPPETEER_CACHE_DIR
cp -R .cache/puppeteer/chrome $PUPPETEER_CACHE_DIR/
