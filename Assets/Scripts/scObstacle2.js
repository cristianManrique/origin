#pragma strict
/**
* Script qui Reinitialiser la position du héros lorqu'il touche un obstacle
* @author Cristian Manrique
* @date 22-02-2016
*/

/*
* Quantité de dommage infligée 
* @access private
* @var int
*/
private var dommagesInfliges:int = 50;

/*
* Contient le script qui gère le heros
* @access private
* @var scHeros
*/
private var scriptHeros:scHeros;



function Start () {

}

function Update () {

}

//Reinitialiser la position et Infliges des dommages au héros lorsqu'il touche un obstacle
function OnTriggerEnter (autreObjet : Collider) {
		if(autreObjet.gameObject.tag == "heros")
		{
			//:: Devant les tronc en feu
			autreObjet.gameObject.transform.position = new Vector3(-140, 1, 950);
			scriptHeros = autreObjet.gameObject.GetComponent(scHeros);
        	scriptHeros.updateDommages(dommagesInfliges);
		}
	}