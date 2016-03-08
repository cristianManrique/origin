#pragma strict

/**
* Script de gestion des comportements du petit diable.
* @author David Lachambre
* @date 21-01-2016
*/

/*
* controleur du diable.
* @access public
* @var CharacterController
*/
public var controleurDiable:CharacterController;

/*
* Vitesse de déplacement lors de l'attaque.
* @access private
* @var float
*/
public var vitessePoursuite:float = 4.0;

/*
* Vitesse lors d'un arrêt.
* @access public
* @var float
*/
public var vitesseArret:float = 0.0;

/*
* Controleur navMeshAgent du diable.
* @access private
* @var NavMeshAgent
*/
private var navMeshDiable:NavMeshAgent;

/*
* Cible de du diable (héros).
* @access public
* @var Transform
*/
public var cible:Transform;

/*
* Distance restante entre le héros et le diable.
* @access private
* @var float
*/
private var distanceHeros:float;

/*
* Distance à laquelle l'ogre se met en mode patrouillee.
* @access private
* @var float
*/
private var distanceRepos:float = 15.0;

/*
* Distance à laquelle le diable donne des coups de fourche.
* @access private
* @var float
*/
private var distancePoursuite:float = 2;

/*
* État de santé de l'diable
* @access private
* @var float
*/
private var pointsVieDiable:float = 3.0;

/*
* Détermine la vitesse à laquelle le diable retombe au sol.
* @access private
* @var float
*/
private var gravite:float = 10.0;

/*
* Temps en secondes avant que l'diable ne donne un autre coup de fourche.
* @access private
* @var int
*/
private var delaiCoupDiable:int = 1;

/*
* Détermine si le diable doit frapper avec sa fourche.
* @access private
* @var boolean
*/
private var donnerUnCoup:boolean = false;
/*
* Contient le GameObject héros
* @access private
* @var GameObject
*/
private var heros:GameObject;

/*
* Détermine si touche par un sort du heros
* @access private
* @var boolean
*/
 private var estGele: boolean;

/**
* Contient l'animateur du diable
* @access private
* @var Animator
*/
private var animateurDiable: Animator;

/**
* Collider de la fourche du diable
* @access private
* @var Collider
*/
private var colliderFourche: Collider;

/**
* Fourche du diable
* @access public
* @var GameObject
*/
public var fourche: GameObject;

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
public var sonBlesse: AudioClip;


function Start () {
	heros =	GameObject.FindWithTag('heros');
	cible = heros.transform;
    
    colliderFourche = fourche.GetComponent(BoxCollider);
    
    //Initialisation et configuration du navMeshAgent
    navMeshDiable = this.gameObject.GetComponent(NavMeshAgent);
    navMeshDiable = GetComponentInChildren(NavMeshAgent);
    navMeshDiable.updateRotation = false;
    navMeshDiable.updatePosition = true;    
    controleurDiable = this.gameObject.GetComponent(CharacterController);
    
    //permet d'avoir l'animateur pour l'animation du personnage.
    animateurDiable = this.gameObject.GetComponent.<Animator>();

    sourceSon = GetComponent.<AudioSource>();
}

function Update () {
    
    if (!estGele) {//Si le lutin n'est pas gelé...
        distanceHeros = Vector3.Distance (this.transform.position, cible.position);//Calcul de la distance entre le diable et le héros.

        if (distanceHeros < distancePoursuite ) {//Si suffisamment près pour attaquer...
            this.transform.LookAt(Vector3(cible.position.x, this.transform.position.y, cible.position.z));
            frapper();
            animateurDiable.SetBool('attaqueDiable', true);

        }
        else if (distanceHeros < distanceRepos) {//Si le héros est assez près pour être poursuivi...
    //        Debug.Log("poursuite");
    		
            this.transform.LookAt(Vector3(cible.position.x, this.transform.position.y, cible.position.z));
            animateurDiable.SetBool("courirDiable",true);
            poursuivre();
            
           
          
        }
        else {//Si le héros n'est pas suffisamment près...
                seReposer();
            animateurDiable.SetBool("reposDiable",true);
           
    //            Debug.Log("en repos");
        }
        var position3D:Vector3 = Vector3(0,0,0);//Vecteur de déplacement (x,y,z).
        position3D.y -= gravite * Time.deltaTime;//Permet d'appliquer la gravite sur le diable en diminuant progressivement la hauteur sur l'axe des Y.
        controleurDiable.Move(position3D);//Appliquer la gravité seulement, le déplacement en x et z est régi par le navMesh.
        if (pointsVieDiable <= 0) {//Le diable est mort
            mort();
        }
    }
}

//Méthode d'attaque du diable.
function frapper () {

    

    navMeshDiable.speed = vitesseArret;
    navMeshDiable.SetDestination(this.transform.position);//Brake
   
    
    if (donnerUnCoup) {//Si le temps est venu de frapper...
    	
        donnerUnCoup = false;
        //Code pour donner un coup par animation
        yield WaitForSeconds(delaiCoupDiable);//Timer...
        donnerUnCoup = true;

    }
}

//Méthode de poursuite du diable.
function poursuivre () {
    navMeshDiable.speed = vitessePoursuite;
    navMeshDiable.SetDestination(cible.position);//Poursuite du héros.
   
   
}

//Méthode de repos du diable.
function seReposer () {
    navMeshDiable.speed = vitesseArret;
    
    //Code anim repos (assoir au sol).
}

//Méthode qui détermine ce qui arrive quand le diable est tué, soit sa destruction et l'apparition d'une récompense.
function mort() {

	sourceSon.PlayOneShot(sonBlesse);
    
    var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesRecompense")) as GameObject;
    etoiles.transform.position = this.gameObject.transform.position;
    var bonus:GameObject = Instantiate (Resources.Load ("Prefabs/Objets/cupcake")) as GameObject;
    bonus.transform.position = this.gameObject.transform.position;
    //bonus.AddComponent.<BoxCollider>();
    //bonus.GetComponent(BoxCollider).isTrigger = true;
    bonus.tag = "bonbon";
    Destroy(this.gameObject);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:float) {

	sourceSon.PlayOneShot(sonBlesse);

    pointsVieDiable -= dommages;
    if (pointsVieDiable > 0) {
        var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesEnnemiTouche")) as GameObject;
        etoiles.transform.position = this.gameObject.transform.position;
    }
//    Debug.Log("pointsVieDiable");
}

//Gèle et dégèle l'ennemi avant et après avoir été touché par un sort
function setEstGele (state:boolean) {
    estGele = state;
}

//Le collider de la massue de l'ogre est active par un animation event quand il donne un coup et desactive lorsdque le coup a ete donnee
function toggleColliderFourche() {
    
    if (colliderFourche.enabled) {
        colliderFourche.enabled = false;
    }
    else {
        colliderFourche.enabled = true;
    }
}