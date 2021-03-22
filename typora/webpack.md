# 1、

### 1.3、hash、chunkhash、contenthash异同

1、hash：针对整个构建，内容有变化时hash也跟着变化，所有文件应用同一个值，一般不用；
2、chunkhash：针对入口文件及其依赖，发生变化时，所有文件应用同一个值，一般应用于output输出js的chunk文件，如果库文件不变，则输出的库文件名也不变；
3、contenthash：针对文件自身内容的变化，一般应用于输出css文件，如果css内容有变化，输出的文件名也会变化；

# 2、

# 3、



