#pragma strict

/**
* Script de gestion des comportements spécifiques au niveau 1.
* @author David Lachambre
* @update 03-03-2016
*/

/*
* Position de départ du héros dans le niveau 1
* @access private
* @var Vector3
*/
private var positionDepartHeros:Vector3 = new Vector3(-32,0,-14);


function Awake () {
    
    if (PlayerPrefs.GetInt("partieSauvegardee") == 0) {//Si il s'agit d'une nouvelle partie
        
        var heros: GameObject = Instantiate (Resources.Load ("Prefabs/Personnages/" + PlayerPrefs.GetString("nouveauHeros"))) as GameObject;
        var gui: GameObject = Instantiate (Resources.Load ("UI/GUI-JEU")) as GameObject;
        heros.transform.name = PlayerPrefs.GetString("nouveauHeros");
        heros.transform.position = positionDepartHeros;//Replace le héros en position de départ au chargement du niveau.
    }
}