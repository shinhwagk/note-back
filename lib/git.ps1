function git_commit($message) {
    cd data
    Get-Location
    git add -A
    git commit -m $message
    # git push
    cd ..
}