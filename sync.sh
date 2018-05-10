cp -rpf ../gGnome.js/* ./
find ./node_modules/ -name "*.md" -type f -exec rm -rf {} \;
cp ./index0.html ./index.html
git add .
git commit . -m 'synced with gGnome.js'
git push origin master