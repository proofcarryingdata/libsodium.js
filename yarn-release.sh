#! /bin/sh

for f in \
  package-libsodium-sumo.json \
  package-libsodium-wrappers-sumo.json \
; do
  rm -f package.json
  cp "$f" package.json
  npm pkg fix
  yarn publish
done
rm -f package.json
cp package-libsodium-wrappers.json package.json
