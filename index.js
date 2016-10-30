"use strict";

var raf = require("raf");
var timestamp = require("performance-now");

var now;
var i = 0;
var count = 0;
var tasks = [];

function runTasks(then) {
    do {
        tasks[i]();
        tasks[i] = null;
        now = timestamp();

        if (++i >= count) {
            i = count = 0;
            return;
        }
    } while (now - then < 3);

    raf(runTasks);
}

/**
 * add function to queue. start loop if not running.
 * @param {function} task
 */
function queueTask(task) {
    if (count === 0) raf(runTasks);
    tasks[count++] = task;
}

/**
 * add function to queue if not already in queue
 * @param {function} task
 */

function queueOnce(task) {
    if (count === 0) raf(runTasks);
    for (var j = i; j < count; ++j) {
        if (tasks[j] == task) return;
    }
    tasks[count++] = task;
}

exports = module.exports = queueTask;
module.exports.queueOnce = queueOnce;