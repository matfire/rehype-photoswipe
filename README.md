# rehype-photoswipe

![NPM Version](https://img.shields.io/npm/v/matfire%2Frehype-photoswipe)

> A Rehype extension to add data-pswp-width and data-pswp-height attributes to img tags.

## Install

```bash
npm install @matfire/rehype-photoswipe
```

## Usage

```js
import rehype from 'rehype'
import rehypePhotoswipe from '@matfire/rehype-photoswipe'

const html = await rehype()
    .use(rehypePhotoswipe)
    .process('...')
```