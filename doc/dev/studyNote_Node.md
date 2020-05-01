[TOC]

# Node.js 开发博客项目（原生node.js开发）

> **项目目录功能介绍**
>
> 1）controller：和数据打交道，返回的数据作为model的第二个参数返回给客户端
>
> 2）Router：只负责路由的处理


## 2. Node.js 介绍

### 2.1 Node.js 下载和安装

---

1. 普通安装

   下载安装包安装即可

2. 使用nvm

   在 Github 上搜索 nvm-windows 下载安装 nvm

   ```bash
   # 查看当前所有的node版本
   nvm -list
   # 安装指定的node版本
   nvm install v10.13.0
   # 切换node版本
   node use --delete-prefix 10.13.0 
   ```

3. `nvm` 是一个 `Node.js` 的版本管理工具，可切换多个 `Node.js`版本，和管理 `python` 环境的 `conda` 作用类似。

   ![nvm安装](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/nvm安装.png)

###  2.2 node.js

---

ECMAScript 是 JS 的语法规范，只有它不能操作 DOM，不能监听 click 事件，不能发送 Ajax 请求，不能处理 http 请求，不能操作文件，只有 ECMAScript 几乎做不了什么实际的项目。

`Node.js` 使用 `ECMAScript` 语法规范，外加 `node.js API` ，只有两者结合才能完成服务端的操作，缺一不可 。

`JavaScript` 使用 `ECMAScript` 语法规范，外加 `Web API` ，只用两者结合磁能完成浏览器端的操作，缺一不可。

`Web API` 包括 `BOM, DOM`，事件绑定，Ajax  等，`Node.js`  包括处理 `http`, 处理文件等。

> Web API 是由 W3C 制定的 

###  2.3 Common.js

---

W3C 组织规范了很多前端浏览器端的 `JavaScript` `API`，但是后端 `JavaScript` 的 `API` 规范却远远落后。`W3C` 规范了前端的 `API`， `Common.js` 来规范后端 `API` ，`Common.js` 想让 `JavaScript` 在后端也可以发光发亮。

目前的 `JavaScript` 规范而言有以下缺陷：

1. 没有模块系统。
2. 标准库较少。`ECMAScript` 仅定义了部分核心库，对于文件系统，I/O 流等常见需求却没有标准的 `API` 。就 `HTML5` 的发展状况而言，`W3C` 标准化在一定意义上是在推进这个过程，但是它仅限于浏览器端。
3. 没有标准接口。在 `JavaScript` 中，几乎没有定义过如 `Web` 服务器或者数据库之类的标准统一接口。
4. 缺乏包管理系统。这导致 `JavaScript` 应用中基本没有自动加载和安装依赖的能

`Common.js` 规范的提出就是想弥补这些缺陷，让 `JavaScript` 不仅可以开发富客户端应用，而且还可以编写以下应用。

1. 服务端 `JavaScript` 应用程序。

  2. 命令行工具。
  3. 桌面图形界面应用程序。
  4. 混合应用 (`Titanium` 和 `Adobe AIR` 等形式的应用)。

`lodash`  是 `node.js` 中非常常用的一个工具库.

```js
npm init -y 
npm i lodash --save
// 如果速度很慢可以使用淘宝镜像，我的电脑上应该已经设置好全局使用淘宝镜像了，下面的这种方法适用于单次使用淘宝镜像
npm i lodash --save --registry=https://registry.npm.taobao.org
```

### 2.4 server 端和前端的区别

虽然都是用的 JavaScript，但绝对不仅仅是API 的区别，更重要的是思维和要求上的差别。

server 端和前端相比，需要

1）服务稳定性

server 端可能会遭受各种恶意攻击和误操作，因为前端的代码用户请求过去之后只有它一个人在操作，但是客户端会收到许多客户端各种各样的请求，其中可能就包含恶意攻击和误操作。

单个客户端可以意外挂掉，但是服务端不能。因为客户端将前端代码请求过去之后，可能会运行在一个我们没有兼容的机器上挂掉了，那也只是他自己个别情况，问题不大。但是如果服务端挂掉了，那么成千上万的客户端就都不能用了。

当服务端挂掉之后，PM2 做进程守候后，会自动重启。

2）考虑内存和 CPU（优化，扩展）

客户端独占一个浏览器，内存和CPU都不是什么大问题，server 端要承载很多请求，CPU 和内存都是稀缺资源。

解决方案：stream 写日志（优化，也就是节省 CPU 和内存），使用 redis 存 session（扩展，也就是扩展内存和 CPU）

3）日志记录

日志记录对 server 端非常重要，如果没有日志记录那么对于 server 端的运行我们就什么都不知道。

server 端要记录日志，存储日志，分析日志，前端最多参与写日志，但是对其内容并不关心。

4）安全

server 要暴露在外网共客户端请求，要随时准备接收各种恶意攻击，前端则很少，最多的也就是 XSS 攻击，但是就算是 XSS 攻击不仅前端要做防护，后端也要做防护。

前端的安全可以被攻破，但是后端不可以，它是最后一道保障。

5）集群和服务拆分

产品发展速度快，流量迅速增加，这时候要通过扩展机器和服务拆分来承载大流量。

在做后端时上面的这几点一定要时时记在心里，这几点都是和前端很大的区别。

## 3. 项目介绍

**一个项目的诞生要经过下面的几个阶段：**

- 定目标
- 定需求
- 定UI设计
- 定技术方案
- 开发
- 测试
- 联调
- 上线
- 运维，结果评估

可以看到开发仅仅是其中一个环节而已，而且不一定是最重要的环节。

**项目需求**

- 首页，作者主页，博客详情页
- 登录页
- 管理中心，新建博客，编辑博客


**开发接口**

---

接口设计：

![博客项目接口设计](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/博客项目接口.png)

关于登录：

业界有统一的解决方案，一般不用再重新设计。

不使用框架时实现起来比较麻烦，但是能明白其中的原理，使用框架时会忽略掉其中的一些原理。

## 4. 开发博客项目之接口

### 4.1 http 概述

输入url后到展示页面都发生了什么？在这里老师以百度为例详细讲述了整个过程。

1）DNS解析。注意http的默认端口是80，https的默认端口是443.

![百度DNS解析结果.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/百度DNS解析结果.png)

2）建立TCP连接，发送请求。

3）服务端收到请求，处理请求，返回结果。

4）客户端接收到结果，渲染，显示页面。

### 4.2 处理 get 请求

