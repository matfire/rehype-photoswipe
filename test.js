import fs from 'node:fs/promises'
import {rehype} from 'rehype'
import rehypePhotoswipe from './dist/index.mjs'
const document = await fs.readFile('test.html', 'utf8')

const file = await rehype()
  .use(rehypePhotoswipe)
  .process(document)

await fs.writeFile('output.html', String(file))