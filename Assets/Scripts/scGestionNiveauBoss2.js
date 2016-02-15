#pragma strict

/**
* Script de gestion des comportements spécifiques au niveau du boss 2.
* @author David Lachambre
* @update 14-02-2016
*/

/*
* Position de départ du héros dans le niveau du boss 2
* @access private
* @var Vector3
*/
//private var positionDepartHeros:Vector3 = new Vector3(1,2.4,-108);
private var positionDepartHeros:Vector3 = new Vector3(1,2.4,-6.7);

/*
* Contient le heros
* @access private
* @var GameObject
*/
private var heros:GameObject;

/*
* Contient le script
* @access private
* @var scAffichage
*/
private var scriptGestionAffichage:scAffichage;

function Start () {
    heros = GameObject.FindWithTag("heros");//Va chercher le heros
    heros.transform.position = positionDepartHeros;//Replace le héros en position de départ au chargement du niveau puisque le héros n'est pas détruit entre les chargements des différents niveaux.
    scriptGestionAffichage = GameObject.FindWithTag("canvas").GetComponent("scAffichage") as scAffichage;
    scriptGestionAffichage.resetBarreEnnemi();//Rempli la barre de vie de l'ennemi.
}