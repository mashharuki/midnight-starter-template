#!/bin/bash
set -e

sudo apt-get update
sudo apt-get install -y git-lfs
git-lfs install
curl --proto '=https' --tlsv1.2 -LsSf https://github.com/midnightntwrk/compact/releases/latest/download/compact-installer.sh | sh
compact update 0.25.0

curl -LsSf https://astral.sh/uv/install.sh | sh

corepack enable pnpm