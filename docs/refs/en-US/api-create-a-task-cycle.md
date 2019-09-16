# Wulechuan's Tool for Creating Classical Task Cycles for Gulp 4

- Go back to [ReadMe.md](../../../ReadMe.md)


## Multilingual Editions of this Article

- [本文之简体中文版](../zh-hans-CN/api-create-a-task-cycle.md)



## APIs of `createATaskCycle` Method

### Arguments

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


### Returned Value

The returned value is an object, representing a so-called task cycle. The object looks like this:

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
        cleanOldOutputs, // This is the essential output! A function treated as a Gulp 4 task.
        buildNewOutputs, // This is the essential output! A function treated as a Gulp 4 task.
    },
}
```
