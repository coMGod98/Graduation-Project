import React from "react";
// import Unity from "react-unity-webgl";
// import {useUnityContext} from "react-unity-webgl";
import Unity, { UnityContext, useUnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "Build/test.loader.js",
  dataUrl: "Build/test.data",
  frameworkUrl: "Build/test.framework.js",
  codeUrl: "Build/test.wasm",
});

function AvartarPage() {
  return (
    <div style={{display:'flex', justifyContent:'center'
    , textAlign:'middle'}}>
      <Unity style={{width:'1600px', margin:'0 auto'}}
      unityContext={unityContext} />;
    </div>
  )
  
}

export default AvartarPage;