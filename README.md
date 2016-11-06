# 随机 JSON 数据生成器
一个能够利用 mongoose schema 生成随机数据的小程序

## 基本使用
使用内置的基本类型生成随机数据, generate 方法接受一个参数，用于指定需要生成的数量
```
const mongoose = require('mongoose');
const testSchema = new mongoose.Schema({
    title: String,
    content: String,
    guests: [String],
    start: Number,
    isOnline: Boolean
});
const prePlugins = require('random-data-generator').plugins;
const dataGenerator = require('random-data-generator).Generator;
const generator = Generator.use(testSchema);
generator.use(prePlugins);
// 1
generator.generate();
// 3
generator.generate(3);
```
使用 save 方法产生随机数据并保存, 接受 2 个参数，第 1 个为存储路径，第 2 个为生成数据数目（默认为 1 个）
```
// generate 3 random data and save to data.json
generator.save('./data.json', 3);
```
更改或者更新使用的插件
```
// add plugin
prePlugins[title] = {type: 'chinese'};
// use another plugins
const prePlugins = prePlugins.concat([{title: /[a-z]{2,5}/}, {content: 'chinese'}])
```
关于自定义插件
```
{
  KeyName: {
    type: …,
    params: […],
    count: …
}
```
其中:
Keyname: 用来匹配 schema 中的字段名称，第一阶段直接全匹配，之后可以考虑正则匹配
Type: 字段用于指定字段的类型，这里可以有三种类型的值，一种是字符串，可以表示内置插件或者是常量，一种是正则表达式，可以表示期望生成字符串的模式，还有一种是普通常量，最后一种是函数，在内部实现中，当生成器使用插件时，会将所有的自定义插件转化为函数，然后在生成时 直接根据字段名调用生成即可
Params 指的是生成数据需要的参数，必须保证正确的顺序(或许以后可以动态参数，目前可以做到对象无序析构传参)
Count 字段用来针对数组类型字段，表面需要生成数组元素个数，以后可以设置为随机个数

## 安装
npm install tasteak

## 运行测试
```
npm test
```

## License
MIT
