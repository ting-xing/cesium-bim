import './style.css'
import * as Cesium from "cesium";
import {
    Cesium3DTileFeature,
    Cesium3DTileset,
    Color,
    ScreenSpaceEventHandler,
    ScreenSpaceEventType,
    Viewer
} from "cesium";

const viewer = new Viewer('app');


const tileset = viewer.scene.primitives.add(
    await Cesium3DTileset.fromIonAssetId(2464651),
);

let selectedFeature: Cesium3DTileFeature | null = null;


const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);

const action: ScreenSpaceEventHandler.MotionEventCallback = (movement) => {
    const feature = viewer.scene.pick(movement.endPosition);
    if (feature instanceof Cesium3DTileFeature) {
        if (selectedFeature) {
            selectedFeature.color = Color.WHITE; // 恢复之前选中的颜色
        }
        selectedFeature = feature;
        feature.color = Color.YELLOW; // 设置当前选中的颜色为黄色
    }
}

handler.setInputAction(action, ScreenSpaceEventType.MOUSE_MOVE);

await viewer.zoomTo(tileset)