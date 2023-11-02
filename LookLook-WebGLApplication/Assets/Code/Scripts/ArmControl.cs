using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.UI;
using TMPro;

public class ArmControl : MonoBehaviour
{
    public TMP_InputField inputSize;
    public GameObject MalePreview;
    public GameObject FemalePreview;
    public GameObject MaleLeftBone;
    public GameObject MaleRightBone;
    public GameObject FemaleLeftBone;
    public GameObject FemaleRightBone;
    public float currentSize;
    public float origintSize;
    Vector3 LeftBoneSize;
    Vector3 RightBoneSize;

    public void OnClik()
    {
        if (MalePreview.activeSelf == true)
        {
            origintSize = 54f;
            currentSize = MaleLeftBone.transform.localScale.y;
            inputSize.text = (currentSize * origintSize).ToString();
        }
        else if (FemalePreview.activeSelf == true)
        {
            origintSize = 51f;
            currentSize = FemaleLeftBone.transform.localScale.y;
            inputSize.text = (currentSize * origintSize).ToString();
        }
    }


    public void OnValueChangedEvent(string str)
    {
        if (MalePreview.activeSelf == true)
        {
            LeftBoneSize = MaleLeftBone.transform.localScale;
            RightBoneSize = MaleRightBone.transform.localScale;
            currentSize = float.Parse(inputSize.text);

            LeftBoneSize.y = currentSize / origintSize;
            MaleLeftBone.transform.localScale = LeftBoneSize;
            RightBoneSize.y = currentSize / origintSize;
            MaleRightBone.transform.localScale = RightBoneSize;
        }
        else if (FemalePreview.activeSelf == true)
        {
            LeftBoneSize = FemaleLeftBone.transform.localScale;
            RightBoneSize = FemaleRightBone.transform.localScale;
            currentSize = float.Parse(inputSize.text);

            LeftBoneSize.y = currentSize / origintSize;
            FemaleLeftBone.transform.localScale = LeftBoneSize;
            RightBoneSize.y = currentSize / origintSize;
            FemaleRightBone.transform.localScale = RightBoneSize;
        }
    }
}
