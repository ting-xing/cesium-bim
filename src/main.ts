import './style.css'
import {Cesium3DTileset, Viewer} from "cesium";

const viewer = new Viewer('app');


const tileset = viewer.scene.primitives.add(
    await Cesium3DTileset.fromIonAssetId(2464651),
);

await viewer.zoomTo(tileset)