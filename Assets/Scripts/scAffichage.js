#pragma strict
import UnityEngine.UI;
// permet d'importer les éléments du UI canvas jeu

/**
* TP Assemblage de Jeu
* Gestion Affichage tous dans le JEU
* Mise à jour Text UI, username UI
* @author Cristian Manrique
* @author David Lachambre
* @author Jonathan Martel
* @date 2016-01-16
* 
*/

//::::::::::::::::::::://
/*
* GameObject canvas contient panneaux d'affichage
* @access public
* @var GameObject
*/
private var canvas: GameObject;

/*
* Héros (Clara ou Malcom).
* @access private
* @var GameObject
*/
private var heros:GameObject;

/*
* Contient le script scHeros.js
* @access private
* @var scHeros.js
*/
private var gestionscHeros: scHeros;

/**
 * Limite la barre de vie
 * @access private
 * @var float
 */
private var Limite:float;

//::::::::::::::::::::://
/*
* Slider Barre de vie
* @access private
* @var int
*/
public var vieSlider:Slider;

/*
* Ce qui reste de la  barre de vies
* ATTENTION: dans inspector le value max du slider doit être idem
* @access private
* @var float
*/
private var restantHeros:float;

//:::::::::::::::::::://
/*
* Objet Text dans le UI
* @access public
* @var Text
*/
public var potionSortText:Text;

//::::::::::::::::::::://
/*
* Slider Barre de vie
* @access private
* @var int
*/
public var EnnemiSlider:Slider;


//::::::::::::::::::::://
/*
* Totalité barre de vies Heros
* ATTENTION: dans inspector le value max du slider doit être idem
* @access private
* @var float
*/
private var maxBarreHeros:float;

//::::::::::::::::::::://
/*
* Totalité barre de vies Heros
* ATTENTION: dans inspector le value max du slider doit être idem
* @access private
* @var float
*/
private var maxBarreBoss:float;

/*
* Ce qui reste de la  barre de vies
* ATTENTION: dans inspector le value max du slider doit être idem
* @access private
* @var float
*/
private var restantEnnemi:float;

//::::::::::::::::::::://
/*
* Contient les images UI des potions
* @access public
* @var GameObject
*/
public var potionSortImage: GameObject;//potionVie

/*
* Contient les images UI des coeurs
* @access public
* @var GameObject
*/
public var coeur01: GameObject;
public var coeur02: GameObject;
public var coeur03: GameObject;

//::::::::::::::::::::://
/*
* Contient les images UI des potions 
* pour diminuer le alpha
* @access private
* @var Image
*/
private var  RenderPotion1:Image;
private var  RenderPotion2:Image;

/*
* Contient le rendu des coeurs 
* @access private
* @var Image
*/
private var  RenderCoeur1:Image;
private var  RenderCoeur2:Image;
private var  RenderCoeur3:Image;

/*
* nombre de vies du heros
* @access private
* @var int
*/
private var nbVies:int;

/*
* Nombre de potions permettant de lancer un sort
* @access private
* @var integer
*/
private var nbPotions:int;//potionSort

//::::::::::::::::::::://
/*
* GameObject contient les panneaux du UI
* @access public
* @var GameObject
*/
public var PanneauBarreVieEnnemi:GameObject;

/*
* GameObject contient le texte de message destiné au joueur
* @access public
* @var Text
*/
public var messageJoueur:Text;

/**
* Variable de controle du fade out
* @access private
* @var boolean
*/
private var fadeMsg: boolean = false;

/**
* Détermine la vitesse de fade du message
* @access private
* @var float
*/
private var vitesseFade: float = 1;

/**
* Temps d'affichage du message en secondes
* @access private
* @var int
*/
private var tempsAffichageMsg: int = 2;

/**
* CanvasGroup du messageJoueur
* @access private
* @var CanvasGroup
*/
private var CanvasGroupMessageJoueur: CanvasGroup;

/**
*Affiche le temps restant pour le vol en secondes
*@var Text
*@access public
**/
public var affichageTempsVol: Text;


function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}

function Start () {
    
    affichageTempsVol.enabled = false;
    
    if (PlayerPrefs.GetInt("partieSauvegardee") == 0) {//S'il s'agit d'une nouvelle partie...

        heros = GameObject.FindWithTag("heros");
        gestionscHeros = heros.GetComponent.<scHeros>();

        maxBarreHeros = gestionscHeros.santeMax;
        restantHeros = maxBarreHeros;//Débuter

        nbVies = gestionscHeros.getNbVies();
        nbPotions = gestionscHeros.getNbPotionsSort();

        vieSlider.maxValue = maxBarreHeros;
        EnnemiSlider.maxValue = maxBarreBoss;
    }
    
    CanvasGroupMessageJoueur = messageJoueur.GetComponent(CanvasGroup);
    CanvasGroupMessageJoueur.alpha = 0;
    
	canvas = this.gameObject;
    
	//:: Chercher le composant Image dans les sprites UI 
    RenderPotion1 = potionSortImage.GetComponent.<Image>();
    RenderCoeur1  = coeur01.GetComponent.<Image>();
    RenderCoeur2  = coeur02.GetComponent.<Image>();
    RenderCoeur3  = coeur03.GetComponent.<Image>();

    //:: Débuter le ALPHA des SPRITES UI
    RenderPotion1.color.a = 0.3 ;
}

