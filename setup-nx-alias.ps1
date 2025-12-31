# PowerShell script to set up nx alias to avoid npx issues with Node.js v20.0.0
# Run this script in your PowerShell session: . .\setup-nx-alias.ps1

# Function to intercept npx nx calls
function npx {
    param(
        [Parameter(ValueFromRemainingArguments=$true)]
        [string[]]$Arguments
    )
    
    # Check if the first argument is 'nx'
    if ($Arguments[0] -eq 'nx') {
        # Use local nx instead
        $nxPath = Join-Path $PSScriptRoot "node_modules\.bin\nx"
        if (Test-Path $nxPath) {
            # Remove 'nx' from arguments and pass the rest
            $remainingArgs = $Arguments[1..($Arguments.Length-1)]
            & $nxPath $remainingArgs
        } else {
            Write-Host "Error: nx not found in node_modules. Please run 'npm install' first." -ForegroundColor Red
            exit 1
        }
    } else {
        # For other npx commands, use the real npx (but warn about potential issues)
        $env:NPX_RUN_SILENT = "true"
        & (Get-Command npx -ErrorAction Stop) $Arguments
    }
}

# Export the function
Export-ModuleMember -Function npx

Write-Host "Nx alias set up! You can now use 'npx nx' commands and they will use the local installation." -ForegroundColor Green
Write-Host "Note: This only works in the current PowerShell session." -ForegroundColor Yellow
Write-Host "To make it permanent, add this script to your PowerShell profile." -ForegroundColor Yellow

