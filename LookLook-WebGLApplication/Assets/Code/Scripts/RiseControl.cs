using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class RiseControl : MonoBehaviour
{
    public TMP_InputField inputSize;
    public GameObject MalePreview;
    public GameObject FemalePreview;
    public GameObject MaleBone;
    public GameObject FemaleBone;
    public float currentSize;
    public float origintSize;
    Vector3 BoneSize;

    public void OnClik()
    {
        if (MalePreview.activeSelf == true)
        {
            origintSize = 28.2f;
            currentSize = MaleBone.transform.localScale.y;
            inputSize.text = (currentSize * origintSize).ToString();
        }
        else if (FemalePreview.activeSelf == true)
        {
            origintSize = 22.4f;
            currentSize = FemaleBone.transform.localScale.y;
            inputSize.text = (currentSize * origintSize).ToString();
        }
    }

    public void OnValueChangedEvent(string str)
    {
        if (MalePreview.activeSelf == true)
        {
            BoneSize = MaleBone.transform.localScale;
            currentSize = float.Parse(inputSize.text);

            BoneSize.y = currentSize / origintSize;
            MaleBone.transform.localScale = BoneSize;
        }
        else if (FemalePreview.activeSelf == true)
        {
            BoneSize = FemaleBone.transform.localScale;
            currentSize = float.Parse(inputSize.text);

            BoneSize.y = currentSize / origintSize;
            FemaleBone.transform.localScale = BoneSize;
        }
    }
}
