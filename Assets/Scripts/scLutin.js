#pragma strict

/**
* Script de gestion des comportements du lutin.
* @author stéphane Leclerc
* @référence tuto pour le déplacement autonome: https://www.youtube.com/watch?v=SLzZqrkXDVA&list=PLB87FA10C02CC3CA8&index=33
* @référence tuto pour suivre le heros: https://www.youtube.com/watch?v=VoJkh4AmV3I&index=34&list=PLB87FA10C02CC3CA8
* @date 20-01-2015
*/

/*
* Lutin
* @access public
* @var GameObject
*/
public var lutin:GameObject;

/*
* controleur du lutin.
* @access public
* @var CharacterController
*/
public var controleurLutin:CharacterController;

/*
* deplacement du lutin.
* @access private
* @var deplacementDirection
*/
private var deplacementDirection:Vector3;

/*
* vitesse du lutin.
* @access private
* @var vitesse
*/
private var vitesse:float=2;

 /*
* delai pour un changement direction (rotation).
* @access private
* @var delaiChangementDirection
*/
private var delaiChangementDirection:float;

/*
* changement de direction (rotation)
* @access private
* @var changementDirection
*/
private var changementDirection:float;


/*
* donne une valeur aléatoire pour une rotation
* @access private
* @var nouvelleRotation
*/
private var nouvelleRotation:float;

 /*
* met un gravité
* @access private
* @var gravite
*/
private var gravite:float=10;

  /*
* fait un rayon de détection
* @access private
* @var rayonToucher
*/
private var rayonToucher:RaycastHit;

  /*
* permet de se diriger vers le heros
* @access private
* @var directionHeros
*/
public var directionHeros:Vector3;



function Start () {
//initialisation du temps de délai aléatoire avant de changer de direction.
	delaiChangementDirection=Random.Range(1,3);
//permet de donner une valeur aléatoire entre 0 et 360 degres
	nouvelleRotation=Random.Range(0,90);
//il va chercher le CharacterController qui est mis dans la variable controleurLutin
	controleurLutin=GetComponent('CharacterController');
}

function Update () {


//trouver le heros et le suivre selon le tag avec sa position et celui du lutin.
directionHeros=GameObject.FindWithTag('heros').transform.position-transform.position;
//empêche le lutin de monter lorsque le heros monte ou vole.
directionHeros.y=0;

//condition qui permet de savoir si le heros est près avec la public variable magnitude(il compare les vectors) 
//sinon il se déplace tout seul.
	if(directionHeros.magnitude<6)
	{
//permet de prendre la même valeur que le heros pour le suivre.
		deplacementDirection=directionHeros;
		//Debug.Log('deplacement'+deplacementDirection);
		//Debug.Log('directionHero'+directionHeros);
//permet que le lutin regarde le heros et de le suivre rapidement.
		transform.rotation=Quaternion.Slerp(transform.rotation,Quaternion.LookRotation(directionHeros),10*Time.deltaTime);
	}else{

	//initialisation de deplacementDirection avec la public static forward qui permet d'avancer.
			deplacementDirection=Vector3.forward*vitesse;


	//condition permettant le changement de direction selon le temps écouler avec la public stati fixedTime.

		if(changementDirection+delaiChangementDirection<Time.fixedTime)
		{

			nouvelleRotation=Random.Range(0,180);
	//réafection du changementDirection avec le fixedTime;
			changementDirection=Time.fixedTime;
	//réafection du delaiChangementDirection aléatoirement.
			delaiChangementDirection=Random.Range(1,3);
		}


	//permet d'avoir un rayon de détection avec un enfant au nom de detection.
		if(Physics.Raycast(transform.Find('detection').position,transform.forward,rayonToucher))
		{
			
	//condition pour connaitre la distance entre le lutin et un objet.
		if(rayonToucher.distance<3)
			{
			//permet de changer de direction à l'oposé.
				transform.rotation=Quaternion.Slerp(transform.rotation,transform.rotation*Quaternion.Euler(0,nouvelleRotation,0),0.5*Time.deltaTime);
				//Debug.Log('rotationChanger');
				//Debug.Log(transform.rotation);
			}
			else{
		//permet de changer de direction avec la rotation avec 3 paramètre. Le premier est la position actuel. 
		//Le deuxième est une rotation qui tourne sur les axe z,x,y qu'on passe les paramètre.
		//On passe une valeur alléatoire sur l'axe du Y.
			transform.rotation=Quaternion.Slerp(transform.rotation,Quaternion.Euler(0,nouvelleRotation,0),0.5*Time.deltaTime);
			//Debug.Log('rotationToutTemps');
		}
		
	}
	//permet de changer la position local du lutin dans le monde avec la function public transform.TransformDirection
	deplacementDirection=transform.TransformDirection(deplacementDirection);

}


//permet de voir le rayon
Debug.DrawRay(transform.Find('detection').position,transform.forward,Color.red,5);


//soustraction de la gravité selon le temps.
	deplacementDirection.y-=gravite*Time.deltaTime;
//c'est le déplacement du controleurLutin avec la fonction Move dans une direction multiplier par le temps.
	controleurLutin.Move(deplacementDirection*Time.deltaTime);
}/*fin du update*/

//function permettant le changement de direction si le lutin touche de quoi que le rayon ne détecte pas.
function OnControllerColliderHit(rayonToucher:ControllerColliderHit)
{
	//permet de changer de direction à l'oposé.
		transform.rotation=Quaternion.Slerp(transform.rotation,transform.rotation*Quaternion.Euler(0,nouvelleRotation,0),0.5*Time.deltaTime);
		//Debug.Log('rotationChangerEnCollision');
		//Debug.Log(transform.rotation);
	
	}


	//Si le héros est détecté à proximité, l'ogre se met en mode attaque.
function OnTriggerEnter(autreObjet:Collider) {
    if(autreObjet.gameObject.tag=='heros')
	{
		
		Debug.Log('contact avec heros');

	}

}

