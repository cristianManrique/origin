#pragma strict

/**
*Script que gere l'apparition et disapparition du fantome
*@author Cristina Mahneke
*@source answers.unity3d.com/questions/702398/player-proximity-detection.html
*@date 20/01/2016
**/

/**
*distance relative au heros ou le fantome apparaitra
*@var float
*@access public
**/
 public var distance: float;

/**
*distance entre le heros et le fantome
*@var float
*@access public
**/
 public var proximite: float;

/**
*le joueuer
*@var GameObject
*@access public
**/
 public var heros: GameObject;

/**
*GameObject Fantome
*@var GameObject
*@access public
**/
 public var fantome: GameObject;

function Start () {
	heros = GameObject.FindWithTag("heros");
	fantome = GameObject.FindWithTag("fantome");
	distance = 5;
	fantome.SetActive(false);
}

function Update () {

	//calculer la proximite
	proximite = Vector3.Distance (this.transform.position, heros.transform.position);

	//si le heros s'approche au fantome, le fantome apparaitra
	if (proximite <= distance){

		fantome.SetActive(true);

		destruirFantome();
	
	}

}
function destruirFantome(){
		//le heros aura juste quelques secondes pour voir le fantome, apres il disparraitra pour toujours
		yield WaitForSeconds (5);

		Destroy(fantome);
		Destroy(this);
}