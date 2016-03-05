#pragma strict

/**
* Script pour redemarrer la position du heros lorsque le niveau commence
* @author Cristina Mahneke
* @date 15/02/2016
**/

/*
* Position de départ du héros dans le niveau 2
* @access private
* @var Vector3
*/
private var positionDepartHeros:Vector3 = new Vector3(-514.4, 21.91, 0.38);

/*
* Le héros
* @access private
* @var GameObject
*/
private var heros: GameObject;

function Start () {
    
    if (PlayerPrefs.GetInt("partieSauvegardee") == 0) {
        heros = GameObject.FindWithTag("heros");
        heros.transform.position = positionDepartHeros;//Replace le héros en position de départ au chargement du niveau.
    }
}

