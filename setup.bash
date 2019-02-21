#!/bin/bash

echo
echo "Loading App & Installing Packages..."
echo

cd ./app
yarn

echo
echo "Loading Mock API & Installing Packages..."
echo

cd ../mock-api
yarn
