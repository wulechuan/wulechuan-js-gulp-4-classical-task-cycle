/**
 * TODO: `options.sourceGlobs.extraSourceGlobsToWatch`
 * Members of above array are not relative paths to `options.sourceGlobs.rootFolderPath`,
 * so as `gulp.src` (renamed as `gulpRead` within this js file) process
 * those memebers, I'm not sure what kind of output sub paths would be in the `gulp.dest`.
 */

const path = require('path')
const chalk = require('chalk')

const {
    src:    gulpRead,
    dest:   gulpWrite,
    series: gulpBuildTaskSeries,
} = require('gulp')

const buildGulpPipeFromArray = require('gulp-pipe')
const rename = require('gulp-rename')
const del = require('del')

const createErrorMessageBuildersFor = require('@wulechuan/meaningful-error-messages')
const printErrosOfGulpPlugins       = require('@wulechuan/printer-for-errors-of-gulp-plugins')

const {
    isNotANonEmptyString,
    isNotANonArrayObject,
    isNotAnArray,
    isNotAFunction,

    isAFunction,
} = require('./utils/value-type-checkers')






const {
    buildErrorMessage,
    buildErrorMessageSaysThatSomethingMustBe,
} = createErrorMessageBuildersFor('@wulechuan/gulp-classical-task-cycle')

const joinPathPOSIX = path.posix.join






