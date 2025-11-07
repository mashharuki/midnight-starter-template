#!/bin/bash
set -euo pipefail

PNPM_VERSION="9.12.3"

echo "Starting devcontainer setup..."

# Update package lists
echo "Updating package lists..."
sudo apt-get update

# Install git-lfs (now handled by feature, but keeping as fallback)
echo "Ensuring git-lfs is installed..."
if ! command -v git-lfs &> /dev/null; then
    sudo apt-get install -y git-lfs
fi
git lfs install || echo "Warning: git-lfs install command failed"

# Install compact
echo "Installing compact..."
if ! command -v compact &> /dev/null; then
    # Check architecture and install accordingly
    ARCH=$(uname -m)
    if [ "$ARCH" = "x86_64" ]; then
        curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
    else
        echo "Warning: compact installer doesn't support $ARCH architecture"
        echo "Please use a x86_64 devcontainer or build compact from source"
        echo "Skipping compact installation..."
    fi
fi
# Only update if compact was successfully installed
if command -v compact &> /dev/null; then
    if ! compact update 0.25.0; then
        echo "Warning: compact update failed"
    fi
fi

# Install uv
echo "Installing uv..."
if ! command -v uv &> /dev/null; then
    curl -LsSf https://astral.sh/uv/install.sh | sh
fi

# Enable pnpm
echo "Enabling pnpm..."
if command -v corepack &> /dev/null; then
    corepack enable pnpm || echo "Warning: corepack enable pnpm failed"
    if ! corepack prepare "pnpm@${PNPM_VERSION}" --activate; then
        echo "Falling back to npm global install for pnpm"
        npm install -g "pnpm@${PNPM_VERSION}"
    fi
else
    echo "corepack not found, installing pnpm via npm"
    npm install -g "pnpm@${PNPM_VERSION}"
fi

# Install dependencies
echo "Installing project dependencies..."
pnpm install

echo "Devcontainer setup completed successfully!"