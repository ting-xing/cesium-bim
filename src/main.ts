import './style.css'
import {Cartesian3, HeadingPitchRoll, Math, Transforms, Viewer} from "cesium";
import Air from './assets/Cesium_Air.glb?url'

const viewer = new Viewer('app', {
    shouldAnimate: true, // 开启动画
});
// 飞机位置
const position = Cartesian3.fromDegrees(
    117.36237,
    32.934037,
    5000
);
// 飞机姿态
const heading = Math.toRadians(135);
const pitch = 0.4;
const roll = -0.3;
const hpr = new HeadingPitchRoll(heading, pitch, roll);
const orientation = Transforms.headingPitchRollQuaternion(
    position,
    hpr
);
// 显示出来
const entity = viewer.entities.add({
    name: Air,
    position: position,
    orientation: orientation,
    model: {
        uri: Air,
        minimumPixelSize: 128,
        maximumScale: 20000,
    },
});

await viewer.zoomTo(entity)

viewer.trackedEntity = entity;