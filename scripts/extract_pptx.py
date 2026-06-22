import json
import re
import zipfile
import xml.etree.ElementTree as ET
from pathlib import Path

pptx = Path(r"C:\Users\envy\Downloads\Mohan_PPP_Ethiopia_2026.pptx")
out = Path(__file__).resolve().parent / "pptx_extract"
out.mkdir(parents=True, exist_ok=True)
unzipped = out / "unzipped"

with zipfile.ZipFile(pptx) as z:
    z.extractall(unzipped)

slides_dir = unzipped / "ppt" / "slides"
slide_files = sorted(
    slides_dir.glob("slide*.xml"),
    key=lambda p: int(re.search(r"slide(\d+)", p.name).group(1)),
)

NS = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
results = []

for sf in slide_files:
    root = ET.parse(sf).getroot()
    texts = []
    for t in root.iter("{http://schemas.openxmlformats.org/drawingml/2006/main}t"):
        if t.text and t.text.strip():
            texts.append(t.text.strip())
    results.append({"file": sf.name, "texts": texts})

theme_path = unzipped / "ppt" / "theme" / "theme1.xml"
theme_colors = []
if theme_path.exists():
    txt = theme_path.read_text(encoding="utf-8")
    theme_colors = re.findall(r'<a:srgbClr val="([A-Fa-f0-9]{6})"', txt)

# extract embedded media list
media_dir = unzipped / "ppt" / "media"
media_files = sorted([p.name for p in media_dir.glob("*")]) if media_dir.exists() else []

payload = {
    "slide_count": len(results),
    "theme_colors": theme_colors,
    "media_files": media_files,
    "slides": results,
}

(out / "content.json").write_text(json.dumps(payload, indent=2), encoding="utf-8")
print(json.dumps({"slide_count": len(results), "theme_colors": theme_colors, "media": media_files}, indent=2))
for i, slide in enumerate(results, 1):
    print(f"\n=== SLIDE {i} ({slide['file']}) ===")
    print("\n".join(slide["texts"]))
