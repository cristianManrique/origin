#pragma strict

/**
* Script pour redemarrer la position du heros lorsque le niveau commence
* @author Cristina Mahneke
* @date 15/02/2016
**/

/*
* Position de départ du héros dans le niveau 2
* @access private
* @var Vector3
*/
private var positionDepartHeros:Vector3 = new Vector3(-555, 21.35, 1);

/*
* Le héros
* @access private
* @var GameObject
*/
private var heros: GameObject;

function Start () {
	heros = GameObject.FindWithTag("heros");
    var scriptGestionJeu:scGestionJeu = GameObject.FindWithTag("heros").GetComponent.<scGestionJeu>();
    if (!scriptGestionJeu.getPartieEnChargement()) {//Si une partie sauvegardée n'est pas en chargement...
        heros.transform.position = positionDepartHeros;//Replace le héros en position de départ au chargement du niveau puisque le héros n'est pas détruit entre les chargements des différents niveaux.
    }
}

