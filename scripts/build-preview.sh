#!/usr/bin/env bash
# Builds a static preview that works from any sub-folder (e.g. a shared link).
# Output: preview/ (index.html + assets). The "_next" folder is renamed because
# some hosts reserve names starting with "_".
set -euo pipefail
cd "$(dirname "$0")/.."
STATIC_EXPORT=1 PREVIEW_RELATIVE=1 NEXT_PUBLIC_ASSET_BASE=. npx next build
rm -rf preview && cp -r out preview
mv preview/_next preview/next-assets
grep -rl "_next/" preview --include=*.html --include=*.js --include=*.css | xargs sed -i.bak 's#_next/#next-assets/#g'
find preview -name '*.bak' -delete
# Some hosts reject a literal U+FFFD in text files; escape it inside JS strings.
python3 - <<'PY'
import os
for r, _, fs in os.walk("preview"):
    for f in fs:
        if f.endswith(".js"):
            p = os.path.join(r, f)
            s = open(p, encoding="utf-8").read()
            if "\ufffd" in s:
                open(p, "w", encoding="utf-8").write(s.replace("\ufffd", "\\uFFFD"))
PY
echo "Preview ready in ./preview"
