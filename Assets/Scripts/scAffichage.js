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

 //:::::::::::variables :::::::::://
	/*
	* GameObject contient les panneaux
	* @access private
	* @var GameObject
	*/
	private var canvas:GameObject;

	//:::::::::::::::::::://
	/*
	* Objet Text dans le UI
	* @access public
	* @var Text
	*/
	public var ObjetText1:Text;
	public var potionSortText:Text;
	public var messageText:Text;


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
    private var objet01:Text;//potionVie

    public var nbPotionSort:int=4;//potionSort


    //::::::::::::::::::::://
    /*
    * Contient les images UI des potions
    * @access public
    * @var GameObject
    */
    public var potion01: GameObject;//potionVie
    public var potion02: GameObject;//potionSort

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




function Start () {

	//:: Chercher le composant Image dans les sprites UI 
    RenderPotion1 = potion01.GetComponent.<Image>();
    RenderPotion2 = potion02.GetComponent.<Image>();
    RenderCoeur1  = coeur01.GetComponent.<Image>();
    RenderCoeur2  = coeur02.GetComponent.<Image>();
    RenderCoeur3  = coeur03.GetComponent.<Image>();

    //:: Débuter le ALPHA des SPRITES UI
    RenderPotion1.color.a = 0.3 ;
    RenderPotion2.color.a = 0.3 ;
    RenderCoeur1.color.a = 1 ;
    RenderCoeur2.color.a = 1 ;
    RenderCoeur3.color.a = 1 ;

    canvas = GameObject.FindWithTag("canvas");

}

function Update () {

	
}



//::: MettreAJourVie afficher sur UI:::::::::://
function MettreAJourVie(objet01:int)
{
	//:: convertir en entier
	//ObjetTextVie.text = objet01.ToString();

	//écraser le texte UI

}



//:: MettreAJourMessage sur UI :::::::::://
function MettreAJourMessage(message:String){
	messageText.text = message;

}


//::: MettreAJourText afficher sur UI:::::::::://
//ATTENTION: cette function est appelé dans scGestionJeu.js 


//affiche le nombre de potion Sort sur la canvas.
function quantitePotionSort(objet01, nbPotionSort)
{
	//:: convertir en entier
	ObjetText1.text = objet01.ToString();
	potionSortText.text = nbPotionSort.ToString();
	//ObjetText3.text = objet03.ToString();
	//écraser le texte UI

}


//:::::::::::::: function MettreAJourCoeur :::::::::::::://
function MettreAJourPotionsUI(checkPotion1:boolean, checkPotion2:boolean){

	if(checkPotion1==true) {
        RenderPotion1.color.a += 0.3; 
    }

    if(checkPotion2==true) {
        RenderPotion2.color.a += 0.3; 
    }
} 


//:::::::::::::: function DiminueAlphaCoeurUI :::::::::::::://
function DiminueAlphaCoeurUI(AlphaCoeur, numCoeur) {

    switch(numCoeur)
        {
            case 3:
                RenderCoeur3.color.a -= 0.1; 
                break;

            case 2:
                RenderCoeur2.color.a -= 0.1; 
                break;

            case 1:
                RenderCoeur1.color.a -= 0.1; 
                break;
        }
}

//:::::::::::::: function AugmenteAlphaCoeurUI :::::::::::::://
function AugmenteAlphaCoeurUI(AlphaCoeur, numCoeur) {

    switch(numCoeur)
        {
            case 3:
                RenderCoeur3.color.a += 0.1; 
                break;

            case 2:
                RenderCoeur2.color.a += 0.1; 
                break;

            case 1:
                RenderCoeur1.color.a += 0.1; 
                break;
        }
}

//:::::::::::function AfficherPanneauBarreVieEnnemi :::::::::://
function AfficherPanneauBarreVieEnnemi(state: boolean){
        PanneauBarreVieEnnemi.SetActive(state);
        //active ou pas (true ou false);
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
 

