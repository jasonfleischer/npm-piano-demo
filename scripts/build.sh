#!/bin/bash

# requirements:
# npm, uglify-js, browserify

# $ npm install -g uglify-js
# $ npm install -g browserify


#npm init -y
#npm i simple-piano --save
#npm update

CWD=`pwd`

uglifyjs js/module.js js/main.js -o js/bundle.js
browserify js/bundle.js -o js/bundle.js

git add *; git commit -m 'update'; git push;

cd $CWD


