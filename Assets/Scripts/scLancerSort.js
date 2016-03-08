#pragma strict
//@script RequireComponent(Animator)
/**
* Script pour instancier des emmeteurs de particules a maniere des sorts
* @author Cristina Mahneke
* @author Cristian Manrique
* @author David Lachambre
* @source TPfinal Session 4, materiel du cours de Assemblage de Jeu 1 avec Jonathan Martel
* @date 25/01/2016
**/

/**
*L'e point d'origine du sort lance par le heros
*@var GameObject
*@access public
**/
public var originSort: GameObject;

/**
*le nombre des potions que le heros possede
*@var int
*@access private
**/
private var nbPotions: int;

/**
Variable de force de lancer
* @access private
* @var int
*/
private var force:int;

/**
 * Contient le controleur d'animation
 * @access public
 * @var Animator
 */
private var animateur: Animator;

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
private var scriptHeros:scHeros;

/*
* composant de la source d'audio
* @access private
* @var AudioSource
*/
private var sourceSon:AudioSource;

/*
* Contient le son se blesser
* @access public
* @var AudioClip
*/
public var sonLancerSort: AudioClip;


//:::::::::::Awake :::::::::://
function Awake()
{
    heros = this.gameObject;
    //:: chercher le héros

    animateur = this.gameObject.GetComponent.<Animator>();
    //:: trouver le composant Animator
}



function Start () {

	scriptHeros = heros.GetComponent.<scHeros>();
	sourceSon = GetComponent.<AudioSource>();
}

function Update () {
    
    nbPotions = scriptHeros.getNbPotionsSort();

   	if(Input.GetButtonDown("Fire2") && nbPotions > 0) {
		scriptHeros.reductionPotionSort();//diminue une potion et mise à jour dans UI
		animateur.SetTrigger('jeteSort');
	}

}// FIN UPDATE

//Lance un sort - appelé par un animator event
function lancerUnSort() {
    sourceSon.PlayOneShot(sonLancerSort);
    //:: Instancier un projectile sort
    var sort: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPrefabs/bouleBleue")) as GameObject;
    Physics.IgnoreCollision(sort.GetComponent.<Collider>(), heros.GetComponent.<Collider>());//Ignore les collisions entre le heros et le projectile
    sort.transform.position = originSort.transform.position;
	sort.transform.rotation = this.gameObject.transform.rotation;
    
    var etoilesSort: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPrefabs/etoilesSort")) as GameObject;
    etoilesSort.transform.position = sort.transform.position;
}