#pragma strict
/**
*Script que deplace des stalags comme obstacles a travers du sol quand le heros s'approche
*@author Cristina Mahneke
*@source http://docs.unity3d.com/ScriptReference/Vector3.Lerp.html
*@date 26/02/2016
**/


/**
*le joueuer
*@var GameObject
*@access public
**/
 private var heros: GameObject;


 private var posOriginale: Vector3;

 private var posCible: Vector3;
 /**
*variable qui evite que on onstanti des boules a chaque frame
*@var boolean
*@access private
**/
 private var peutInstantier: boolean;

 private var longuerTrajectoire: float;

 private var velocite: float;

 private var tempsDebut: float;

 private var transladerStalag: boolean;

function Start () {
	heros = GameObject.FindWithTag("heros");
	posOriginale = transform.position;
	posCible = Vector3(posOriginale.x, posOriginale.y+15, posOriginale.z);
	//longeurTrajectoire = Vector3.Distance(posOriginale-posCible);
	transladerStalag = false;
}

function Update () {
	//if(transladerStalag == true){
		//var distanceParcouru = (Time.time - tempsDebut) *velocite;
		//var fracDistance = distanceparcouru/longeurTrajectoire;

		//transladerStalag = false;
	//}
}
function OnTriggerEnter(autreObjet: Collider){
	
	if(autreObjet.tag == "heros"){
		tempsDebut = Time.time;
		//transladerStalag = true;
		transform.position = Vector3.Lerp(posOriginale, posCible, tempsDebut+2);
		SendMessageUpwards("exploserGlace");

	}
}
