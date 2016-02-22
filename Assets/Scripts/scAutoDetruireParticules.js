#pragma strict
/**
* Script de destruction d'un game object en fonction de la durée de sa particule.
* @author David Lachambre
* @date 16-02-2016
*/

/*
* Le nom de la particule à trouver dans les enfants du game object. À écrire dans l'inspector.
* @access public
* @var String
*/
public var nomParticule:String;

function Start () {
    var particules: ParticleSystem = transform.Find(nomParticule).GetComponent(ParticleSystem);//Particules de l'objet
    Destroy(this.gameObject, particules.duration);//Le game object est détruit quand la duree de la particule est ecoulee
}