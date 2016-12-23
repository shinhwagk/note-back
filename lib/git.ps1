function git_commit($message) {
    Set-Location data
    git add -A
    git commit -m $message
    # git push
    Set-Location ..
}

function git_pull_data() {
    if (-Not (Test-Path "data")) {
        git clone -b data-note https://github.com/shinhwagk/note-back data --depth=1
    }
    if (-Not (Test-Path "data-docs")) {
        git clone -b data-docs https://github.com/shinhwagk/note-back data-docs --depth=1
    }
    if (-Not (Test-Path "data-files")) {
        git clone -b data-files https://github.com/shinhwagk/note-back data-files --depth=1
    }

    Write-Host "check data-files update"
    cd data-files; git pull | Out-Null; cd ..
    Write-Host "check data-docs update"
    cd data-docs; git pull | Out-Null; cd ..
    Write-Host "check data update"
    cd data; git pull | Out-Null; cd ..
    Write-Host "check nb-cli update"
    git pull | Out-Null
}

# function git_rest_one() {
#     cd data
#     git rest HEAD~1
#     git clean -xfd
#     cd ..
# }


function push_data() {
    Set-Location data
    git push
    Set-Location ..
}