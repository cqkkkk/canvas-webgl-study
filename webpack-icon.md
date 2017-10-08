# webpack-icon

进入webpack的[`官网`](http://webpack.github.io/)，可以看到它的图标,一开始我以为是`webgl`写的，其实只是`css3`实现的，这里教大家怎么使用`css3`实现这样一个动画

效果在[这里](https://swnb.github.io/canvas-webgl-study/demo/css3.html/webpack_icon.html)

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

现在我们让它动起来，定义一个keyframes 
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

前面的动画我`仔细`看了下，上面的代码容器`向下旋转的角度`是不对的，官网的角度大概是`36deg`左右，我写的时候认为是`45deg`，`需要注意`，下面的代码是以`36deg`实现的。

下面我们需要创建另外一个容器，可以使用`@extend`，但是为了清晰，我这里重新写一下，我们整理`html`代码，得到下面的代码
```html
    <div class='webpack-icon'>
        <div class='container'>
            <div class='face front'></div>
            <div class='face back'></div>
            <div class='face left'></div>
            <div class='face right'></div>
            <div class='face top'></div>
            <div class='face bottom'></div>
        </div>
        <div class='innerContainer'>
            <div class='face front'></div>
            <div class='face back'></div>
            <div class='face left'></div>
            <div class='face right'></div>
            <div class='face top'></div>
            <div class='face bottom'></div>
        </div>
    </div>
```

除了`webpack-icon`代码,还要将`innerContainer`的size的大小修改成为前者的2分之一，你也可以自定义内部容器的大小。。

```diff
+   .webpack-icon  
+       position relative
+       width $size
+       height $size
+       margin 120px auto
       .container
        ...
+       innerContainer
+           position relative
+           width ($size/2)
+           height ($size/2)      
+           ... 
```
整体`stylus`代码的[在这里](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/css3.html/css/webpack_tmp.stylus),css代码[在这里](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/css3.html/css/webpack_tmp.stylus.css),效果[在这里](https://swnb.github.io/canvas-webgl-study/demo/css3.html/webpack_tmp.html)

可以看到，显示的有两个盒子，但是一个再上，一个在下，我们需要设置下面盒子的`top`值,将top设置成为`-(($size*3)/4)`

> 上面的top值是怎么得到的，数学问题，列个等式`$size-top=($size-$size/2)/2`，解方程，我就不详细解释这个问题了，自己看下就知道了


现在，盒子的就在中间了。

我们定义另一个keyframes动画，和之前的keyframes动画方向相反，前面有类似的代码，最后，我们再上色，更换background，这里不多说了，直接看代码吧

最终的结果[看这里](https://swnb.github.io/canvas-webgl-study/demo/css3.html/webpack_icon.html)，`stylus代码`[看这里](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/css3.html/css/webpack_icon.stylus)，`css代码`[看这里](https://github.com/swnb/canvas-webgl-study/blob/gh-pages/demo/css3.html/css/webpack_icon.stylus.css)

> 在webpack的实现上,还是有一些不同的,webpack官网的`dom`使用的是`ul li;,而且将内部的盒子放在了外部盒子的`dom`内部,便于css的重用,这个和我的实现思路不一样;还使用了伪元素,作用好像是为了做背景的修饰;这里就不深入了,感兴趣的朋友可以去看看去官网看看它是怎么实现.希望对大家有帮助,谢谢大家;