**[querystring](http://nodejs.cn/api/querystring.html)**

`querystring` 模块提供用于解析和格式化 URL 查询字符串的实用工具。 它可以使用以下方式访问：

```js
const querystring = require('querystring');
```

**`querystring.parse(str[, sep[, eq[, options]]])`**

> 中括号表示可以省略的参数

版本历史

- `str` 要解析的 URL 查询字符串。
- `sep` 用于在查询字符串中分隔键值对的子字符串。**默认值:** `'&'`。
- `eq` 用于在查询字符串中分隔键和值的子字符串。**默认值:** `'='`。
- `options` 
  - `decodeURIComponent` 当解码查询字符串中的百分比编码字符时使用的函数。**默认值:** `querystring.unescape()`。
  - `maxKeys` 指定要解析的键的最大数量。指定 `0` 可移除键的计数限制。**默认值:** `1000`。

`querystring.parse()` 方法将 URL 查询字符串 `str` 解析为键值对的集合。

例如，查询字符串 `'foo=bar&abc=xyz&abc=123'` 会被解析为：

```js
{
  foo: 'bar',
  abc: ['xyz', '123']
}
```

`querystring.parse()` 方法返回的对象不是原型地继承自 JavaScript 的 `Object`。 这意味着典型的 `Object` 方法如 `obj.toString()`、 `obj.hasOwnProperty()` 等都没有被定义并且不起作用。

默认情况下，会假定查询字符串中的百分比编码字符使用 UTF-8 编码。 如果使用其他的字符编码，则需要指定其他的 `decodeURIComponent` 选项：

```js
// 假设 gbkDecodeURIComponent 函数已存在。

querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
                  { decodeURIComponent: gbkDecodeURIComponent });
```

---

当客户端要向后端获取数据时，就要用到 get 请求，如查询博客列表。通过 querystring 来向后端传递数据，如 `localhost:3000?a=10&b=20`，这样后端通过解析 url，就可以获取到前端传递过来的参数。

在浏览器中输入 url 访问发送的就是 get 请求，并且浏览器不能发送 post 请求。

```js
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log(req.method)
  const url = req.url
  req.query = querystring.parse(url.split('?')[1])
  res.end(JSON.stringify(req.query))
})

server.listen(2000)
```

当访问 `localhost:2000?a=10&b=200` 时，`url.split('?')[1]` 的返回结果是 `'a=100&b=200'`，由于 querystring.parse 默认的 sep 是 &，所以最终的结果是 `{a: 10, b: 200}`，然后再将其转换为 JSON 字符串返回给前端。

### 4.3 处理 post 请求

当客户端要向服务端传递数据时就需要发送 post 请求，如新建博客。向后端传递的数据时 post 时设置的，一般叫 post data。

在这里想强调的一点是，在浏览器的地址栏里直接输入 `url` 是无法直接发送post请求的，需要通过手写 `Ajax` 或者使用 `postman` 。

![node.js 处理post请求](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/node.js 处理post请求.png)

在谷歌浏览器中安装好 postman 插件后，在地址栏输入 `chrome://apps` 就可以看到 postman 了。

处理 `Post` 请求示例代码：

```js
// 处理 POST 请求
const server = http.createServer((req, res) => {
  if(req.method === 'POST') {
    // req 数据格式
    // 注意这个地方只能使用 ['content-type']这种形式来访问headers对象的属性，因为'-'并不是合法的标识符。
    console.log('req content-type', req.headers['content-type']);
    // 接收数据
    let postData = '';
    // 只要一来数据就会触发下面的参数中的箭头函数
    req.on('data', (chunk) => {
      // chunk 本身是二进制格式，要转换成字符串
      postData += chunk.toString();
    });
    // 数据接收结束时触发下面参数中的箭头函数
    req.on('end', () => {
      console.log('postData: ', postData);
      res.end('receive over');
    })
  }
});
```

**处理路由**

这里的路由指的是 `/` 后面的内容但是不包含传递过去的参数。

为什么路由只要 `/` 后面的我的理解就是记得在 webpack 配置中有一个 publicpath 可以设置一个网址，例如 `https://www.baidu.com` ，每个都有这个前缀，那么也就不需要再分析它了。（仅仅是个人理解）

`req.url` 指的就是上面说的这种路由，也不包括前面的网址和后面的参数。

例如：

```
http://localhost:8000 // 路由是 /(因为端口后面什么都不写默认访问的就是根目录下的index 一般是这样的)
http://localhost:8000/blog/list // 路由是 /blog/list
http://localhost:8000/blog/list?a=1&b=2 // 路由是 /blog/list（并不包含传递过去的参数） 
```

处理路由示例代码：

```js
const http = require('http');

// 处理路由
const server = http.createServer((req, res) => {
   const url = req.url;
   const path = url.split('?')[0];
   console.log(path);
});

// 监听端口
server.listen(8000, () => {
    console.log('listening 8000 port');
});
```

### 4.4 处理http请求的综合示例

### 4.5 搭建开发环境

---

- 从 0 开始搭建，不使用任何框架

- 使用 `nodemon` 检测文件变化，自动重启 `node`

  ```js
  // 进入项目目录下然后运行以下命令,即可启动nodemon
  npm run dev
  ```

- 使用 `cross-env` 设置环境变量，兼容 `mac linux windows` 

  在 `package.json` 文件中做以下修改，这样就可以使用 `nodemon` 检测 `node` 变化自动重启了：

  ```js
    "scripts": {
    	"test": "echo \"Error: no test specified\" && exit 1",
      "dev": "cross-env NODE_ENV=dev nodemon ./bin/www.js",
      "prd": "cross-env NODE_ENV=production nodemon ./bin/www.js"  
    },
  ```

有了上面的配置之后，当在命令行输入 `npm run dev` 时，程序中 `process.env.NODE_ENV` 就是上面设置的 `dev`.当在程序中运行 `npm run prd` 时，程序中 `process.env.NODE_ENV` 的值就是上面设置的 `production`。

---

 **cross-env 的理解**

1）cross-env 是什么

运行[跨平台](https://www.baidu.com/s?wd=跨平台&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)设置和使用环境变量的脚本

 2）出现原因

当您使用NODE_ENV =production, 来设置环境变量时，大多数[Windows](https://www.baidu.com/s?wd=Windows&tn=24004469_oem_dg&rsv_dl=gh_pl_sl_csd)命令提示将会阻塞(报错)。 （异常是Windows上的Bash，它使用本机Bash。）同样，Windows和POSIX命令如何使用环境变量也有区别。 使用POSIX，您可以使用：$ ENV_VAR和使用％ENV_VAR％的Windows。
 说人话：windows不支持NODE_ENV=development的设置方式。

3） 解决

cross-env使得您可以使用单个命令，而不必担心为平台正确设置或使用环境变量。 只要在POSIX系统上运行就可以设置好，而cross-env将会正确地设置它。
 说人话: 这个迷你的包(cross-env)能够提供一个设置环境变量的scripts，让你能够以unix方式设置环境变量，然后在windows上也能兼容运行。

4）安装

```undefined
npm install --save-dev cross-env

```

5） 使用

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}

```

NODE_ENV环境变量将由cross-env设置

打印process.env.NODE_ENV === 'production '

### 4.6 初始化路由

根据之前的技术方案设计，做出路由，先返回假数据，以后再和数据库连接返回真实的数据。

![博客项目接口设计](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/博客项目接口.png)

我们要实现这 6个接口，其中前 5 个和 blog 相关，第 6 个和 user 相关。前两个使用 get 方法，后四个使用 post 方法，一共有 4 个需要使用 url 参数，url 的解析通过 querystring 来实现。postData 通过数据流的方式接收，也就是传过来一些接收一些，而不是不干其它的一直在等待接收内容。

注意 app.js 中，没有命中路由的情况，首先通过 res.writeHead 来设置状态码和返回的数据类型，

---

**res.writeHead 和 res.setHeader 的区别**

在node.js中，http协议如果不设置响应头，中文的话在客户端浏览器是会乱码的，那么设置响应头的目的是什么，又如何设置响应头？

> 目的是为了告诉浏览器我发送的数据是什么类型的，你应该用什么格式来编码显示。如果不设置，会自动生成一个响应头，但中文的话浏览器会乱码。

> 在http协议中， Content-type就是用来告诉对方我给你发送的数据内容是什么类型

Content-type对照表的网址：[http://tool.oschina.net/commons/](https://links.jianshu.com/go?to=http%3A%2F%2Ftool.oschina.net%2Fcommons%2F)

如何设置响应头，我认为有两种方法：

1. res.setHeader()
2. res.writeHead()

res.setHeader()的写法：

```bash
res.setHeader('Content-type', 'text/plain;charset=utf-8')

```

res.writeHead()的写法：

```bash
参数1：必选，三位数的http状态码
参数2：可选，可有可无
参数3：可选，告诉浏览器我发给你的数据是什么类型的
res.writeHead(200, { 'Content-type': 'text/html;charset=utf-8' })

```

**注意：**

1. res.writeHead()必须在res.end()之前调用
2. 如果两者同时存在（没必要），要先写res.setHeader()，后写res.writeHead()，且res.writeHead()优先



**res.end 和 res.send 的区别**

简单来说就是 如果服务器端没有数据返回到客户端 那么就可以用 res.end， 但是 如果 服务器端有数据返回到客户端 这个时候必须用res.send ,不能用 res.end（会报错） 。

官方说明

- res.end() 终结响应处理流程。
- res.send() 发送各种类型的响应。

**1）res.end（[data] [，encoding]）**

结束响应过程。这个方法实际上来自Node核心，特别是http.ServerResponse的response.end（）方法。

用于在没有任何数据的情况下快速结束响应。如果需要响应数据，请使用res.send（）和res.json（）等方法。

```
res.end();res.status(404).end();

```

**2）res.send([body])**

发送HTTP响应。

所述body参数可以是一个Buffer对象，一个String，对象，或一个Array。例如：

```
res.send(new Buffer('whoop'));res.send({ some: 'json' });res.send('<p>some html</p>');res.status(404).send('Sorry, we cannot find that!');res.status(500).send({ error: 'something blew up' });

```

此方法为简单的非流式响应执行许多有用的任务：例如，它自动分配`Content-Length` HTTP响应头字段（除非先前已定义）并自动提供HEAD和HTTP缓存支持。

当参数是Buffer对象时，该方法将`Content-Type` 响应头字段设置为“application / octet-stream”，除非先前定义如下所示：

```
res.set('Content-Type', 'text/html');res.send(new Buffer('<p>some html</p>'));

```

当参数为String，该方法将设置`Content-Type为`“text / html”：

```
res.send('<p>some html</p>');

```

当参数是Array或Object，Express以JSON表示响应：

```
res.send({ user: 'tobi' });res.send([1,2,3]);

```

**总结**

1. 参数类型的区别:

- res.end() 参数为: a Buffer object / a String
- res.send() 参数为: a Buffer object / a String / an object / an Array

2. 发送服务器内容不同

- res.end() 只接受服务器响应数据,如果是中文则会乱码
- res.send() 发送给服务端时,会自动发送更多的响应报文头,其中包括 Content-Tpye: text/html; charset=uft-8,所以中文不会乱码

---

### 4.7  开发路由-博客列表路由

首先建立请求成功和失败时返回的模板。

```js
class BaseModel {
  constructor(data, message) {
    // 我们需要传入的data应该是一个对象，message应该是一个字符串，但是
    // 如果只传入了一个字符串，那么也需要兼容这种情况，此时将this.message
    // 赋值为data。
    if (typeof data === 'string') {
      this.message = data;
      data = null;
      message = null
    }
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message);
    this.errno = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.errno = -1
  }
}

```

举例来说明一下如何利用上面模板，假设现在请求成功了，可以返回这样一个对象

```js
{
  errno: 0,
  data: {
    id: 1,
    title: 'Node',
    content: 'hello node'
  },
  message: '请求成功了'
}

```

上面的形式和下面这样写是一样的。

```js
const data = {
    id: 1,
    title: 'Node',
    content: 'hello node'
};
const message = '请求成功了'；
new SuccessModel(data, message);

```

当请求失败时，返回的对象中就没有 data 这一项了，只有 errno 和提示信息 message。

```js
{
  errno: -1,
  message: '请求失败了'
}

```

和下面这样写法是等效的。

```js
const message = '请求成功了'；
new ErrorModel(message); // 由于只传入了一个字符串，所以BaseModel中 if(typeof data === 'string') 这条语句就生效了。 

```

在写项目时代码的拆分非常重要，到现在已经有四层了，分别是最顶层的 www.js 创建一个服务器，里面有端口，监听，这些和外边的代码没有关系所以要单独拿出来，再往后是 app.js，它是对最基础的信息的一些设置，例如设置返回的header，解析URL等，现在还涉及不到具体的逻辑代码，再往下一层是路由的处理，根据不同的路由返回不同的结果，返回结果的获得又可以是一层(controller中的函数)，这样每一层做的事情非常清晰和明确。如果系统很大的话可能需要拆更多的层。

### 4.8 开发路由-博客详情路由

**Node 中操作文件**

> `__dirname` 是 Node 中的一个全局变量，表示的是当前文件所在的绝对路径

```js
const fs = require('fs')
const path = require('path')

// 回调函数的方式获取一个文件的内容
function getFileContent(fileName, callback) {
  // path.resolve用于路径拼接，最终获得一个完整的路径
	const fullFileName = path.resolve(__dirname, 'files', fileName)
	fs.readFile(fullFileName, (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  // 读出来的data是二进制的形式
  callback(
    JSON.parse(data.toString())
  )
})
}

```

### 4.9 开发路由-处理POSTData

由于接收 PostData 是需要时间的，所以用 promise 是最好的选择。

```js
const getPostData = (req) => {
  return new Promise((resolve, reject) => {
    // 如果不是POST请求那么就返回一个空对象，因为GET请求是没有POSTData的
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    // 在使用原生node开发时暂时只支持json格式的Postdata，其它格式的用原生支持起来比较麻烦，但是用框架时很容易地就可以支持了
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return 
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return 
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })
}

```

在 .then 方法中将得到的 PostData 赋值给 req.body，然后再去处理路由，因为有些路由的处理是需要 PostData 的，所以必须先获取到 PostData 再去处理路由，因此需要把处理路由的代码放到 .then 中。

### 4.10 开发路由-新建和更新博客路由

### 4.11 开发路由-删除博客和登录博客

删除博客需要使用 POST，因为需要改变数据库中的内容，GET 只是获取内容，并不会对后端的数据做任何修改。

### 4.12 补充：路由和API

API 是前端和后端或者不同端（子系统）之间对接的一个术语。例如 axios 提供了一个 get API，我们可以直接使用 get，不需要了解它是怎样实现的，这是 axios 给我们提供的。

路由也可以说是一个地址，`/api/blog/delete` 就是一个路由，它也是前端和后端之间的一个 API，所以路由实际上是 API 的一部分。

## 5. 开发博客项目之数据存储

**内容**

- mysql 介绍、安装和使用
- node.js 连接 mysql
- API 连接 mysql

### 5.1 MySql 介绍

**为什么使用 `mysql` 而不是 `mogondb`?**

1）`mysql` 是企业内最常用的存储工具，一般都有专人运维（不需要你去操心，有数据库专门负责人员）

2）`mysql` 是社区内最常用的存储工具，有问题随时可查

注：mysql 本身是一个复杂的数据库软件，这里只讲基本使用。

#### 2.3.1 mysql 介绍

`mysql` 是一种关系型数据库，需要学习 `sql` 语句(本科学过一些，再捡起来)。

[mysql下载]( https://dev.mysql.com/downloads/mysql/ )

- mysql 安装

  傻瓜式安装，但是注意安装过程中需要输入 `root` 用户名的密码，这个密码要记住。

- mysql workbench(官方开发的)

  操作 `mysql` 的客户端，可视化操作，类似于你可以使用 `git` 命令的方式操作 `git`，也可以通过 `git` 的可视化界面客户端来用鼠标执行 `git` 命令。

  [mysql workbench 下载](https://dev.mysql.com/downloads/workbench/)

### 5.2 数据库操作（创建和增删改查）

**MySql 常用的数据类型**

在数据库中建立的 user 表

![user表](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200401082718.png)

在数据库中建立的 blog 表

![数据库中建立的user表.png](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200401003125数据库中建立的user表.png)

MySql 中常见的数据类型有 int，varchar，bigint，longtext（最多可以存储4G），记住存储的各个列用的是什么数据类型，被问到要会。 

> 在 MySql 5.0 及以上版本中，varchar(10) 表示的是 10 个字符，注意在这里汉字和英文字母都算是一个字符，这是和以前的认识不一样的，这样可以方便编码，varchar(10) 可以表示最多可以是 10 个汉字。

新建数据库和表都是通过 workbench 来做的。

在这里给出 workbench 自动生成的代码，创建 users 表

```sql
CREATE TABLE `huisi`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(20) NOT NULL,
  `password` VARCHAR(20) NOT NULL,
  `realname` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`));

```

创建 blogs 表

```sql
CREATE TABLE `huisi`.`blog` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `createtime` BIGINT(20) NOT NULL DEFAULT 0,
  `author` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`id`));

```

**sql语句简单介绍：**

```sql
-- 1. 注释
-- 注释用两条横线

-- 2. 在 MySQL Workbench 中如果单词为蓝色则表示是SQL的关键字，比如password，我们创建表中的项，但是是SQL语句中的关键字，那么我们需要写成这样`password`（``就是markdown中的单行代码符号）

-- 3. 一个表中主键只能有一个，主键表示不能重复，并且会自动增加，在往表格中插入数据时，不需要插入主键项的值因为它会自动增加。当表中有两项时，就算第一项被删掉了，第二项主键的值也不会变，而且再增加数据时会接着在第二项的基础上进行增加。

-- 4. 使用数据库  use myblog;

-- 5. 显示所有的表 show tables;

-- 6. 往表格中插入数据 
insert into user (username, `password`, realname) values ('lisi', '123', '李四');

-- 7. 查询数据
select * from user； -- 查询user表格中的所有数据，要尽量避免使用，影响性能
select username,realname from user; -- 查询user中的username和realname这两项
select * from user where username='zhangsan'; -- 查询username是`zhangsan`的项
select * from user where username='zhangsan' and `password`='123' -- and相当于&&
select * from user where username='zhangsan' or `password`='123' -- or相当于||
select * from user where username like '%zhang%'; -- 模糊查询，只要username中带'zhang'的都可以被查询到
-- 8. 升序排列
select * from user where `password` like '%1%' order by id; 
-- 9. 降序排列
select * from user where `password` like '%1%' order by id desc;

-- 10. 更新，修改
update user set realname='李四五' where username='lisi'; -- 这样写有可能会报错，会提示你现在正在安全更新模式下进行更新，这样写不允许，可以运行下面这条语句。
SET SQL_SAFE_UPDATES = 0;

-- 11. 删除
delete from user -- 这样会将整个表删掉，在正式工作中一般这样的操作是会报错的，防止你删库跑路，哈哈
delete from user where username='lisi';

-- 12. 软删除 （工作中比较常用，但是具体用不用要按照公司要求）
-- 所谓软删除就是不真正的去删除，而是设置一个state标志位，1表示存在，0表示已经删除
update user set state=0 where username='lisi'; -- 将username为'lisi'的用户的state设置为0，表示已经删除了
-- 在查询时，查询所有未被删除的用户
select * from user where state=1; 
-- 软删除的好处在于可以将软删除的数据恢复
update user set state=1 where username='lisi'; -- 这样查询时用户名为'lisi'的数据就又被查询到了

-- 13 不等于 <>表示不等于 
select * from user where state <> 0; 

-- 14. 查询版本
select version();
-- 有一点需要说明，当MySQL的版本大于等于5时，VARCHAR(数字)就不区分是汉字还是字母了，比如VARCHAR(10)表示10个字母或者10个汉字，而并不是之前说的10个字母或者5个汉字。

-- 15. 创建数据库
CREATE SCHEMA huisi

-- 16. 删除某一列 
-- 注意第一行结尾是没有引号的
ALTER TABLE `huisi`.`users` 
DROP COLUMN `state`;

-- 17. 增加某一列
ALTER TABLE `huisi`.`users` 
CHANGE COLUMN `` `state` INT NOT NULL DEFAULT 0 ;

-- 18. sql 语句中的不等于 
-- 有两种，1. <>   2. !=

```

### 5.3 数据库操作（更新）

主要将一下删除，在公司中，`delete from users` 这种语句很有可能是没有办法用的，这样是很危险的。一般删除数据的话有下面两种方法：

1）使用 delete 但是后面加上条件

```sql
delete from users where username = 'zhangsan';

```

2）使用 update 软删除

添加 state 一列，默认值为 1，当 state = 0 时表示已经删除了。

添加 state 一列

```sql
ALTER TABLE `huisi`.`users` 
CHANGE COLUMN `` `state` INT NOT NULL DEFAULT 0 ;

```

删除 `username = ’zhangsan‘` 的行，也就是令其 state = 0

```sql
update users set state = 0 where username = 'zhangsan'

```

这时候当查询表中存在的所有项时，state = 0 的就不能算了，已经它们已经被当做删除了。

```sql
select * from users where state = 1

```

通过软删除的好处就是可以恢复数据，令删除的行的 state = 1 即可恢复。

> 在此项目中不使用软删除，在真正的工作中推荐使用软删除。

**添加 blog 表中的数据**

```sql
use blog;

insert into blog (title, content, createtime, author) values ('标题A', '内容A', 1585711361677, 'zhangsan');
insert into blog (title, content, createtime, author) values ('标题B', '内容B', 1585711361698, 'lisi');

```

### 5.4 node.js 操作 MySQL

> 小技巧：在写 url 时 xxxxx？k1=v1&k2=v2&k3=v3，(？就相当于sql语句中的where，&就相当于sql语句中的and。)
>
> 为了统一格式可以写成这样: xxxxx??1=1&k1=v1&k2=v2&k3=v3，这样写之后真正有用的数据的格式就都是 &k=v 这种形式了，方便统一。
>
> 注意线上数据库和线下数据库是不一样的，所以在操作数据库时要区分线上数据库和线下数据库。

**node.js 操作数据库的流程**

安装 mysql 模块，`npm install mysql --save`。

```js
const mysql = require('mysql')

// 创建链接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'huisi'
})

// 开始连接
con.connect()

// sql 语句
const sql = 'select * from users'
// const sql = `update users set username = 'lisi2' where username = 'lisi';`
// const sql = `insert into users (username, password, realname) values ('wangwu', '124', '王五');`
// 开始查询(查询数据库肯定需要一定的时间，所以肯定是异步的)
con.query(sql, (err, result) => {
  err ? console.log(err) : console.log(result)
})

// 关闭连接
con.end()

```

### 5.5  nodejs 链接 mysql 做成工具

 获取环境变量，是 dev 还是 prod，process.env.NODE_ENV 中到底是什么值是在package.json中script中定义的，npm run dev,那么它的值就是dev。

不同环境下数据库的配置是不同的，线上环境时，数据库的地址要改为线上的地址，其它的参数也要改为线上数据库的参数。conf 文件夹下的 db.js 设置了两种环境下数据库的配置。

```js
// conf/db.js
// env 是当前所在的环境
const env = process.env.NODE_ENV
// 数据库配置
let MYSQL_CONF
if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'huisi'    
  }
}

if (env === 'prod') {
  // 真正线上环境时，数据库的地址要改为线上的地址，其它的参数也要改为线上数据的参数
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'huisi'    
  }
}

```

接下来，查询数据库的操作需要封装为一个函数，这样传入一个 sql 语句时就可以获得结果。

这个地方我在 [回调函数踩坑](https://www.cnblogs.com/zhangguicheng/p/12613040.html) 博客中介绍了两种方法封装查询数据库的操作，分别是回调函数和 promise，其中回调函数的方法会使得查询数据库的结果返回不及时，推荐使用 Promise 的方法。

```js
const mysql = require('mysql')
const { MYSQL_CONF } = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 使用回调函数
// function exec(sql) {
//   con.query(sql, (err, result) => {
//     return err ? err : result
//   })
// }

// 使用 promise
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

module.exports = {
  exec
}

```

**注意使用 select 查询出来的结果都是一个数组。**

```js
http://localhost:8000/api/blog/list?author=lisi&keyword=标题

```

返回结果

```js
 [ 
   {
     "id": 2,
     "title": "标题\nB",
     "content": "内容B",
     "createtime": 122243252,
     "author": "lisi"
   },
   {
     "id": 3,
     "title": "标题B",
     "content": "内容B",
     "createtime": 122243252,
     "author": "lisi"
   }
]

```

### 5.6 API 对接 mysql （博客列表）

之前使用的都是假数据，现在连接上数据库之后可以使用数据库查询的结果了。

```js
// controller/blog.js
// 获取博客列表
const getList = (author, keyword) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author = '${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += 'order by createtime desc;' 
  // 返回的是一个promise
  return exec(sql)
}

```

在这里主要想说一下为什么要在 where 的后面加上一个 `1=1`，在说原因之前先问你几个问题，如果用户 author 和 keyword 前端都忘记传了，如果不写 `1=1` 那么 `where order by createtime desc`  就不对了，那这时候把 where 去掉。但是如果下一次前端又把 author 传递过来了呢，没有 `where` 是不是也不对。可能通过很多的 if 逻辑判断就算不写 `1=1` 也能保证可以，但是并不是明智的做法。这里加上 `1=1`，无论是上面的哪种情况都可以，都不会报错。

提到这个在写 url 参数的时候也有一个小技巧，`localhost:8000?a=1&k1=v1&k2=v2&k3=v3`，在拼接这个 url 的时候，加了 `a=1` 之后，无论 k1 =v1 有没有也不会耽误后面 `&k2=v2` 的拼接。假设没有 `a=1`，那么如果 `k1=v1` 没有拼接，那么后面写 `&k1=v2` 就是错误的。

还有一点要说的是，在拼接 sql 语句时，在最后面一定要加上一个空格，否则前后连在一起并不是正确的 sql 语句，如果不确定就将拼接好的 sql 语句打印出来复制到 workbench 中查询一下。

还有就是 const 不能随便用，在声明 sql 时我就将 sql 声明成了 const，很明显 sql 是要被改变的。

### 5.7 API 对接 mysql（博客详情和新建）

### 5.8 API 对接 mysql（博客更新和删除）

在删除博客的时候，需要提供两个数据，id 和 author，id 是前端通过 url 传递过来的，author 使用的是当前登录的用户。这样就可以防止别人去删除你的文章。如果 autor 也是前端传递过来的，那么别人在 url 中文章的 id 和你的用户名就可以删除你的文章了。

其实不只是删除，像更新这些加上 author 这一项会变得安全。

### 5.9 API 对接 mysql （登录）

写 sql 语句时注意 password 是一个关键字，所以需要转义一下。

```js
const sql = `select username, \`password\` from users where username='${username}' and password='${password}';`;

```

```js
const sql = `select username, \`password\` from users where username='${username}' and password='${password}';`;
  console.log(sql)
  // select查询结果都是一个数组
  return exec(sql).then(loginData => {
    // 记住两个对象即使就算是内容完全相同只要引用不同那也是不同的，所以下面这条语句永远会返回true
    //  return loginData !== {} 
    // 这样写当查询没有结果时，loginData[0]就是undefined，此时会报错
    // return loginData[0].username

    // 应该这样写,当查询结果时loginData[0]是一个对象，在后面使用 SuccessModel，当没有查询到时它是undefined，使用 ErrorModel
    return loginData[0]
  })

```

在写程序的时候一定要考虑程序的健壮性，直接 `return loginData[0].username` 在能查询到结果的时候 `loginData[0]` 是一个对象可以访问 username，但是当查询不到结果时，它就是 undefined，这个时候访问 `loginData[0].username` 就会报错。

## 6. 登录

### 6.1 start

- 核心：登录校验 & 登录信息存储

- `cookie` 和 `session`

  `cookie`：实现登录的基础

  `session`：实现登录的统一解决方案

- `session` 写入 `redis`  

  `Redis`：内存数据库，用来存储 `session`，上一章讲的 `mysql` 是硬盘数据库

- 开发登录功能，和前端联调（用到 `nginx` 反向代理）

### 6.2 cookie 介绍

- 存储在浏览器的一段**字符串**（最大 5kb）（**注意 cookie 是字符串**）

  `cookie` 是有大小限制的，不要存储太多东西，只存最核心的东西。

- 跨域不共享

  浏览器每天都会访问很多个域名，访问很多个网站，浏览器会为每一个域名都存储了一段 `cookie`，每个域名之间的 `cookie` 是不共享的。

- 字符串本身不是结构化的数据，规定字符串的格式来使得像是结构化的数据格式。

  格式如 `k1=v1;k2=v2;k3=v3;` 每一项都有一个 `key`，和一个 `value` ，这样就比较像是一个结构化的数据格式了。

- 每次发送 `http` 请求会将请求域的 `cookie` 一起发送给 `server`。

  比如你在百度中要访问淘宝中的页面，那么请求域就是淘宝，发送的是淘宝的 `cookie`。

  如果在百度中访问淘宝，发送给淘宝的是百度的 cookie，那么这是相当危险的，这也是不存在，你想一下将百度的 cookie 发送过去对淘宝也没什么作用呀。

- `server` 端可以修改 `cookie` 的值并返回给浏览器。

- 浏览器也可以通过 `JavaScript` 修改 `cookie` (有限制)。

  服务端对于有些 cookie 不希望浏览器端修改，就可以将一些 cookie 锁死，这样在浏览器端就不能修改这部分 cookie 了。

cookie 从浏览器发送给服务端时，cookie 在 request 报文的 header 中，从服务端发送给浏览器时，cookie 在 response 报文的 header 中。

 访问不同域 cookie 发送示例：

![访问不同域cookie发送示例](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/cookie 访问域.png)

**客户端 JavaScript 操作 cookie**

- 客户端（浏览器）查看 `cookie`，三种方式

  1. 在 `console` 控制面板上输入 `document.cookie`
  2. 在 `Network` 下的 `Request Headeres` 查看 `cookie`
  3. 在 `Aplication` 下的 `Storage` 下的 `Cookies` 

  > cookie删除： 可以在 `Application` 下选中相应的cookie然后点击上面的小叉号即可
  >
  > 如果 cookie 的对应 path 是根路径 `/`，那么表示该 cookie 在改域名下的所有页面中都生效。例如在 www.huisi.com 下的任何页面都能生效，例如 www.huisi.com/a.html，www.huisi.com/blog/b.html 等都会生效.

- `javascript` 查看，修改 `cookie` （有限制）

  在 `console` 下 `document.cookie = 'k1=10; ` 不会覆盖之前的 cookie 而是会在 cookie 中追加 `k1=10`。

> 注意：进入浏览器的隐私模式不会泄露个人信息，一定不要泄露自己的cookie，很危险。
>
> 在浏览器端修改 cookie 的情况比较少。

### 6.3 cookie 用于登录验证

**server 端 node.js 操作 cookie**

- 查看 `cookie`

  ```js
  // 解析 cookie
  req.cookie = {}; // 用于存放cookie
  const cookieStr = req.headers.cookie || ''; // 一个字符串
  // 下面的操作是对得到的cookie做一些处理，整理成对象的形式
  cookieStr.split(';').forEach(item => {
      // item 的形式是 k1=v1
      if (!item) {
          return;
      } else {
        	// 在RequestHeaders中发送的cookie中两条内容之间是有空格的。 
          const arr = item.split('=');
          const key = arr[0].trim();
          const val = arr[1].trim();
          req.cookie[key] = val;
      }
  });
  
  ```

  关于为什么要加 `trim` 方法的说明，在 Request Headers 中 cookie 内容是 `Cookie: k=1; username=lisi`，分号和username 中是有一个空格的，如果不加 trim 方法，那么解析出来的 cookie 中 key = `username` 中，username 前面会有一个空格。这样和在程序中调用 req.cookie.username 实际上是undefined。req.cookie. username 才是 lisi。

- 修改 `cookie`

  如果不将 path 设置为根路由，那么默认为当前请求的路由。例如是在请求 `localhost:8000/api/user/login` 时执行的下面这句代码，那么路由就是 `/api/user/`（为什么不包含login，原因不明，是不是它认为login是一个具体的文件名），如下图所示

  ![1585815429785](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200402081828cookie默认path.png) 

  ```js
  res.setHeader('Set-Cookie', 'username=$(data.username); path=/');
  
  ```

  结果：

  ![sever 修改 cookie 案例结果](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/sever 修改cookie案例结果.png)

  ![server修改cookie](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/sever 修改cokie.png)

  此时浏览器端就有了这个域名下的 cookie，当再一次请求 `localhost:8000/api/user/login` 时，在 Request Headers 中就会有 `"username=zhangsan"` 这个 cookie。因为浏览器要将这个域名下的 cookie 传递给服务端，如下图所示。

  ![](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200402081242传递给服务端的cookie.png )

  ### 6.4 cookie 做限制（1）

  如果在客户端不做修改 cookie 的限制，假设现在登录的用户名是 `zhangsan` 那么可以通过 `document.cookie="username=lisi"`  轻松地将用户名改为 `lisi`，那么就可以以 `lisi` 的身份去删除，更新博客等，因为服务端判断当前登录的是哪个用户就是通过 cookie 中的 username 来判断的。

  限制客户端修改 cookie，加一个 httpOnly 即可，这样就只可以在服务端修改了。

  ```js
  res.setHeader('Set-Cookie', `username=$(data.username); path=/; httpOnly`);
  
  ```

  现在 `document.cookie` 返回的是空字符串，也就是说客户端现在不能通过这种方式查看`cookie` 信息了，而且即使在控制台运行 `document.cookie="username=lisi"`，在 application 中的 cookie 不会发生变化，再次发送一次请求时，Request Headers 中的 cookie 依然是 `zhangsan`。

  ![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200402165401.png)

  在上图中的Expires/Max_Age 表示最大的有效时间。过了这个时间之后这个cookie就没有了。这个值应该根据具体情况而定，比如过一周就要让用户再登录一次，一般不能设置为一直有效。例如你将电脑卖给了别人，你还处于登录的状态，这样就比较危险了。

### 6.5 cookie 做限制（2）

**设置cookie过期时间**

```js
// 设置 cookie 过期时间
const getCookieExpires = () => {  
  // 当前时间
  const d = new Date()
  // 重新设置 d 的时间为 24h
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  console.log(d.toGMTString())
  // 将 d 导出并且设置为 GMT 格式
  return d.toGMTString()
}

// 设置 ResponseHeaders 中 cookie 的过期时间
res.setHeader('Set-Cookie', `username=${loginData.username}; path='/'; http-only; expires=${getCookieExpires()}`)

```

- 实现登录验证

  如果 `cookie` 中有 `username` 说明登录验证通过，当前处于登录状态。

**如何利用 cookie 进行登录验证**

要想实现登录，首先通过 POST 请求将 username 和 password 发送给服务端，服务端获得 username 和 password 之后经过数据库查询确认用户名和密码是否一致。如果一致，说明用户名和密码正确，则在 Response Headers 中设置`"username='zhangsan'"` cookie 发送给客户端(可以设置 cookie 的域名，httpOnly，过期时间等)。客户端拿到服务端的 cookie 之后，本地就有了服务端发送过来的 cookie 信息，在下一次请求和服务端设置的cookie相同域名下的页面时，客户端就会将 cookie 信息发送给服务端。服务端拿到 cookie 信息后如果 cookie 中有 username 那么就说明处于登录状态，进而可以进行写文章等操作。如果 cookie 中没有 username  那么就说明没有处于登录状态。只有登录成功时，cookie 中才会有 username。

### 6.6 session 介绍

> 注意 session 是一个解决方案，并不是一个具体的东西。cookie 中存放 userId，session 存放数据。

**直接利用 cookie 实现登录的问题**

cookie 中的信息都是明文信息，一旦泄露，会比较危险，例如 coolie 中直接存放 username，我们知道 username 有可能是你的手机号或者邮箱，一旦泄露个人隐私信息就泄露了。

**如何解决**

注意之前的时候有个误区，认为一个浏览器中有许多 useId ，然后每个 useId 对应一个 session 中一个真实的数据，例如 userId 对应 session 中的 username。其实不是这样的，每个浏览器在访问的某个域名下只有一个 userId，这个userId 对应的 session 中的数据代表这个域名下的信息。下面那个图很形象地说明了这一点，两个浏览器访问的都是同一个网址，但是 userId 是不同的。其实在这里叫 userId 并不是特别合适，可以叫 sessionId。

**session是一个解决方案**，即在server端存储用户信息，cookie中存储 userid，server端对应 username（不仅仅是 username，该 userId 对应该浏览器在该域名下所有的 session 数据）.利用 `session` 之后，`cookie` 中就不需要再存储 `username` 等明文信息了，提高了安全性。

![session](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/session .png)

### 6.7 session 演示

**程序实现的大体思路是：**

先从 req.cookie 中获取 userId，如果是某个浏览器第一次打开这个域名下的网页，那么 userId 是 undefined，此时先创建一个 userId，并且设置 needSetCookie 为 true，然后将 SESSION_DATA[userId] 赋值为空对象，最后将 req.session 赋值为 SESSION_DATA[useId]。关于为什么要使用 req.session 我的想法是，req 是一个全局的变量，因为它在 App.js 中作为实参传递给了各个函数，在其它函数中都能使用 req。在获取到登录结果后，将 username 的值赋值给 req.session.username，在进行是否登录的验证时根据 req.session.username 是否存在来判断是否处于登录状态。

在另一个浏览器中打开这个域名下的网页时，也会创建一个 userId ，而且和其它的浏览器创建的 uesId 不同。

```js
// 解析 Session
let needSetCookie = false
let userId = req.cookie.userId
if (userId) {
  SESSION_DATA[userId] = SESSION_DATA[userId] || {}
} else {
  // 在这里先保证不重复即可
  needSetCookie = true
  userId = `${Date.now()}_${Math.random()}`
  SESSION_DATA[userId] = {} 
}
req.session = SESSION_DATA[userId]

// 如果是新创建的 useId，那么需要将 useId 写到客户端
needSetCookie && res.setHeader('Set-Cookie', `userId=${userId}; path='/'; http-only; expires=${getCookieExpires()}`)

// 登录成功时将 username 赋值给 req.session.username
req.session.username = loginData.username

```

### 6.8 从 session 到 redis

上面代码中 session 中的数据都是存放在 SESSION_DATA 这个 JS 变量中的，这个变量是存放在 node.js 进程内存中的。

进程内存有限，每一个用户的浏览器访问这个域名下的网页时，浏览器中都会有一个 uesId，如果访问量过大，内存就会暴增。还有一个问题2就是真正到线上时，线上运行是进程，进程之间内存是无法共享的。（例如登录时命中的是进程1，但是写文章时命中的是进程2，那么写文章这个页面就会认为你还没有登录）（大公司还会用集群等，内存也是无法共享的）

**进程内存：**

![进程内存](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/进程内存 session.png)

**为什么 `session` 不能在 `js` 中当做变量存储？**

1. 计算机给每个进程分配的内存是一定的，而且有限，如果放在js变量中将很有可能超出内存；
2. 一般上线后，都是多进程同时运行，session的数据在不同的进程中，但是进程中的数据是不能共享的，但是命中哪个进程是随机的，所以可能会导致这一次你能登陆上但是下一次就登陆失败了。（有可能这个session中存储着你登录需要验证的数据，但是命中session时却不是这一个。关于命中哪个session的随机性将会在pm2中介绍）
3. node.js 程序重启之后，session中的数据就丢失了，而node.js服务端程序的重启是比较常见的。

**Redis**

`Redis` 可以解决上面提到的问题。

先看 `Redis`（内存数据库） 的简单介绍：

- 它是 `web sever` （就是node.js写的程序）中最常用的缓存数据库，数据存放在**内存**中。
- 相比于 `mysql `（硬盘数据库），访问速度快（内存和硬盘不是一个数量级的），但是成本高，存储的数据量小（内存的硬伤）
- 有些地方适合使用 `mysql` ，有些地方适合使用 `Redis`

Redis 和 mysql ：

![和 mysql 配合工作图](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Redis .png)

**为何 `session` 适合用 `Redis` 存储？**

- session 访问频繁，对性能要求极高（Redis是内存数据库读写速度很快）

- session 可不考虑断电丢失数据的问题（因为它是内存数据库肯定会断电丢失数据，但是它不care，Redis 其实也可以做到断电不丢失数据，需要一些方法来实现）

  它只是临时存放一些数据，就算是丢失了，再让用户登录一次，session中的数据就又有了。

- session 数据量不会太大（相比于 mysql 中存储的数据）

**为何网站数据（指博客内容等）不适合用 Redis？**

- 操作频率不是太高（相比于session操作）
- Redis中的数据一般会断电丢失
- 数据量大，Redis 是内存数据库，内存太贵了

### 6.9 redis 介绍

**安装 Redis**

[Redis安装教程](https://www.runoob.com/redis/redis-install.html) 

Redis 常用命令

```js
// 增加键值对
set name happyCoding1024
// 获得键值
get name
// 显示所有键名
keys *
// 删除键值对
del name

```

**启动 Redis** 

```js
// 两种方式
// 方式1. 将 redis-server.exe 所在的目录加入到环境变量中，打开命令窗口，输入下面的命令
redis-server.exe
// 打开命令窗口进入到 redis-server.exe 所在的文件夹，输入下面的命令
redis-server.exe

```

### 6.10 node.js 连接 redis 的 demo

**在node.js 中使用 Redis**

```bash
npm install redis

```

redis 使用 demo

```js
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', (err) => {
  console.error(err)
}) 

// 测试
redisClient.set('myname', 'codingOrange', redis.print)
redisClient.get('myname', (err, val) => {
  if (err) {
    console.log(err)
    return
  }
  console.log('val', val)

  // 退出
  redisClient.quit()
})

```

### 6.11 node.js 连接 redis 封装工具函数

redis中set方法的两个参数必须是字符串

```js
const { REDIS_CONF } = require('../conf/db')
const redis = require('redis')

// 创建 redis 客户端
const redisClient = redis.createClient(REDIS_CONF)

redisClient.on('error', err => {
  console.error(err)
})

// 封装 set 函数
// 因为redis中set方法的两个参数必须是字符串，所以如果val的参数是对象的话，那么就会自动调用 toString() 方法进行隐式类型转换，转换后的格式并不是我们想要的，所以如果val是对象的话，我们一般先将其转换成JSON字符串的格式。
function set(key, val) {
  if (val === Object) {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

// 封装 get 函数
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
      }
      // 如果随便传了一个key，redis中查不到value，那么就会返回一个 null
      if (val == null) {
        resolve(null)
        return
      }
      // 我们知道在 set 时当val是对象的时候需要先转换为JSOnN字符串的形式，现在再将其转换回去。
      // 由于有可能val本来就不是对象，所以可能会有错误，所以在这里捕获一下，如果val不是对象，那么就直接resolve(val)
      try {
        resolve(JSON.parse(val))
      } catch {
        resolve(val)
      }
    })
  })
}

```

### 6.12 session 存入 redis

这一节和上一节内容重复了，这一节应该讲的是如何将 session 存入 redis 中，这一部分只能去看代码了。

### 6.13 完成 server 端登录的代码

这一节首先写了登录验证函数

```js
// 登录验证函数
const loginCheck = (req) => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel()
    )
  }
}

```

然后将登录验证加到了新建博客，更新博客，删除博客，并且用 req.session.username 中的数据替换掉了之前的假数据。

最后将登录代码中的 GET，改为了 POST。

### 6.14 联调- 介绍 html 页面

登录功能依赖 `cookie` ，`Postman` 中没有 cookie，因此必须用浏览器来联调。

课程中老师用的是他写的前端页面（用 http-server 来启动的），在这里我用的是 react 制作慧思博客的前端页面。

`cookie` 跨域不共享，前端和 `server` 端必须同域。

前端的端口和 `server` 端的端口不能是一个否则会起冲突（因为现在是在一台计算机上一个端口只能开启一个服务），如果是不同的端口那么就跨域了，`cookie` 不能共享，可以通过 `nignx` 做代理，让前后端同域。

### 6.15 nginx 配置

假设现在前端的服务实在 8001 端口，后端的服务是在 8000 端口，如果直接通过 Ajax 请求后端的数据，就会跨域。这时候可以用 ngnix 做反向代理。

ngnix 是高性能的 web 服务器，开源免费，在现在的开发中 nginx 应用很广范，无论是用它做服务器还是只用它一部分的功能。

- 一般用于做静态服务，负载均衡（本课没有用到）

  静态资源指不需要服务端做什么解析，客户端请求什么直接给它返回就好了，例如图片等，Node 也可以做静态服务但是没必要，用 ngnix 一配置就好了。

  例如现在有一个集群，经过 nginx 配置负载均衡后可以做到流量合理地均分到各个服务器上，使得集群的负载可以达到最大。

- 还有反向代理（本课用到）

nginx 反向代理工作流程图：

![nginx 反向代理工作流程图](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/ngnix 反向代理.png)

- `nigix` 会根据客户端请求的 `url`，经过解析之后变成新的 `url` 然后再去请求相应的内容。如上图：假设客户端请求的是 `localhost:8080/index.html` ，经过 `nginx` 反向代理之后，假设会去请求上面的 `html` 文件(`url` 是 `localhost:8001/index.html`)。可以看出经过 `nginx` 反向代理之后，端口号都发生了变化，说明域都发生了变化。浏览器那边不知道后台服务器那边做了什么，它只知道我访问这个 `url` 之后就会得到我想要的内容，其实并不是从你访问的那台服务器上获取到的。这也说明了 `nginx` 可以解决前面提到的前后端跨域的问题。

  （nginx可以根据浏览器请求的url来判断去哪个服务器上请求资源，浏览器在拿到数据后根本不知道中间发生了什么。）

- 正向代理是客户端可以操作的可以自己去选择用什么代理，比如我们平时翻墙使用的代理，反向代理对于客户端来说就像是一个黑盒子一样，看不到也摸不到，当你发送一个请求之后，反向代理会根据请求发送到相应的服务器上。

[nginx 下载]( http://nginx.org/en/download.html )

**`nginx` 配置**

widows下的配置文件： `安装目录/conf/nginx.conf`

> 注意 nginx 配置文件中属性和值之间是没有冒号的。

```nginx
# 需要配置的地方

# 首次将之前的下面这几行配置注释掉
#        location / {
#            root   html;
#           index  index.html index.htm;
#       }


# 增加代理
# 如果浏览器访问的是根目录就将其代理到http://localhost:8001
location / {
    proxy_pass http://localhost:8001;
}
# 如果浏览器访问的是/api/就将其代理到 http://localhost:8000/api/
location /api/ {
    proxy_pass http://localhost:8000;
    proxy_set_header Host $host; 
}

```

**nginx 常用命令**

```nginx
# 测试配置文件格式是否正确
nginx -t
# 启动
ngnix
# 重启
nginx -s reload
# 停止
nginx -s stop

```

### 6.16 联调演示与总结

如何做到

## 7. 日志

### 7.1 开始

- 系统没有日志，就相当于人没有眼睛(比如网站的访问人数，访问的峰值，投放的广告有多少人去点，有没有隐藏的bug等等信息如果没有日志都将获取不到)

- 第一， 访问日志 access log （sever 端最重要的日志）

  客户端访问我们服务端时的一些信息(访问时间，用户代理，访问类型，访问服务端的内容等等)

- 第二，自定义日志（包括自定义事件、错误记录等）

  并不像访问日志那样每一次访问都会有一条日志，而是根据实际的情况打印日志。例如产品经理让你记录一下这个产品被点击了多少次，那么这个时候就可以定义一条日志。

> 在线下开发时，日志可以输出到控制台中啊，上线之后日志信息一般都输出到文件中。

**日志章节目录：**

1）node.js 文件操作(单纯地使用文件操作性能不高，要用到 node.js stream )

2）日志功能开发和使用

3）日志文件拆分(比如按每天一个文件进行拆分)，日志内容分析（例如想知道访问我们网站的客户端 chrome 的占比是多少）

**日志要存储到文件中，（访问速度：redis>mysql(采用B树的数据结构访问速度也很快)>文件）为什么不存储到 mysql 和 redis 中呢？**

- 日志文件一般比较大，放在 redis 中成本太大(因为 `Redis` 是**内存** 存储器)，而且日志对性能要求并没有那么高，写文件一般都是异步的操作(有什么重要的事你们先做，我等你们忙完了再写入文件中)，所以也没必要存储到 `Redis`。
- mysql 中存放的数据一般有某种结构（比如表），日志一般只有一行一行的内容。而且日志可能需要多个服务器使用，文件的话每台服务器读文件都是支持的，如果使用 mysql，有的服务器可能还没有 mysql 的环境，还得部署 mysql 环境之后才可以使用日志。

### 7.2 Node.js 文件操作

`path` 模块

```js
// 由于不同系统之间路径的表示方式不同，使用 path 模块是为了统一路径的表示方式。
cosnt path = require('path');

```

示例：

```js
// __dirname 是 node 中自带的一个全局变量，表示当前文件的目录，可以理解成全局变量找到当前路径下 data.txt 文件，将路径统一化后再赋给 fileName，通过 fileName 就可以找到 data.txt 文件。 
const fileName = path.resolve(__dirname, 'data.txt');

```

**1）读取文件**

data.txt

```javascript
123
456
789

```

readFile.js

```js
const fs = require('fs')
const path = require('path')

const fullFilePath = path.resolve(__dirname, 'data.txt') 

// 读取文件内容
fs.readFile(fullFilePath, (err, data) => {
  if (err) {
    console.error(err) 
    return 
  }
  // data 是二进制形式，需要准换为字符串
  console.log(data.toString())
})

```

上面程序中 data 是 data.txt 文件内容的二进制形式，如果文件很大的话那么 data 变量也会很大，这样对内存消耗太大，甚至会超出内存。有一种想法就是能不能读取文件的一些内容之后就先写入到文件中，而不是像现在等到全部读取完之后一写入到文件中，下一节将详细讨论这种机制。

**2）写入文件**

```js
const fs = require('fs')
const path = require('path')

const fullFilePath = path.resolve(__dirname, 'data.txt') 
// 写入文件
// 写入文件的内容
const content = `123
456
789
`
const option = {
  // 写入的内容是追加还是重写
  flag: 'a', // a 追加写入，w 覆盖
}
fs.writeFile(fullFilePath, content, option, (err) => {
  err ? console.error(err) : console.log('写入成功')
})

```

上面的程序写入文件时主要有下面两个问题：1. 每次执行 fs.writeFile 需要打开文件是比较消耗性能的；2. 当 content 内容特别大时，需要占用的很大的内存。

**3）判断文件是否存在**

```js
// 判断文件是否存在
fs.exists(fullFilePath, (exist) => {
  console.log(exist)
})

```

当文件存在时返回 true，文件不存在时返回 false。

### 7.3 stream 介绍

**IO 操作的性能瓶颈**

- `IO` 包括 网络 `IO` 和文件 `IO`

- 相比于 `CPU` 计算和内存读写，`IO` 的突出特点就是：慢！

  像创建一个变量，数组对其进行操作这些就是在内存上的速度很快，但是像读一个文件，发送一个网络请求这就牵扯到文件IO 和网络 IO，速度会比较慢。我们无法改变 IO 操作速度比内存慢的现实，但是可以通过一些方法尽可能提高 IO 的操作效率。

**如何在有限的硬件资源（CPU，内存）下提高 IO 的操作效率？**

解决方案： **stream**

`stream` 的作用：

操作系统对 `IO` 的操作都是通过 `stream` 的方式进行的，减少对内存和CPU等硬件资源的消耗。

![stream 水桶示意图](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/stream 水桶示意图.png)

之前的 `readFile` ， `writeFile` 等操作相当于把 `source` 的整个水桶的水一起倒入到 `dest` 目标水桶中。这种操作在网络传输数据时是十分消耗资源的，比如一个`1G` 的文件需要从服务端写到客户端，如果按照这种方式，那么至少需要 1个 `G` 的内存来存储这个文件的内容，然后等所有的数据准备好后再一起写入到目标文件中，这个过程不仅对内存消耗大，对 `CPU` 和其它硬件资源的消耗也会很大（因为处理的数据量很大）。

利用 `stream` 的方式时，将上面的过程分成很多小的过程，读取一些内容后就写入到目标文件中。现实中的很多例子都是用了 `stream` ，比如在爱奇艺中看电影，不是将所有的影片资源全部加载完后才让你看，而是在你看的过程中不断地将资源传递过来。

示例代码：

```js
// 服务端接收客户端通过POST发送来的数据
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'POST') {
        const result = '';
        //  并不是说一次接收完，客户端每发送一部分，就执行一次下面的函数接收一部分
        req.on('data', (chunk) => {
          // 接收到部分数据
          // 数据传递都是通过二进制的形式传递的，所以接收到数据之后都要将其转换成字符串
          const str = chunk.toString();
          result += str;
        });
        // 当客户端传送完数据时执行这个函数
        req.on('end', () => {
            // 接收数据完成
            res.end('receive complete');
        })	
    }
})

```

### 7.4 stream 演示（1）

**node中的pipe方法**

标准输入输出是 Linux 中的基本概念，Node 通过 API 将其实现了。

`pipe` ： 管道，按照字面意思就是流入什么就流出什么，使用 pipe 方法以后就会遵循 steam 的特点，自动将内容分批次地传递。

```js
//  不需要人为加载模块
process.stdin.pipe(process.stdout);

```

执行上面这条语句之后，在控制台输入什么回车之后马上就会输出什么。可以这样理解，`pipe` 方法的左边是源水桶，右边是目标水桶，左边水桶中的水通过管道流入右边的水桶。流水的过程是通过 `stream` 的原理实现的，当左边水桶中的水很多时，那么不会一次性的流过来而是分好多次流向右边的水桶。

通过 `pipe` 方法重写上面的示例代码：

```js
// res 接收 req 的数据
const http = require('http');
const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req 的内容传递到 res
    // 仅用一行代码就可以实现，而且会自动根据内容的大小分批次传输
    req.pipe(res); 
    console.log(res)
  }
})

server.listen(3000, () => {
  console.log('server is listening on 3000')
})

```

从上面的代码中可以看出， `req` 和 `res`  都具有 `stream` 特性，也就是可以比作两个水桶。

### 7.5 stream 演示（2）

**利用 stream 实现复制文件**

没有 stream 特性的需要手动创建令其具有 steam 特性，具有 stream 特性之后就可以比作水桶了。

大体思路是，利用 `fs.createReadStream(fileName1)` 创建一个读取文件的 stream，利用 `fs.createWriteStream(fileName2)` 创建一个写入文件的 stream。然后利用 `readStream.pipe(writeStream);` 将一个文件分次读取到另一个文件中实现复制，通过 `readStream.on('end', () => {console.log('copy done')})` 来判断是否完成。

> 注意谁作为数据的发送方就有判断数据是否发送完的 .on('end', ...)，例如创建 http-server 时的 req，复制文件时的 readStream. 有 end 就有 data，例如 `readStream.on('data', (chunk) => {console.log(chunk.toString())})` 表示的是每次读取的文件内容。

```js
// 利用 stream 实现复制文件
const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, 'data-bak.txt');

// 定义两个水桶
const readStream = fs.createReadStream(fileName1);
const writeStream = fs.createWriteStream(fileName2);

readStream.pipe(writeStream);
// 上面的语句等价于
// readStream.on('data', (chunk) => {
//   console.log(chunk); // 当数据文件比较大时，会打印不止一次
// });

readStream.on('end', ()  => {
  console.log('copy completed');
});


// 普通方法复制文件
const fs = require('fs');
const path = require('path');

const fileName1 = path.resolve(__dirname, 'data.txt');
const fileName2 = path.resolve(__dirname, 'data-bak.txt');

// 读取文件内容
fs.readFile(fileName1, (err, data) => {
   if (err) {
     console.error(err);
     return;
   }
	const dataToString = data.toString();
   // 写入文件
    const opt = {
      flag: 'a' // 追加写入，覆盖用 'w'
    };
    fs.writeFile(fileName2, dataToString, opt, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('copy done');
    });
});

```

利用普通方法复制文件时无论文件多大都会一次性全部加载到 `dataToString` 中，然后再去一次性的写入 `data-bak.txt` 文件中，这样对内存， `CPU` ， 带宽的消耗都是很大的（因为一次操作的数据量很大）。

**利用stream实现网络IO和文件IO结合使用**

```js
const http = require('http');
const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'data.txt');
const server = http.createServer((req, res) => {
   if (req.method === 'GET') {
       const readStream = fs.createReadStream(fileName);
       // 文件IO:readStream 网络IO：res
       readStream.pipe(res); // 读取文件的内容直接返回到res中
   } 
});
server.listen(8000);

```

### 7.6 写日志

> utils : 实用工具

其实就是将要记录的内容利用stream的方式写到文件中。

在主目录下创建 logs，在里面新建 access.log（访问日志），error.log（错误日志），event.js.

本节主要讲了如何写访问日志，错误日志同理。

```js
const fs = require('fs')
const path = require('path')

// 生成 writeStream
function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStream = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStream
}

// 将日志内容写入到文件中
function writeLog(writeStream, log) {
  writeStream.write(log + '\n')
}

// 写访问日志
function access(log) {
  const writeStream = createWriteStream('access.log')
  writeLog(writeStream, log)
}

module.exports = {
  access
}

```

app.js 中的 handleServer 函数中将要记录的内容传给 access 函数

```js
access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);

```

有一点需要注意的是，可以通过 `src/config/db.js` 文件中的 `env` 来判断是线上环境还是线下开发环境。线下环境一般开发直接打印到控制台中，线上环境的话一般都是将日志写入到文件中。

### 7.7 日志拆分

为什么要拆分日志？

日志内容会慢慢积累，文件的体积不仅会变大，而且不便于分析日志。

一般按时间划分日志文件，如 `2019-02-10.access.log` 

关于具体多久拆分一次不同的场景时间不同

实现方式： `linux` 的 `crontab` 命令，即定时任务。

服务端的程序绝大多数都是运行在 `linux` 服务器上的，这部分 `windows` 下的用户没有 `crontab` 命令没法实践，其实装个虚拟机不就行了嘛，搞起来。

> 日志拆分主要是由运维的同学来做的，后端开发人员了解即可。

**crontab**

- 设置定时任务，格式： `*****commond` 注意5个 `*` 都有具体的含义不是随便写的。

- 每个 `*` 的含义，写 `*` 代表忽略

  第一个`*` : 分钟 ，如 `0****commond` 每0分钟执行这个命令， `1****commond` 每1分钟执行这个命令

  第二个`*` : 小时，如  `*1***commond` 每天凌晨1点执行，`21***commond` 每天凌晨1点零2分执行

  第三个`*` : 日，每月的多少号执行

  第四个`*` : 月，每年的多少月执行

  第五个`*` : 星期，每星期的星期几执行

- 使用方式：

  将 access.log 拷贝并重名为 2019-11-28.acess.log

  清空 access.log 文件，继续积累日志(积累完后会将文件命名成上面 2019-11-28.acess.log 的形式，然后再清空，继续积累日志)

`Linux` 下的shell脚本： 

```shell
# shell 脚本 src/utils/copy.sh
# 下面这行代码表明了执行shell代码的一个执行文件，就像是windows中的.exe文件类似
#!/bin/sh
cd copy.sh所在的路径 # 进入到 copy.sh 所在的目录下
cp access.log $(date +%Y-%m-%d).axess.log # 重命名为带日期.access.log
echo "" > access.log # 清空 access.log 文件

```

```shell
# 运行这个脚本
sh copy.sh

```

**crontab**

```shell
crontab -e # 可以打开crontab进行编辑
* 0 * * * sh copy.sh的路径/copy.sh # 每天凌晨0点自动触发

```

```shell
# 查看当前 crontab 的任务
crontab -l

```

**这个时候有个问题，上面这样的操作通过 node 编写代码完全也可以实现那么为什么不那么做呢？**

主要是考虑性能问题，如果node去做，那么 `linux` 服务器还需要再运行 `node` 程序，而编写成 `shell` 脚本的形式是 Linux 操作系统去做的，效率更高。

### 7.8 分析日志介绍

- 如针对 access.log 日志，分析 Chrome 的占比
- 日志是按行存储的，一行就是一条日志
- 使用  node.js 的 readline （基于  stream 是一点一点的去读取但不一定是一行一行的，readline 也是基于 stream，但是是一行一行地读取，所以是分析日志的好手，效率高）

### 7.9 readline 演示

**分析 chrome 占比** 

```js
// 分析 chrome 占比 
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const fileName = path.join(__dirname, '../', '../',  'logs', 'access.log');
// 创建 readStream
const readStream = fs.createReadStream(fileName);
// 创建 readline 对象
const rl = readline.createInterface({
  input: readStream
});
// 初始化总行数和Chrome占的行数
let chromeNum = 0;
let sum = 0;
// 逐行读取
// 一行读完之后会触发
rl.on('line', (lineData) => {
  if (!lineData) {
    return;
  }
  // 记录总行数
  sum++;
  const arr = lineData.split('--');
  // indexOf 用在字符串中时，如果要查找的字符串能够找到，则返回首字母的索引，找不到返回-1
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++;
  }
});
// 监听读取完成
rl.on('close', () => {
  console.log('chrome 占比：', chromeNum/sum);
})

```

## 8. 安全

关于安全这一方面，后端的责任更大一些，前后端三七开吧。

- sql 注入：窃取数据库内容

  前端安全不需要关心的

- XSS 攻击：窃取前端的 `cookie` 内容

  前后端都要做预防

- 密码加密：保障用户信息安全（重要）

  后端要做的

- server 端攻击方式非常多，预防手段也非常多

- 本项目中只涉及最常见的，能通过 `web server(node.js)`  层面预防的

- 有些攻击需要硬件和服务来支持(需要 `OP` 支持)，如 `DDOS` 

  预防手段如防火墙，IP屏蔽等，`OP` 是服务器的运维人员

### 8.1 sql 注入

> web 1.0  用户只是充当浏览的角色
>
> web 2.0 用户可以去发布一些信息

- 最原始、最简单的攻击，自从有了 `web2.0` 就有了 `sql` 注入攻击

- **攻击方式**：输入一个 `sql` 片段，最终拼接成一段攻击代码

  比如输入用户名和密码的时候不是输入的用户名和密码而是 `sql` 片段，这样的话后端拿到用户提交的用户名和密码之后和数据库通信进行验证的时候，有可能就是一段攻击代码。

- **预防措施**：使用 `mysql` 的 `escape` 函数处理输入内容即可

**登录时的关键代码：**

```js
  const sql = `
    select username, realname from user 
    where username ='${username}' and password='${password}';
  `;

```

项目代码中登录的实现：利用用户传递过来的 `username` 和 `password` 在 `MySQL` 数据库中查询，如果 `username` 和 `password` 在数据库中存在，那么返回 `username`，并将其存入 `redis` 中，通过 `req.session.username` 是否存在来判断用户是否登录，如果登录不成功 `req.session.username` 为 `undefined`。

上面的代码是漏洞百出，如果一个用户这样写用户名和密码，想一下能不能登录成功？

```js
username = zhangsan' --  password = 111

```

在 `MySQL` 中对应的代码：

```sql
select username, realname from user where username ='zhangsan' -- ' and password='111';

```

可以看到 `--` 后面的语句都被注释掉了，等价于下面语句：

```sql
select username, realname from user where username ='zhangsan'

```

不用多想，登录肯定成功呀，只要能够知道用户名就可以登录上去。

如果黑客想删除你的数据库也很容易：

```sql
select username, realname from user where username ='zhangsan'; delete from user -- ' and password='111';

```

这样在执行完查询用户名为 `zhangsan` 的信息之后，紧接着会删除 `user` 表中的所有内容。

**解决方案**

利用 `MySQL` 提供的 `escape` 函数将所有出现在 `sql` 语句中的变量都执行一遍，以上面的代码为例。

> 注意 const sql = `` 中 ${username} 在使用 escape 函数之后已经不需要再加引号了。

 ```js
username = escape(username);
password = escape(password);
// 使用 escape 函数运行完之后的函数就不需要在 sql 中加引号了
const sql = `
select username, realname from user 
where username =${username} and password=${password};
`;

 ```

现在 `username ` 还是 `zhangsan' --` ，`password` 还是 `111`

利用 `escape` 函数之后生成的 `sql` 语句：

```sql
sql = select username, realname from user 
where username ='zhangsan\' -- ' and password='111';

```

这时候 `username `  中间的 `'` 被  `\` 转义了， `--` 也不能起注释作用了。

**不只是登录这个地方只要是由用户输入的而且要在 `sq` 语句中出现的变量，都要在 `escape`  函数中执行一遍，注意在 `sql` 语句中 `${变量}` 两边就不需要加引号了。**

### 8.2 XSS 攻击

- 前端最熟悉的攻击方式，server端更应该掌握。

- **攻击方式**：在页面展示的内容中掺杂 `JS` 代码，以获取网页信息。

  举个实际攻击的例子：例如我在某博客系统中写了一篇文章里面掺杂着 JS 攻击代码，别人在访问我的文章的时候，JS 攻击代码就会起作用窃取那个用户的个人信息然后将这些个人信息上传到自己的服务器上，这样就窃取了别人的个人信息。

- **预防措施**：转换生成 `JS` 的特殊符号。

需要转换的特殊符号：

![XSS 特殊符号](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/XSS 特殊符号.png)

**XSS攻击示例：**

在新建博客的页面标题中输入下面的代码：

```js
<script>alert(document.cookie)</script>

```

点击创建后会弹出下面的对话框：

![XSS 攻击示例](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/XSS 攻击示例.png)

还有一点需要注意只要这个插入 `JS` 代码的博客没有被删除，让它重新加载之类的操作都会引发浏览器弹出 `cookie` 信息，并不是只是创建它的那一次。（因为只要加载它就会执行里面的 JS 代码）

**预防方法**

利用 `xss` 模块，引入 `xss` 函数，然后将有潜在危险的由用户输入的内容用 `xss` 函数运行一次。

```js
const xss = require('xss')

const title = xss(title);
// 之前的title
<script>alert(1)</script>
// xss运行之后的title
&lt;script&gt;alert(1)&lt;/srcipt&gt; // 数据库中存储的也是这种形式

```

XSS 预防成功示例：

![XSS预防成功示例](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/XSS预防成功示例.png)

没有预防成功的时候，也会创建一个博客但是标题是空的，因为它是一段 `JS` 代码并没有进行转义，在这里`<`，`>` 等可能形成 JS 代码的字符都被转义了。

**上面的标题在前端显示时，会显示 `&lt;script&gt;alert(1)&lt;/srcipt&gt;` 怎样将其再转义成正常的形式是前端的工作。如果前端不服气，就说我在做预防 XSS 攻击。**

**前端如何预防 XSS 攻击？**

### 8.3 密码加密

- 万一数据库被黑客攻破，最不应该泄露的就是用户信息

- 攻击方式：获取用户名和密码，再去登录其它的应用

  现在很多应用的用户名和密码都是一样的，后果不堪设想

- 预防措施：将密码加密，即便拿到密码也不知道明文

创建一个能加密密码的函数：

```js
// crypto 是 node.js 中一个加密库
const crypto = require('crypto');
// 密匙(shi)（一个字符串，自己随意创建的）
// 黑客就算拿到了密码，不知道密匙，也无法解析出明文
const SECRET_KEY = 'WJiol_8776#';
// md5 加密
function md5(content) {
  let md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex'); // 把输出变成16进制的方式
}
// 加密
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
}

```

将用户注册时输入的明文密码进行加密保存到数据库中(此项目并没有做有关注册的逻辑)

```js
// 参数中的 password 是用户输入的明文密码，执行完函数后生成一个16进制的加密后的密码
password = genPassword(password);

```

此后用户在登录等前后端交互操作中在网络上传输的都是加密后的密码。
