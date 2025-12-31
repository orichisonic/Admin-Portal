@echo off
REM Nx wrapper script to use local installation instead of npx
REM Usage: nx.bat <nx-command>
REM Example: nx.bat graph
REM Example: nx.bat build admin-portal

set NX_PATH=%~dp0node_modules\.bin\nx.cmd

if exist "%NX_PATH%" (
    call "%NX_PATH%" %*
) else (
    echo Error: nx not found in node_modules. Please run 'npm install' first.
    exit /b 1
)

