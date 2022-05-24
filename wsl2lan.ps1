# Forwards ports and opens firewall for configured ports

# [Ports] - All the ports you want opened to the local network 
$ports=@(3000); # 3000 for NPM Dev Server

# Check if session is elevated
[bool]$isElevated = (New-Object Security.Principal.WindowsPrincipal([Security.Principal.WindowsIdentity]::GetCurrent())).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if ($isElevated)
{
  $Path = $PSScriptRoot

  $ifconfig = (wsl -- ip -4 addr show eth0)
  $ipPattern = "((\d+\.?){4})"
  $wslAddress = ([regex]"inet $ipPattern").Match($ifconfig).Groups[1].Value
  if (-not $wslAddress) {
    exit
  }

  $localAddress = (Get-NetIPConfiguration | Where-Object {$_.IPv4DefaultGateway -ne $null -and $_.NetAdapter.status -ne "Disconnected"}).IPv4Address.IPAddress

  Write-Host "Setting up WSL tunnels" -ForegroundColor Green

  #[Static ip]
  #You can change the addr to your ip config to listen to a specific address
  $addr='0.0.0.0';
  $ports_a = $ports -join ",";

  #Remove Firewall Exception Rules
  iex "Remove-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' ";

  #adding Exception Rules for inbound and outbound Rules
  iex "New-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Outbound -LocalPort $ports_a -Action Allow -Protocol TCP";
  iex "New-NetFireWallRule -DisplayName 'WSL 2 Firewall Unlock' -Direction Inbound -LocalPort $ports_a -Action Allow -Protocol TCP";

  for( $i = 0; $i -lt $ports.length; $i++ ){
    $port = $ports[$i];
    iex "netsh interface portproxy delete v4tov4 listenport=$port listenaddress=$addr";
    iex "netsh interface portproxy add v4tov4 listenport=$port listenaddress=$addr connectport=$port connectaddress=$wslAddress";
  }

  Write-Host "WSL IP -" $wslAddress
  Write-Host "Local IP - " $localAddress
  Write-Host "Local Link - http://$localAddress`:3000"
}
else
{
  Write-Host "Console not elevated, running in elevated window..."
	Start-Process -FilePath PowerShell.exe -Verb Runas -ArgumentList "$Path\wsl-firewall.ps1"
}
