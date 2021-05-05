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

### 1.3、hash、chunkhash、contenthash

1、hash：针对整个构建，内容有变化时hash也跟着变化，所有文件应用同一个值，一般不用；
2、chunkhash：针对入口文件及其依赖，发生变化时，所有文件应用同一个值，一般应用于output输出js的chunk文件，如果库文件不变，则输出的库文件名也不变；
3、contenthash：针对文件自身内容的变化，一般应用于输出css文件，如果css内容有变化，输出的文件名也会变化；

### 1.4、module、bundle、chunk

1、module：对于写出来的一份代码文件，就是一个module；
2、chunk：打包过程中同一个入口的一整套依赖文件，入口不同，chunk就不同；
3、bundle：打包好之后输出的文件，浏览器可以直接执行的；

### 1.5、tree shaking

1、概念：去除代码中dead code（不可达、只读不写、从未使用）；
2、原理：利用es6模块的特点（只能作为模块顶层的语句出现、import模块名只能是字符串常量、import binding是不可修改的），在uglify阶段删除无用代码；

##### 1.5.1、usedExports

通过optimization.usedExports开启；

##### 1.5.2、使用babel

1、none及dev环境：默认不使用scope hoisting，会用iife包裹模块，可通过webpack.optimize.ModuleConcatenationPlugin开启；
2、production环境：默认开启scope hoisting，能正常去除dead code；

##### 1.5.3、不使用babel

1、none及dev环境：不会去除dead code，会在注释中加入unused标记；
2、production环境：会去除dead code；

##### 1.5.4、sideEffects

模块没有被外部进行依赖（export 及 export default），则prod时会全部移除掉，哪怕是改了原型属性也不会保留；

##### 1.5.5、preset-env

1、targets：使用browserslist中配置的浏览器参数；
2、loose：使用宽松模式，默认是false，如class的内部方法挂载原型上不可遍历，使用loose时会挂载到prototype上；
3、modules：使用何种模块手段，如amd、cjs、umd、false等，默认是auto，如果想全部使用es6则使用false，使用cjs时基本无法tree shaking；
4、useBuiltIns：使用corejs对代码进行polyfill，如usage（使用及加入）、entry（手动引入）、false（不使用）；

### 1.6、polyfill

##### 1.6.1、babel-polyfill

缺点：体积大、全局污染（污染浏览器已经实现的api），7.4版本已被移除；

##### 1.6.2、transform-runtime

原理：利用@babel/runtime插件关联corejs（2、3）不同版本进行动态语法转换；

### 1.7、按需加载

概念：web端的概念，cjs里面没有的，利用新版的import方法（旧版的require.ensure）返回一个promise来实现；
流程：
		1、初始化全局异步chunk数组；
		2、通过webpack_require.e方法加载异步脚本（检测是否重复加载、利用script标签加载）；
		3、文件加载完成后放入全局异步chunk数组中，再通过promise回调使用webpack_require方法加载模块内容；
重复：
		1、检测chunk数组是否存在；
		2、检测done回调是否存在；
		3、检测script标签是否存在；

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

### 3.1、衡量工具

1、stats：基础内容，包括构建时间、结果文件大小等；
2、速度分析：speed-measure-webpack-plugin，smp.wrap(webpackConfig)；
3、大小分析：webpack-bundle-analyzer，new进行配置端口等；

### 3.2、优化方法

##### 3.2.1、缓存处理

babel-loader：支持缓存，options.cache选项；
eslint-loader：支持缓存，options.cache选项；
cache-loader：缓存loader，支持js、jsx、ts、tsx等；
terser-plugin：js压缩插件，默认开启缓存；

##### 3.2.2、动态链接库

dll-plugin：用来制作动态链接库的插件；
dll-reference-plugin：用来引用制作好的动态链接库的插件；

##### 3.2.3、外链库

externals：可以引用外部cdn文件；

##### 3.2.4、懒加载

optimization：通过splitChunks对文件进行拆分，可对其进行细粒化的定制，更多应用在抽取公共chunk避免重复打包上；

# 4、vite

### 4.1、基本知识

##### 4.1.1、特点

1、快速的冷启动；
2、即时热模块更新；
3、真正按需编译；

##### 4.1.2、原理

1、开发环境：利用浏览器去解析import，在服务的按需编译返回，完全跳过了打包这个概念，服务器随启随用，支持热更新（HMR）；
2、生产环境：使用rollup打包；

##### 4.1.3、兼容性

1、默认情况下，最低支持es2015；
2、需要兼容es5要手动配置插件；

# 5、模块化

### 5.1、amd

### 5.2、cjs

### 5.3、umd

### 5.4、esm