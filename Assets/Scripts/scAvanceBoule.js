#pragma strict
/**
*Script qui permet à la boule d'avancer
*@author Cristian Manrique
*@date 01/02/2016
**/

private var vitesse:int = 10;

function Start () {

}

function Update () {
	transform.Translate(Vector3.forward*vitesse*Time.deltaTime);
}




//::::::::::: OnTriggerEnter :::::::::://
function OnTriggerEnter(other:Collider)
{

 	Debug.Log(other.GetComponent.<Collider>().name);

 	var direction= transform.TransformDirection(Vector3.forward);

 	if (other.GetComponent.<Rigidbody>())
 	{
 		//:: ajout la force à l'autre objet
 		other.GetComponent.<Rigidbody>().AddForce(1000*direction);

 	}
 	

 }


