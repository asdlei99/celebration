# 站庆H5

## 概览

项目使用gulp进行流程控制，引入了sass和雪碧图支持。

项目结构说明：

- dist/: 生成的文件都在这里
  - sprite.css: 自动生成的雪碧图样式文件
- src/: 开发目录
  - lib/: 第三方插件内容
  - pages/: 存放各页面，注意对应页面需要到`src/index.html`处引入
  - imgs/: 切图存放处，只支持png
  - css/: 使用sass预处理器，后缀为scss（可以认为是css的超集）
- gulpfile.js: gulp控制文件

## 运行

确保有nodejs环境，之后运行`npm install -g gulp`全局安装gulp，再运行`npm install`安装gulp相关依赖。首次运行时命令行输入`gulp build`进行相关的编译，之后运行`gulp watch`即可监听文件变化并自动进行编译。调试时打开`dist/index.html`即可。