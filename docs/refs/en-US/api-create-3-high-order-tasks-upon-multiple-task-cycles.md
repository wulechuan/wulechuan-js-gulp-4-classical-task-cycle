# ulechuan's Tool for Creating Classical Task Cycles for Gulp 4

- Go back to [ReadMe.md](../../../ReadMe.md)


## Multilingual Editions of this Article

- [本文之简体中文版](../zh-hans-CN/api-create-3-high-order-tasks-upon-multiple-task-cycles.md)



## APIs of `create3HighOrderTasksUponMultipleTaskCycles` Method

### Arguments

There is only 1 argument. And it's required. More details below.

#### options

```js
const {
    /*
        [required]
        An array of task cycles.
        These task cycles will run in parallel
        when a high-order task runs.
    */
    taskCyclesInPallarel,

    beforeCleaningEveryThing,      // [optional] Nothing special but a function.
    afterCleaningEveryThing,       // [optional] Nothing special but a function.

    beforeBuildingEveryThingOnce,  // [optional] Nothing special but a function.
    afterBuildingEveryThingOnce,   // [optional] Nothing special but a function.

    beforeWatchingEveryThing,      // [optional] Nothing special but a function.

    languageCodeOfBuiltInMessages, // [optional] A string. "zh-CN", "zh-hans-CN", "zh-cn", etc.
} = options
```


### Returned Value

The method returns an object, containing 3 functions. That's all.

```js
{
    cleanAllOldOuputs,   // A function that Gulp 4 treats as a task.
    buildEverythingOnce, // A function that Gulp 4 treats as a task.
    watchEverything,     // A function that Gulp 4 treats as a task.
}
```


#### How to Use the Returned Value

Assumeing the invocation of the method happens in the file `gulpfile.js`, as shown below.

```js
// Imporing, configurations omitted.

module.exports = create3HighOrderTasksUponMultipleTaskCycles({
    // option details omitted.
})
```

Now, in the `bash` or `PowerShell` environment, we can run any of the high-order task the ways showcase below.

-   To run all task cycles in parallel, but only once. Program quits after all tasks done.

    ```bash
    gulp    buildEverythingOnce
    ```

-   To run all task cycles in parallel, and watch source files via Gulp watcher. Program will not quit unless terminated manually.

    ```bash
    gulp    watchEverything
    ```

-   To run all task cycles in parallel, and delete all existing output files of all these task cycles. Program quits after all tasks done.

    ```bash
    gulp    cleanAllOldOuputs
    ```
