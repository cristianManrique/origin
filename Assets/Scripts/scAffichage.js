#pragma strict
import UnityEngine.UI;
// permet d'importer les éléments du UI canvas jeu

/**
* TP Assemblage de Jeu
* Gestion Affichage tous dans le JEU
* Mise à jour Text UI, username UI, Message UI
* @author Cristian Manrique
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

//::::::::::::::::::::://
/*
* Contient le script scAffichage.js
* @access private
* @var scAffichage.js
*/
private var gestionscAffichage: scAffichage;

/*
* Contient le script scHeros.js
* @access private
* @var scHeros.js
*/
private var gestionscHeros: scHeros;

//::::::::::::::::::::://	
/**
 * Gerer le temps pour diminuer la barre de Vie
 * @access private
 * @var float
 */
private var TempsDim:float = 30.0;

/**
 * Limite la barre de vie
 * @access private
 * @var float
 */
private var Limite:float = 0.0;

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
* @var int
*/
private var restantHeros:int;

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
* Totalité barre de vies
* ATTENTION: dans inspector le value max du slider doit être idem
* @access private
* @var int
*/
private var maxBarre: int = 10;

/*
* Ce qui reste de la  barre de vies
* ATTENTION: dans inspector le value max du slider doit être idem
* @access private
* @var int
*/
private var restant:int;

/*
* GameObject contient les panneaux avec le texte pour l'informations du jeu pour chaque éléments.
*@acces public
* var GameObject
*/
public var messageHeros:GameObject;
public var messageBonbon:GameObject;
public var messagePotionSort:GameObject;
public var messageOgre:GameObject;
public var messageFeeVolante:GameObject;
public var messageDiable:GameObject;
public var messageFantome:GameObject;
public var messageLutin:GameObject;
public var messagePotionReveille:GameObject;


//::::::::::::::::::::://
/*
* Contient le text UI des potions trouvées
* @access private
* @var integer
*/
private var nbPotionVie:Text;//potionVie

public var nbPotionSort;//potionSort


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
* Contient le rendu des potions 
* pour diminuer le alpha
* @access private
* @var Image
*/
private var  RenderCoeur1:Image;
private var  RenderCoeur2:Image;
private var  RenderCoeur3:Image;

//::::::::::::::::::::://
/*
* GameObject contient les panneaux du UI
* @access public
* @var GameObject
*/
public var PanneauBarreVieEnnemi:GameObject;


function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}

function Start () {

    restantHeros= maxBarre;//Débuter 
	canvas = GameObject.FindWithTag("canvas");
	heros = GameObject.FindWithTag("heros");


	//:: Chercher LE SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();
    gestionscHeros=heros.GetComponent.<scHeros>();
    
    Limite += TempsDim;
    
    restant= maxBarre;//Débuter 
	EnnemiSlider.value = maxBarre;
    
	//:: Chercher le composant Image dans les sprites UI 
    RenderPotion1 = potionSortImage.GetComponent.<Image>();
    //RenderPotion2 = potion02.GetComponent.<Image>();
    RenderCoeur1  = coeur01.GetComponent.<Image>();
    RenderCoeur2  = coeur02.GetComponent.<Image>();
    RenderCoeur3  = coeur03.GetComponent.<Image>();

    //:: Débuter le ALPHA des SPRITES UI
    RenderPotion1.color.a = 0.3 ;
    RenderCoeur1.color.a = 1 ;
    RenderCoeur2.color.a = 1 ;
    RenderCoeur3.color.a = 1 ;
    //:: Aller chercher le canvas
    canvas = GameObject.FindWithTag("canvas");

}

function Update () {
    
	//:: Diminuer var restant à chq TempsDim
	if (Time.time > Limite) {
		//:: Time.time : c'est le temps réal qui passe
		Limite = Time.time + TempsDim;
		restantHeros--;
	}

	//:: Éliminer un coeur/vie
	if (vieSlider.value == 0) {
//        Debug.Log("reset");
		restantHeros=maxBarre;//Remettre idem à maxBarre

		// diminue une vie à l'héros
		gestionscHeros.DiminueVies();
		//elimine un coeur dans scAffichage

		gestionscAffichage.ElimineUncoeur(gestionscHeros.getNbVies());
//        numCoeur--;//elimine un coeur

	}
    
    //::Diminuer le Slider
	if(vieSlider.value != restantHeros) {

		vieSlider.value = restantHeros;
	}
}

