#!/bin/bash
# Sync script for Zen-C mirror
# This script is intended to be run via cron on the VPS.

REPO_PATH="/var/www/git/Zen-C.git"

if [ ! -d "$REPO_PATH" ]; then
    echo "Error: Mirror repository not found at $REPO_PATH"
    exit 1
fi

cd "$REPO_PATH" || exit 1

echo "Syncing mirror from GitHub..."
git fetch origin --prune --tags --force

echo "Repacking repository..."
git repack -a -d

echo "Mirror sync complete!"
