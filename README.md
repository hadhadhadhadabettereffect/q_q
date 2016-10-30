# task queue
First-in-first-out queue for async tasks fired in batches with requestAnimationFrame.

## usage
basic usage
```javascript
import queue from "q_q";

queue(function() {
    console.log("later");
});

console.log("now");

/*
    now
    later
 */
```

queueOnce will skip tasks already in queue
```javascript
import { queueOnce } from "q_q";

function sayHi() {
    console.log("hi!");
}

for (let i = 0; i < 10; ++i) {
    queueOnce(sayHi);
}
/*
    hi!
 */
```


