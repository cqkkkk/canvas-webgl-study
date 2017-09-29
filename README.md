# canvas的入门学习

这是一个学习怎么入门canvas的教程，附带一些酷炫的动画

喜欢的请star一下，谢谢

> 有人说不想看2d的，想看webgl，现在正在写。。。。还是希望大家先把canvas看完，如果你觉得实现这样一个[动画](https://swnb.github.io/canvas_study/demo/star.html)是小儿科的话，那么就直接[webgl的介绍](./webgl.md)好了,笔者能力有限，不对的地方在所难免，我也只是抛砖引玉，希望大家不吝赐教。

首先我们在html里面创建`<canvas></canvas>`标签，需要注意的是，width和height都是canvas的dom属性，不要在css上写

获取他的dom，并且我们要监听事件，动态改变画布的大小

```javascript
let canvas=document.querySelector('canvas')
//解构赋值
let [w,h]=[canvas.width,canvas.height]=[window.innerWidth,window.innerHeight]
//窗口变化就动态变化
window.addEventListener('resize', () => {
    [w, h] = [canvas.width, canvas.height] = [
        window.innerWidth,
        window.innerHeight
    ];
});
```
接下来我们要获取canvas的api
```javascript
let ctx=canvas.getContext('2d')
```
ctx的api有哪些？
```javascript
ctx.save();
ctx.restore()

ctx.beginPath()
ctx.closePath()

ctx.fillStyle='red'
ctx.strokeStyle='blue'

ctx.fill()
ctx.stroke()

ctx.translate(x,y)
ctx.rotate(deg)

ctx.rect(x1,y1,x2,y2)
ctx.arc(rx,ry,r,start_deg,end_deg)
```

上面就是一些常用的api了，怎么使用它们去构建我们的动画呢？

我们需要面向对象，用es6语法来构建对象，生成对象的属性
我们来看具体代码

```javascript
class Parent {
    constructor() {
        //初始化对象的位置
        this.x = (Math.random() * 0.5 + 0.1) * x;
        this.y = (Math.random() * 0.5 + 0.1) * y;
        //矩形大小
        this.r = Math.random() * 30 + 20;
        //运动方向矢量
        this.direction = Math.random() * 2 * Math.PI;
        //运动速度矢量
        this.v_x = (Math.random() * 0.2 + 2.3) * Math.cos(this.direction);
        this.v_y = (Math.random() * 0.2 + 2.3) * Math.sin(this.direction);
    }
    updated() {
        this.x += this.v_x;
        this.y += this.v_y;
        //开始根据位置来画动画
        this.draw();
    }
    draw() {
        ctx.fillStyle = 'blue';
        ctx.Rect(this.x, this.y,this.r,this.r);
        ctx.fill()
    }
}
```
解释一下，根据上面的代码，constructor函数在每次生成对象的过程中都会自动生成对象的坐标（x，y），而对于update函数，每次都会更新对象的坐标，draw函数会根据更新的坐标重新绘制对象.

之后我需要`requestAnimationFrame` 函数来实现动画，具体代码

```javascript
const a = new Parent();
function run() {
    a.update();
    requestAnimationFrame(run);
}
run();
```

我们先来看看[效果是怎么样的](https://swnb.github.io/canvas_study/demo/canvas.1.0.html)。
全部代码在[canvas代码](./canvas/canvas1.0.js)。

我们看到效果并不好，为什么？因为我们每次更新到画布的过程没有清除先前绘制的矩形，所有没有达到我们想要的效果，只要求一个矩形，怎么办？，我们只需要每次绘制画布前清除画布就好了。使用`ctx.clearRect(0,0,w,h)` 从（0,0）到（w，h）清除画布，还要重新开始路径`ctx.beginPath()`让画布重新开始路径，[效果在这里](https://swnb.github.io/canvas_study/demo/canvas.1.1.html)代码更改为[代码](./canvas/canvas1.1.js)

但是上面的方法并不好，因为每次都要清除全部内容，大家可以根据这个做优化，我这里就不写了，每次只清除前面的那一部分内容就好了，但是对于内容变化丰富的画布，那么就需要全部清空了。

这时候我们就可以看到一个矩形在窗口移动了，但是它会移动到窗口外啊，怎么办呢?一个方法限制他的运动范围，让他每次遇到边界速度反向，就像一个弹性球体一样，来动手实现这个函数吧.

```javascript
/*因为是内置方法，建议下划线开头
*   这个函数有4个参数，前两个参数是当前元素的位子，后两个是边界线，先默认是距离窗口内40px的范围
*/ 
_borderLine(x, y, border_x = [40, w - 40], border_y = [40, h - 40]) {
        if (x < border_x[0] || x > border_x[1]) {
            x = Math.min(border_x[1], x);
            x = Math.max(border_x[0], x);
            //更换x方向
            this.v_x = -this.v_x;
        }
        if (y < border_y[0] || y > border_y[1]) {
            y = Math.min(border_y[1], y);
            y = Math.max(border_y[0], y);
            //更换y方向
            this.v_y = -this.v_y;
        }
        [this.x, this.y] = [x, y];
    }
```

将上面的函数放入对象内部，这样我们的一个例子就简单完成了，[效果如下](https://swnb.github.io/canvas_study/demo/canvas.1.2.html)，[代码如下](./canvas/canvas1.2.js)

简单介绍下圆的绘制
> ctx.arc(x，y，r，start_deg,end_deg，clockwise) 前三个参数确定圆心坐标（x,y）和半径 r ，start_deg是起点的角度，end_deg是终点的角度，角度需要使用 Math.PI 来表示，最后一个参数表示是否是顺时针绘制，默认是true

大家可以使用arc函数构建圆配上不同的颜色，实现下面的[效果](https://swnb.github.io/canvas_study/demo/point.html)了。

我们再来看一个复杂的例子

实现下面的[动画](https://swnb.github.io/canvas_study/demo/star.html)

这个动画有五角星和雪瓣，我们主要介绍下4角星怎么实现，简单来说，就是使用line连接起来，然后再fill就完成了。我们看看怎么实现吧，首先，你要生成一个基本点属性`position`,这个属性包括了三角形的中心点

```javascript
class star{
    constructor(){
        this.x=(Math.random() * 0.8 + 0.1) * w,
        this.y= (Math.random() * 0.8 + 0.1) * h
        this.r=(Math.random()*2+13)
    }
}
```
其次，你需要根据这个基本点去绘制这个星的几个边，数学问题，直接给答案了.

```javascript            
            ctx.fillStyle = 'red';
            ctx.translate(this.x + this.r, this.y);
            ctx.beginPath();
            ctx.moveTo(0, -this.r);
            ctx.lineTo(this.r / 4, -this.r / 4);
            ctx.lineTo(this.r, 0);
            ctx.lineTo(this.r / 4, this.r / 4);
            ctx.lineTo(0, this.r);
            ctx.lineTo(-this.r / 4, this.r / 4);
            ctx.lineTo(-this.r, 0);
            ctx.lineTo(-this.r / 4, -this.r / 4);
            ctx.fill();
            ctx.closePath();
```
解释一下,我们将画布的原点移动到我们的三角形原点右边的那个点，注意是右边的位置，因为我要从这个点开始连线，之后就是一些数学问题，连线，连线，自己分析一下就知道了。然后填充，就好了，上面的只是核心代码。

实现一个4角星的代码在[这里](https://github.com/swnb/canvas_study/blob/gh-pages/demo/js/starSigel.js),[效果这里](https://swnb.github.io/canvas_study/demo/starSigel.html)

我就不再详细介绍这个[动画](https://swnb.github.io/canvas_study/demo/star.html)怎么实现了，喜欢的朋友可以去这里看我写的[源代码](https://github.com/swnb/canvas_study/blob/gh-pages/demo/js/star.js)，我给了非常详细的注释，如果看不懂，可以提个issues,我会专门去详细的介绍怎么实现这个[动画](https://swnb.github.io/canvas_study/demo/star.html)。

后面我回介绍webgl和css3的动画，希望大家喜欢，有不对的地方也希望大家给我提出来

我写了一个项目，可以上传视频，在线看视频。而且大量特效都是基于svg和canvas的，所以，有兴趣的同学可以[看一下](https://github.com/swnb/video)嘛，给个star，谢谢了。

后面我会介绍复杂的canvas绘制方法
