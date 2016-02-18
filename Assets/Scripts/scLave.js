#pragma strict

/**
* Script qui gere la collision du heros avec la lave.
* @author David Lachambre
* @date 14-02-2016
*/

/*
* Quantité de dommage infligée par cette arme.
* @access private
* @var int
*/
private var dommagesInfliges:int = 1;

/*
* Script barre de vies.
* @access private
* @var int
*/
private var scriptHeros:scHeros;

//Infliges des dommages au héros quand la massue le touche.
function OnTriggerEnter(autreObjet:Collider) {
    if (autreObjet.tag == "heros") {
        scriptHeros = autreObjet.gameObject.GetComponent(scHeros);
//        Debug.Log(autreObjet.gameObject);
        autreObjet.gameObject.transform.position = new Vector3(1,2.5,-108);
        scriptHeros.zeroSante();
    }
}