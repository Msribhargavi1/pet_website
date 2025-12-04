# Installation Script for Java 21 and Maven
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Pet Health Management - Prerequisites Installer" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host "⚠️  Please run this script as Administrator!" -ForegroundColor Yellow
    Write-Host "Right-click PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    pause
    exit
}

# Check if Chocolatey is installed
Write-Host "Checking for Chocolatey package manager..." -ForegroundColor Yellow
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "Installing Chocolatey..." -ForegroundColor Green
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
    
    # Refresh environment
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Host "✅ Chocolatey installed successfully!" -ForegroundColor Green
} else {
    Write-Host "✅ Chocolatey is already installed" -ForegroundColor Green
}

Write-Host ""

# Install Java 21
Write-Host "Installing Java 21 (OpenJDK)..." -ForegroundColor Yellow
choco install openjdk21 -y

Write-Host ""

# Install Maven
Write-Host "Installing Apache Maven..." -ForegroundColor Yellow
choco install maven -y

Write-Host ""

# Refresh environment variables
Write-Host "Refreshing environment variables..." -ForegroundColor Yellow
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Installation Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verify installations
Write-Host "Verifying installations..." -ForegroundColor Yellow
Write-Host ""

Write-Host "Java Version:" -ForegroundColor Cyan
try {
    java -version
    Write-Host "✅ Java installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Java installation failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "Maven Version:" -ForegroundColor Cyan
try {
    mvn -version
    Write-Host "✅ Maven installed successfully!" -ForegroundColor Green
} catch {
    Write-Host "❌ Maven installation failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Close and reopen PowerShell/Terminal" -ForegroundColor White
Write-Host "2. Run: scripts\start-backend.bat" -ForegroundColor White
Write-Host "3. Backend will start on http://localhost:8080" -ForegroundColor White
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

pause
