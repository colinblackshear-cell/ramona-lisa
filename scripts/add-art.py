#!/usr/bin/env python3
"""Slot a finished picture into the episode: add-art.py <prompt-no> <image> <name> "<alt text>".
Converts the image to webp in public/episodes/weeping-statue/art/<name>.webp and replaces the
planned-shot placeholder whose brief says "prompt <no>"."""
import re, sys
from PIL import Image
n, img, name, alt = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
im = Image.open(img).convert("RGB")
im.save(f"public/episodes/weeping-statue/art/{name}.webp", "WEBP", quality=82)
p = "src/content/episodes/weeping-statue/episode.ts"
s = open(p).read()
m = re.search(r"  (\w+): \{\n    src: \"\",\n(?:(?!  \},).)*?prompt " + n + r"\)(?:(?!  \},).)*?\n  \},", s, re.S)
if not m:
    # A filler shot (layers 1 and 2) lives in shots.ts: give it its art there.
    q = "src/content/episodes/weeping-statue/shots.ts"
    t = open(q).read()
    line = re.search(r"^  \{ prompt: " + n + r", .*\},?$", t, re.M)
    if not line:
        sys.exit(f"no planned shot for prompt {n}")
    a = alt.replace('"', '\\"')
    art = f'art: {{ src: "episodes/weeping-statue/art/{name}.webp", alt: "{a}", width: {im.width}, height: {im.height}, status: "canon" }} }}'
    new = re.sub(r" \}(,?)$", lambda mm: ", " + art + mm.group(1), line.group(0))
    open(q, "w").write(t[: line.start()] + new + t[line.end():])
    print(f"prompt {n} -> shots.ts art = {name}.webp")
    sys.exit(0)
alt = alt.replace('"', '\\"')
s = s[: m.start()] + f'  {m.group(1)}: {{\n    src: `${{A}}{name}.webp`,\n    alt: "{alt}",\n    width: {im.width},\n    height: {im.height},\n    status: "canon",\n  }},' + s[m.end():]
open(p, "w").write(s)
print(f"prompt {n} -> art.{m.group(1)} = {name}.webp")
