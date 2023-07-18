// https://www.educative.io/blog/crack-coding-interview-real-world-problems#amazon
// Task: Implement a search filter to find products in a given price range. The product data is in the form of a binary search tree. The values are the prices of products.

import priceBST from './tree';

// Binary search tree which stores prices of products in all categories
let priceTree;


const initializePriceTree = () => {
    priceTree = new priceBST();
    priceTree.addNode(20);
    priceTree.addNode(30);
    priceTree.addNode(9);
    priceTree.addNode(14);
    priceTree.addNode(17);
    priceTree.addNode(1);
    priceTree.addNode(6);
    priceTree.addNode(8);
    priceTree.addNode(5);
}

// Stores the prices in a tree structure for ease of search and traversing
function findPriceRange(low, high) {
    initializePriceTree();
    const root = priceTree.root;
    let result = [];

    // Perform a recursive preorder traversal of the price tree
    const checkTree = (root, list) => {
        if (root === null) {
            return result;
        }

        const price = root.data;

        if (price >= low && price <= high) {
            result.push(price);
        }
        result = checkTree(root.left, result);
        return checkTree(root.right, result);
    }

    return checkTree(root, result);
}

const low = 1;
const high = 10;
console.log('findPriceRange: ', findPriceRange(low, high)); // [ 9, 1, 6, 5, 8 ]
