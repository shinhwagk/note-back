$b = new-object psobject
# $b | Add-Member
$b | Add-Member  -NotePropertyName "b" -NotePropertyValue @()

# $b | ConvertTo-Json | Out-String

($b | ConvertTo-Json -Compress  )
