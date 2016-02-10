﻿#pragma strict
import UnityEngine.UI;

/**
 * TP Assemblage de Jeu
 * Gestion de la Barre de vie du Héros
 * @author Cristian Manrique
 * @source https://www.youtube.com/watch?v=al4Zfbia2Ho
 * @source http://docs.unity3d.com/ScriptReference/Time-time.html
 * @date 2016-01-16
 * 
 */

 //:::::::::::variables :::::::::://


//::::::::::::::::::::://

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
	private var TempsDim:float = 6.0;

	/**
     * Limite la barre de vie
     * @access private
     * @var float
     */
	private var Limite:float = 0.0;

	/**
     * Gérer le alpha du coeur
     * @access public
     * @var float
     */
	public var AlphaCoeur:float;

	//::::::::::::::::::::://
	/*
	* Slider Barre de vie
	* @access private
	* @var int
	*/
	public var vieSlider:Slider;


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
	* Indique le coeur à diminuer le alpha
	* @access private
	* @var int
	*/
	public var numCoeur:int = 3;


//:::::::::::Awake :::::::::://
function Awake()
{

    
	
}


//:::::::::::Start :::::::::://
function Start () {

	restant= maxBarre;//Débuter 
	canvas = GameObject.FindWithTag("canvas");
	heros = GameObject.FindWithTag("heros");


	//:: Chercher LE SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();
    gestionscHeros=heros.GetComponent.<scHeros>();

}


//:::::::::::::: UPDATE :::::::::::::://
function Update () {

	//:: Diminuer var restant à chq TempsDim
	if (Time.time > Limite) {
		//:: Time.time : c'est le temps réal qui passe
		Limite = Time.time + TempsDim;
		restant--;
	}

	//::Diminuer le Slider
	if(vieSlider.value != restant) {

		vieSlider.value = restant;
		AlphaCoeur = restant;//:: permet de diminuer la alpha du coeur
		//gestionscAffichage.DiminueAlphaCoeurUI(AlphaCoeur, numCoeur);
		//:: ATTENTION: function appeler dans scAffichage.js
	}

	//:: Éliminer un coeur/vie
	if (vieSlider.value == 0) {
		restant=maxBarre;//Remettre idem à maxBarre
		numCoeur--;//elimine un coeur

		var nbVies = numCoeur;// idem

		// diminue une vie à l'héros
		gestionscHeros.DiminueVies(nbVies);

		if (numCoeur<= 0){numCoeur=0;}

	}

}


//:::::::::::::: function diminuerBarreVies :::::::::::::://
function DiminuerBarreVies () {
	restant--;
	vieSlider.value = restant;
}


//:::::::::::::: function AugmenteBarreVies :::::::::::::://
function AugmenteBarreVies () {
	restant++;
	vieSlider.value = restant;
}