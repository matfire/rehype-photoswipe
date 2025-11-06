import { visit } from "unist-util-visit";
import {isElement} from "hast-util-is-element";
import probe from "probe-image-size";
import { type Plugin } from "unified";
import {type Root} from "hast"
import {h} from 'hastscript'


const rehypePhotoswipe: Plugin<Array<void>, Root> = () => {
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
        const anchorNode = h("a",{
            href: src,
        }, [node])
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
