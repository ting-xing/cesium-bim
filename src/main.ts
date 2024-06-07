import './style.css'
import {
    Cartesian3,
    HeadingPitchRoll,
    Math,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Transforms,
    Viewer
} from "cesium";
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

// 创建屏幕空间事件处理器
const handler = new ScreenSpaceEventHandler(viewer.scene.canvas);

// 定义一个函数来处理单击事件
const onEntityClicked: ScreenSpaceEventHandler.PositionedEventCallback = (movement) => {
    const pickedObject = viewer.scene.pick(movement.position);
    if (pickedObject && pickedObject.id === entity) {
        alert('Entity clicked');
    }
}

// 设置输入动作为鼠标左键单击
handler.setInputAction(onEntityClicked, ScreenSpaceEventType.LEFT_CLICK);

await viewer.zoomTo(entity)

viewer.trackedEntity = entity;