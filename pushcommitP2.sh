#!/bin/bash
cd .
node getStatsP2.js
node getStatsP2CE.js
node getStatsP2SM.js
node getStatsPR.js
git checkout gh-pages
git add .
git commit -m auto-update
git push
