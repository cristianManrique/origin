#pragma strict

/**
* Script de gestion de la fourche du petit diable.
* @author David Lachambre
* @date 21-01-2016
*/

/*
* Quantité de dommage infligée par cette arme.
* @access private
* @var int
*/
private var dommagesInfliges:int = 5;

/*
* Contient le script qui gère le heros
* @access private
* @var scHeros
*/
private var scriptHeros:scHeros;

/*
* composant de la source d'audio
* @access private
* @var AudioSource
*/
private var sourceSon:AudioSource;

/*
* Contient le son se blesser
* @access public
* @var AudioClip
*/
public var sonFrapper: AudioClip;

function Start(){

	sourceSon = GetComponent.<AudioSource>();
}

//Infliges des dommages au héros quand la fourche le touche.
function OnTriggerEnter(autreObjet:Collider) {
    if (autreObjet.tag == "heros") {

    	sourceSon.PlayOneShot(sonFrapper);
//        Debug.Log(autreObjet.gameObject);
        scriptHeros = autreObjet.gameObject.GetComponent(scHeros);
        scriptHeros.updateDommages(dommagesInfliges);
    }
}