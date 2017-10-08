# webpack-icon

进入webpack的[`官网`](http://webpack.github.io/)，可以看到它的图标,一开始我以为是`webgl`写的，其实只是`css3`实现的，这里教大家怎么使用`css3`实现这样一个动画

> 强烈建议没有`css3 3d`基础的朋友看[张鑫旭的教程](http://www.zhangxinxu.com/wordpress/2012/09/css3-3d-transform-perspective-animate-transition/)

我们先创建一个盒子`container`,盒子内部由6个`div`组成，分别表示盒子的6个表面.

```html 
    <div class='container'>
        <div class='face front'>front</div>
        <div class='face back'>back</div>
        <div class='face left'>left</div>
        <div class='face right'>right</div>
        <div class='face top'>top</div>
        <div class='face bottom'>bottom</div>
    </div>
```

这里使用`stylus`来写css代码，`stylus`很简单易学，一目了然，可以去官网学习，不过`后面也有转换后的css代码`

```stylus
//先定义两个变量，一个是盒子的大小，一个背景颜色
$size = 240px
$backgroundColor = radial-gradient(transparent 30%,rgba(5,17,53,.2) 100%)

//定义容器的css
.container
    position relative //将元素设置成相对的
    margin 120px auto       //居中
    width $size       //设置宽高
    height $size      
    
    //定义每个表面的共性
    .face   
        position absolute //绝对定位
        width $size       //大小
        height $size
        background $backgroundColor //背景颜色
        text-align center
        font-size 24px 
        transform-origin 50%        //变换中心为几何中心
        backface-visibility hidden  //旋转到背面消失，可以不要
```

我们来定义`front`,`back`,`left`,`right`,`top`,`bottom`
```stylus
.front
    transform translateZ($size/2)

.back
    transform rotateY(180deg) translateZ($size/2) 

.right
    transform rotateY(90deg) translateZ($size/2)

.left
    transform rotateY(-90deg) translateZ($size/2)

.top
    transform rotateX(-90deg) translateZ($size/2)

.bottom
    transform rotateX(90deg) translateZ($size/2)
```
> 需要注意的是，每个元素都是`向前`移动`size/2`，因为旋转后每个面对应的方向都发生了改变。移动也只是在`旋转后的那个方向上移动`,如果不能理解这个过程，自己去尝试下就懂了。。

我们将容器向下旋转`45deg`，向右旋转`45deg`

```diff
.container
    position relative //将元素设置成相对的
    margin 20px auto       //居中
    width $size       //设置宽高
    height $size 
+  transform rotateX(-45deg) rotateY(45deg)    
+  transform-style preserve-3d
```
[这里](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/css3.html/css/box.stylus)就是整体的`stylus`代码,[这里](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/css3.html/css/box.stylus.css)就是编译后的css代码,[这里](https://swnb.github.io/canvas-webgl-study/demo/css3.html/box.html)是整体的效果。

可以看到大致的模型已经出来了。

让它动起来，定义一个keyframes 
```stylus
@keyframes boxr 
    0%
        transform rotateX(-45deg) rotateY(45deg)
    70%
        transform rotateX(-45deg) rotateY(405deg)
    100%
        transform rotateX(-45deg) rotateY(405deg)
```
这个动画会在旋转一段时间后等待一段时间。形成转动延时的效果
下面添加 `animation`
```diff
.container {
    position: relative;
    margin: 120px auto;
    width: 240px;
    height: 240px;
    transform: rotateX(-45deg) rotateY(45deg);
+   animation: boxr 5s ease-in-out infinite 1s;
    transform-style: preserve-3d;
}
```
得到的整体效果在[这里](https://swnb.github.io/canvas-webgl-study/demo/css3.html/box_rotate.html)
