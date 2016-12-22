git clone -b gh-pages --depth=1 https://github.com/shinhwagk/note-back gh-pages
ng build --prod
cd gh-pages
git add -A
git commit -m "Update"
git push
cd ..