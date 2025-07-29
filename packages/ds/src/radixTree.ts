// class RadixNode {
//   children: Map<string, RadixNode>;
//   isEndOfWord: boolean;

//   constructor(public label: string = "") {
//     this.children = new Map();
//     this.isEndOfWord = false;
//   }
// }

// export class RadixTree {
//   root: RadixNode;

//   constructor() {
//     this.root = new RadixNode();
//   }

//   insert(word: string): void {
//     let node = this.root;

//     while (word.length > 0) {
//       let foundChild = false;

//       for (const [edge, child] of node.children) {
//         const commonPrefixLength = this.#commonPrefixLength(word, edge);

//         if (commonPrefixLength === 0) continue;

//         foundChild = true;

//         if (commonPrefixLength < edge.length) {
//           // Split existing edge
//           const existingSuffix = edge.slice(commonPrefixLength);
//           const newChild = new RadixNode(existingSuffix);
//           newChild.children = child.children;
//           newChild.isEndOfWord = child.isEndOfWord;

//           child.label = edge.slice(0, commonPrefixLength);
//           child.children = new Map([[existingSuffix, newChild]]);
//           child.isEndOfWord = false;
//         }

//         word = word.slice(commonPrefixLength);
//         node = child;
//         break;
//       }

//       if (!foundChild) {
//         const newNode = new RadixNode(word);
//         newNode.isEndOfWord = true;
//         node.children.set(word, newNode);
//         return;
//       }
//     }

//     node.isEndOfWord = true;
//   }

//   search(word: string): boolean {
//     let node = this.root;

//     while (word.length > 0) {
//       let found = false;

//       for (const [edge, child] of node.children) {
//         if (word.startsWith(edge)) {
//           word = word.slice(edge.length);
//           node = child;
//           found = true;
//           break;
//         }

//         if (edge.startsWith(word)) {
//           // Word shorter than edge — mismatch
//           return false;
//         }
//       }

//       if (!found) return false;
//     }

//     return node.isEndOfWord;
//   }

//   startsWith(prefix: string): boolean {
//     let node = this.root;

//     while (prefix.length > 0) {
//       let found = false;

//       for (const [edge, child] of node.children) {
//         const common = this.#commonPrefixLength(prefix, edge);

//         if (common === 0) continue;

//         prefix = prefix.slice(common);
//         node = child;
//         found = true;
//         break;
//       }

//       if (!found) return false;
//     }

//     return true;
//   }

//   #commonPrefixLength(a: string, b: string): number {
//     let i = 0;
//     while (i < a.length && i < b.length && a[i] === b[i]) i++;
//     return i;
//   }
// }
