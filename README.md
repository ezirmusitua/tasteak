# 随机 JSON 数据生成器
一个利用 mongoose schema 生成随机数据并保存为 JSON 文件的小程序

## 快速入门
将 mongoose 的 Schema 以及希望使用的 plugins 传入构造函数中创建一个用于生成随机数据的对象
```
const RandomDataGenerator = require('random-data-generator').RandomDataGenerator;
const mongoose = require('mongoose');

const testSchema = new mongoose.Schema({
    title: String,
    content: String,
    guests: [String],
    start: Number,
    isOnline: Boolean
});

const randGenerator = new RandomDataGenerator(testSchema, []);
```
使用 addPlugin 方法添加或修改 plugin, 传入的一个对象, key 为 schema 中需要使用 value 插件的键值
```
// add plugin
randGenerator.addPlugin({'name': 'chinese'});
```
使用 create 方法产生随机数据, 接受一个参数, 传入随机数据的个数, 默认为一个
```
// generate a random data
console.log(randGenerator.create());
// generate 3 random data
console.log(randGenerator.create(3));
```
使用 save 方法产生随机数据并保存, 接受一个参数, 传入随机数据个数, 默认为一个
```
// generate 3 random data and save to file
randGenerator.save(3);
```
使用 updateType 方法更新 schema
```
// update schema
randGenerator.updateType(newSchema);
```

## 安装
...

## 运行测试
```
npm test
```

## License
MIT

## TODOS
 - [ ] 重整文件结构
 - [ ] 添加更多的测试
