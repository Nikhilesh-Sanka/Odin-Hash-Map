import { LinkedList } from "./linked-lists.mjs";

class HashMap {
  constructor() {
    this.map = [];
    this.loadFactor = 0;
    this.addBuckets();
  }
  addBuckets() {
    for (let i = 0; i < 16; i++) {
      this.map.push([]);
    }
    this.updateLoadFactor();
    this.spreadMap();
  }
  hash(key) {
    let hashCode = 0;
    let primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
      hashCode = (hashCode + primeNumber * key.charCodeAt(i)) % this.map.length;
    }
    return hashCode;
  }
  set(key, value) {
    let hashCode = this.hash(key);
    if (!this.has(key)) {
      this.addLoadFactor();
      if (this.loadFactor > 0.75) {
        this.addBuckets();
      }
    }
    if (this.map[hashCode].length === 0) {
      this.map[hashCode][0] = new LinkedList({ key, value });
      return;
    } else {
      this.map[hashCode][0].addData({ key, value });
    }
  }
  get(key) {
    let hashCode = this.hash(key);
    if (this.map[hashCode].length === 0) {
      return null;
    }
    return this.map[hashCode][0].getValue(key);
  }
  has(key) {
    if (this.get(key) === null) {
      return false;
    }
    return true;
  }
  remove(key) {
    let hashCode = this.hash(key);
    if (this.has(key)) {
      this.subLoadFactor();
    }
    if (this.map[hashCode][0].length === 0) {
      return false;
    }
    this.map[hashCode][0].removeData(key);
    if (this.map[hashCode][0].rootNode === null) {
      this.map[hashCode].pop();
    }
  }
  clear() {
    for (let bucket of this.map) {
      if (bucket.length === 1) {
        bucket.pop();
      }
    }
  }
  get length() {
    let count = 0;
    for (let i = 0; i < this.map.length; i++) {
      if (this.map[i].length === 0) {
        continue;
      }
      let currentNode = this.map[i][0].rootNode;
      while (currentNode !== null) {
        count += 1;
        currentNode = currentNode.nextNode;
      }
    }
    return count;
  }
  get values() {
    let valuesArray = [];
    for (let bucket of this.map) {
      if (bucket.length === 0) {
        continue;
      }
      let currentNode = bucket[0].rootNode;
      while (currentNode !== null) {
        valuesArray.push(currentNode.data.value);
        currentNode = currentNode.nextNode;
      }
    }
    return valuesArray;
  }
  get keys() {
    let keysArray = [];
    for (let bucket of this.map) {
      if (bucket.length === 0) {
        continue;
      }
      let currentNode = bucket[0].rootNode;
      while (currentNode !== null) {
        keysArray.push(currentNode.data.key);
        currentNode = currentNode.nextNode;
      }
    }
    return keysArray;
  }
  get entries() {
    let entriesArray = [];
    for (let bucket of this.map) {
      if (bucket.length === 0) {
        continue;
      }
      let currentNode = bucket[0].rootNode;
      while (currentNode !== null) {
        entriesArray.push([currentNode.data.key, currentNode.data.value]);
        currentNode = currentNode.nextNode;
      }
    }
    return entriesArray;
  }
  addLoadFactor() {
    this.loadFactor += 1 / this.map.length;
  }
  subLoadFactor() {
    this.loadFactor -= 1 / this.map.length;
  }
  updateLoadFactor() {
    this.loadFactor = this.keys.length / this.map.length;
  }
  spreadMap() {
    let entries = this.entries;
    this.clear();
    entries.forEach((entry) => {
      this.set(entry[0], entry[1]);
    });
  }
}

let test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

test.set("moon", "silver");
console.log(JSON.stringify(test.map));
