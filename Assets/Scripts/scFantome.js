#pragma strict

/**
*Script que gere l'apparition et disapparition du fantome
*@author Cristina Mahneke
*@author David Lachambre
*@source answers.unity3d.com/questions/702398/player-proximity-detection.html
*@date 20/01/2016
**/

/**
*distance relative au heros ou le fantome apparaitra
*@var float
*@access public
**/
 public var distance: float = 5.0;

/**
*fantome
*@var GameObject
*@access public
**/
 public var fantome: GameObject;

/**
*distance entre le heros et le fantome
*@var float
*@access public
**/
 private var proximite: float;

/**
*le joueuer
*@var GameObject
*@access public
**/
 private var heros: GameObject;

/**
*le joueuer
*@var GameObject
*@access public
**/
 private var vitesseRotation: float = 1.5;


function Awake() {
    fantome.SetActive(false);
}

function Start () {
	heros = GameObject.FindWithTag("heros");
}

function Update () {

    var positionHeros : Vector3 = heros.transform.position - this.transform.position;
    positionHeros.y = 0;
    var nouvelleRotation = Quaternion.LookRotation(positionHeros);
    this.transform.rotation = Quaternion.Slerp(this.transform.rotation, nouvelleRotation, vitesseRotation * Time.deltaTime);
    
	//calculer la proximite
    if (heros) {//Si le heros existe...
        proximite = Vector3.Distance (this.transform.position, heros.transform.position);

        //si le heros s'approche au fantome, le fantome apparaitra
        if (proximite <= distance){

            fantome.SetActive(true);

            detruireFantome();
        }
    }
}
function detruireFantome(){
		//le heros aura juste quelques secondes pour voir le fantome, apres il disparraitra pour toujours
		yield WaitForSeconds (5);
		Destroy(this.gameObject);
}