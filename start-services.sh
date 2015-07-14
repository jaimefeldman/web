#!/bin/bash

echo "iniciando servicios..."
echo "servidor node"
http-server ~/sites/web/ &

echo "stylus"
stylus -u nib -w -c ~/sites/web/lib/main/index.styl -o ~/sites/web/public &

echo "jade"
jade -w -P ~/sites/web/lib/main/index.jade -o ~/sites/web/public &

echo "babel"
babel --watch ~/sites/web/lib/scripts --out-dir ~/sites/web/public/ &




