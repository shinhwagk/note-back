function git_commit($message) {
    Set-Location data
    git add id
    git commit -m "update id"
    
    git add -A
    git commit -m $message

    Set-Location ..
}

function pull_data() {
	if (-Not (Test-Path "data")) {
		git clone -b data-note https://github.com/shinhwagk/note-back data --depth=1
	}

	Write-Host "check data-note update"
	Set-Location data; git pull | Out-Null; Set-Location ..
	Write-Host "check nb-cli update"
	git pull | Out-Null
}

function push_data() {
    Set-Location data
    git pull
    git add -A
    git commit -m "update note"
    git push
    Set-Location ..
}