using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.EventSystems;

public class RotationCharacter : MonoBehaviour, IDragHandler, IEndDragHandler
{
    public GameObject targetCharacter;
    public float rotationSpeed = 5f;
    Vector3 currentRotation;
    Vector3 originRotation;

    void Start()
    {
        currentRotation = targetCharacter.transform.localEulerAngles;
    }

    public void OnDrag(PointerEventData eventData)
    {
        currentRotation.y += Input.GetAxis("Mouse X") * rotationSpeed;
        targetCharacter.transform.localEulerAngles = -currentRotation;
    }

    public void OnEndDrag(PointerEventData eventData)
    {
        targetCharacter.transform.localEulerAngles = originRotation;
    }
}
