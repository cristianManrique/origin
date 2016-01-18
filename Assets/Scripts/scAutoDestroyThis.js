#pragma strict

/**
 * TP Assemblage de Jeu
 * Gestion Auto destruction Gameobject + Mise à jour Score et vie
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2015-11-25
 * 
 */
 
 //:::::::::::variables :::::::::://


 	/*
	* Contient les points De Vie
	* @access public
	* @var float
	*/
	public var pointsDeVie: float = 10;

	/*
	* Contient l'armure (protection)
	* @access public
	* @var float
	*/
	public var armure:float = 1;

	/*
	* Contient GameObject du Héro (HOPE)
	* @access public
	* @var GameObject
	*/
	public var heros:GameObject;

	/*
	* Contient le script scGestionJeuTP.js 
	* @access private
	* @var GameObject
	*/
	//private var gestionsScore: scGestionJeuTP;



//:::::::::::Start :::::::::://
function Start () {


    //:: ACTIVER LE SCRIPT JS
    //Dans HOPE va chercher le Component scAffichageTP.js

    heros = GameObject.FindWithTag("heros");
	//gestionsScore=HOPE.GetComponent.<scGestionJeuTP>();

}

//:::::::::::Update :::::::::://
function Update() {
}


//:::::::::::function feu: permet de tirer :::::::::://


function Toucher(points:float)//::points viens de l'autre objet qui lance
{

	
	if(points > armure)//:: Si points > armure ALORS...
	{
		pointsDeVie-=points;//:: enleve un point à pointsDeVie de ce gameObject 


		//::SI pointsDeVie<=0 ALORS
		if (pointsDeVie<=0)
		{

			//:: Si l'object touché a un rigidbody alors applique la force
			if(gameObject.GetComponent.<Rigidbody>())
			{
				gameObject.GetComponent.<Rigidbody>().AddForce(1000*Vector3.up);//
			}

			Destroy(gameObject);// detruit cet gameObject

			//:: Appel de la function qui est dans scGestionJeuTP.js
			//gestionsScore.GestionScoreTotalEtVies(5,2);//+5pts + 1vies
		}
	}


}


