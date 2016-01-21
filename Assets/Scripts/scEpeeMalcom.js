#pragma strict

/**
* Script de gestion de l'épée de  Malcom.
* @author David Lachambre
@author Cristian Manrique
* @date 2016-01-20
*/


/*
* Héros (Clara ou Malcom).
* @access private
* @var GameObject
*/
private var heros:GameObject;

/*
* Héros (Clara ou Malcom).
* @access private
* @var GameObject
*/
private var canvas:GameObject;


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
private var scriptscOgre:scOgre;

/*
* Contient le script barre de vies de Ennemi
* @access private
* @var scBarreEnnemi.js
*/

private var gestionscBarreEnnemi:scBarreEnnemi;



function Start (){

	heros = GameObject.FindWithTag("heros");
    canvas = GameObject.FindWithTag("canvas");

    gestionscBarreEnnemi= canvas.GetComponent.<scBarreEnnemi>();

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
		        scriptscOgre = other.gameObject.GetComponent(scOgre);//Aller chercher le script de l'ogre
		        scriptscOgre.updateDommages(dommagesInfliges);//chercher la function updateDommages
                gestionscBarreEnnemi.DiminuerBarreViesEnnemi();// diminue la bare de vie

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

