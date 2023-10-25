using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;

public class SelectSkinColor : MonoBehaviour
{
    public float redAmount;
    public float greenAmount;
    public float blueAmount;
    public float alphaAmount;

    public Image colorImage;

    private Color currentSkinColor;

    public List<SkinnedMeshRenderer> rendererList = new List<SkinnedMeshRenderer>();

    private void Awake()
    {
        colorImage = GetComponent<Image>();
        redAmount = colorImage.color.r;
        greenAmount = colorImage.color.g;
        blueAmount = colorImage.color.b;
        alphaAmount = colorImage.color.a;
    }

    public void SetSkinColor()
    {
        currentSkinColor = new Color(redAmount, greenAmount, blueAmount, alphaAmount);

        for (int i=0; i < rendererList.Count; i++)
        {
            rendererList[i].material.SetColor("_Color", currentSkinColor);
        }
    }

}
