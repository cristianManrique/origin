#pragma strict 

import UnityEngine.SceneManagement;
import UnityEngine.EventSystems;

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
* Texte de l'inscription de sauvegarde (nom niveau)
* @access public
* @var Text
*/
public var texteSauvegarde1:Text;

/**
* Texte de l'inscription de sauvegarde (date)
* @access public
* @var Text
*/
public var texteSauvegarde2:Text;

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

    if (PlayerPrefs.HasKey("niveau")) {
        
        var affichageNiveau:String = "";
        switch (PlayerPrefs.GetString("niveau")) {
            case "niveau1":
                affichageNiveau = "Niveau 1";
                break;
            case "niveau2":
                affichageNiveau = "Niveau 2";
                break;
            case "boss1":
                affichageNiveau = "Boss niveau 1";
                break;
            case "boss2":
                affichageNiveau = "Boss niveau 2";
                break;
        }
        texteSauvegarde1.text = affichageNiveau;
        texteSauvegarde2.text = PlayerPrefs.GetString("dateSauvegarde").ToLower();
    }
    else {
        texteSauvegarde1.text = "Aucune sauvegarde";
        texteSauvegarde2.text = "";
    }
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
    
    PlayerPrefs.SetString("DebuterPartie", "tutoriel");
    SceneManager.LoadScene("choixPerso");
}

//Méthode qui charge la scène de sélection du personnage.
function demarrerJeu() {
    
    PlayerPrefs.SetString("DebuterPartie", "niveau1");
    SceneManager.LoadScene("choixPerso");
}

//Méthode qui affiche le panneau des crédits et au besoin cache les autres panneaux ouverts.
function afficherCredits() {
    
    EventSystem.current.SetSelectedGameObject(null, null);
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
    
    EventSystem.current.SetSelectedGameObject(null, null);
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
    
    EventSystem.current.SetSelectedGameObject(null, null);
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

//Méthode qui charge une partie sauvegardée.
function chargerSauvegarde() {

    EventSystem.current.SetSelectedGameObject(null, null);
    if (PlayerPrefs.HasKey("niveau")) {
        
        PlayerPrefs.SetInt("partieSauvegardee", 1);
        
        SceneManager.LoadScene(PlayerPrefs.GetString("niveau"));
        
        var gui: GameObject = Instantiate (Resources.Load ("UI/GUI-JEU")) as GameObject;
        var cgGUI:CanvasGroup = gui.GetComponent(CanvasGroup);
        cgGUI.alpha = 0;
        var heros: GameObject = Instantiate (Resources.Load ("Prefabs/Personnages/" + PlayerPrefs.GetString("heros"))) as GameObject;
        var scriptGestionJeu:scGestionJeu = heros.GetComponent.<scGestionJeu>();
        var scriptHeros:scHeros = heros.GetComponent.<scHeros>();

        heros.transform.name = PlayerPrefs.GetString("heros");
        
        PlayerPrefs.SetString("nomHeros", PlayerPrefs.GetString("heros"));
        
        if (PlayerPrefs.HasKey("positionX")) {
            heros.transform.position.x = PlayerPrefs.GetFloat("positionX");
        }
        if (PlayerPrefs.HasKey("positionY")) {
            heros.transform.position.y = PlayerPrefs.GetFloat("positionY");
        }
        if (PlayerPrefs.HasKey("positionZ")) {
            heros.transform.position.z = PlayerPrefs.GetFloat("positionZ");
        }
        if (PlayerPrefs.HasKey("rotationX")) {
            heros.transform.rotation.x = PlayerPrefs.GetFloat("rotationX");
        }
        if (PlayerPrefs.HasKey("rotationY")) {
            heros.transform.rotation.y = PlayerPrefs.GetFloat("rotationY");
        }
        if (PlayerPrefs.HasKey("rotationZ")) {
            heros.transform.rotation.z = PlayerPrefs.GetFloat("rotationZ");
        }
        if (PlayerPrefs.HasKey("nbPotionsSort")) {
            scriptHeros.setNbPotionsSort(PlayerPrefs.GetInt("nbPotionsSort"));
        }
        if (PlayerPrefs.HasKey("nbPotionsReveil")) {
            scriptGestionJeu.setNbPotionsReveille(PlayerPrefs.GetInt("nbPotionsReveil"));
        }
        if (PlayerPrefs.HasKey("sante")) {
            scriptHeros.setSante(PlayerPrefs.GetFloat("sante"));
        }
        if (PlayerPrefs.HasKey("vies")) {
            scriptHeros.setVies(PlayerPrefs.GetInt("vies"));
        }
        if (PlayerPrefs.HasKey("santeBoss")) {
            scriptGestionJeu.setSanteBossSauvegarde(true);
        }
    }
}