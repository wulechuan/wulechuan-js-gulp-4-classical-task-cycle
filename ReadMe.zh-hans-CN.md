# 吴乐川针对 Gulpjs 4 构建经典任务循环的工具

## Multilingual Editions of this Article

- [English version of this ReadMe](./ReadMe.md)




## NPM 页

<dl>
<dt>NPM 包名</dt>
<dd>

[@wulechuan/gulp-classical-task-cycle](https://www.npmjs.com/package/@wulechuan/gulp-classical-task-cycle)

</dd>
<dt>作者</dt>
<dd><p>南昌吴乐川</p></dd>
</dl>





## 简介

待详。


## 用法


### `createATaskCycle` 方法之应用示例

```js
// 引入该工具。
const {
    createATaskCycle,
} = require('@wulechuan/gulp-classical-task-cycle')


// 引入一个 Gulp 管道工具。亦可以是 gulp-stylus、gulp-sass 之类的。
const gulpConvertMarkdownToHTML = require('@wulechuan/gulp-markdown-to-html')


const path = require('path')
const joinPathPOSIX = path.posix.join


// 构建一个经典的【任务循环】。
const taskCycleForMarkdownConversions = createATaskCycle({
    descriptionOfInputsOfCoreTask,

    sourceGlobs: {
        rootFolderPath: 'docs/ref',
        // relativeGlobsSharedWithOtherTaskCycles: [],
        relativeGlobsSpecificallyForThisTaskCycle: [ '**/*.md' ],
        extraSourceGlobsToWatch: [ 'config/markdown-conversion-options.js' ],
    },

    outputFiles: {
        rootFolderPath: 'dist/docs/htmls',
        forBatchOutputFiles: {
            relativeGlobsOfAllPossibleOutputs: [ '**/*.html' ],
        },
    },

    compressions: {
        shouldNotOutputCompressedVersion: true,
    },

    firstPipeForProcessingSources: gulpConvertMarkdownToHTML,
})


// 输出该【任务循环】。
module.exports = taskCycleForMarkdownConversions
```


### `create3HighOrderTasksUponMultipleTaskCycles` 方法之应用示例


```js
// 引入该工具。
const {
    create3HighOrderTasksUponMultipleTaskCycles
} = require('@wulechuan/gulp-classical-task-cycle')


 // 见上例。
const taskCycleForMarkdownConversions = require(
    '../task-cycles/markdown-conversion/to-build-htmls.js'
)


// 假设下列【任务循环】已经存在。
const taskCycleForCopyingIllustrates = require(
    '../task-cycles/markdown-conversion/to-copy-illustrates.js'
)


module.exports = create3HighOrderTasksUponMultipleTaskCycles({
    taskCyclesInPallarel: [
        taskCycleForMarkdownConversions,
        taskCycleForCopyingIllustrates,
    ],

    beforeBuildingEveryThingOnce: function() {
        console.log(`\n正在将所有 markdown 文件转换成 HTML 文件`)
    },
})
```


## 编程接口（APIs）

变成接口已详实。欢迎阅读。

- [构建单个【任务循环】的编程接口](./docs/refs/en-US/api-create-a-task-cycle.md)
- [从多个【任务循环】构建 3 个【高阶任务】的编程接口](./docs/refs/en-US/api-create-3-high-order-tasks-upon-multiple-task-cycles.md)


## 未来计划

-  `options.sourceGlobs.extraSourceGlobsToWatch`

    上面数组中的每个成员，并不要求是相对于 `options.sourceGlobs.rootFolderPath` 的子路径。因此，当 `gulp.src` 处理这些成员后，在 `gulp.dest` 中采取的对应**输出子路径**具体如何，尚不得而知。




## 许可证类型

WTFPL

> 注意：
>
> 我未研究过许可证的约束。因此姑且声明为 WTFPL 类型。但实际上该许可证类型可能与我采用的开源模块有冲突。

