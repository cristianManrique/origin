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