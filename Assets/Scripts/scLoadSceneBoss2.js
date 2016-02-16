#pragma strict

function Start () {

}

function OnTriggerEnter(other:Collider){
		if(other.gameObject.tag == "heros"){
			Debug.Log(other.gameObject.tag == "heros");
			SceneManager.LoadScene("Boss2");
		}


	}