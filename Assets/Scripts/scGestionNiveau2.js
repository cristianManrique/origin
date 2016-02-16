#pragma strict

/**
* Script pour redemarrer la position du heros lorsque le niveau commence
* @author Cristina Mahneke
* @date 15/02/2016
**/

var heros: GameObject;

function Start () {
	heros = GameObject.FindWithTag("heros");
	heros.transform.position=Vector3(-555, 21.35, 1);
}

