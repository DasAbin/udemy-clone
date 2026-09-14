[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$url = 'https://github.com/git-for-windows/git/releases/download/v2.47.1.windows.1/MinGit-2.47.1-64-bit.zip'
$out = 'tools\mingit.zip'
Write-Output "Downloading MinGit..."
Invoke-WebRequest -Uri $url -OutFile $out -UseBasicParsing
if (Test-Path $out) {
    Write-Output "Extracting MinGit to tools\git..."
    if (!(Test-Path 'tools\git')) { New-Item -ItemType Directory -Path 'tools\git' -Force }
    Expand-Archive -Path $out -DestinationPath 'tools\git' -Force
    Remove-Item $out
    Write-Output "MinGit successfully installed. Testing version:"
    & 'tools\git\cmd\git.exe' --version
} else {
    Write-Error "Failed to download MinGit."
}
