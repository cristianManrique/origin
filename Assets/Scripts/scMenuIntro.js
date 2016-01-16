#pragma strict 

import UnityEngine.SceneManagement;

/**
* Script de gestion des éléments du menu
* @author David Lachambre
* @date 31-12-2015
*/

/**
* panneau UI des crédits du jeu
* @access public
* @var GameObject
*/
public var panneauCredits:GameObject;

/**
* panneau UI des sauvegardes du jeu
* @access public
* @var GameObject
*/
public var panneauSauvegardes:GameObject;

/**
* panneau UI des options du jeu
* @access public
* @var GameObject
*/
public var panneauOptions:GameObject;

/**
* vitesse du fade in/out
* @access private
* @var float
*/
private var vitesseFade:float = 1;

/**
* coresspond au alpha minimum
* @access private
* @var float
*/
private var transparent:float = 0 ;

/**
* coresspond au alpha maximum
* @access private
* @var float
*/
private var opaque:float = 1;

/**
* Détermine si le panneau des crédits doit être fadé
* @access private
* @var boolean
*/
private var panneauCreditsFade:boolean = false;

/**
* Détermine si le panneau des options doit être fadé
* @access private
* @var boolean
*/
private var panneauOptionsFade:boolean = false;

/**
* Détermine si le panneau des sauvegardes doit être fadé
* @access private
* @var boolean
*/
private var panneauSauvegardesFade:boolean = false;

/**
* Détermine si le panneau des crédits doit être fadé IN
* @access private
* @var boolean
*/
private var panneauCreditsFadeIn:boolean = false;

/**
* Détermine si le panneau des options doit être fadé IN
* @access private
* @var boolean
*/
private var panneauOptionsFadeIn:boolean = false;

/**
* Détermine si le panneau des sauvegardes doit être fadé IN
* @access private
* @var boolean
*/
private var panneauSauvegardesFadeIn:boolean = false;

/**
* Composante CanvasGroup du panneau des crédits
* @access private
* @var CanvasGroup
*/
private var canvasGroupCredits:CanvasGroup;

/**
* Composante CanvasGroup du panneau des options
* @access private
* @var CanvasGroup
*/
private var canvasGroupOptions:CanvasGroup;

/**
* Composante CanvasGroup du panneau des sauvegardes
* @access private
* @var CanvasGroup
*/
private var canvasGroupSauvegardes:CanvasGroup;


function Start() {

    //Initialisation du CanvasGroup de chaque panneau
    canvasGroupCredits = panneauCredits.GetComponent(CanvasGroup);
    canvasGroupOptions = panneauOptions.GetComponent(CanvasGroup);
    canvasGroupSauvegardes = panneauSauvegardes.GetComponent(CanvasGroup);
    
    //Initialisation du alpha de chaque panneau à transparent
    canvasGroupCredits.alpha = transparent;
    canvasGroupOptions.alpha = transparent;
    canvasGroupSauvegardes.alpha = transparent;
    
    //Désactivation de tous les panneaux
    panneauCredits.SetActive(false);
    panneauSauvegardes.SetActive(false);
    panneauOptions.SetActive(false);
}

