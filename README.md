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
prePlugins[title] = {type: 'chinese'};
// use another plugins
const prePlugins = prePlugins.concat([{title: /[a-z]{2,5}/}, {content: 'chinese'}])
```
关于自定义插件的设置
插件是一个对象
```
{
  KeyName: {
    Type: …,
    Params: […],
    count: …
}
```
其中:
Keyname: 用来匹配 schema 中的字段名称，第一阶段直接全匹配，之后可以考虑正则匹配
Type: 字段用于指定字段的类型，这里可以有三种类型的值，一种是字符串，可以表示内置插件或者是常量，一种是正则表达式，可以表示期望生成字符串的模式，还有一种是普通常量，最后一种是函数，在内部实现中，当生成器使用插件时，会将所有的自定义插件转化为函数，然后在生成时 直接根据字段名调用生成即可
Params 指的是生成数据需要的参数，必须保证正确的顺序(或许以后可以动态参数，目前可以做到对象无序析构传参)
Count 字段用来针对数组类型字段，表面需要生成数组元素个数，以后可以设置为随机个数

## 安装
...

## 运行测试
```
npm test
```

## License
MIT

## TODOS
 - [x] 简化项目结构，去除不必要语言特性的使用
 - [x] 重新设计 插件 的使用
 - [x] 重新组织文件格式
 - [ ] 重新编写单元测试
 - [ ] 修改 generateRandomString, 如果输入字符串，自动转化成正则表达式

