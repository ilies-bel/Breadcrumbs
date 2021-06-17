Set-PSReadLineKeyHandler -Function MenuComplete -Key Tab
Set-PSReadLineKeyHandler -Function HistorySearchBackward -Key UpArrow
Set-PSReadLineKeyHandler -Function HistorySearchForward -Key DownArrow

Set-PoshPrompt ys

Import-Module posh-git
Import-Module DockerCompletion
Import-Module -Name PSKubectlCompletion