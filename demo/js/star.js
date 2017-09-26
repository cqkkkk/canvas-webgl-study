(() => {
    let can = document.getElementById('canvas');

    //定义长宽 解构
    let [w, h] = ([can.width, can.height] = [
        document.body.clientWidth,
        window.innerHeight
    ]);

    let ctx = can.getContext('2d');

    //记录鼠标的位置;
    let position = {};

    //窗口事件
    window.addEventListener('resize', () => {
        [w, h] = [can.width, can.height] = [
            document.body.clientWidth,
            window.innerHeight
        ];
    });

    //注册移动事件
    document.addEventListener('mousemove', (e = window.event) => {
        position.x = e.clientX;
        position.y = e.clientY;
    });

    document.addEventListener('touchmove', (e = window.event) => {
        [position.x, position.y] = [e.touches[0].clientX, e.touches[0].clientY];
    });

    can.addEventListener('touchmove', e => {
        e.preventDefault();
    });

    //线条相连接
    function line(This) {
        if (
            Math.abs(position.x - This.x) < 200 &&
            Math.abs(position.y - This.y) < 200
        ) {
            ctx.beginPath();
            ctx.moveTo(position.x, position.y);
            if (This.name === 'rect') {
                ctx.fillStyle = 'rgba(0,190,255,1)';
            }
            if (This.name === 'tri') {
                ctx.strokeStyle = 'whitesmoke';
                ctx.lineTo(This.x + This.r, This.y);
                ctx.fillStyle = 'rgba(255,102,100,1)';
            }
            ctx.stroke();
            ctx.closePath();
        } else {
            if (This.name === 'rect') {
                ctx.fillStyle = 'rgba(58,123,255,0.6)';
            }
            if (This.name === 'tri') {
                ctx.fillStyle = 'rgba(255,101,47,0.6)';
            }
        }
    }

    //这是一个元素的空间控制,让他好像在弹性盒子里面;
    function dropUpdate() {
        if (this.x > w - 20 || this.x < 20) {
            // let xtmp = Math.max(20, this.x);
            // xtmp = Math.min(w - 20, xtmp);
            this.x = Math.max(20, this.x);
            this.x = Math.min(w - 20, this.x);
            // this.x = xtmp;
            this.vx *= -1;
        }

        if (this.y > h - 20 || this.y < 20) {
            let ytmp = Math.max(20, this.y);
            ytmp = Math.min(h - 20, ytmp);
            this.y = ytmp;
            this.vy *= -1;
        }

        this.x += this.vx * this.spead;
        this.y += this.vy * this.spead;
    }

    //矩形元素
    let rect = function() {};

    //三角形
    let tri = function() {};

    //矩形原型链
    rect.prototype = {
        init: function(x, y, r) {
            this.r = r;
            this.x = x;
            this.y = y;
            this.name = 'rect';
            this.spead = Math.random() * 0.2 + 0.7;
            this.direc = Math.random() * 2 * Math.PI;
            this.vy = Math.cos(this.direc);
            this.vx = Math.sin(this.direc);
            this.p = Math.random() * 2 + 1;
            this.i = 0;
        },
        draw: function() {
            line(this);
            ctx.save();
            ctx.translate(this.x + this.r / 2, this.y + this.r / 2);
            ctx.rotate(this.i * Math.PI / 70);
            ctx.beginPath();
            ctx.arc(0, 0, this.r, 0, Math.PI / this.p);
            ctx.fill();
            ctx.closePath();
            ctx.restore();
            this.update();
            this.i++;
        },
        update: dropUpdate
    };

    //4角形原型链
    tri.prototype = {
        init: function(x, y, r) {
            this.r = r;
            this.x = x;
            this.y = y;
            this.name = 'tri';
            this.spead = Math.random() * 0.2 + 0.8;
            this.direc = Math.random() * 2 * Math.PI;
            this.radius = Math.random() * 30 + 70;
            this.vy = Math.cos(this.direc);
            this.vx = Math.sin(this.direc);
            this.i = 0;
        },
        draw: function() {
            line(this);
            ctx.save();
            ctx.translate(this.x + this.r, this.y);
            ctx.rotate(this.i * Math.PI / this.radius);
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
            ctx.restore();
            this.update();
            this.i++;
        },
        update: dropUpdate
    };

    //元素集合数组
    let array = [];

    //生成元素
    for (let i = 0; i < 70; i++) {
        let tmpr = new rect();
        let tmpt = new tri();
        tmpr.init(Math.random() * w, Math.random() * h, Math.random() * 4 + 13);
        tmpt.init(Math.random() * w, Math.random() * h, Math.random() * 6 + 13);
        array.push(tmpr, tmpt);
    }

    //render元素
    function update() {
        ctx.fillStyle = 'rgb(0,0,0)';
        ctx.fillRect(0, 0, w, h);
        for (let x of array) {
            x.draw();
        }
        requestAnimationFrame(update);
    }

    //开始render
    update();
})();