module.exports = function createATaskCycle(options) {
    const errorContext = 'createATaskCycle'

    if (isNotANonArrayObject(options)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'object',
            options,
            'arguments.options',
            errorContext
        ))
    }

    const {
        sourceGlobs: sourceGlobsConfig,
        outputFiles,
        firstPipeForProcessingSources,
        optionsArrayToApplyForTheFirstPipe,
    } = options


    if (isNotANonArrayObject(sourceGlobsConfig)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'object',
            sourceGlobsConfig,
            'options.sourceGlobs',
            errorContext
        ))
    }

    if (isNotANonArrayObject(outputFiles)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'object',
            outputFiles,
            'options.outputFiles',
            errorContext
        ))
    }

    let firstPipeForProcessingSourcesIsProvided = false
    if (firstPipeForProcessingSources) {
        if (isNotAFunction(firstPipeForProcessingSources)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'function',
                firstPipeForProcessingSources,
                'options.firstPipeForProcessingSources',
                errorContext
            ))
        }

        firstPipeForProcessingSourcesIsProvided = true
    }




    const {
        rootFolderPath: sourceGlobsRootFolderPath,

        relativeGlobsSharedWithOtherTaskCycles,
        relativeGlobsSpecificallyForThisTaskCycle,

        extraSourceGlobsToWatch,
    } = sourceGlobsConfig

    if (isNotANonEmptyString(sourceGlobsRootFolderPath)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'a non-empty string',
            sourceGlobsRootFolderPath,
            'options.sourceGlobs.rootFolderPath',
            errorContext
        ))
    }

    if (isNotAnArray(relativeGlobsSpecificallyForThisTaskCycle)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'array',
            relativeGlobsSpecificallyForThisTaskCycle,
            'options.sourceGlobs.relativeGlobsSpecificallyForThisTaskCycle',
            errorContext
        ))
    }

    if (relativeGlobsSharedWithOtherTaskCycles && isNotAnArray(relativeGlobsSharedWithOtherTaskCycles)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'array',
            relativeGlobsSharedWithOtherTaskCycles,
            'options.sourceGlobs.relativeGlobsSharedWithOtherTaskCycles',
            errorContext
        ))
    }

    if (extraSourceGlobsToWatch && isNotAnArray(extraSourceGlobsToWatch)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'array',
            extraSourceGlobsToWatch,
            'options.sourceGlobs.extraSourceGlobsToWatch',
            errorContext
        ))
    }





    const {
        rootFolderPath: outputFilesRootFolderPath,
        forSingleOrTwoOutputFiles,
        forBatchOutputFiles,
    } = outputFiles

    if (isNotANonEmptyString(outputFilesRootFolderPath)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'a non-empty string',
            outputFilesRootFolderPath,
            'options.outputFiles.rootFolderPath',
            errorContext
        ))
    }

    if (!forSingleOrTwoOutputFiles && !forBatchOutputFiles) {
        throw new TypeError(buildErrorMessage(
            [
                `Of the "${chalk.rgb(255, 255, 255)('options.outputFiles')}",`,

                `${
                    chalk.blue('neither')
                } "${
                    chalk.yellow('forSingleOrTwoOutputFiles')
                }" ${
                    chalk.blue('nor')
                } "${
                    chalk.yellow('forBatchOutputFiles')
                }" is provided.`,

                'Please do provide one but either one only.',
            ]
        ))
    } else if (forSingleOrTwoOutputFiles && forBatchOutputFiles) {
        throw new TypeError(buildErrorMessage(
            [
                `Of the "${chalk.rgb(255, 255, 255)('options.outputFiles')}",`,

                `${
                    chalk.yellow('both')
                } "${
                    chalk.yellow('forSingleOrTwoOutputFiles')
                }" and "${
                    chalk.yellow('forBatchOutputFiles')
                }" are provided.`,

                'Please do provide one but either one only.',
            ]
        ))
    }



    let outputFilesAreInABatch



    let outputFileBaseName
    let outputFileExtWithoutDot

    if (forSingleOrTwoOutputFiles) {
        if (isNotANonArrayObject(forSingleOrTwoOutputFiles)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'object',
                forSingleOrTwoOutputFiles,
                'options.outputFiles.forSingleOrTwoOutputFiles',
                errorContext
            ))
        }

        outputFilesAreInABatch = false

        outputFileBaseName      = forSingleOrTwoOutputFiles.fileBaseName
        outputFileExtWithoutDot = forSingleOrTwoOutputFiles.fileExtWithoutDot

        if (isNotANonEmptyString(outputFileBaseName)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'non-empty string',
                outputFileBaseName,
                'options.outputFiles.forSingleOrTwoOutputFiles.outputFileBaseName',
                errorContext
            ))
        }

        if (outputFileExtWithoutDot && isNotANonEmptyString(outputFileExtWithoutDot)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'non-empty string',
                outputFileExtWithoutDot,
                'options.outputFiles.forSingleOrTwoOutputFiles.outputFileExtWithoutDot',
                errorContext
            ))
        }
    }



    let relativeGlobsOfAllPossibleOutputs

    if (forBatchOutputFiles) {
        if (isNotANonArrayObject(forBatchOutputFiles)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'object',
                forBatchOutputFiles,
                'options.outputFiles.forBatchOutputFiles',
                errorContext
            ))
        }

        outputFilesAreInABatch = true

        relativeGlobsOfAllPossibleOutputs = forBatchOutputFiles.relativeGlobsOfAllPossibleOutputs

        if (isNotAnArray(relativeGlobsOfAllPossibleOutputs)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'array',
                relativeGlobsOfAllPossibleOutputs,
                'options.outputFiles.forBatchOutputFiles.relativeGlobsOfAllPossibleOutputs',
                errorContext
            ))
        }
    }



    let {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,
        compressions,
        taskBodies,
    } = options





    let outputFileName1
    let outputFileName2

    let outputFilePath1
    let outputFilePath2

    let allPossibleOutputGlobs



    if (outputFilesAreInABatch) {
        allPossibleOutputGlobs = relativeGlobsOfAllPossibleOutputs.map(glob => {
            return joinPathPOSIX(outputFilesRootFolderPath, glob)
        })
    } else {
        outputFileName1 = `${outputFileBaseName}.${    outputFileExtWithoutDot}`
        outputFileName2 = `${outputFileBaseName}.min.${outputFileExtWithoutDot}`

        outputFilePath1 = joinPathPOSIX(outputFilesRootFolderPath, outputFileName1)
        outputFilePath2 = joinPathPOSIX(outputFilesRootFolderPath, outputFileName2)

        allPossibleOutputGlobs = [
            outputFilePath1,
            outputFilePath2,
        ]
    }

    const _relativeGlobsSharedWithOtherTaskCycles    = !Array.isArray(relativeGlobsSharedWithOtherTaskCycles)    ? [] : relativeGlobsSharedWithOtherTaskCycles
    const _relativeGlobsSpecificallyForThisTaskCycle = !Array.isArray(relativeGlobsSpecificallyForThisTaskCycle) ? [] : relativeGlobsSpecificallyForThisTaskCycle
    const _extraSourceGlobsToWatch                   = !Array.isArray(extraSourceGlobsToWatch)                   ? [] : extraSourceGlobsToWatch

    const allSourceRelativeGlobs = [
        ..._relativeGlobsSharedWithOtherTaskCycles,
        ..._relativeGlobsSpecificallyForThisTaskCycle,
    ]

    const sourceGlobs = allSourceRelativeGlobs.map(
        glob => joinPathPOSIX(sourceGlobsRootFolderPath, glob)
    )

    const sourceGlobsToWatch = [
        ...sourceGlobs,
        ..._extraSourceGlobsToWatch,
    ]






    if (compressions === false) {
        compressions = {
            shouldNotOutputUncompressedVersion: false,
            shouldNotOutputCompressedVersion: true,
        }
    } else if (compressions === true || compressions === undefined || compressions === null) {
        compressions = {
            shouldNotOutputUncompressedVersion: false,
            shouldNotOutputCompressedVersion: false,
        }
    } else if (typeof compressions !== 'object' || Array.isArray(compressions)) {
        throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
            'a boolean, a non-array object, undefined or null',
            compressions,
            'options.compressions',
            errorContext
        ))
    }





    const {
        compressor1IsEnabled = false,
        compressor1 = null,
        compressorOptions1 = null,

        compressor2IsDisabled = false,
        compressor2 = null,
        compressorOptions2 = null,
    } = compressions

    let {
        shouldNotOutputUncompressedVersion,
        shouldNotOutputCompressedVersion,
    } = compressions


    const compressor1IsProvidedAndAllowed =   compressor1IsEnabled && isAFunction(compressor1)
    const compressor2IsProvidedAndAllowed = !compressor2IsDisabled && isAFunction(compressor2)

    shouldNotOutputUncompressedVersion = !!shouldNotOutputUncompressedVersion
    shouldNotOutputCompressedVersion   = !!shouldNotOutputCompressedVersion


    const willOutputTwoVersionsOfFiles = !shouldNotOutputUncompressedVersion && !shouldNotOutputCompressedVersion
    const willOutputMininfiedFilesOnly =  shouldNotOutputUncompressedVersion && !shouldNotOutputCompressedVersion

    if (!descriptionOfCoreTask) {
        descriptionOfCoreTask = ''

        descriptionOfInputsOfCoreTask = descriptionOfInputsOfCoreTask || ''

        if (descriptionOfInputsOfCoreTask) {
            descriptionOfCoreTask += `From    ${chalk.black.bgMagenta(descriptionOfInputsOfCoreTask)}\n`
        }

        if (outputFilesAreInABatch) {
            descriptionOfCoreTask += `Produce ${
                chalk.black.bgGreen(
                    `${
                        relativeGlobsOfAllPossibleOutputs.join(', ')
                    }${
                        chalk.black.bgRed(willOutputMininfiedFilesOnly ? '(all min)' : '')
                    }`
                )
            }`

            if (willOutputTwoVersionsOfFiles) {
                descriptionOfCoreTask += ' (+ all min)'
            }
        } else {
            descriptionOfCoreTask += `Produce ${
                chalk.black.bgGreen(
                    `${
                        outputFileBaseName
                    }${
                        chalk.black.bgRed(willOutputMininfiedFilesOnly ? '.min' : '')
                    }.${outputFileExtWithoutDot}`
                )
            }`

            if (willOutputTwoVersionsOfFiles) {
                descriptionOfCoreTask += ' (+ .min)'
            }
        }


        descriptionOfCoreTask += '\n'
    }


    if (taskBodies) {
        if (isNotANonArrayObject(taskBodies)) {
            throw new TypeError(buildErrorMessageSaysThatSomethingMustBe(
                'a non-array object, undefined or null',
                taskBodies,
                'options.taskBodies',
                errorContext
            ))
        }
    } else {
        taskBodies = {}
    }

    if (isNotAFunction(taskBodies.cleanOldOutputs)) {
        taskBodies.cleanOldOutputs = toCleanOldOutputsFilesTheDefaultWay
    }


    const providedBuildingFunction = taskBodies.buildNewOutputs
    taskBodies.buildNewOutputs = gulpBuildTaskSeries(
        taskBodies.cleanOldOutputs,
        isAFunction(providedBuildingFunction)
            ? providedBuildingFunction
            : toBuildSourceFilesTheDefaultWay
    )

    const taskCycle = {
        descriptionOfCoreTask,
        descriptionOfInputsOfCoreTask,

        outputFilesRootFolderPath,
        outputFilesAreInABatch,
        outputFileBaseName,
        outputFileName1,
        outputFileName2,
        outputFilePath1,
        outputFilePath2,
        allPossibleOutputGlobs,

        sourceGlobsRootFolderPath,
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

        taskBodies,
    }

    // console.log(taskCycle)

    return taskCycle





    function toCleanOldOutputsFilesTheDefaultWay() {
        console.log(`\n${chalk.red('Deleting these files if exist')}:`)
        allPossibleOutputGlobs.forEach(filePath => console.log('    ', chalk.yellow(filePath)))
        return del(allPossibleOutputGlobs)
    }

    function toBuildSourceFilesTheDefaultWay() {
        console.log(`\n${descriptionOfCoreTask}`)

        const pipeSegments = []

        // ---------------------------------------------------------------

        const pipeOfReadingSource = gulpRead(sourceGlobs, {
            base: sourceGlobsRootFolderPath,
        })

        pipeSegments.push(pipeOfReadingSource)

        // ---------------------------------------------------------------

        if (firstPipeForProcessingSourcesIsProvided) {
            let argumentsToArray = optionsArrayToApplyForTheFirstPipe
            if (!Array.isArray(argumentsToArray)) {
                argumentsToArray = [ argumentsToArray ]
            }
            const pipeInstance = firstPipeForProcessingSources.apply(null, argumentsToArray)
            pipeInstance.on('error', theError => {
                printErrosOfGulpPlugins(theError, {
                    basePathToShortenPrintedFilePaths: sourceGlobsRootFolderPath,
                })
                pipeInstance.end()
            })

            pipeSegments.push(pipeInstance)
        }

        // ---------------------------------------------------------------

        if (!shouldNotOutputUncompressedVersion) {
            if (compressor1IsProvidedAndAllowed) {
                const pipeInstance = compressor1(compressorOptions1)
                pipeSegments.push(pipeInstance)

                pipeInstance.on('error', theError => {
                    printErrosOfGulpPlugins(theError, {
                        basePathToShortenPrintedFilePaths: sourceGlobsRootFolderPath,
                    })
                    pipeInstance.end()
                })
            }

            if (!outputFilesAreInABatch) {
                pipeSegments.push(rename(outputFileName1))
            }

            pipeSegments.push(gulpWrite(outputFilesRootFolderPath))
        }

        // ---------------------------------------------------------------

        if (!shouldNotOutputCompressedVersion) {
            if (compressor2IsProvidedAndAllowed) {
                const pipeInstance = compressor2(compressorOptions2)
                pipeSegments.push(pipeInstance)

                pipeInstance.on('error', theError => {
                    printErrosOfGulpPlugins(theError, {
                        basePathToShortenPrintedFilePaths: sourceGlobsRootFolderPath,
                    })
                    pipeInstance.end()
                })
            }

            if (!outputFilesAreInABatch) {
                pipeSegments.push(rename(outputFileName2))
            }

            pipeSegments.push(gulpWrite(outputFilesRootFolderPath))
        }

        // ---------------------------------------------------------------

        const thePipe = buildGulpPipeFromArray(pipeSegments)

        return thePipe
    }
}
