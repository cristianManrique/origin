#pragma strict
/**
* Script pour demarrer le fin de niveau/scene boss2 
* @author Cristina Mahneke
* @date 15/02/2016
**/

/*
* Le héros
* @access private
* @var GameObject
*/
private var heros: GameObject;


function Start () {
    heros = GameObject.FindWithTag("heros");
    var camActuelle:Camera = GameObject.FindWithTag("camPrincipale").GetComponent.<Camera>();//Doit aller chercher la cam à chaque activation car elle n'est pas la même d'un niveau à l'autre.
    var scriptLookAtMouse:scLookAtMouse = heros.GetComponent.<scLookAtMouse>();
    scriptLookAtMouse.setCam(camActuelle);//Actualisation de la caméra dans le script LookAtMouse
}

function OnTriggerEnter(other:Collider){
		if(other.gameObject.tag == "heros"){
//			Debug.Log(other.gameObject.tag == "heros");
			SceneManager.LoadScene("Boss2");
		}


	}