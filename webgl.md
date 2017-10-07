# webgl（three.js）

> 由于webgl比较复杂了，我这里借助框架tree.js,而网上的tree.js教程，除了官网，其他地方的教程都年久失修，不再适用，我尽力对每一个demo认真的实践一下，做到负责。

### 使用什么环境学习呢？

我推荐使用webpack，有了热加载可以更好的测试，还可以使用es6语法，当然，你也可以script引入three.js(不推荐)，
如果你不会使用webpack，没关系，我写了一个模板给你使用，用法非常简单，你只需要[点击这里](https://github.com/swnb/canvas_study/tree/webpack-template)然后按照步骤来就好了。
里面的`webpack插件`是我自己写的，功能很简单，所以请不要修改它，如果需要学习webpack，请去官网。

### three.js的3个要点
请记住下面这3点

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
***
## 开始3个要素的介绍
### 创建场景
```javascript
const scene=new T.Scene();
```
### 创建相机

> 相机也分正交相机和透视投影，可以简单认为，透视投影照相机获得的结果是类似人眼在真实世界中看到的效果（近大远小）。所以对于制图，建模软件通常使用正交投影，这样不会因为投影而改变物体比例。而对于其他大多数应用，通常使用透视投影，因为这更接近人眼的观察效果。

这里使用的是透视相机。
```javascript
const camera = new T.PerspectiveCamera(60, w / h, 0.1, 1000);
```
> 简单介绍下参数 第一个参数是视景体竖直方向上的张角（是角度制而非弧度制）,这里设置成60度，第二个参数是宽长比例，简单说，如果是全屏，那么`w`是`window.innerWidth`,`h`就是`window.innerHeight`,第三个参数和第4个参数是相机到视景体最近、最远的距离，可能说的不是很清楚，见谅。

### 渲染
渲染也有不同的渲染方式，这里选择是`WebGLRenderer`

```javascript
const renderer=new T.WebGLRenderer();
```
设置渲染的大小(场和宽)

`renderer.setSize(w,h)`

render有一个domElemet属性，这个属性可以让它被渲染到网页页面上

`document.body.appendChild(renderer.domElement)`

开始渲染

`renderer.render(scene,camera)`

***
上面简单介绍了3个要点的用法，这里介绍怎么创建物体，我们来为场景添加物体。

先创建一个长方形

```javascript
// 创建一个矩形
const cube=new T.CubeGeometry(2, 2, 2) // 参数就是x,y,z
//创建矩形的颜色
const outlook=new T.MeshBasicMaterial({ //颜色是 0xf0f0f1，模糊程度是0.7
      color: 0xf0f0f1,
      opacity: 0.77
    })
//绘制成一个物体
const object=new T.Mesh(cube,outlook);
```
我们整合一下代码，看看整个的流程

```javascript
import * as T from "three";
//获取窗口大小
let [w, h] = [window.innerWidth, window.innerHeight];
//场景创建
const scene = new T.Scene();
//相机
const camera = new T.PerspectiveCamera(60, w / h, 0.1, 1000);
//渲染
const renderer = new T.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//创建物体
const cube = new T.Mesh(
  new T.CubeGeometry(1, 2, 3),
  new T.MeshBasicMaterial({
    color: 0xff00ff,
    opacity: 0.75
  })
);
//添加物体
scene.add(cube);
//渲染场景
renderer.render(scene,camera)
```
上面的代码啥都看不见，为啥，因为我们需要设置相机的位置，将相机的位置向后面移动一下，在`renderer.render()之前加上camera.position.z=10`，这样就可以了出现物体了。。

但是这个根本看不出是3d的啊，我们调整物体的位子，让他转动起来，代码如下

```javascript
function draw() {
    //旋转物体
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    //渲染
    renderer.render(scene, camera);
    //根据浏览器的渲染周期来渲染
    requestAnimationFrame(draw);
}
```
[整体的代码](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/webgl_js/template.js)

[效果在这里](https://swnb.github.io/canvas-webgl-study/demo/webgl.html)

这里我写了一个大致模板给大家看一下整体的流程，方便理解

```javascript
import * as T from "three";

function init(tag = document.body) {
  let [w, h] = [window.innerWidth, window.innerHeight];
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(75, w / h, 0.1, 1000);
  const renderer = new T.WebGLRenderer();
  renderer.setSize(w, h);
  tag.appendChild(renderer.domElement);
  return {
    scene,
    camera,
    renderer
  };
}

function createObject() {
    //在这里创建物体
  const object = new T.Mesh(
    new T.CubeGeometry(2, 2, 2),
    new T.MeshBasicMaterial({
      color: 0xf2f30f,
      opacity: 0.77
    })
  );
  return object;
}

function run() {
  const { scene, camera, renderer } = init();
  const object = createObject();
  scene.add(object);
  camera.position.z = 7;
  function draw() {
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
  }
  return draw;
}

let render = run();

render();

```

这就是大致的webgl构建应用的思路了，未完待续。。。。