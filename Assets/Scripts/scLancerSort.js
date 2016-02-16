#pragma strict
//@script RequireComponent(Animator)
/**
* Script pour instancier des emmeteurs de particules a maniere des sorts
* @author Cristina Mahneke
* @author Cristian Manrique
* @source TPfinal Session 4, materiel du cours de Assemblage de Jeu 1 avec Jonathan Martel
* @date 25/01/2016
**/



	/**
	*variable pour gerer quand le joueur pourrait instancier une particule
	*@var boolean
	*@access private
	**/
	//private var peuTirer: boolean = true;
	private var peuTirer: boolean = false;

	/**
	*le temps en seconds que le joueur doit attendre avant de pouvoir lancer une autre sort
	*@var int
	*@access public
	**/
	public var cadenceTir: float = 1;

	  /**
	Variable de force de lancer
	* @access private
	* @var int
	*/
	private var force:int;

	/**
	*le nombre des potions que le heros possede
	*@var int
	*@access public
	**/
	public var noPotions: int;

	 /**
	*GameObject contenant la particule a lancer
	* @access public
	* @var GameObject
	*/
	public var bouleBleue:GameObject;



//::::::::::::::::::::://
    /**
     * Contient le controleur d'animation
     * @access public
     * @var Animator
     */
    //private var animateur: Animator;
    /**
     * Contient le héro (clara ou Mlacom)
     * @access private
     * @var GameObject
     */
    private var heros: GameObject;

	/*
	* Contient le script qui gère le jeu.
	* @access private
	* @var scGestionJeu
	*/
	private var scriptGestionJeu:scGestionJeu;

	/**
	* Variable projectile
	* @access private
	* @var GameObject
	*/
	private var monProjectile:GameObject;


	private var GroupesProjectiles:GameObject[];

//:::::::::::Awake :::::::::://
function Awake()
{

    heros = GameObject.FindWithTag("heros");
    //:: chercher le héros

    //animateur = heros.gameObject.GetComponent.<Animator>();
    //:: trouver le composant Animator
	
}



function Start () {

	scriptGestionJeu = heros.GetComponent.<scGestionJeu>();



}

function Update () {
<<<<<<< HEAD
	//Debug.Log("noPotions = "+noPotions);
=======
<<<<<<< HEAD
	//Debug.Log("noPotions = "+noPotions);
=======
	// Debug.Log("noPotions = "+noPotions);
>>>>>>> refs/remotes/ReveSansFin/master
>>>>>>> upstream/master

	//Debug.Log(peuTirer);
    //noPotions = scriptGestionJeu.getNbPotionsSort();
   	//if(Input.GetButton("Fire2") && animateur.GetBool('jeteSort')==false && peuTirer == true){

   	if(Input.GetButtonDown("Fire2") && peuTirer == false && noPotions>0) {
		Debug.Log("feu sort");
		Feu();
		peuTirer = true;
		scriptGestionJeu.reductionPotionSort();//diminue une potion et mise à jour dans UI
		
	}
	//Jeter un sort
		//JeterSort();
	if (bouleBleue) {
		bouleBleue.transform.Translate(Vector3.forward * 10 * Time.deltaTime);
	}


	//:::::::::::::: GERER animation jeterSort ::::::::::// 
	/*if(peuTirer)
	{
		peuTirer=false;//:: remettre à FALSE pour arrêter l'animation
		animateur.SetBool('jeteSort', true);
        //:: dire à l'animator d'utiliser cette variable du code	
	}
	else {
		animateur.SetBool('jeteSort', false);
        //:: dire à l'animator d'utiliser cette variable du code
	}*/
	
}// FIN UPDATE

//***********fonction a integrer un fois on est pret avec les animations***********//
/*
function JeterSort(){
	
	if(Input.GetButton("Fire2") && animateur.GetBool('jeteSort')==false){
	
		animateur.SetLayerWeight(1,1f);
		
		animateur.SetBool('jeteSort', true);
		
	}else{
		
		animateur.SetLayerWeight(0,1f);
		animateur.SetBool('jeteSort', false);
		}
	
}
*/

//Methode que instanciera les prefabs des emmeteurs
function Feu(){
	
			var position:Vector3 = transform.position;
			position.y+=2;
			position.z+=100;
		
	//:: Instancier un clone
	monProjectile= Instantiate(bouleBleue, transform.position, transform.rotation);	

	monProjectile.tag = "monProjectile";	
	//:: Ajout force
	//monProjectile.GetComponent.<Rigidbody>().AddForce(this.transform.forward * force);


	//:: Detruire si l'objet ne bouge pas
	
	/*if (monProjectile.GetComponent.<Rigidbody>().IsSleeping())
		{
		Destroy(monProjectile);
		}*/

	yield WaitForSeconds(3);
	autoDetruire();	

	
	yield WaitForSeconds(cadenceTir);

	//une fois fini de lance un sort, on pourrait lancer un autre
	peuTirer = true;
	
}//fin feu();

function autoDetruire(){

	GroupesProjectiles =  GameObject.FindGameObjectsWithTag ("monProjectile");
 
     for(var i = 0 ; i < GroupesProjectiles.length ; i ++)
         Destroy(GroupesProjectiles[i]);

	
}