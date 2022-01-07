export class LinkedListNode {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

export class LinkedList {
  constructor(value) {
    const node = new LinkedListNode(value)
    this.head = node
    this.tail = node
  }
}