//affiche le nombre de potion Sort sur la canvas.
function quantitePotionSort(nbPotionSort)
{
	potionSortText.text = nbPotionSort.ToString();

}


//:::::::::::::: function MettreAJourCoeur :::::::::::::://
function MettreAJourPotionsUI(checkPotion:boolean){

	if(checkPotion==true) {
        RenderPotion1.color.a += 0.3; 
    }

    else {
        RenderPotion1.color.a -= 0.3; 
    }
} 

//:::::::::::::: function Elimine Un coeur au UI:::::::::::::://
function ElimineUncoeur(numCoeur) {

    switch(numCoeur)
        {
            case 3:
                RenderCoeur1.color.a = 0; 
                break;

            case 2:
                RenderCoeur3.color.a = 0; 
                break;

            case 1:
                RenderCoeur2.color.a = 0; 
                break;
        }
}

//:::::::::::::: function Augmente Un coeur au UI:::::::::::::://
function AugmenteUncoeur(numCoeur) {

    switch(numCoeur)
        {
            case 3:
                RenderCoeur3.color.a = 1; 
                break;

            case 2:
                RenderCoeur2.color.a = 1; 
                break;

            case 1:
                RenderCoeur1.color.a = 1; 
                break;
        }
}


//:::::::::::::: function DiminueAlphaCoeurUI :::::::::::::://
//function DiminueAlphaCoeurUI(AlphaCoeur, numCoeur) {
//
//    switch(numCoeur)
//        {
//            case 3:
//                RenderCoeur3.color.a -= 0.1; 
//                break;
//
//            case 2:
//                RenderCoeur2.color.a -= 0.1; 
//                break;
//
//            case 1:
//                RenderCoeur1.color.a -= 0.1; 
//                break;
//        }
//}
//
////:::::::::::::: function AugmenteAlphaCoeurUI :::::::::::::://
//function AugmenteAlphaCoeurUI(AlphaCoeur, numCoeur) {
//
//    switch(numCoeur)
//        {
//            case 3:
//                RenderCoeur3.color.a += 0.1; 
//                break;
//
//            case 2:
//                RenderCoeur2.color.a += 0.1; 
//                break;
//
//            case 1:
//                RenderCoeur1.color.a += 0.1; 
//                break;
//        }
//}

//:::::::::::function AfficherPanneauBarreVieEnnemi :::::::::://
function AfficherPanneauBarreVieEnnemi(state: boolean){
    PanneauBarreVieEnnemi.SetActive(state);
}

 /* function qui permet de fermer le panneau d'information en un clic sur le X*/

 function fermerInformationHeros()
{
	messageHeros.SetActive(false);
	Time.timeScale=1;
}
function fermerInformationBonbon()
{
	messageBonbon.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationPotionSort()
{
	messagePotionSort.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationOgre()
{
	messageOgre.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationFeeVolante()
{
	messageFeeVolante.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationDiable()
{
	messageDiable.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationFantome()
{
	messageFantome.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationLutin()
{
	messageLutin.SetActive(false);
	Time.timeScale=1;
}

function fermerInformationPotionReveille()
{
	messagePotionReveille.SetActive(false);
	Time.timeScale=1;
}
/* FiN function qui permet de fermer le panneau d'information en un clic sur le X*/
 
//:::::::::::::: function DiminuerBarreViesEnnemi :::::::::::::://
function DiminuerBarreViesEnnemi () {
	restant--;
	EnnemiSlider.value = restant;
}

//:::::::::::::: function AugmenteBarreViesEnnemi :::::::::::::://
//function AugmenteBarreViesEnnemi () {
//	restant++;
//	EnnemiSlider.value = restant;
//}

//:::::::::::::: function diminuerBarreVies :::::::::::::://
function DiminuerBarreVies (dommagesInfliges:int) {
	restantHeros -= dommagesInfliges;
	vieSlider.value = restantHeros;
}

//:::::::::::::: function AugmenteBarreVies :::::::::::::://
function AugmenteBarreVies () {
	restantHeros++;
	vieSlider.value = restantHeros;
}

//:::::::::::::: function ZeroBarreVies :::::::::::::://EnnemiSlider.value = maxBarre;
function ZeroBarreVies () {
	vieSlider.value = 0;
}

//:::::::::::::: function resetBarreEnnemi :::::::::::::://
function resetBarreEnnemi () {
	EnnemiSlider.value = maxBarre;
    restant = maxBarre;
}
