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
	Variable de force de lancer
	* @access private
	* @var int
	*/
	private var force:int;
	/**
	Variable de force MIN de lancer
	* @access private
	* @var int
	*/
	private var forceMin:int = 1000;

	/*
	* GameObject Contient particule
	* @access public
	* @var ParticleSystem
	*/
	//public var FeuMagie:ParticleSystem;

	/*
	* GameObject Contient bouleFeu
	* @access public
	* @var ParticleSystem
	*/
	public var boule:GameObject;
	/**
	* Variable projectile
	* @access private
	* @var GameObject
	*/
	private var monProjectile:GameObject;


	private var GroupesProjectiles:GameObject[];





//:::::::::::Start :::::::::://
function Start () {

	
}


//:::::::::::::: UPDATE :::::::::::::://
function Update()
{


//:::::::::::::: GERER ATTAQUE CLARA ::::::::::// 
	if(Input.GetButtonDown("Fire1"))
	{
		lancer();
		
	
    }
}


//:::::::::::::: function lancer ::::::::::// 
function lancer() {

	
	var position:Vector3 = transform.position;
			position.y+=2;
			position.z+=100;
		
	//:: Instancier un clone
	monProjectile= Instantiate(boule, transform.position, transform.rotation);	

	monProjectile.tag = "monProjectile";	
	//:: Ajout force
	monProjectile.GetComponent.<Rigidbody>().AddForce(this.transform.forward * force);


	//:: Detruire si l'objet ne bouge pas
	
	if (monProjectile.GetComponent.<Rigidbody>().IsSleeping())
		{
		Destroy(monProjectile);
		}

	yield WaitForSeconds(3);
	autoDetruire();

	

	
}

function autoDetruire(){

	GroupesProjectiles =  GameObject.FindGameObjectsWithTag ("monProjectile");
 
     for(var i = 0 ; i < GroupesProjectiles.length ; i ++)
         Destroy(GroupesProjectiles[i]);
}


//:::::::::::::: convertir RGB en unity couleur::::::::::// 
function convertirCouleurs (r : int, g : int, b : int) : Color {
    return Color(r/255.0, g/255.0, b/255.0);
}




		

	