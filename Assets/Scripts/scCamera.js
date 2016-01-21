#pragma strict

/**
* Script de gestion de la caméra du jeu.
* @author David Lachambre
* @date 16-01-2015
*/

/*
* Caméra du jeu.
* @access public
* @var Camera
*/
public var cameraPrincipale:Camera;

/*
* Le Transform du héros.
* @access private
* @var Transform
*/
private var heros:Transform;

/*
* La vitesse de déplacement de la caméra.
* @access private
* @var float
*/
private var vitesseDeplacement:float = 2.0;

/*
* La vitesse du zoom de la caméra.
* @access private
* @var float
*/
private var vitesseZoom:float = 0.2;

/*
* Distance minimum du zoom de la caméra.
* @access private
* @var int
*/
private var zoomMin:int = 4;

/*
* Distance maximum du zoom de la caméra.
* @access private
* @var int
*/
private var zoomMax:int = 8;

/*
* Valeur d'incrémentation du zoom de la caméra.
* @access private
* @var float
*/
private var increment:float;

/*
* Décalage entre le x du héros et celui de la caméra.
* @access private
* @var int
*/
private var decalageHeros:int = 20;//Détermine l'angle de la caméra

function Start () {
    heros = GameObject.FindWithTag("heros").transform;
}
function FixedUpdate () {
    
    //CODE SOURCE : http://answers.unity3d.com/questions/544691/2d-orthographic-camera-follow.html
    //Code de caméra suiveuse 2.5D + code de zoom modifié.
    //-------------------------------------------------
    
    //Positionnement dans l'espace de la caméra.
    var position = heros.position;
    position.y = this.transform.position.y;
    position.x = heros.position.x + decalageHeros;

    //Code de suivi en fonction des déplacements du héros.
    this.transform.LookAt(heros);
    this.transform.position = Vector3.Lerp(this.transform.position, position, vitesseDeplacement * Time.deltaTime);
    
    //Permet le zoom de la caméra avec la roulette de la souris.
    if (Input.GetAxis("Mouse ScrollWheel") > 0) {
        if (cameraPrincipale.orthographicSize < zoomMax) {
            cameraPrincipale.orthographicSize += vitesseZoom;
        }
    }
    if (Input.GetAxis("Mouse ScrollWheel") < 0) {
        if (cameraPrincipale.orthographicSize > zoomMin) {
            cameraPrincipale.orthographicSize -= vitesseZoom;
        }
    }
    //-------------------------------------------------
}