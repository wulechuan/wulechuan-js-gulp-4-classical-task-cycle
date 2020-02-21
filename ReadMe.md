# Wulechuan's Tool for Creating Classical Task Cycles for Gulp 4

## Multilingual Editions of this Article

- [简体中文版文档](./ReadMe.zh-hans-CN.md)




## NPM Page

<dl>
<dt>Package Name</dt>
<dd>

[@wulechuan/gulp-classical-task-cycle](https://www.npmjs.com/package/@wulechuan/gulp-classical-task-cycle)

</dd>
<dt>Author</dt>
<dd><p>wulechuan (南昌吴乐川)</p></dd>
</dl>




## Introduction

Organize gulp tasks as task cycles. And these cycles should run in parallel. Can also build so-called high order tasks, upon multiple task cycles.


## Usage

### Example of the `createATaskCycle` Method

```js
// Import this tool.
const {
    createATaskCycle,
} = require('@wulechuan/gulp-classical-task-cycle')


// Import a gulp pipe tool. Could be gulp-stylus, gulp-sass, etc.
const gulpConvertMarkdownToHTML = require('@wulechuan/gulp-markdown-to-html')


const path = require('path')
const joinPathPOSIX = path.posix.join


// Build a task cycle.
const taskCycleForMarkdownConversions = createATaskCycle({
    descriptionOfInputsOfCoreTask,

    sourceGlobs: {
        rootFolderPath: 'documents/ref',
        // relativeGlobsSharedWithOtherTaskCycles: [],
        relativeGlobsSpecificallyForThisTaskCycle: [ '**/*.md' ],
        extraSourceGlobsToWatch: [ 'config/markdown-conversion-options.js' ],
    },

    outputFiles: {
        rootFolderPath: 'dist/documents/htmls',
        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [ '**/*.html' ],
        },
    },

    compressions: {
        shouldNotOutputCompressedVersion: true,
    },

    firstPipeForProcessingSources: gulpConvertMarkdownToHTML,
})


// Export this task cycle.
module.exports = taskCycleForMarkdownConversions
```


### Example of the `create3HighOrderTasksUponMultipleTaskCycles` Method

```js
// Import this tool.
const {
    create3HighOrderTasksUponMultipleTaskCycles
} = require('@wulechuan/gulp-classical-task-cycle')


// See the previous example.
const taskCycleForMarkdownConversions = require(
    '../task-cycles/markdown-conversion/to-build-htmls.js'
)


// Assume the task cycle below exists.
const taskCycleForCopyingIllustrates = require(
    '../task-cycles/markdown-conversion/to-copy-illustrates.js'
)


module.exports = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        taskCycleForMarkdownConversions,
        taskCycleForCopyingIllustrates,
    ],

    beforeBuildingEveryThingOnce: function() {
        console.log(`\nConverting all markdown files into HTML files`)
    },
})
```


## APIs

- [APIs of `createATaskCycle` Method](./documents/refs/en-US/api-create-a-task-cycle.md)
- [APIs of `create3HighOrderTasksUponMultipleTaskCycles` Method](./documents/refs/en-US/api-create-3-high-order-tasks-upon-multiple-task-cycles.md)


## TODOS

-  `options.sourceGlobs.extraSourceGlobsToWatch`

    Members of above array are not relative paths to `options.sourceGlobs.rootFolderPath`, so as `gulp.src` process those memebers, I'm not sure what kind of output sub paths would be in the `gulp.dest`.





## License

WTFPL

> NOTE:
>
> I'm not an expert about license types. So I temporarily use WTFPL. But I guess this type of license might conflict with the ones used by those npm packages I'm utilizing.
