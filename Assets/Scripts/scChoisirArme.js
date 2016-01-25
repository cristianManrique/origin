#pragma strict
/**
*Script pour choisir etre deux armes
*@author Cristina Mahneke
*@source answers.unity3d.com/questions/125519/weapon-switching.html
*@date 25/01/2016
**/

/**
*les GameObjects des armes
*@var GameObject
*@access public
**/
private var sort: GameObject;
private var epee: GameObject;

/**
*le nombre des potions que le heros possede
*@var int
*@access public
**/
public var noPotions: int;


function Start () {

	//recuperer les GameObjects des armes dans des variables
	epee = GameObject.FindWithTag("epee");
	sort = GameObject.FindWithTag("originSort");

}

function Update () {

	//en appuyant la cle M du clavier la fonction changerArmes() parcourira
	if(Input.GetKeyDown(KeyCode.M)){

		changerArmes();
	
	}

}

//Methode pour activer ou desactiver l'une des deux armes
function changerArmes(){

	
	if(epee.activeSelf == true && noPotions>0){

	//le joueur pourra activer les sorts seulement s'il possede des potions
		epee.SetActive(false);
		sort.SetActive(true);	
	}else{

	//l'epee sera active par default
		epee.SetActive(true);
		sort.SetActive(false);		
	}

}