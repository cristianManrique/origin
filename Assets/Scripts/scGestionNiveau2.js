#pragma strict

var heros: GameObject;

function Start () {
	heros = GameObject.FindWithTag("heros");
	heros.transform.position=Vector3(-555, 21.35, 1);
}

