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
private var positionDepartHeros:Vector3 = new Vector3(1,2.4,-108);
//private var positionDepartHeros:Vector3 = new Vector3(1,2.4,-6.7);//Pour débuter près du boss. Pour fins de test.

/*
* Contient le heros
* @access private
* @var GameObject
*/
private var heros:GameObject;

function Start () {
    heros = GameObject.FindWithTag("heros");//Va chercher le heros
    heros.transform.position = positionDepartHeros;//Replace le héros en position de départ au chargement du niveau puisque le héros n'est pas détruit entre les chargements des différents niveaux.
    var camActuelle:Camera = GameObject.FindWithTag("camPrincipale").GetComponent.<Camera>();//Doit aller chercher la cam à chaque activation car elle n'est pas la même d'un niveau à l'autre.
    var scriptLookAtMouse:scLookAtMouse = heros.GetComponent.<scLookAtMouse>();
    scriptLookAtMouse.setCam(camActuelle);//Actualisation de la caméra dans le script LookAtMouse
}