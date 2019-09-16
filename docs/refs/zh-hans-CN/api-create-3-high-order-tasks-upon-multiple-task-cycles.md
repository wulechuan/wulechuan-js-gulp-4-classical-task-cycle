# 吴乐川针对 Gulpjs 4 构建经典任务循环的工具

- 回到 [中文文章列表页](../../../ReadMe.zh-hans-CN.md)


## Multilingual Editions of this Article

- [English (US)](../en-US/api-create-3-high-order-tasks-upon-multiple-task-cycles.md)




## 从多个【任务循环】构建 3 个【高阶任务】的编程接口

应使用 `create3HighOrderTasksUponMultipleTaskCycles` 方法。

### 入口参数

#### options

```js
const {
    /*
        【必须】
        一个数字，包含零个、一个或若干个【任务循环】。
        当一个所谓【高阶任务】运行时，其涉及的这些【任务循环】将会开始并行。
    */
    taskCyclesInPallarel,

    beforeCleaningEveryThing,      // 【可选】 一个普普通通的函数而已。
    afterCleaningEveryThing,       // 【可选】 一个普普通通的函数而已。

    beforeBuildingEveryThingOnce,  // 【可选】 一个普普通通的函数而已。
    afterBuildingEveryThingOnce,   // 【可选】 一个普普通通的函数而已。

    beforeWatchingEveryThing,      // 【可选】 一个普普通通的函数而已。

    languageCodeOfBuiltInMessages, // 【可选】 一个字符串。可取值诸如 "zh-CN"、"zh-hans-CN" 和 "zh-cn" 等等。
} = options
```


### 返回值

该方法返回一个对象，其中包含三个函数。仅此而已。

```js
{
    cleanAllOldOuputs,   // 一个函数。可用作 Gulp 4 的任务。
    buildEverythingOnce, // 一个函数。可用作 Gulp 4 的任务。
    watchEverything,     // 一个函数。可用作 Gulp 4 的任务。
}
```

#### 返回值的使用示例

假定调用该方法的文件名为 gulpfile.js。如下：

```js
// 此处省略导入、配置等语句。

module.exports = create3HighOrderTasksUponMultipleTaskCycles({
    // 此处省略了细节。
})
```

则，在命令行中，可以执行以下语句来启动上述【高阶任务】之一。

-   并行所有【任务循环】，互不干涉。但仅执行一次。所有任务完毕后，程序自动退出。

    ```bash
    gulp    buildEverythingOnce
    ```

-   并行所有【任务循环】，互不干涉。并且借助 Glup 的文件监视器按下反复执行变动之文件所涉的一个或多个【任务循环】。程序不会自动退出。退出须人为中止之。

    ```bash
    gulp    watchEverything
    ```

-   并行所有【任务循环】，互不干涉。清除所有【任务循环】输出过的所有文件。所有任务完毕后，程序自动退出。

    ```bash
    gulp    cleanAllOldOuputs
    ```
