#pragma strict

/**
* Script de gestion des comportements du lutin.
* @author stéphane Leclerc
* @référence tuto pour le déplacement autonome: https://www.youtube.com/watch?v=SLzZqrkXDVA&list=PLB87FA10C02CC3CA8&index=33
* @référence tuto pour suivre le heros: https://www.youtube.com/watch?v=VoJkh4AmV3I&index=34&list=PLB87FA10C02CC3CA8
* @date 20-01-2015
*/

/*
* acces au personnage ennemi qui est un Lutin
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
private var directionHeros:Vector3;

 /*
* les points de vie du Lutin
* @access private
* @var nombreVieLutin
*/
private var nombreVieLutin:float=5;

/*
* condition pour savoir s'il y a contact avec le héros
* @access private
* @var contactHeros
*/
private var contactHeros:boolean=false;

 /*
* c'est la quantite total des potion
* @access private
* @var int
*/
private var quantitePotionSort:int=0;

/*
* Contient le script scAffichage.js
* @access private
* @var scAffichageTP.js
*/
private var gestionJeu: scGestionJeu;

/*
* GameObject canvas contient panneaux d'affichage
* @access private
* @var GameObject
*/
 private var canvas: GameObject;

  


function Start () {
//initialisation du temps de délai aléatoire avant de changer de direction.
	delaiChangementDirection=Random.Range(1,3);
//permet de donner une valeur aléatoire entre 0 et 360 degres
	nouvelleRotation=Random.Range(0,90);
//il va chercher le CharacterController qui est mis dans la variable controleurLutin
	controleurLutin=this.GetComponent('CharacterController');
	gestionJeu = GameObject.FindWithTag("heros").GetComponent(scGestionJeu);

	 //gestionscAffichage=canvas.GetComponent.<scAffichage>();

}

function Update () {

//permet l'affichage de la quantité total des potion de Sort
     //gestionscAffichage.quantitePotionSort(objet01, quantitePotionSort);

//trouver le heros et le suivre selon le tag avec sa position et celui du lutin.
	directionHeros=GameObject.FindWithTag('heros').transform.position-transform.position;
//empêche le lutin de monter lorsque le heros monte ou vole.
	directionHeros.y=0;



		//appelle de fonction pour le déplacement du lutin.
		deplacementLutin();
	


//permet de voir le rayon
//Debug.DrawRay(transform.Find('detection').position,transform.forward,Color.red,5);


//soustraction de la gravité selon le temps.
	deplacementDirection.y-=gravite*Time.deltaTime;
//c'est le déplacement du controleurLutin avec la fonction Move dans une direction multiplier par le temps.
	controleurLutin.Move(deplacementDirection*Time.deltaTime);


	//détermine la mort ou pas du Lutin

	if(nombreVieLutin<=0)
	{
		mortLutin();
		//Debug.Log('pointdeviedescendLutin');
	}
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
function OnTriggerEnter(autreObjet:Collider)
{
    if(autreObjet.gameObject.tag=='heros')
	{
	//Il y a contact avec le heros.
		contactHeros=true;
		Debug.Log('contact avec heros');
		gestionJeu.reductionPotionSort();
//		Debug.Log(quantitePotionSort);

	}
}



function deplacementLutin()
{
//s'il n'y a pas contact avec le héros
	if(!contactHeros)
	{
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
//condition permettant le changement de direction selon le temps écouler avec la public stati fixedTime.
	if(changementDirection+delaiChangementDirection<Time.fixedTime)
			{

				nouvelleRotation=Random.Range(0,180);
		//réafection du changementDirection avec le fixedTime;
				changementDirection=Time.fixedTime;
		//réafection du delaiChangementDirection aléatoirement.
				delaiChangementDirection=Random.Range(1,3);
			}
		}
	}else{

//permet au lutin de changer de direction opposer au heros pour le fuir.
		transform.rotation=Quaternion.Euler(0,nouvelleRotation,0);
		//Debug.Log(transform.position);
		//Debug.Log('entreElse');
		//Debug.Log(transform.rotation);
	}
	//Debug.Log('entreForward');
	//initialisation de deplacementDirection avec la public static forward qui permet d'avancer.
			deplacementDirection=Vector3.forward*vitesse;
			//Debug.Log(deplacementDirection);
	//permet d'avoir un rayon de détection avec un enfant au nom de detection.
	if(Physics.Raycast(transform.Find('detection').position,transform.forward,rayonToucher))
		{
			//Debug.Log('entreDetectionFind');
	//condition pour connaitre la distance entre le lutin et un objet.
		if(rayonToucher.distance<3)
			{
			//Debug.Log('distanceRaysonToucher');
			//permet de changer de direction à l'oposé.
				transform.rotation=Quaternion.Slerp(transform.rotation,transform.rotation*Quaternion.Euler(0,nouvelleRotation,0),0.5*Time.deltaTime);
				//Debug.Log('rotationChanger');
				//Debug.Log(transform.rotation);
				//Debug.Log(rayonToucher.distance);
			}
			else{
		//permet de changer de direction avec la rotation avec 3 paramètre. Le premier est la position actuel. 
		//Le deuxième est une rotation qui tourne sur les axe z,x,y qu'on passe les paramètre.
		//On passe une valeur alléatoire sur l'axe du Y.
			transform.rotation=Quaternion.Slerp(transform.rotation,Quaternion.Euler(0,nouvelleRotation,0),0.5*Time.deltaTime);
			//Debug.Log('rotationToutTemps');
			//Debug.Log(transform.rotation);
		}
		
	}
	//permet de changer la position local du lutin dans le monde avec la function public transform.TransformDirection
	deplacementDirection=transform.TransformDirection(deplacementDirection);
}


//function pour la mort du lutin

function mortLutin()
	{
		var bonus:GameObject = Instantiate (Resources.Load ("potionSort")) as GameObject;
    	bonus.transform.position = lutin.transform.position;
    	bonus.AddComponent.<BoxCollider>();
    	bonus.GetComponent(BoxCollider).isTrigger = true;
    	bonus.tag = "bonbon";
		Destroy(lutin);
		//Debug.Log('mortLutin');
	}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:int) 
{
    nombreVieLutin -= dommages;
   //Debug.Log(nombreVieLutin);
}


