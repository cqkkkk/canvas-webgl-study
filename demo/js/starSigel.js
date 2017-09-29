(() => {
    let can = document.getElementById('canvas');

    //定义长宽 解构
    let [w, h] = ([can.width, can.height] = [
        document.body.clientWidth,
        window.innerHeight
    ]);

    let ctx = can.getContext('2d');

    //窗口事件
    window.addEventListener('resize', () => {
        [w, h] = [can.width, can.height] = [
            document.body.clientWidth,
            window.innerHeight
        ];
    });

    class star {
        constructor() {
            [this.x, this.y, this.r] = [
                Math.random() * w,
                Math.random() * h,
                Math.random() * 24 + 24
            ];
        }
        draw() {
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
        }
    }

    let z = new star();

    z.draw();
})();
