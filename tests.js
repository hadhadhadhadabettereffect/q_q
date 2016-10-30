var test = require("tape");
var queue = require(".");
var queueOnce = require(".").queueOnce;

var repeat = 1 + (Math.random() * 20) | 0;
var x = 0;
function addOne() { ++x; }

function repeatCall(fn) {
    for (var i = 0; i < repeat; ++i) {
        fn(addOne);
    }
}

test("queue task", function(t) {
    t.plan(1);

    x = 0;

    repeatCall(queue);

    setTimeout(function () {
        t.equal(x, repeat, "function called once for each time queue was called");
    }, 20);
});


test("queue once", function(t) {
    t.plan(2);

    x = 0;

    repeatCall(queueOnce);

    setTimeout(function () {
        t.equal(x, 1, "queueOnce skips action if already queued");

        repeatCall(queueOnce);

        setTimeout(function () {
            t.equal(x, 2, "function can be added again after queue clears");
        }, 20);

    }, 10);
});

