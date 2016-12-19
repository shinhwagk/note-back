. "./lib/edit.ps1"
. "./lib/git.ps1"

function labels($path) {
  Write-Host "Lable List:" -ForegroundColor DarkGreen;
  Write-Host ("-" * 30)
  $file = $path + ".json"

  $notes = Get-Content $file | Out-String | ConvertFrom-Json

  $notes.labels | ForEach-Object {$i=1} {"  ${i}: $_ " | Write-Host ; $i++ };

  $label_container = @()

  $notes.labels | ForEach-Object { $label_container += $_ };

  return ,$label_container
}

function categorys($path) {
  Write-Host "Category List:" -ForegroundColor DarkGreen;
  Write-Host ("-" * 30)
  $noteback = Get-Content ($path + ".json") | Out-String | ConvertFrom-Json
  $noteback.categorys | ForEach-Object {$i=1} {"  ${i}: name=" + $_.name + ", cols=" + $_.cols + "." | Write-Host ; $i++ };
}

function operation-cli() {
  Write-Host "please enter code:"
  Write-Host -NoNewline "     l1" -ForegroundColor Yellow; Write-Host -NoNewline " (label id)"
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "c1 (category id)" -ForegroundColor Yellow
  Write-Host ""
  Write-Host -NoNewline "     al (add label)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "ac (add category)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "an (add note)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "ln (launch note)" -ForegroundColor Yellow
  Write-Host ""
  Write-Host -NoNewline "     rl (rename label rl1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "rc (rename category rc1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "  
  Write-Host -NoNewline "un (update note)" -ForegroundColor Yellow
  Write-Host ""
  Write-Host -NoNewline "     dl (delete label dl1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "dc (delete category dc1)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "dn (delete note)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "cn (clean note)" -ForegroundColor Yellow
  Write-Host ""
  Write-Host -NoNewline "     back" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "ps (previous)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "infd (init note full data)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "un (undo disabled)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host "exit(quit)" -ForegroundColor Yellow
  $oper_code = Read-Host "code"
  return $oper_code
}

function previousPath($path) {
  if ($path -eq 'data/index') {
    return $path
  } else {
    $idx = $path.LastIndexOf('/')
    return $path.SubString(0, $idx)
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
  Write-Host -NoNewline "Path: " -ForegroundColor DarkGreen; Write-Host $path -ForegroundColor Red;
  Write-Host ("-" * 30)

  $label_container = labels($path);
  $category_container = categorys($path);

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
    }
    "c*" { }
    "al" { 
      $label = Read-Host "enter label"
      add_label $path $label; 
    }
    "ac" { 
      $name = Read-Host "enter category"
      $cols = [int](Read-Host "enter column count")
      add_category $path $name $cols; 
    }
    "an*" { 
      $idx = [int]$oper_code.Substring(2) - 1;
      add_note $path $idx;
    }
    "rl*" {
      $idx = [int]$oper_code.Substring(2) - 1;
      $new_label = Read-Host "enter new label"
      rename_label $path $idx $new_label;
    }
    "rc*" {
      $idx = [int]$oper_code.Substring(2) - 1;
      rename_category $path $idx;
    }
    "un*" {
      $idx = [int]$oper_code.Substring(2) - 1;
      update_note $path $idx; main $path;
    }
    "dl*" {
      $idx = [int]$oper_code.Substring(2) - 1;
      remove_label $path $idx; 
    }
    "dc*" {
      $idx = [int]$oper_code.Substring(2) - 1;
      remove_category $path $c_idx;
    }
    "back" { Write-Host a }
    "infd" { git_pull_data; }
    "exit" { exit 0 }
    "quit" { exit 0 }
    # "un" { git_rest_one; }
    "ps" { $path = previousPath $path;  }
    default { Write-Host "enter error; retry." -ForegroundColor Red; }
  }

  main $path
}