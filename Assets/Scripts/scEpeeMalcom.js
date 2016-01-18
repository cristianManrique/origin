#pragma strict

/**
* Script de gestion de l'épée de  Malcom.
* @author David Lachambre
* @date 16-01-2015
*/


/*
* Héros (Clara ou Malcom).
* @access private
* @var GameObject
*/
private var heros:GameObject;

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
* Contient le script qui gère l'ogre
* @access private
* @var scOgre.js
*/
private var scriptOgre:scOgre;

function Start (){

	heros = GameObject.FindWithTag("heros");

}


//Infliges des dommages aux Ennemis
function OnTriggerEnter(other:Collider) {
    
    //:::::::::::::: Gérer le jeu
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "ogre":
                Debug.Log(other.gameObject);
		        scriptOgre = other.gameObject.GetComponent(scOgre);//Aller chercher le script de l'ogre
		        scriptOgre.updateDommages(dommagesInfliges);//chercher la function updateDommages 
                break;

            case "diable":
            	break;

            case "lutin":
            	break;

            case "boss1":
            	break;

            case "boss2":
            	break;
        }
    }

}

