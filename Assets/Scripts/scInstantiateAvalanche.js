#pragma strict


/**
*Script qu'instantie des grosses boules de neige comme obstacles
*@author Cristina Mahneke
*@date 26/02/2016
**/

/**
*distance entre le heros et l'origine du l'avalanche
*@var float
*@access public
**/
 private var proximite: float;

/**
*distance relative au heros ou un boule de neige est cree
*@var float
*@access private
**/
private var distance: float = 40.0;

/**
*le joueuer
*@var GameObject
*@access public
**/
 private var heros: GameObject;

 /**
*prefab du boule de neige
*@var GameObject
*@access public
**/
public var bouleNeige: GameObject;

/**
*variable qui evite que on onstanti des boules a chaque frame
*@var boolean
*@access private
**/
 private var peutInstantier: boolean;

function Start () {

	heros = GameObject.FindWithTag("heros");

	peutInstantier = true;
}

function Update () {

//calculer la proximite
    if (heros) {//Si le heros existe...
        proximite = Vector3.Distance (this.transform.position, heros.transform.position);

        //si le heros s'approche a l'origine de l'avalanche 
        if (proximite <= distance && peutInstantier == true){
        	
           Instantiate(bouleNeige, transform.position, transform.rotation);

           peutInstantier = false;
           gererInstante();
        }

    }

}

function gererInstante(){

	yield WaitForSeconds(12);

	peutInstantier = true;
}