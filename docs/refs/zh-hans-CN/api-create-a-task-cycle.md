# 吴乐川针对 Gulpjs 4 构建经典任务循环的工具

- 回到 [中文文章列表页](../../../ReadMe.zh-hans-CN.md)


## Multilingual Editions of this Article

- [English (US)](../en-US/api-create-a-task-cycle.md)




## 构建单个【任务循环】的编程接口

应使用 `createATaskCycle` 方法。

### 入口参数


#### options

```js
const {
    descriptionOfCoreTask,         // [optional] A string. Used for printing meaningful infos. BTW, if omitted, the built-in message works just fine.
    descriptionOfInputsOfCoreTask, // [optional] A string. Used for printing meaningful infos. BTW, if omitted, the built-in message works just fine.


    sourceGlobs: { // [required] An object.
        rootFolderPath: sourceGlobsRootFolderPath, // [required] A path string relative to `process.env.PWD`.
        relativeGlobsSharedWithOtherTaskCycles,    // [optional] An array of path strings, each relative to `rootFolderPath` above.
        relativeGlobsSpecificallyForThisTaskCycle, // [required] An array of path strings, each relative to `rootFolderPath` above.
        extraSourceGlobsToWatch,                   // [optional] An array of path strings, each relative to `process.env.PWD`.
    },


    outputFiles: { // [required] An object.
        rootFolderPath: outputRootFolderPath,      // [required] A path string relative to `process.env.PWD`.


        forSingleOrTwoOutputFiles: {
            /*
                [optinal*]
                    Either this or the `forBatchOutputFiles` must be provided.
                    But never provide them both.
                An object.

                - Why 2 files might output? One of them is a minified version.

                - If single file is output, then it might be minified or non-minified,
                  depending on other options.
            */
            fileBaseName,      // [required] A string.
            fileExtWithoutDot, // [optional] A string.
        },


        forBatchOutputFiles: {
            /*
                [optinal*]
                    Either this or the `forSingleOrTwoOutputFiles` must be provided.
                    But never provide them both.
                An object.
            */
            relativeGlobsOfAllPossibleOutputs, // [required] An array. Used for deleting output files when necessary.
        },
    },


    firstPipeForProcessingSources,   // [optional] A function, e.g. `gulp-stylus`, `gulp-less`, `gulp-sass`, etc.


    compressions: {
        /**
            [optional] An object.
            ---------------------------------------------
                Why does compressor1 exist?
                Well, even if we don't compress files,
                we might still want to operate the output
                file somehow.

                Think about `postcss`. We might need to get
                rid of most comments even if we don't
                compress css rules.
                -----------------------------------------
                Compressor2 always stands for producing
                a fully compressed output file.
        */

        shouldNotOutputUncompressedVersion, // [optional] A boolean. Default is `false`.
        shouldNotOutputCompressedVersion,   // [optional] A boolean. Default is `false`.

        compressor1IsEnabled,               // [optional] A boolean. Default is `false`.
        compressor1,                        // [optional] A function.
        compressorOptions1,                 // [optional] Any thing the corresponding compressor accepts. Typically an object.

        compressor2IsDisabled,              // [optional] A boolean. Default is `false`.
        compressor2,                        // [optional] A function.
        compressorOptions2,                 // [optional] Any thing the corresponding compressor accepts. Typically an object.
    },


    taskBodies: { // [optional] An object.
        cleanOldOutputs, // [optional] A function, will be treated as Gulp 4 task body.
        buildNewOutputs, // [optional] A function, will be treated as Gulp 4 task body.
    },
} = options
```


### 返回值

返回值是一个所谓【任务循环】，由一个对象表征。细节如下。

```js
{
    descriptionOfCoreTask,
    descriptionOfInputsOfCoreTask, // Simply a backup, not likely to use.

    outputFilesRootFolderPath,
    outputFilesAreInABatch,
    outputFileBaseName,       // It's undefined if outputFilesAreInABatch === true
    outputFileName1,          // It's undefined if outputFilesAreInABatch === true
    outputFileName2,          // It's undefined if outputFilesAreInABatch === true
    outputFilePath1,          // It's undefined if outputFilesAreInABatch === true
    outputFilePath2,          // It's undefined if outputFilesAreInABatch === true
    allPossibleOutputGlobs,

    sourceGlobsRootFolderPath, // Simply a backup, not likely to use.
    sourceGlobs,
    sourceGlobsToWatch,

    shouldNotOutputUncompressedVersion,
    shouldNotOutputCompressedVersion,

    compressor1IsEnabled,
    compressor1,
    compressorOptions1,

    compressor2IsDisabled,
    compressor2,
    compressorOptions2,

    taskBodies: {
        cleanOldOutputs, // 此为关键！一个函数，作为 Gulp 4 的任务。
        buildNewOutputs, // 此为关键！一个函数，作为 Gulp 4 的任务。
    },
}
```

