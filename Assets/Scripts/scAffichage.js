#pragma strict
import UnityEngine.UI;
// permet d'importer les éléments du UI canvas jeu

/**
 * TP Assemblage de Jeu
 * Gestion Affichage tous dans le JEU
 * Mise à jour Text UI, username UI, Message UI
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2015-11-25
 * 
 */

 //:::::::::::variables :::::::::://
	/*
	* GameObject contient les panneaux
	* @access public
	* @var GameObject
	*/
	public var panneau:GameObject;

//:::::::::::::::::::://
	/*
	* Objet Text dans le UI
	* @access public
	* @var GameObject
	*/
	public var ObjetTextVie:Text;


	/*
	* Objet Text dans le UI
	* @access public
	* @var GameObject
	*/
	public var messageText:Text;

	/*******/
	public var messageBonbon:GameObject;

	public var messagePotionSort:GameObject;

	public var messageOgre:GameObject;

	public var messageFeeVolante:GameObject;

	public var messageDiable:GameObject;

	public var messageFantome:GameObject;

	public var messageLutin:GameObject;

function Start () {

}

function Update () {

}



//::: MettreAJourVie afficher sur UI:::::::::://
//ATTENTION: cette function est appelé dans scDetectionObjet.js 

function MettreAJourVie(objet01:int)
{
	//:: convertir en entier
	ObjetTextVie.text = objet01.ToString();

	//écraser le texte UI

}



//:: MettreAJourMessage sur UI :::::::::://
function MettreAJourMessage(message:String){
	messageText.text = message;

}

function informationBonbon(etat:boolean)
{
	messageBonbon.SetActive(etat);
	Time.timeScale=0;
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