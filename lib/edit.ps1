function add_label($path) {
  $file = $path + ".json"

  $label = Read-Host "enter label"
  if ($label.length -ge 1 ){
    $notes = Get-Content $file | Out-String  | ConvertFrom-Json
    $notes.labels += $label
    $notes | ConvertTo-Json -Compress | Out-File $file

    $new_dir = $path + "/" + $label
    New-Item -ItemType Directory $new_dir
    $new_file = $path + "/" + $label + ".json"
    $obj = New-Object psobject
    $obj | Add-Member -NotePropertyName "labels" -NotePropertyValue @()
    $obj | Add-Member -NotePropertyName "categorys" -NotePropertyValue @()
    $obj | ConvertTo-Json -Compress | Out-File $new_file

    git_commit("add label: ${label}")
  }
}

function remove_label($path, $label) {
  $file = $path + ".json"
  $notes = Get-Content $file | ConvertFrom-Json

  $notes.labels = $notes.labels | Where-Object { $_ -ne $label }

  if (-Not $notes.labels) { $notes.labels = @() }

  ConvertTo-Json $notes | Out-File $file

  Remove-Item -Path ($path + '/' + $label)
  Remove-Item -Path ($path + '/' + $label + ".json")
  git_commit("delete label: ${label}")
}

function rename_label($path, $old_label) {
  $file = $path + ".json"
  $notes = Get-Content $file | ConvertFrom-Json

  $new_label = Read-Host "enter new label"

  $notes.labels = $notes.labels, $new_label
  $notes.labels = @($notes.labels | Where-Object { $_ -ne $old_label })

  ConvertTo-Json -Compress $notes | Out-File $file

  $old_dir = $path + '/' + $old_label
  $old_file = $path + '/' + $old_label + ".json"
  $new_file = $new_label + ".json"

  Rename-Item -Path $old_dir -NewName $new_label
  Rename-Item -Path $old_file -NewName $new_file

  git_commit("rename label: $old_label -> $new_label")
}

function add_category($path) {
  $file = $path + ".json"
  $category = Read-Host "enter category"
  if ($category.length -ge 1 ){
    $b | Add-Member -NotePropertyName $category -NotePropertyValue @()
  }
}
