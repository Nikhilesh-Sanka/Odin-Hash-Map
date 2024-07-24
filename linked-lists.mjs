export class LinkedList {
  constructor(data) {
    this.rootNode = new Node(data);
  }
  addData(data) {
    let currentNode = this.rootNode;
    if (currentNode.data.key === data.key) {
      this.rootNode.data.value = data.value;
      return;
    }
    while (currentNode.nextNode !== null) {
      if (currentNode.nextNode.data.key === data.key) {
        currentNode.nextNode.data.value = data.value;
        return;
      }
      currentNode = currentNode.nextNode;
    }
    currentNode.nextNode = new Node(data);
  }
  removeData(key) {
    let currentNode = this.rootNode;
    if (currentNode.data.key === key) {
      this.rootNode = this.rootNode.nextNode;
      return true;
    }
    while (currentNode.nextNode !== null) {
      if (currentNode.nextNode.data.key === key) {
        currentNode.nextNode = currentNode.nextNode.nextNode;
        return true;
      }
      currentNode = currentNode.nextNode;
    }
    return false;
  }
  getValue(key) {
    let currentNode = this.rootNode;
    while (currentNode !== null) {
      if (currentNode.data.key === key) {
        return currentNode.data.value;
      }
      currentNode = currentNode.nextNode;
    }
    return null;
  }
  hasKey(key) {
    if (this.getValue(key) !== null) {
      return true;
    }
    return false;
  }
}

class Node {
  constructor(data, nextNode = null) {
    this.data = data;
    this.nextNode = nextNode;
  }
}