function Update () {
//    Debug.Log();
    //Si l'avertissement est affiché a l'écran...
    if (messageJoueur.enabled) {
        //Si son alpha est plein...
        if (CanvasGroupMessageJoueur.alpha == 1) {
            TimerMsg();//Appel de fonction.
        }
        //Si le alpha est plus grand que 0...
        else if (CanvasGroupMessageJoueur.alpha > 0) {
            //Si le message doit fader...
            if (fadeMsg) {
                CanvasGroupMessageJoueur.alpha -= vitesseFade * Time.deltaTime;//Fade progressif du alpha.
            }
        }
        else {
            messageJoueur.enabled = true;//Désactivation du message.
            fadeMsg = false;//Reset de la variable de controle fadeMsg.
        }
    }
    
    //Verif du nombre de potions, vies et sante
    nbPotions = gestionscHeros.getNbPotionsSort();
    nbVies = gestionscHeros.getNbVies();
    restantHeros = gestionscHeros.getSante();

    vieSlider.value = restantHeros;//Affichage de l'etat de sante dans la barre de vie
    
    //Vérifie le nombre de vies et affiche le nombre de coeurs en consequence
    switch (nbVies) {
        case 3:
            RenderCoeur1.enabled = true; 
            RenderCoeur2.enabled = true;
            RenderCoeur3.enabled = true; 
            break;
        case 2:
            RenderCoeur3.enabled = true;
            RenderCoeur2.enabled = true;
            RenderCoeur3.enabled = false; 
            break;
        case 1:
            RenderCoeur2.enabled = true;
            RenderCoeur2.enabled = false;
            RenderCoeur3.enabled = false;
            break;
    }
    
    //Alpha de l'icone potion en fonction du nombre de potions
    switch (nbPotions) {
        case 1:
            RenderPotion1.color.a = 0.33;
            break;
        case 2:
            RenderPotion1.color.a = 0.66; 
            break;
        case 3:
            RenderPotion1.color.a = 1;
            break;
    }
    potionSortText.text = nbPotions.ToString();//Affichage du nombre de potions
}

//:::::::::::function AfficherPanneauBarreVieEnnemi :::::::::://
function AfficherPanneauBarreVieEnnemi(state:boolean){
    PanneauBarreVieEnnemi.SetActive(state);
}
 
//:::::::::::::: function DiminuerBarreViesEnnemi :::::::::::::://
function DiminuerBarreViesEnnemi () {
	restantEnnemi--;
	EnnemiSlider.value = restantEnnemi;
}

//:::::::::::::: function resetBarreEnnemi :::::::::::::://
function setBarreBoss(pointsDeVieBoss:int) {
    maxBarreBoss = pointsDeVieBoss;
	EnnemiSlider.maxValue = maxBarreBoss;
    PanneauBarreVieEnnemi.SetActive(true);
}

//Affiche un message a l'utilisateur
function afficherMessage(message: String) {
	fadeMsg = false;
	CanvasGroupMessageJoueur.alpha = 1;
	messageJoueur.text = message;
	messageJoueur.enabled = true;
}

//Timer a la fin duquel le message fade out.
function TimerMsg() {
	CanvasGroupMessageJoueur.alpha = 0.999;//Pour ne pas que la fonction soit appelée une seconde fois d'affilé.
	yield WaitForSeconds (tempsAffichageMsg);
	fadeMsg = true;
}

function OnLevelWasLoaded() {
    
    //En cas du chargement d'une partie sauvegardée, les liens entre les différents objets doit être créé une fois le niveau chargé, sinon Unity ne trouve pas les éléments dans le Start();
    if (PlayerPrefs.GetInt("partieSauvegardee") == 1) {
        
        heros = GameObject.FindWithTag("heros");
        gestionscHeros = heros.GetComponent.<scHeros>();

        maxBarreHeros = gestionscHeros.santeMax;
        restantHeros = maxBarreHeros;//Débuter

        nbVies = gestionscHeros.getNbVies();
        nbPotions = gestionscHeros.getNbPotionsSort();

        vieSlider.maxValue = maxBarreHeros;
        EnnemiSlider.maxValue = maxBarreBoss;
        var cgGUI:CanvasGroup = GetComponent.<CanvasGroup>();
        cgGUI.alpha = 1;//Met le GUI-JEU visible après le chargement d'une sauvegarde (mit insivible au chargement par le menu pour éviter la superposition des éléments).
    }
}