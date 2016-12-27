function git_commit($message) {
    Set-Location data
    git add -A
    git commit -m $message
    # git push
    Set-Location ..

    git add id
    git commit -m "update id"
}

# function git_pull_data() {
# 	if (-Not (Test-Path "data")) {	
# 		git clone -b data-note https://github.com/shinhwagk/note-back data --depth=1
# 	}

# 	Write-Host "check data-note update"
# 	cd data; git pull | Out-Null; cd ..
# 	Write-Host "check nb-cli update"
# 	git pull | Out-Null
# }

# function git_rest_one() {
#     cd data
#     git rest HEAD~1
#     git clean -xfd
#     cd ..
# }

function push_data() {
    Set-Location data
    git add -A
    git commit -m "update note"
    git pull
    git push
    Set-Location ..
}