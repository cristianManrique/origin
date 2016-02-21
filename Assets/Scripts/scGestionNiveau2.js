#pragma strict

/**
* Script pour redemarrer la position du heros lorsque le niveau commence
* @author Cristina Mahneke
* @date 15/02/2016
**/

/*
* Le héros
* @access private
* @var GameObject
*/
private var heros: GameObject;

function Start () {
	heros = GameObject.FindWithTag("heros");
	heros.transform.position=Vector3(-555, 21.35, 1);
    var camActuelle:Camera = GameObject.FindWithTag("camPrincipale").GetComponent.<Camera>();//Doit aller chercher la cam à chaque activation car elle n'est pas la même d'un niveau à l'autre.
    var scriptLookAtMouse:scLookAtMouse = heros.GetComponent.<scLookAtMouse>();
    scriptLookAtMouse.setCam(camActuelle);//Actualisation de la caméra dans le script LookAtMouse
}

