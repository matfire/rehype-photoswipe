import { visit } from "unist-util-visit";
import probe from "probe-image-size";
/**
 * @typedef {import('hast').Root} Root
 * @typedef {import('unist').Node} Node
 * @typedef {Root|Root['children'][number]} HastNode
 */

/**
 * @type {import('unified').Plugin<Array<void>, Root>}
 */
const rehypePhotoswipe = () => {
  return async (tree) => {
    const promises = [];

    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img") {
        const { src } = node.properties;
        const anchorNode = {
          type: "element",
          tagName: "a",
          properties: {
            href: src,
          },
          children: [node]
        }
        const promise = probe(src)
          .then(({width, height}) => {
              anchorNode.properties["data-pswp-width"] = width;
              anchorNode.properties["data-pswp-height"] = height;
              parent.children[index] = anchorNode;
          })
          .catch((e) => {console.log(e)}); // Ignore errors
        promises.push(promise);
        }
    });

    await Promise.all(promises);
  };
};

export default rehypePhotoswipe;
