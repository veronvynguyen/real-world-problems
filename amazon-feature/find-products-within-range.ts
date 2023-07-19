// https://www.educative.io/blog/crack-coding-interview-real-world-problems#amazon
// Task: Implement a search filter to find products in a given price range. The product data is in the form of a binary search tree. The values are the prices of products.

import priceBT from './tree';

// Binary search tree which stores prices of products in all categories
let priceTree;

const initializePriceTree = (prices) => {
    priceTree = new priceBT();

    prices.forEach(price => {
        priceTree.addNode(price);
    });
}

// Stores the prices in a tree structure for ease of search and traversing
function findPriceRange(prices, low, high) {
    if (prices.length === 0) return;

    initializePriceTree(prices);
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

const prices = [20, 30, 9, 14, 17, 1, 6, 8, 54];
const low = 1;
const high = 10;
console.log('findPriceRange: ', findPriceRange(prices, low, high)); // [ 9, 1, 6, 5, 8 ]
