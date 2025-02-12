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
    console.log("in extension")
  return async (tree) => {
    const promises = [];

    visit(tree, "element", (node) => {
      if (node.tagName === "img") {
        const { src } = node.properties;
        console.log(src);
        const promise = probe(src)
        .then(({width, height}) => {
            node.properties["data-pswp-width"] = width;
            node.properties["data-pswp-height"] = height;
            console.log(node)
        })
        .catch((e) => {console.log(e)}); // Ignore errors
      promises.push(promise);
      }
    });

    await Promise.all(promises);
  };
};

export default rehypePhotoswipe;
