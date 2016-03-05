#pragma strict

/**
 * TP Developpement de JEU
 * Attaque normale de Clara
 * Instancier une boule de feux
 * @source: http://answers.unity3d.com/questions/16583/recalculate-color-from-0255-to-01.html
 * @source: http://docs.unity3d.com/ScriptReference/Resources.Load.html
 * @source: http://answers.unity3d.com/questions/314503/destroy-all-objects-with-tag-enemy.html
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2016-02-03
 * 
 */

//:::::::::::variables :::::::::://

//::::::CLARA::::::://

/**
*L'e point d'origine du sort lance par le heros
*@var GameObject
*@access public
**/
public var originAttack: GameObject;

/**
Variable de force de lancer vers l'avant
* @access private
* @var int
*/
private var forceAvant:int = 500;

/**
Variable de force de lancer vers le haut
* @access private
* @var int
*/
private var forceHaut:int = 50;

/**
* Contient le controleur d'animation
* @access public
* @var Animator
*/
private var animateur: Animator;

/**
* Contient le héros (clara ou Malcom)
* @access private
* @var GameObject
*/
private var heros: GameObject;


private var GroupesProjectiles:GameObject[];


function Awake()
{
    heros = this.gameObject;
    //:: chercher le hÃ©ros

    animateur = this.gameObject.GetComponent.<Animator>();
    //:: trouver le composant Animator
}


//:::::::::::Start :::::::::://
function Start () {

	
}

//:::::::::::::: function lancer ::::::::::// 
function lancerBoule() {
//    Debug.Log("lanceBoule");
    //:: Instancier un projectile sort
    var boule: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPrefabs/bouleFeux")) as GameObject;
    Physics.IgnoreCollision(boule.GetComponent.<Collider>(), this.GetComponent.<Collider>());//Ignore les collisions entre le heros et le projectile
    boule.transform.position = originAttack.transform.position;
	boule.transform.rotation = this.gameObject.transform.rotation;
    boule.GetComponent(Rigidbody).AddForce(this.transform.forward * forceAvant);
    boule.GetComponent(Rigidbody).AddForce(this.transform.up * forceHaut);
    Destroy(boule, 3);
}