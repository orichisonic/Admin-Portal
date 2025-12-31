# Nx wrapper script to use local installation instead of npx
# Usage: .\nx.ps1 <nx-command>
# Example: .\nx.ps1 graph
# Example: .\nx.ps1 build admin-portal

$nxPath = Join-Path $PSScriptRoot "node_modules\.bin\nx"

if (Test-Path $nxPath) {
    & $nxPath $args
} else {
    Write-Host "Error: nx not found in node_modules. Please run 'npm install' first." -ForegroundColor Red
    exit 1
}

