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
private var cibleCam:Transform;

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
* Décalage entre le y du héros et celui de la caméra.
* @access private
* @var int
*/
private var decalageCibleCamY:int = 10;//Détermine l'angle de la caméra

/*
* Décalage entre le x du héros et celui de la caméra.
* @access private
* @var int
*/
private var decalageCibleCamX:int = 30;//Détermine l'angle de la caméra

/*
* Décalage entre le z du héros et celui de la caméra.
* @access private
* @var int
*/
private var decalageCibleCamZ:int = 10;//Détermine l'angle de la caméra


function Start () {
    cibleCam = GameObject.FindWithTag("cibleCam").transform;
}

function Update () {
    
    //CODE SOURCE : http://answers.unity3d.com/questions/544691/2d-orthographic-camera-follow.html
    //Code de caméra suiveuse 2.5D + code de zoom modifié.
    //-------------------------------------------------
    
    //Positionnement dans l'espace de la caméra.
    var position = cibleCam.position;
    position.y = cibleCam.transform.position.y + decalageCibleCamY;
    position.x = cibleCam.transform.position.x + decalageCibleCamX;
    position.z = cibleCam.transform.position.z - decalageCibleCamZ;

    //Code de suivi en fonction des déplacements du héros.
    this.transform.position = Vector3.Lerp(this.transform.position, position, vitesseDeplacement * Time.deltaTime);
    this.transform.LookAt(cibleCam);
    
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