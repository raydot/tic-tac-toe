// https://medium.com/swlh/binary-search-tree-in-javascript-31cb74d8263b

// https://levelup.gitconnected.com/deletion-in-binary-search-tree-with-javascript-fded82e1791c

/**
 * Binary Search Tree implementation in JavaScript
 */

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    // this.output = [];
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  /**
   * "To insert a node into a binary search tree:
   *    if (!root):
   *      node = root
   *    else:
   *      node > root:
   *        node right of root:
   *          move right, repeat
   *        else:
   *          node = root.right
   *      else:
   *        Do exact opposite for left node
   */

  insert(value) {
    var newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return this;
    }
    let current = this.root;
    while (current) {
      if (value === current.value) return undefined;
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  /**
   * "To find a node in a binary search tree:
   *  if(!root):
   *    return false
   *  else:
   *    current = this.root; found = false
   *    while(current && !found):
   *      if(value < current.value):
   *         current = current.left
   *      elif(value > current.value):
   *         current = current.right
   *      else
   *         found = current
   *
   *     if(!found) return undefined
   *
   *     return found
   */
  find(value) {
    if (!this.root) return false;

    let current = this.root;
    let found = false;
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = current;
      }
    }

    if (!found) return undefined;
    return found;
  }

  // depthFirst() {}
}

const foo = new BinarySearchTree();
fillItUpDaddy(foo, 20, 20);
console.log(foo);

// console.log("2:", foo.root);
console.log(depthFirst(foo.root));

//
// HELPER FUNCTIONS
//

function fillItUpDaddy(tree, howMany, howHigh) {
  // make this functional but going 'for' for now
  for (let i = 0; i < howMany; i++) {
    tree.insert(gimmieRandom(howHigh));
  }
}

function gimmieRandom(max) {
  return Math.floor(Math.random() * max);
}

var output = [];
function depthFirst(node) {
  console.log("output", output);
  if (node) {
    output.push(node.value);
    depthFirst(node.left);
    depthFirst(node.right);
  }
  return output;
}
