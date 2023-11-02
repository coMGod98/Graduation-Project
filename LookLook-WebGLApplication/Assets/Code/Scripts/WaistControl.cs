using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class WaistControl : MonoBehaviour
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
            origintSize = 105f;
            currentSize = MaleBone.transform.localScale.x;
            inputSize.text = (currentSize * origintSize).ToString();
        }
        else if (FemalePreview.activeSelf == true)
        {
            origintSize = 87f;
            currentSize = FemaleBone.transform.localScale.x;
            inputSize.text = (currentSize * origintSize).ToString();
        }
    }

    public void OnValueChangedEvent(string str)
    {
        if (MalePreview.activeSelf == true)
        {
            BoneSize = MaleBone.transform.localScale;
            currentSize = float.Parse(inputSize.text);

            BoneSize.x = currentSize / origintSize;
            MaleBone.transform.localScale = BoneSize;
        }
        else if (FemalePreview.activeSelf == true)
        {
            BoneSize = FemaleBone.transform.localScale;
            currentSize = float.Parse(inputSize.text);

            BoneSize.x = currentSize / origintSize;
            FemaleBone.transform.localScale = BoneSize;
        }
    }
}
