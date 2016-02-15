#pragma strict

/**
* Script de gestion de l'épée de  Malcom. et les boules de feu de Clara
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

/*
* Contient le script qui gère le boss 1
* @access private
* @var scBoss1
*/
private var scriptBoss1:scBoss1;

/*
* Contient le script qui gère le boss 2
* @access private
* @var scBoss2
*/
private var scriptBoss2:scBoss2;

/*
* GameObject contient la canvas
* @access public
* @var GameObject
*/
private var canvas: GameObject;
/*
* GameObject contient le script scBarreEnnemi.js
* @access public
* @var scBarreEnnemi
*/
private var scriptAffichage: scAffichage;


function Start (){

	heros = GameObject.FindWithTag("heros");
    canvas = GameObject.FindWithTag("canvas");
    scriptAffichage=canvas.GetComponent.<scAffichage>();

}


//Infliges des dommages aux Ennemis
function OnTriggerEnter(other:Collider) {
    
    //:::::::::::::: Gérer le jeu
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "ogre":
//                Debug.Log(other.gameObject.tag);
		        scriptOgre = other.gameObject.GetComponent(scOgre);//Aller chercher le script de l'ogre
		        scriptOgre.updateDommages(dommagesInfliges);//chercher la function updateDommages 
                break;

            case "diable":
//                Debug.Log(other.gameObject.tag);
		        scriptDiable = other.gameObject.GetComponent(scDiable);//Aller chercher le script du diable
		        scriptDiable.updateDommages(dommagesInfliges);//chercher la function updateDommages 
            	break;

            case "lutin":
//            	Debug.Log(other.gameObject.tag);
		        scriptLutin = other.gameObject.GetComponent(scLutin);//Aller chercher le script du Lutin
		        scriptLutin.updateDommages(dommagesInfliges);//chercher la function updateDommages 
            	break;

            case "boss1":
//                Debug.Log(other.gameObject.tag);
		        scriptBoss1 = other.gameObject.GetComponent(scBoss1);//Aller chercher le script du Boss 1
		        scriptBoss1.updateDommages(dommagesInfliges);//chercher la function updateDommages
                scriptAffichage.DiminuerBarreViesEnnemi();// diminuer la barre de vie du Boss 1
            	break;

            case "boss2":
//                Debug.Log(other.gameObject.tag);
		        scriptBoss2 = other.gameObject.GetComponent(scBoss2);//Aller chercher le script du Boss 2
		        scriptBoss2.updateDommages(dommagesInfliges);//chercher la function updateDommages 
                scriptAffichage.DiminuerBarreViesEnnemi();// diminuer la barre de vie du Boss 2
            	break;
        }
    }

}

