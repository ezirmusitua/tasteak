# 随机 JSON 数据生成器
一个利用 mongoose schema 生成随机数据并保存为 JSON 文件的小程序

## 基本使用
首先引入内置插件以及 generator
```
const prePlugins = require('random-data-generator').plugins;
const dataGenerator = require('random-data-generator).generator;
dataGenerator.use(plugins);
```
定义一个 mongoose schema
```
const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
    title: String,
    content: String,
    guests: [String],
    start: Number,
    isOnline: Boolean
});
```
使用 generate 方法产生随机数据, 接受一个参数, 传入随机数据的个数, 默认为一个
```
// generate a random data
console.log(dataGenerator.generate());
// generate 3 random data
console.log(dataGenerator.generate(3));
```
使用 save 方法产生随机数据并保存, 接受 2 个参数，第 1 个为存储路径，第 2 个为生成数据数目（默认为 1 个）
```
// generate 3 random data and save to data.json
randGenerator.save('./data.json', 3);
```
如果要更改或者更新使用的插件直接针对被 use 的 plugins 操作即可
```
// add plugin
prePlugins.push({title: 'chinese'});
// use another plugins
const prePlugins = prePlugins.concat([{title: /[a-z]{2,5}/}, {content: 'chinese'}])
```
关于自定义插件的设置
插件是一个对象
```
const plugin = {keyInSchema: valuePattern, params: arrayOfParams}
```
其中，keyInSchema 指的是在 schema 中定义的键，valuePattern 指的是如何生成 key 的值，可以使用内置的类型，正则表达式以及一个函数，如果 valuePattern 为 function 则需要传一个 params 数组

## 安装
...

## 运行测试
```
npm test
```

## License
MIT

## TODOS
 - [ ] 简化项目结构，去除不必要语言特性的使用
 - [x] 将 randomFloat 的获取从 randomNumber 中抽离
 - [ ] 为 randomNumber 增加更多的 单元测试
 - [ ] 重写 randomString, 组织成为一个 代理 而不是方法
 - [ ] 重新设计 插件 的使用
 - [ ] 移除 randomChinese 方法, 转换成为一个 插件
 - [ ] 内联 chinese.json 文件
 - [ ] 研究其他类似库的使用方法
