#pragma strict

/**
* Script de gestion des boules de feu de Clara
* @author Cristian Manrique
* @author David Lachambre
* @date 16-01-2016
*/


/*
* Quantité de dommage infligée par cette arme.
* @access private
* @var int
*/
private var dommagesInfliges:float = 1;

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
* composant de la source d'audio
* @access private
* @var AudioSource
*/
private var sourceSon:AudioSource;

/*
* Contient le son ou la boule fait une collision
* @access public
* @var AudioClip
*/
public var sonEcrasserBoule: AudioClip;

function Start(){

	sourceSon = GetComponent.<AudioSource>();
}

//Infliges des dommages aux Ennemis
function OnTriggerEnter(other:Collider) {

	sourceSon.PlayOneShot(sonEcrasserBoule);
    //:::::::::::::: Gérer le jeu
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "ogre":
//                Debug.Log(other.gameObject.tag);
		        scriptOgre = other.gameObject.GetComponent(scOgre);//Aller chercher le script de l'ogre
		        scriptOgre.updateDommages(dommagesInfliges);//chercher la function updateDommages 
		        yield WaitForSeconds(sourceSon.clip.length);
                Destroy(this.gameObject);
                break;

            case "diable":
//                Debug.Log(other.gameObject.tag);
		        scriptDiable = other.gameObject.GetComponent(scDiable);//Aller chercher le script du diable
		        scriptDiable.updateDommages(dommagesInfliges);//chercher la function updateDommages
		        yield WaitForSeconds(sourceSon.clip.length);  
                Destroy(this.gameObject);
            	break;

            case "lutin":
//            	Debug.Log(other.gameObject.tag);
		        scriptLutin = other.gameObject.GetComponent(scLutin);//Aller chercher le script du Lutin
		        scriptLutin.updateDommages(dommagesInfliges);//chercher la function updateDommages 
		        yield WaitForSeconds(sourceSon.clip.length); 
                Destroy(this.gameObject);
            	break;

            case "boss1":
//                Debug.Log(other.gameObject.tag);
		        scriptBoss1 = other.gameObject.GetComponent(scBoss1);//Aller chercher le script du Boss 1
		        scriptBoss1.updateDommages(dommagesInfliges);//chercher la function updateDommages
		         yield WaitForSeconds(sourceSon.clip.length); 
                Destroy(this.gameObject);
            	break;

            case "boss2":
//                Debug.Log(other.gameObject.tag);
		        scriptBoss2 = other.gameObject.GetComponent(scBoss2);//Aller chercher le script du Boss 2
		        scriptBoss2.updateDommages(dommagesInfliges);//chercher la function updateDommages
		        yield WaitForSeconds(sourceSon.clip.length); 
                Destroy(this.gameObject);
            	break;
        }
    }
}

