#pragma strict
import UnityEngine.UI;
// permet d'importer les éléments du UI canvas jeu

/**
* Script de gestion des messages du tutoriel
* Mise à jour Messages UI
* @author Stéphane Leclerc
* @date 2016-01-16
*/


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
