import React from "react";
// import Unity from "react-unity-webgl";
// import {useUnityContext} from "react-unity-webgl";
import Unity, { UnityContext, useUnityContext } from "react-unity-webgl";
import styles from "./avatarPage.module.css"
import { Link } from "react-router-dom";

const unityContext = new UnityContext({
  loaderUrl: "Build/test.loader.js",
  dataUrl: "Build/test.data",
  frameworkUrl: "Build/test.framework.js",
  codeUrl: "Build/test.wasm",
});

function AvartarPage() {
  return (
    <div className={styles.section}>
      <Unity className={styles.unity} unityContext={unityContext} />
    </div>
  )
  
}

export default AvartarPage;