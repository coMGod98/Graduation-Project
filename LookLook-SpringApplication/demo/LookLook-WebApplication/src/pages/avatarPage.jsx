import React from "react";
// import Unity from "react-unity-webgl";
// import {useUnityContext} from "react-unity-webgl";
import Unity, { UnityContext, useUnityContext } from "react-unity-webgl";
import styles from "./avatarPage.module.css"
import { Link } from "react-router-dom";

const unityContext = new UnityContext({
  loaderUrl: "Build/build.loader.js",
  dataUrl: "Build/build.data.unityweb",
  frameworkUrl: "Build/build.framework.js.unityweb",
  codeUrl: "Build/build.wasm.unityweb",
});

function AvartarPage() {
  return (
      <div className={styles.section}>
        <Unity className={styles.unity} unityContext={unityContext} />
      </div>
  )

}

export default AvartarPage;