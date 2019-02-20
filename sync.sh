cp -rpf ../gGnome.js/* ./
rm -rf ./node_modules/*
find ./ -name "package*" -type f -exec rm -rf {} \;
cp ./datafiles.csv0 ./datafiles.csv
git add .
git commit . -m 'synced with gGnome.js'
git push origin master
