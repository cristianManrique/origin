#pragma strict

/**
* Script de gestion de la massue de l'ogre.
* @author David Lachambre
* @date 16-01-2015
*/

/*
* Quantité de dommage infligée par cette arme.
* @access private
* @var int
*/
private var dommagesInfliges:int = 1;

/*
* Contient le script qui gère le heros
* @access private
* @var scHeros
*/
private var scriptHeros:scHeros;

//Infliges des dommages au héros quand la massue le touche.
function OnTriggerEnter(autreObjet:Collider) {
    if (autreObjet.tag == "heros") {
        Debug.Log(autreObjet.gameObject);
        scriptHeros = autreObjet.gameObject.GetComponent(scHeros);
        scriptHeros.updateDommages(dommagesInfliges);
    }
}