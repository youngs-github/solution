## 1、xss

概念：跨站脚本攻击（cross site script），注入恶意代码进行篡改从而获取/控制其他用户隐私信息；
分类：反射型（欺骗用户点链接）、持久型（存储脚本信息）、基于dom（修改用户页面）；
原因：购买广告添加恶意连接欺骗用户点击、用户输入代码等；
避免：csp（content-security-policy，内容安全策略，让服务器决定浏览器可以加载哪些资源）、保护cookie（httponly、secure）、输入检查（过滤/编码特殊字符）、输出检查（过滤/编码特殊字符）；

## 2、csrf

概念：跨站请求伪造（cross site request forgery），劫持受信用户信息（cookie等）向服务端发送攻击请求；
原因：恶意连接欺骗用户访问攻击者准备的网站，同时网站请求源网站的接口，所以能够携带源网站的cookie，但是自己拿不到；
避免：get请求不修改数据、验证码/token（使用较广泛）、refer/origin（https转http时可能不带referer等）、samesite（跨域不发cookie）；

## 3、xss、csrf区别

1、原理：csrf利用网站本身漏洞去请求网站自身接口，xss向网站注入脚本并且执行；
2、条件：csrf需要用户登录且存在cookie，xss不需要；
3、目标：csrf的目标是用户，xss的目标是服务器（或浏览器）；

## 4、点击劫持

原理：将目标网站通过iframe的方式嵌入自己的网页，并透出一个按钮之类的；
避免：x-frame-options头（deny：不允许iframe、sameorigin：同域、allow-from：指定源）、js防御（self==top）；

## 5、重放攻击

原理：利用拿到的请求信息重新进行请求；
避免：保证标识（sign）的唯一性、单次使用（用完即过期）；