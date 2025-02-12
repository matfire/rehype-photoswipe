import { visit } from "unist-util-visit";
import {isElement} from "hast-util-is-element";
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
    if (!tree) {
      console.log("tree is null");
      return;
    };
    const promises = [];
    visit(tree, "element", (node, index, parent) => {
      if (!parent || typeof index !== "number") return; // Ensure parent exists
      if (isElement(node, "img")) {
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
          .catch((e) => {
            console.log(`[RehypePhotoswipe]: ${e}`);
          });
        promises.push(promise);
        }
    });
      await Promise.allSettled(promises);
  };
};

export default rehypePhotoswipe;
