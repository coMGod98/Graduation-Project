import React from "react";
// import Unity from "react-unity-webgl";
// import {useUnityContext} from "react-unity-webgl";
import Unity, { UnityContext, useUnityContext } from "react-unity-webgl";
import styles from "./avatarPage.module.css"
import { Link } from "react-router-dom";

const unityContext = new UnityContext({
  loaderUrl: "Build/Build.loader.js",
  dataUrl: "Build/Build.data.unityweb",
  frameworkUrl: "Build/Build.framework.js.unityweb",
  codeUrl: "Build/Build.wasm.unityweb",
});

function AvartarPage() {
  return (
      <div className={styles.section}>
        <Unity className={styles.unity} unityContext={unityContext} />
      </div>
  )

}

export default AvartarPage;