import fs from 'node:fs/promises'
import {rehype} from 'rehype'
import rehypePhotoswipe from './src/index.js'
const document = await fs.readFile('test.html', 'utf8')

const file = await rehype()
  .data('settings', {fragment: true})
  .use(rehypePhotoswipe)
  .process(document)

await fs.writeFile('output.html', String(file))