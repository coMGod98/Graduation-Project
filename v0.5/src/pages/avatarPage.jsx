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
      <Link to="/">
        <button>홈으로 돌아가기</button>
      </Link>
      
      <Unity style={{
        width:'1200px',
        height: '100%',
        margin:'0 auto',
        justifySelf: 'center',
        alignSelf: 'center' 
      }} unityContext={unityContext} />
    </div>
  )
  
}

export default AvartarPage;