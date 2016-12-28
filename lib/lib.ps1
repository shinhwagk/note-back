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
  $noteback.categorys | ForEach-Object {$i=1} {
    $ids = ConvertTo-Json -Compress @($noteback.categorys[$i-1].notes | ForEach-Object {$_.id})
    "  ${i}: name=" + $_.name + ", cols=" + $_.cols + ", ids=" + $ids + "" | Write-Host ;
    $i++
  };
}

function operationCli() {
  Write-Host "please enter code:"
  Write-Host -NoNewline "     l1" -ForegroundColor Yellow; Write-Host -NoNewline " (label id)"
  Write-Host ""
  Write-Host -NoNewline "     al (add label)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "ac (add category)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "cnt[int] (create note template)" -ForegroundColor Yellow
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
  Write-Host -NoNewline "     ps (previous)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "infd (init note full data)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "un (undo disabled)" -ForegroundColor Yellow
  Write-Host -NoNewline " | "
  Write-Host -NoNewline "pd (push data)" -ForegroundColor Yellow
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

function check_last_version($path) {
  if ( -Not (Test-Path $path) ) {
    Write-Host "Path: <${path}> no exists." -ForegroundColor Red
    git clone -b data-note --depth=1 https://github.com/shinhwagk/note-back data
  }

  Write-Host "update edit-cli."
  git pull
}

function main($path) {
  # check_last_version $path

  Write-Host ("-" * 30)
  Write-Host -NoNewline "Path: " -ForegroundColor DarkGreen; Write-Host $path -ForegroundColor Red;
  Write-Host ("-" * 30)

  $label_container = labels($path);
  $category_container = categorys($path);

  Write-Host ("-" * 30)
  Write-Host ""

  $oper_code = operationCli

  Write-Host ""
  Write-Host ""

  if(-Not (Test-Path $path)) {
    New-Item -Path $path -ItemType Directory
  }

  switch -regex ($oper_code) {
    "^l[1-9][0-9]*$" {
      $idx = [int]$_.Substring(1) - 1;
      $l_name = $label_container[$idx];
      $path = $path + '/' + $l_name;
    }
    "^al$" {
      $label = Read-Host "enter label"
      add_label $path $label;
    }
    "^ac$" {
      $name = Read-Host "enter category"
      $cols = [int](Read-Host "enter column count")
      add_category $path $name $cols;
    }
    "^cnt[1-9]+$" {
      if($oper_code.length -ge 4) {
        $idx = [int]$oper_code.Substring(3) - 1;
        create_note_template $path $idx;
      }
    }
    "^ln$" {
      launch_note
    }
    "^rl[1-9][0-9]*$" {
      $idx = [int]$oper_code.Substring(2) - 1;
      $new_label = Read-Host "enter new label"
      rename_label $path $idx $new_label;
    }
    "^rc[1-9][0-9]*$" {
      $idx = [int]$oper_code.Substring(2) - 1;
      $c_name = Read-Host "enter new category"
      rename_category $path $idx $c_name;
    }
    "un[1-9]+" {
      if ($oper_code.length -ge 3) {
        $idx = [int]$oper_code.Substring(2) - 1;
        update_note $path $idx; main $path;
      }
    }
    "^dl[1-9][0-9]*$" {
      $idx = [int]$_.Substring(2) - 1;
      remove_label $path $idx;
    }
    "^dc[1-9][0-9]*$" {
      $idx = [int]$oper_code.Substring(2) - 1;
      remove_category $path $c_idx;
    }
    "dn" {
      [int]$c_idx = Read-Host "Category id";
      [int]$n_id = Read-Host "Note id";
      remove_note $path ($c_idx -1) $n_id;
    }
    "infd" { pull_data; }
    "pd" { push_data; }
    "exit" { exit 0 }
    "quit" { exit 0 }
    # "un" { git_rest_one; }
    "ps" { $path = previousPath $path;  }
    default { Write-Host "enter error; retry." -ForegroundColor Red; }
  }

  main $path
}