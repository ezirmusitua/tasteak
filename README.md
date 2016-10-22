# 随机 JSON 数据生成器
一个利用 mongoose schema 生成随机数据并保存为 JSON 文件的小程序

## 基本使用
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
 - [ ] 简化项目结构，去除不必要语言特性的使用  
 - [ ] 将 randomFloat 的获取从 randomNumber 中抽离  
 - [ ] 为 randomNumber 增加更多的 单元测试
 - [ ] 重写 randomString, 组织成为一个 代理 而不是方法  
 - [ ] 重新设计 插件 的使用  
 - [ ] 移除 randomChinese 方法, 转换成为一个 插件  
 - [ ] 内联 chinese.json 文件  
 - [ ] 研究其他类似库的使用方法  
