#pragma strict
/**
*Script pour translader un objet sur un axe entre deux points, dans ce cas des vagues du ruisseau
*@author Cristina Mahneke
*@source http://answers.unity3d.com/questions/8781/oscillating-variable.html
*@date 01/02/2016
**/



function Start () {


}

function Update () {
	
		transform.position.x = -Mathf.PingPong(Time.time*.2, 1) - 1;

}