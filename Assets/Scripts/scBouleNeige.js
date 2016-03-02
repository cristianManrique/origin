#pragma strict

/**
*Script que deplace les boules de neige et inflige des dommages au heros
*@author Cristina Mahneke
*@author David Lachambre
*@date 26/02/2016
**/

/**
*puissance de la force applique a la boule de neige
*@var float
*@access public
**/
public var puissance: float;

/**
*composant rigidbody de l'objet boule de neige
*@var RigidBody
*@access private
**/
private var rbBoule: Rigidbody;

/**
*Le dommage inflige au heros
*@var int
*@access private
**/
private var dommages: int = 5;

/**
*script de gestion du heros
*@var script
*@access private
**/
private var scriptHeros: scHeros;

/**
*prefab particules explosion de neige
*@var GameObject
*@access public
**/
 public var explosionNeige: GameObject;


function Start () {
	puissance = 8000;
	rbBoule = GetComponent.<Rigidbody>();
	rbBoule.AddRelativeForce(Vector3.forward * puissance, ForceMode.Impulse);
	rbBoule.AddRelativeTorque((puissance),0,0, ForceMode.Impulse);
}



//si la boule de neige frappe le heros, il soufrira un perde de sante
function OnTriggerEnter(autreObjet: Collider) {

    if (autreObjet.tag == "heros") {
        scriptHeros = autreObjet.gameObject.GetComponent(scHeros);
        scriptHeros.updateDommages(dommages);


		 var explosion: GameObject = Instantiate (explosionNeige, transform.position , transform.rotation) as GameObject;//La boule eclat si elle touche le heros
    		
    
    	var particulesExplosion: ParticleSystem = explosion.transform.Find("eclatsNeige").GetComponent(ParticleSystem);//Particules de l'explosion
   	    Destroy(explosion, particulesExplosion.duration);//L'explosion est detruite quand sa duree est ecoulee
    
    	Destroy(this.gameObject);
    }


 }


 Destroy(this.gameObject,20);

