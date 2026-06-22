import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'pptx_extract/unzipped/ppt/charts')
const re = /<c:pt idx="\d+"><c:v>([^<]+)<\/c:v><\/c:pt>/g

for (const n of ['chart2', 'chart3', 'chart5']) {
  const t = fs.readFileSync(path.join(dir, `${n}.xml`), 'utf8')
  const all = [...t.matchAll(re)].map((m) => m[1])
  console.log(n, JSON.stringify(all))
}
