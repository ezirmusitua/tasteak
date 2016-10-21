# 随机 JSON 数据生成器
一个利用 mongoose schema 生成随机数据并保存未 JSON 文件的小程序

## 如何使用
将 mongoose 的 Schema 传入构造函数中:
1. 使用
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
// add plugin
randGenerator.addPlugin({'name': 'chinese'});
// generate a random data
console.log(randGenerator.create());
// generate 3 random data
console.log(randGenerator.create(3));
// generate 3 random data and save to file
randGenerator.save(3);
// update schema
randGenerator.updateType(newSchema);
```

### Prerequisites
What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you have to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
