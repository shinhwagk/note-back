function getNoteBack([string]$path) {
  $file = $path + ".json"
  return ConvertFrom-Json (Get-Content $file)
}

function saveNoteBack($noteback, $path) {
  $file = $path + ".json"
  ConvertTo-Json -Compress $noteback -Depth 5 | Out-File $file -Encoding utf8
}