#!/bin/sh
git checkout --orphan newBranch
git add -A
git commit -m "rewrite"
git branch -D gh-pages
git branch -m gh-pages
git push -f origin gh-pages
