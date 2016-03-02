#pragma strict
/**
*Script que inflige des dommages au heros quand il touche le stalag
*@author Cristina Mahneke
*@date 26/02/2016
**/

 /**
*script de gestion du heros
*@var script
*@access private
**/
private var scriptHeros: scHeros;

/**
*Le dommage inflige au heros
*@var int
*@access private
**/
private var dommages: int = 5;

function Start () {


}


 function OnTriggerEnter(collisionObjet: Collider) {
	//Debug.Log(collisionObjet.gameObject);

    if (collisionObjet.gameObject.tag == "heros") {
    //Debug.Log("touche");
        scriptHeros = collisionObjet.gameObject.GetComponent(scHeros);
        scriptHeros.updateDommages(dommages);
    }


 }