function Update() {
    if (panneauCreditsFade) {//Si le panneau crédits doit fader...
        if (panneauCreditsFadeIn) {//Si FADE IN...
            if (canvasGroupCredits.alpha < opaque) {//Si l'alpha n'est pas complètement opaque...
                canvasGroupCredits.alpha += vitesseFade * Time.deltaTime;//Diminution progressive de la valeur de l'alpha.
            }
            else {
                canvasGroupCredits.alpha = opaque;//Alpha opaque.
            }
        }
        else {//Si FADE OUT...
            if (canvasGroupCredits.alpha > transparent) {//Si l'alpha n'est pas complètement opaque...
                canvasGroupCredits.alpha -= vitesseFade * Time.deltaTime;//Augmentation progressive de la valeur de l'alpha.
            }
            else {
                canvasGroupCredits.alpha = transparent;//Alpha transparent.
                panneauCredits.SetActive(false);//Désactivation du panneau.
                panneauCreditsFade = false;//Le panneau crédits ne doit pas fader.
            }
        }
    }
    
    if (panneauOptionsFade) {//Si le panneau options doit fader...
        if (panneauOptionsFadeIn) {//Si FADE IN...
            if (canvasGroupOptions.alpha < opaque) {//Si l'alpha n'est pas complètement opaque...
                canvasGroupOptions.alpha += vitesseFade * Time.deltaTime;//Diminution progressive de la valeur de l'alpha.
            }
            else {
                canvasGroupOptions.alpha = opaque;//Alpha opaque.
            }
        }
        else {//Si FADE OUT...
            if (canvasGroupOptions.alpha > transparent) {//Si l'alpha n'est pas complètement opaque...
                canvasGroupOptions.alpha -= vitesseFade * Time.deltaTime;
            }
            else {
                canvasGroupOptions.alpha = transparent;//Alpha transparent.
                panneauOptions.SetActive(false);//Désactivation du panneau.
                panneauOptionsFade = false;//Le panneau crédits ne doit pas fader.
            }
        }
    }
    
    if (panneauSauvegardesFade) {//Si le panneau sauvegardes doit fader...
        if (panneauSauvegardesFadeIn) {//Si FADE IN...
            if (canvasGroupSauvegardes.alpha < opaque) {//Si l'alpha n'est pas complètement opaque...
                canvasGroupSauvegardes.alpha += vitesseFade * Time.deltaTime;//Diminution progressive de la valeur de l'alpha.
            }
            else {
                canvasGroupSauvegardes.alpha = opaque;//Alpha opaque.
            }
        }
        else {//Si FADE OUT...
            if (canvasGroupSauvegardes.alpha > transparent) {//Si l'alpha n'est pas complètement opaque...
                canvasGroupSauvegardes.alpha -= vitesseFade * Time.deltaTime;
            }
            else {
                canvasGroupSauvegardes.alpha = transparent;//Alpha transparent.
                panneauSauvegardes.SetActive(false);//Désactivation du panneau.
                panneauSauvegardesFade = false;//Le panneau crédits ne doit pas fader.
            }
        }
    }
}

//Méthode qui charge la scène de tutoriel.
function demarrerTuto() {
    SceneManager.LoadScene("tutoriel");
}

//Méthode qui charge la scène de sélection du personnage.
function demarrerJeu() {
    SceneManager.LoadScene("choixPerso");
}

//Méthode qui affiche le panneau des crédits et au besoin cache les autres panneaux ouverts.
function afficherCredits() {
    if (panneauOptions.activeSelf || panneauSauvegardes.activeSelf) {//Si un autre panneau est déjà visible...
        panneauOptionsFadeIn = false;
        panneauSauvegardesFadeIn = false;
    }
    
    if (panneauCreditsFadeIn) {
        panneauCreditsFadeIn = false;
    }
    else {
        panneauCredits.SetActive(true);
        panneauCreditsFadeIn = true;
    }
    panneauCreditsFade = true;//Pour fader le panneau dans la méthode Update().
}

//Méthode qui affiche le panneau des options et au besoin cache les autres panneaux ouverts.
function afficherOptions() {
    if (panneauCredits.activeSelf || panneauSauvegardes.activeSelf) {//Si un autre panneau est déjà visible...
        panneauCreditsFadeIn = false;
        panneauSauvegardesFadeIn = false;
    }
    if (panneauOptionsFadeIn) {
        panneauOptionsFadeIn = false;
    }
    else {
        panneauOptions.SetActive(true);
        panneauOptionsFadeIn = true;
    }
    panneauOptionsFade = true;//Pour fader le panneau dans la méthode Update().
}

//Méthode qui affiche le panneau des sauvegardes et au besoin cache les autres panneaux ouverts.
function afficherSauvegardes() {
    if (panneauCredits.activeSelf || panneauOptions.activeSelf) {//Si un autre panneau est déjà visible...
        panneauCreditsFadeIn = false;
        panneauOptionsFadeIn = false;
    }
    if (panneauSauvegardesFadeIn) {
        panneauSauvegardesFadeIn = false;
    }
    else {
        panneauSauvegardes.SetActive(true);
        panneauSauvegardesFadeIn = true;
    }
    panneauSauvegardesFade = true;//Pour fader le panneau dans la méthode Update().
}