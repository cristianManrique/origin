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
*vitesse de rotation
*@var float
*@access private
**/
 private var vitesseRotation: float = 1.5;

 /*
* composant de la source d'audio
* @access private
* @var AudioSource
*/
private var sourceSon:AudioSource;

/*
* Son produit quand le fantome apparaise
* @access public
* @var AudioClip
*/
public var sonApparition: AudioClip;

function Awake() {
    fantome.SetActive(false);
}

function Start () {
	heros = GameObject.FindWithTag("heros");
	sourceSon = GetComponent.<AudioSource>();
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
            sourceSon.PlayOneShot(sonApparition);
            detruireFantome();
        }
    }
}
function detruireFantome(){
		
    //le heros aura juste quelques secondes pour voir le fantome, apres il disparraitra pour toujours
    yield WaitForSeconds (5);
    var explosion: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/explosionFantome")) as GameObject;
    var positionExplosion = this.gameObject.transform.position;
    positionExplosion.y += 3;
    explosion.transform.position = positionExplosion;
    Destroy(this.gameObject);
}