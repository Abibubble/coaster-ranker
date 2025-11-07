#!/bin/bash
# Deploy script for GitHub Pages

# Build the project
echo "Building the project..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"

    # Initialize git in build directory if not already done
    cd build

    if [ ! -d ".git" ]; then
        git init
        git remote add origin git@github.com:Abibubble/coaster-ranker.git
    fi

    # Deploy to gh-pages branch
    git add .
    git commit -m "Deploy to GitHub Pages - $(date)"
    git push -f origin HEAD:gh-pages

    echo "Deployment complete!"
    cd ..
else
    echo "Build failed. Please fix errors before deploying."
fi