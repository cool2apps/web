#!/bin/bash
# Simple script to generate app detail pages
# Run with: bash generate-app-pages.sh

# Read apps from JSON (requires jq)
if ! command -v jq &> /dev/null; then
    echo "Error: jq is required. Install it with: sudo apt-get install jq"
    exit 1
fi

# Create app directory if it doesn't exist
mkdir -p app

# Read apps.json and generate pages
apps=$(cat data/apps.json | jq -r '.[] | @base64')

for app in $apps; do
    # Decode app data
    app_data=$(echo $app | base64 --decode)
    app_id=$(echo $app_data | jq -r '.id')
    
    # Create app detail page by copying template
    cp app-template.html "app/${app_id}.html"
    
    # Create app subdirectory for privacy/terms
    mkdir -p "app/${app_id}"
    
    # Copy privacy template
    cp app/privacy-template.html "app/${app_id}/privacy.html"
    
    # Copy terms template  
    cp app/terms-template.html "app/${app_id}/terms.html"
    
    echo "Generated pages for: ${app_id}"
done

echo "All app pages generated successfully!"

