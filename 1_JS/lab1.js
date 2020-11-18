print = console.log // Python > JavaScript :D

class Queue {
    constructor() {
        this.q = [];
    }


    //#region Given Methods

    // get the current number of elements in the queue
    //Getter function
    get length() {
        return this.q.length
    };

    //Get all the elements 
    get queue() {
        return this.q;
    }

    // Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };

    //adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };

    //Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }

    // pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };

    //#endregion

    // removes all elements from the queue
    removeAll() {
        this.q = [];
    }

    // add a set of items to the queue
    addAll(arr) {
        for (let i = 0; i < arr.length; i++) {
            this.enqueue(arr[i]);
        }
    }

    // pops N elements from the queue
    dequeueN(N) {
        if (N > this.length) {
            throw ("Not enough elements in the array to remove that many");
        }

        for (let i = 0; i < N; i++) {
            this.dequeue();
        }
    }

    // return index
    getIndex(i) {
        if (i >= this.length) {
            throw ("Index Error")
        }

        return this.q[i];
    }

    // print index
    printIndex(i) {
        if (i >= this.length) {
            throw ("Index Error")
        }

        print(i + "->" + this.q[i]);
    }
};

let queue = new Queue();

// GIVEN METHODS TESTS
// queue.enqueue(10);
// queue.enqueue(20);
// print(queue.length);
// print(queue.q);
// queue.dequeue();
// queue.enqueue(33);
// print(queue.q);
// print(queue.inQueue(33));
// print(queue.inQueue(88));

// NEW METHODS TESTS
queue.addAll([3, 7, 1, 9, 10, 15]);
print(queue.q);
queue.dequeueN(2);
print(queue.q);
try { queue.dequeueN(10); } catch{ print("Error Caught - N was too large"); }
print(queue.q);
queue.printIndex(2);
try { queue.printIndex(10); } catch { print("Error Caught - Index Error"); }
queue.removeAll();
print(queue.q);

// Expected Output:
// [ 3, 7, 1, 9, 10, 15 ]
// [ 1, 9, 10, 15 ]
// Error Caught - N was too large
// [ 1, 9, 10, 15 ]
// 2->10
// Error Caught - Index Error
// []
