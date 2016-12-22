ng build --prod
git clone -b gh-pages --depth=1 https://github.com/shinhwagk/note-back gh-pages

Get-ChildItem "dist" -Exclude "*.map", "*.gz" | Move-Item -Destination "gh-pages"

cd gh-pages
git add -A
git commit -m "Update"
git push
cd ..

Remove-Item -Force -Recurse "dist"
Remove-Item -Force -Recurse "gh-pages"