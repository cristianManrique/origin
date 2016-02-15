#pragma strict

/**
* Script qui gere le mouvement des plateformes au dessus de la lave.
* @author David Lachambre
* @date 14-02-2016
*/

/*
* Limite vers le bas de la plateforme
* @access private
* @var float
*/
private var limiteMin:float = -3.0;

/*
* Limite vers le haut de la plateforme
* @access private
* @var float
*/
private var limiteMax:float = 3.0;

/*
* Determine si la plateforme1 doit aller vers le haut
* @access private
* @var boolean
*/
private var directionHaut:boolean = true;

/*
* Vitesse des plateformes
* @access private
* @var int
*/
private var vitesse:int = 2;

/*
* Heros
* @access private
* @var GameObject
*/
private var heros:GameObject;

/*
* Controleur Heros
* @access private
* @var Controler
*/
private var controleurHeros:CharacterController;

/*
* Determine si le heros est sur la plateforme
* @access private
* @var boolean
*/
private var herosSurPlateforme:boolean = false;


function Start () {
    
    heros = GameObject.FindWithTag("heros");
    controleurHeros = heros.GetComponent(CharacterController);
    this.transform.position.y = Random.Range(limiteMin, limiteMax);//Positionnement en hauteur d'une valeur aléatoire entre les limites min et max du déplacement
}

function Update () {
    
    if (this.transform.position.y < limiteMin || this.transform.position.y > limiteMax) {
        changerDirection();//Si la limite haut ou bas est atteinte, la plateforme change de direction.
    }
    if (directionHaut) {
        this.transform.Translate(Vector3.up * Time.deltaTime * vitesse, Space.World);//Monte
        if (herosSurPlateforme) {
            heros.transform.Translate(Vector3.up * Time.deltaTime * vitesse, Space.World);//Fait monter le heros s'il est sur la plateforme (pour rendre le mouvement plus fluide).
        }
    }
    else {
        this.transform.Translate(Vector3.down * Time.deltaTime * vitesse, Space.World);//Descend
        if (herosSurPlateforme) {
            heros.transform.Translate(Vector3.down * Time.deltaTime * vitesse, Space.World);//Fait descendre le heros s'il est sur la plateforme (pour rendre le mouvement plus fluide).
        }
    }
    herosSurPlateforme = false;
}

function changerDirection() {
    
    if (directionHaut == true) {
        this.transform.position.y = limiteMax;//Reset position
        directionHaut = false;
    }
    else {
        this.transform.position.y = limiteMin;//Reset position
        directionHaut = true;
    }
}

function OnTriggerStay() {
    herosSurPlateforme = true;
//    Debug.Log(herosSurPlateforme);
}