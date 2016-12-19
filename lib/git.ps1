function git_commit($message) {
    cd data
    git add -A
    git commit -m $message
    # git push
    cd ..
}

function git_pull_data() {
    if (Test-Path "data") {
        cd data
        git pull
        cd ..
    } else {
        git clone -b data-note https://github.com/shinhwagk/note-back data --depth=1
    }
    if (Test-Path "data-docs") {
        cd data-docs
        git pull
        cd ..
    } else {
        git clone -b data-docs https://github.com/shinhwagk/note-back data-docs --depth=1
    }

    if (Test-Path "data-files") {
        cd data-files
        git pull
        cd ..
    } else {
        git clone -b data-files https://github.com/shinhwagk/note-back data-files --depth=1
    }
}

function git_rest_one() {
    cd data
    git rest HEAD~1
    git clean -xfd
    cd ..
}