// Base: Array
export class ArrayStack {
  stack;
  top: number;
  constructor(public maxSize: number = 10) {
    this.stack = new Array(maxSize);
    this.top = -1;
  }

  // methods
  push(data: unknown) {
    if (this.top >= this.maxSize - 1) {
      throw new Error("Stack Overflow");
    }
    this.stack[++this.top] = data;
  }

  isEmpty() {
    return this.top == -1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }
    return this.stack[this.top--];
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error("Stack Underflow");
    }
    return this.stack[this.top];
  }

  isFull() {
    return this.top === this.maxSize - 1;
  }
}

// const stack = new ArrayStack(10);

// stack.isEmpty();
// stack.push(10);

// console.log(stack.peek());

// stack.push(20);
// stack.push(30);
// stack.push(40);
// stack.push(50);
// stack.pop();

// console.log(stack);
