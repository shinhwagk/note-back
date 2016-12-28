function getNoteBack([string]$path) {
  $file = $path + ".json"
  return ConvertFrom-Json (Get-Content $file | Out-String)
}

function saveNoteBack($noteback, $path) {
  $file = $path + ".json"
  ConvertTo-Json $noteback -Depth 5 | Out-File $file -Encoding utf8
}