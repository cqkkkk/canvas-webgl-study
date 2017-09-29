import * as T from 'three';

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

camera.position.z = 10;
//渲染场景
function draw() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
}
draw();
