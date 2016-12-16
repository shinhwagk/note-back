. "./lib-git.ps1"

function labels($path) {
  Write-Host "Lable List:" -ForegroundColor DarkGreen;
  Write-Host ("-" * 30)
  $file = $path + ".json"

  $notes = Get-Content $file | Out-String | ConvertFrom-Json

  $notes.labels | ForEach-Object {$i=1} {"  ${i}: $_ " | Write-Host ; $i++};

  $label_container = @()

  $notes.labels | ForEach-Object { $label_container += $_ };

  return ,$label_container
}

function categorys($path) {
  Write-Host "Category List:" -ForegroundColor DarkGreen ; 
  Write-Host ("-" * 30)
  $notes = Get-Content ($path + ".json") | Out-String  | ConvertFrom-Json

  $categorys = ($notes.categorys | Get-Member -MemberType NoteProperty | Select-Object Name) | Foreach {"$($_.Name)"}

  $categorys | ForEach-Object {$i=1} {"  ${i}: $_ " | Write-Host ; $i++};

  $category_container = @()

  $categorys | ForEach-Object { $label_container += $_ };

  return ,$category_container
}

function operation-cli(){
  Write-Host -NoNewline "please enter code [ " 
  Write-Host -NoNewline "l1 (label id)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "c1 (category id)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "al (add label)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "ac (add category)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "rl (rename label rl1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "rc (rename category rc1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "dl (delete label dl1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "dc (delete category dc1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "back" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "ps (previous)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "exit(quit)" -ForegroundColor Yellow
  $oper_code = Read-Host " ]"
  return $oper_code
}

function previousPath($path){
  if ($path -eq 'index') {
    return $path
  } else {
    $idx = $path.LastIndexOf('/')
    return $path.SubString(0,$idx)
  }
}

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

function check($path) {
  if ( -Not (Test-Path $path) ) {
    Write-Host "Path: <${path}> no exists." -ForegroundColor Red
    exit 1;
  }
}

function main($path) {
  check $path

  Write-Host ("-" * 30)
  Write-Host "Path: $path" -ForegroundColor DarkGreen;
  Write-Host ("-" * 30)
  $label_container = labels($path);
  # $category_container = categorys($path);
  Write-Host ("-" * 30)

  Write-Host ""

  $oper_code = operation-cli

  Write-Host ""
  Write-Host ""

  switch -wildcard ($oper_code) {
    "l*" { 
      $idx = [int]$oper_code.Substring(1) - 1;
      $l_name = $label_container[$idx];
      $path = $path + '/' + $l_name;
      main($path)
    }
    "c*" { }
    "al" { add_label $path; main $path }
    "ac" { }
    "rl*" { 
      $idx = [int]$oper_code.Substring(2) - 1;
      $l_name = $label_container[$idx];
      rename_label $path $l_name; 
      main $path
    }
    "rc*" {}
    "dl*" {
      $idx = [int]$oper_code.Substring(2) - 1;
      $l_name = $label_container[$idx];
      remove_label $path $l_name
      main $path
    }
    "dc*" {}
    "back" { Write-Host a }
    "exit" { Write-Host "exit"; exit 0 }
    "quit" { Write-Host "exit"; exit 0 }
    "ps" { $previousPath = previousPath($path); main($previousPath); }
    default { Write-Host "enter error; retry." -ForegroundColor Red; main $path }   
  }
}