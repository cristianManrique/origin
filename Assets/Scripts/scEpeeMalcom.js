#pragma strict

/**
* Script de gestion de l'épée de  Malcom.
* @author Cristian Manrique
* @date 16-01-2016
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

/*
* Contient le script qui gère le diable
* @access private
* @var scDiable.js
*/
private var scriptDiable:scDiable;

/*
* Contient le script qui gère le Lutin
* @access private
* @var scLutin.js
*/
private var scriptLutin:scLutin;
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
                Debug.Log(other.gameObject);
		        scriptDiable = other.gameObject.GetComponent(scDiable);//Aller chercher le script du diable
		        scriptDiable.updateDommages(dommagesInfliges);//chercher la function updateDommages 
            	break;

            case "lutin":
            	//Debug.Log(other.gameObject);
		        scriptLutin = other.gameObject.GetComponent(scLutin);//Aller chercher le script du Lutin
		        scriptLutin.updateDommages(dommagesInfliges);//chercher la function updateDommages 
            	break;

            case "boss1":
            	break;

            case "boss2":
            	break;
        }
    }

}

