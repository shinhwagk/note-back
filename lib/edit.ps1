. "lib/git.ps1"
function add_label($path, $label) {
  $file = $path + ".json"
  $notes = Get-Content $file | ConvertFrom-Json
  $notes.labels += $label
  $notes | ConvertTo-Json -Compress | Out-File $file

  $new_dir = $path + "/" + $label
  if (-Not(Test-Path $new_dir)) { New-Item -ItemType Directory $new_dir }
  
  $new_file = $path + "/" + $label + ".json"

  @{labels=@(); categorys=@()} | ConvertTo-Json -Compress | Out-File $new_file

  git_commit("add label: ${label}")
}

function remove_label($path, $idx) {
  $file = $path + ".json"
  $notes = Get-Content $file | ConvertFrom-Json

  $label = $notes.labels[$idx]

  $notes.labels = $notes.labels | Where-Object { $_ -ne $label }

  if (-Not $notes.labels) { $notes.labels = @() }

  ConvertTo-Json -Compress $notes | Out-File $file

  Remove-Item -Path ($path + '/' + $label)
  Remove-Item -Path ($path + '/' + $label + ".json")
  git_commit("delete label: ${label}")
}

function rename_label($path, $idx, $new_label) {
  $file = $path + ".json"
  $notes = Get-Content $file | ConvertFrom-Json
  $old_label = $notes.labels[$idx]

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

function add_category($path, $c_name, $c_cols) {
  $file = $path + ".json"

  if ($c_name.length -ge 1 -and $c_cols -ge 1) {
    $noteback = Get-Content $file | ConvertFrom-Json
    $noteback.categorys += @{name=$c_name;cols=$c_cols;notes=@()}
    ConvertTo-Json -Depth 5 -Compress $noteback | Out-File $file
  }
}

function remove_category($path, $idx) {
  $file = $path + ".json"
  $note = Get-Content $file | Out-String | ConvertFrom-Json

  $categorys = [System.Collections.ArrayList]$note.categorys
  $categorys.RemoveAt($idx)

  $note.categorys = @($categorys)

  ConvertTo-Json -Compress $note | Out-File $file
}

function rename_category($path, $idx, $c_name) {
  $file = $path + ".json"

  $note = Get-Content $file | ConvertFrom-Json

  $category = $note.categorys[$idx]

  $note.categorys[$idx].name = $c_name

  ConvertTo-Json -Compress $note -Depth 3 | Out-File $file

  git_commit("rename category: $old_category -> $new_category")
}

function create_note_template($path, $idx) {
  $dir_cnt = Get-ChildItem ".tmp" | Measure-Object | ForEach-Object {$_.Count}

  $create_template = $false

  if ($dir_cnt -ge 1) {
    Write-Host ".tmp below file exists" -ForegroundColor Red
    $del? = Read-Host "IsDelete? [y/n]"
    if ($del? -eq "y") {
      Remove-Item -Path ".tmp" -Recurse;
      New-Item -Path ".tmp" -ItemType Directory | Out-Null;
      $create_template = $true
    }
  } else {
    $create_template = $true
  }
  if ($create_template) {
    $id = [int](Get-Content "id"); ($id + 1) | Out-File "id" -Encoding utf8
    New-Item -Path ".tmp/${id}" -ItemType Directory | Out-Null;
    $file = $path + ".json"
    $path >> ".tmp/path"; $idx > ".tmp/category"
    
    $noteback = Get-Content $file | ConvertFrom-Json;
    $data_num = $noteback.categorys[$idx].cols

    foreach ($n in (1 .. $data_num)) {
      if ( -Not (Test-Path ".tmp/${id}/${n}")) { Out-File ".tmp/${id}/${n}" }
      else { Write-Host "./tmp/${id} is no empty." }
    }

    Write-Host "data file folder at './tmp/${id}'"
    $doc = Read-Host "write doc [y/n]?"
    $file = Read-Host "write file [y/n]?"

    if ($doc -eq 'y') { New-Item ".tmp/${id}/doc" -ItemType Directory | Out-Null; New-Item ".tmp/${id}/README.md" -ItemType File | Out-Null;; }
    if ($file -eq 'y') { New-Item ".tmp/${id}/file" -ItemType Directory | Out-Null; }
    Write-Host "note template create success." -ForegroundColor Yellow
  }
}

function launch_note() {
  [int]$c_idx = Get-Content ".tmp/category" | Out-String
  $id = Get-ChildItem -Path ".tmp" -Directory | Select-Object -First 1 -ExpandProperty "Name"
  $doc = Test-Path ".tmp/${id}/doc" 
  $file = Test-Path ".tmp/${id}/file"
  $note = @{id=$id;doc=$doc;file=$file}
  
  $path = Get-Content ".tmp/path"
  $file = $path + ".json"

  $noteback = Get-Content $file | ConvertFrom-Json
  $noteback.categorys[$c_idx].notes += $note
  ConvertTo-Json $noteback -Compress -Depth 4 | Out-File $file
  # Move-Item -Path ".tmp/${id}" -Destination $path
  Get-ChildItem "./tmp" | Remove-Item
}

function update_note() {

}

