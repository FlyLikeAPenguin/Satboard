#!/usr/bin/env bash
set -eu

cd "${0%/*}"
mkdir -p norad && cd norad

# https://celestrak.org/NORAD/elements/
# [...document.links].forEach(link => {if (link.href.match(/txt$/)) {console.log(link.href)}});

curl "https://celestrak.org/NORAD/elements/gp.php?GROUP=last-30-days&amp;FORMAT=tle" -o tle-new.txt
curl "https://celestrak.org/NORAD/elements/gp.php?GROUP=stations&amp;FORMAT=tle" -o stations.txt
curl "https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&amp;FORMAT=tle" -o visual.txt
# curl -O https://celestrak.org/NORAD/elements/active.txt
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=43890&FORMAT=tle" -o grus.txt
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=47933&FORMAT=tle" >> grus.txt
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=47934&FORMAT=tle" >> grus.txt
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=47935&FORMAT=tle" >> grus.txt
curl "https://celestrak.org/NORAD/elements/gp.php?CATNR=47936&FORMAT=tle" >> grus.txt