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
	*la distance/longueur maximum du RayCast
	*@var int
	*@access public
	**/
	public var maxHitPoint:int = 10;

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
	*le nombre des potions que le heros possede
	*@var int
	*@access public
	**/
	public var noPotions: int;

	private var bouleBleue:GameObject;

	/**
	*les GameObjects emmeteurs de particules
	*@var GameObject
	*@access public
	**/
	public var emmeteur1: GameObject;
	public var emmeteur2: GameObject;

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
	// Debug.Log("noPotions = "+noPotions);

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


//Methode que instanciera les prefabs des emmeteurs
function Feu(){
	//attraper la position de la souris
	var ray : Ray = new Ray (transform.position,Input.mousePosition);

	//direction en avant de notre position
	var direction: Vector3= transform.TransformDirection(Vector3.forward);
	
	//Raycast sert a dterminer l'angle de attent pour tirer et aussi pour determiner si on est vu pour un ennemis(est ce que'il y a quelque chose en face de moi?, si oui, quoi(RaycastHit)?
	var objetToucher: RaycastHit;
	
	//Debug.Log("Feu");

	
//		Debug.Log("Touche");

		Debug.DrawLine(transform.position,  objetToucher.point);

		//nous allons faire roter notre transform, une fois vers le point touche et dans une autre instance en avant du heros
		//transform.LookAt(objetToucher.point);
		var rotNormal:Quaternion = Quaternion.FromToRotation(Vector3.up, objetToucher.normal);
		var rotForward:Quaternion = Quaternion.FromToRotation(Vector3.up, transform.forward);

//		Debug.Log(objetToucher.collider.name);

		//un emmeteur sera instancie a notre point d'origin, et le deuxieme sur l'objet touche
		var etoiles:GameObject = Instantiate(emmeteur1, transform.position, rotForward);//etoiles
//		Instantiate(emmeteur2, objetToucher.point , rotNormal);//boule bleue
		bouleBleue = Instantiate(emmeteur2, transform.position , rotNormal);//boule bleue
		
				
		//si on touche un rigidbody on veut plus de la force
		/*if(objetToucher.rigidbody){
			objetToucher.rigidbody.AddForce(1000*direction);
		}
		objetToucher.collider.SendMessageUpwards("touché", forceArme,SendMessageOptions.DontRequireReceiver);
		*/
		
//	}
	
	yield WaitForSeconds(cadenceTir);

	//une fois fini de lance un sort, on pourrait lancer un autre
	peuTirer = true;
	
}//fin feu();