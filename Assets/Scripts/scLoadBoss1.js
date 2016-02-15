#pragma strict

function Start () {

}

function Update () {

}


//:::::::::::::: OnTriggerEnter :::::::::::::://
function OnTriggerEnter(other: Collider) {
//    Debug.Log(other.gameObject.tag);
    if(other.gameObject.tag=="heros")
    {
    	SceneManager.LoadScene("boss1");
    }
 }