#pragma strict
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

	//::::::::::::::::::::://
    /*
    * Contient le script scAffichage.js
    * @access private
    * @var scAffichage.js
    */
	private var gestionscAffichage: scAffichage;

	//::::::::::::::::::::://	
	/**
     * Gerer le temps pour diminuer la barre de Vie
     * @access private
     * @var float
     */
	private var TempsDim:float = 3.0;

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
	public var restant:int;

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


}


//:::::::::::::: UPDATE :::::::::::::://
function Update () {



		EnnemiSlider.value = restant;


}


//:::::::::::::: function DiminuerBarreViesEnnemi :::::::::::::://
function DiminuerBarreViesEnnemi () {
	restant--;
	EnnemiSlider.value = restant;
}


//:::::::::::::: function AugmenteBarreViesEnnemi :::::::::::::://
function AugmenteBarreViesEnnemi () {
	restant++;
	EnnemiSlider.value = restant;
}