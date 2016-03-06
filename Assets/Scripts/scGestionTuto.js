#pragma strict

/**
* Script de gestion des comportements spécifiques au tutoriel.
* @author David Lachambre
* @update 04-03-2016
*/

/*
* Position de départ du héros dans le tutoriel
* @access private
* @var Vector3
*/
private var positionDepartHeros:Vector3 = new Vector3(-1.43,1.07,20.85);


function Awake () {
    
    if (PlayerPrefs.GetInt("partieSauvegardee") == 0) {//Si il s'agit d'une nouvelle partie
        
        var heros: GameObject = Instantiate (Resources.Load ("Prefabs/Personnages/" + PlayerPrefs.GetString("nomHeros"))) as GameObject;
        var gui: GameObject = Instantiate (Resources.Load ("UI/GUI-JEU")) as GameObject;
        var scriptDetectionTuto:scDetectionTuto = heros.GetComponent.<scDetectionTuto>();
        
        heros.transform.name = PlayerPrefs.GetString("nomHeros");
        heros.transform.position = positionDepartHeros;//Replace le héros en position de départ au chargement du niveau.
        scriptDetectionTuto.canvasTuto = GameObject.FindWithTag("canvasTuto");
        scriptDetectionTuto.enabled = true;
    }
}