#!/bin/bash

echo "========================================"
echo "Pet Health Management Backend Starter"
echo "========================================"
echo ""

cd ../backend

echo "Checking for Maven..."
if ! command -v mvn &> /dev/null; then
    echo "ERROR: Maven is not installed or not in PATH"
    echo "Please install Maven from https://maven.apache.org/download.cgi"
    exit 1
fi

echo "Maven found!"
echo ""

echo "Building and starting the backend server..."
echo "This may take a few minutes on first run..."
echo ""

mvn spring-boot:run
