# webgl（three.js）

> 由于webgl实在是太复杂了，我只好借助框架tree.js,而网上的tree.js教程，除了官网，其他地方的教程都年久失修，不再适用，我尽力对每一个demo认真的实践一下，做到负责。

### 使用什么环境学习呢？

我推荐使用webpack，有了热加载可以更好的测试，还可以使用es6语法，当然，你也可以script引入three.js

### three.js的3个要点
请默默读几遍

* 场景
* 相机
* 渲染

下面我就根据这3个点来说明，怎么构建你的应用

在node环境下，建议使用yarn替代npm下载three.js

```shell
    yarn add three.js
```
引入three.js
```javascript
import * as T from 'three'
```
### 创建场景
```javascript
const scene=new T.Scene();
```
### 创建相机

相机也分正交相机和透视投影，可以简单认为，透视投影照相机获得的结果是类似人眼在真实世界中看到的效果（近大远小）。所以对于制图，建模软件通常使用正交投影，这样不会因为投影而改变物体比例。而对于其他大多数应用，通常使用透视投影，因为这更接近人眼的观察效果。

这里使用的是透视相机。
```javascript
const camera = new T.PerspectiveCamera(60, w / h, 0.1, 1000);
```
简单介绍下参数 第一个参数是视景体竖直方向上的张角（是角度制而非弧度制）,这里设置成60度，第二个参数是宽长比例，简单说，如果是全屏，那么`w`是`window.innerWidth`,`h`就是`window.innerHeight`,第三个参数和第4个参数是相机到视景体最近、最远的距离，可能说的不是很清楚，见谅。

### 渲染
渲染也有不同的渲染方式，这里选择是`WebGLRenderer`

```javascript
const renderer=new T.WebGLRenderer();
```
设置渲染的大小

`renderer.setSize(w,h)`

render有一个domElemet属性，这个属性可以让它被渲染到网页页面上

`document.body.appendChild(renderer.domElement)`

开始渲染

`renderer.render(scene,camera)`



