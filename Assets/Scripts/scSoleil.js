#pragma strict
@script RequireComponent(CharacterController)

/**
 * TP Assemblage de Jeu
 * Gestion lumiere Direction light
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2015-11-25
 * 
 */

//:::::::::::variables :::::::::://

	/*
	* Contient le direction light nommé Soleil
	* @access private
	* @var GameObject
	*/
	public var Soleil:GameObject;




//:::::::::::Start :::::::::://
function Start () {

}


//:::::::::::Update :::::::::://
function Update () {

	//:::::: Applique une rotation au SOLEIL
	//source: http://docs.unity3d.com/ScriptReference/Transform.Rotate.html

	Soleil.transform.Rotate(Vector3.up * Time.deltaTime, Space.World);
	//En même temps qu'on tourne (spin) applique le dans espace du monde
	// Axe Y à la même vitesse 

}