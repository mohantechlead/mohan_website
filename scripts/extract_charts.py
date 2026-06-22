import json
import re
import xml.etree.ElementTree as ET
from pathlib import Path

charts_dir = Path(__file__).resolve().parent / "pptx_extract" / "unzipped" / "ppt" / "charts"
NS = {"c": "http://schemas.openxmlformats.org/drawingml/2006/chart", "a": "http://schemas.openxmlformats.org/drawingml/2006/main"}

results = {}
for cf in sorted(charts_dir.glob("chart*.xml")):
    if "_rels" in str(cf):
        continue
    root = ET.parse(cf).getroot()
    chart_type = None
    if root.find(".//c:barChart", NS) is not None:
        chart_type = "bar"
    elif root.find(".//c:lineChart", NS) is not None:
        chart_type = "line"
    elif root.find(".//c:pieChart", NS) is not None:
        chart_type = "pie"
    elif root.find(".//c:doughnutChart", NS) is not None:
        chart_type = "doughnut"

    cats = []
    for s in root.findall(".//c:cat//c:strVal", NS):
        if s.get("v"):
            cats.append(s.get("v"))
    for s in root.findall(".//c:cat//c:numVal", NS):
        if s.get("v"):
            cats.append(s.get("v"))

    vals = []
    for s in root.findall(".//c:val//c:numVal", NS):
        if s.get("v"):
            vals.append(float(s.get("v")))

    title_el = root.find(".//c:title//c:v", NS)
    title = title_el.text if title_el is not None else None

    results[cf.name] = {"type": chart_type, "title": title, "categories": cats, "values": vals}

out = charts_dir.parent.parent / "pptx_extract" / "charts.json"
out.write_text(json.dumps(results, indent=2), encoding="utf-8")
print(json.dumps(results, indent=2))
