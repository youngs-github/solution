# 1、原理

### 1.1、打包概念

概念：现代javascript应用程序的静态模块打包工具，通过一系列的loader、plugin对应用程序中的依赖文件进行处理并输出；
entry：入口，支持string、array、object；
output：输出，用于指定输出bundle的地址及名称；
loader：处理器，用于转换某些类型的模块，默认只能处理js及json，通过其他loader可以处理更多类型文件；
plugin：插件，用于执行范围更广的任务（相较于loader），包括打包优化、资源管理、注入环境变量等；
mode：模式，针对不同模式进行不同的优化及设置；

### 1.2、babel概念

概念：babel是一个工具，主要用于将es6+版本的代码转换为向后兼容的语法；
parser：@babel/parser包，用于解析es6+、jsx、flow、typescript等部分stage阶段语法的代码，解析成ast；
traverse：@babel/traverse包，用于遍历ast并进行处理；
generator：@babel/generator包，根据preset、plugin等对ast进行处理然后生成代码；

### 1.3、hash、chunkhash、contenthash异同

1、hash：针对整个构建，内容有变化时hash也跟着变化，所有文件应用同一个值，一般不用；
2、chunkhash：针对入口文件及其依赖，发生变化时，所有文件应用同一个值，一般应用于output输出js的chunk文件，如果库文件不变，则输出的库文件名也不变；
3、contenthash：针对文件自身内容的变化，一般应用于输出css文件，如果css内容有变化，输出的文件名也会变化；

# 2、常见概念

### 2.1、常见loader

css-loader：处理css文件；
style-loader：将css内容使用style标签插入到dom中；
postcss-loader：连接各种css处理工具与webpack的中间件；
px2rem-loader：将css中像素px转换为rem的中间件；
url-loader：将文件按照大小决定是否转成base64编码；
babel-loader：连接babel工具与webpack的中间件；
eslint-loader：连接eslint工具与webpack的中间件；
vue-loader：处理vue组件；
等。。。

### 2.2、常见plugin

happypack：多进程打包器，同样还有多线程打包器，目前terser默认开启了多进程；
html-webpack-plugin：html处理器，用于连接html文件和输出的bundle文件；
copy-webpack-plugin：复制静态文件插件；
mini-css-extract-plugin：抽离css为单独文件的插件；
webpack-bundle-analyzer：bundle内容分析插件，用于优化；
optimize-css-assets-webpack-plugin：用于压缩css；
compression-webpack-plugin：压缩j静态文件插件；
terser-webpack-plugin：压缩脚本文件，移除评论、移除日志、摇树、制作sourceMap等，默认支持缓存、多进程等；

### 2.3、按需加载

概念：需要时通过jsonp（script标签）加载对应的bundle文件；
旧版本：require.ensure()；
新版本：import();

### 2.4、HMR

概念：应用运行过程中，替换、添加或删除模块，而无需重新加载整个页面；
状态：保留在完全重新加载页面期间丢失的状态；
更新：只更新变更内容，实时刷新（无法局部刷新时，采用重新加载整个页面）；
条件：webpack-dev-server的hot模式（默认添加hot-module-replacement插件），应用添加module.hot.accept进行替换（vue-loader开箱即用、react-hot-loader开箱即用）；

# 3、优化手段

### 3.1、缓存处理

babel-loader：支持缓存，options.cache选项；
eslint-loader：支持缓存，options.cache选项；
cache-loader：缓存loader，支持js、jsx、ts、tsx等；
terser-plugin：js压缩插件，默认开启缓存；

### 3.2、动态链接库

dll-plugin：用来制作动态链接库的插件；
dll-reference-plugin：用来引用制作好的动态链接库的插件；

### 3.3、外链库

externals：可以引用外部cdn文件；

### 3.4、懒加载

optimization：通过splitChunks对文件进行拆分，可对其进行细粒化的定制，更多应用在抽取公共chunk避免重复打包上；