#pragma strict
import UnityEngine.EventSystems;
/**
* Script de gestion du choix de personnage.
* @author David Lachambre
* @update 04-03-2016
*/

/*
* Plateforme contenant les 2 personnages
* @access public
* @var GameObject
*/
public var plateforme:GameObject;

/*
* Détermine la vitesse de rotation de la plateforme
* @access public
* @var float
*/
public var vitesseRotation:float = 0.02;

/*
* Personnage choisi par le joueur
* @access private
* @var String
*/
private var choixPerso:String;

/*
* Prochaine rotation de la plateforme
* @access private
* @var Quaternion
*/
private var nouvelleRotation:Quaternion;

/*
* Détermine si la plateforme doit tourner
* @access private
* @var boolean
*/
private var rotationPlateforme:boolean = false;

/*
* Détermine le sens de la rotation
* @access private
* @var boolean
*/
private var rotationVersClara:boolean = true;


function Start () {
    
    PlayerPrefs.SetString("nouveauHeros", "malcom");
}

function Update() {

    if (plateforme && rotationPlateforme) {
        plateforme.transform.rotation = Quaternion.Slerp (plateforme.transform.rotation, nouvelleRotation, Time.deltaTime * vitesseRotation);
    }
}

//Fait tourner la plateforme pour aller au personnage suivant et enregistre le choix de personnage.
function switchPerso() {
    
    EventSystem.current.SetSelectedGameObject(null, null);//Déselectionne le bouton cliqué.
    if (rotationVersClara) {
        nouvelleRotation = new Quaternion(0,180,0,0);
        rotationVersClara = false;
        PlayerPrefs.SetString("nouveauHeros", "clara");
    }
    else {
        nouvelleRotation = new Quaternion(0,0,0,180);
        rotationVersClara = true;
        PlayerPrefs.SetString("nouveauHeros", "malcom");
    }
    rotationPlateforme = true;
}

//Retourne le joueur au menu principal.
function retourMenu() {
    
    Destroy(this.gameObject);//Ce script est détruit si on revient au menu d'ouverture.
    SceneManager.LoadScene("menu");
}

//Charge le niveau 1.
function jouer() {
    
    PlayerPrefs.SetInt("partieSauvegardee", 0);
    if (PlayerPrefs.GetString("DebuterPartie") == "tutoriel") {
        SceneManager.LoadScene("tutoriel");
    }
    else if (PlayerPrefs.GetString("DebuterPartie") == "niveau1") {
        SceneManager.LoadScene("niveau1");
    }
}