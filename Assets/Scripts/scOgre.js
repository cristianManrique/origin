#pragma strict

/**
* Script de gestion des comportements de l'ogre.
* @author David Lachambre
* @update 20-01-2016
*/


/*
* Vitesse de déplacement lors de l'attaque.
* @access private
* @var float
*/
public var vitessePoursuite:float = 10.0;

/*
* Vitesse lors d'un arrêt.
* @access public
* @var float
*/
public var vitesseArret:float = 0.0;

/*
* Vitesse de rotation de l'ogre.
* @access public
* @var float
*/
public var vitesseRotation:float = 2.0;

/*
* Vitesse de déplacement régulière.
* @access private
* @var float
*/
public var vitessePatrouille:float = 1.0;

/*
* Tableau qui contient toutes les destinations des patrouilles.
* @access public
* @var Transform[]
*/
public var destinationsPatrouille:Transform[];

/*
* Controleur navMeshAgent de l'ogre.
* @access private
* @var NavMeshAgent
*/
private var navMeshOgre:NavMeshAgent;

/*
* Cible de l'ogre (héros).
* @access private
* @var Transform
*/
private var cible:Transform;

/*
* Destination actuelle de l'ogre en mode patrouille.
* @access private
* @var int
*/
private var destinationPatrouilleActuelle:int;

/*
* Le temps de pause entre chaque nouvelle destination lors d'une patrouille.
* @access private
* @var float
*/
public var tempsPausePatrouille : float = 2;

/*
* Le temps actuel dans le jeu.
* @access private
* @var float
*/
private var tempsActuel: float;
/*
* Vitesse de déplacement.
* @access private
* @var float
*/
private var vitesse:float;

/*
* Distance restante entre le héros et l'ogre.
* @access private
* @var float
*/
private var distanceHeros:float;

/*
* Distance en bas de laquelle l'ogre se met en mode attaque (frapper le heros).
* @access private
* @var float
*/
public var distanceFrapper:float = 1.5;

/*
* Distance en bas de laquelle l'ogre se met en mode poursuite.
* @access private
* @var float
*/
public var distancePoursuite:float = 15.0;

/*
* État de santé de l'ogre
* @access private
* @var float
*/
private var pointsVieOgre:float = 5.0;

/*
* Détermine la vitesse à laquelle l'ogre retombe au sol.
* @access private
* @var float
*/
private var gravite:float = 10.0;

/*
* Temps en secondes avant que l'ogre ne donne un autre coup de massue.
* @access private
* @var int
*/
public var delaiCoupOgre:int = 2;

/*
* Détermine si l'ogre doit frapper avec sa massue.
* @access private
* @var boolean
*/
private var donnerUnCoup:boolean = false;

/*
* GameObject canvas contient panneaux d'affichage
* @access private
* @var GameObject
*/
private var canvas: GameObject;

/*
* Contient le script scAffichage.js
* @access private
* @var scAffichageTP.js
*/
private var gestionscAffichage: scAffichage;

/*
* Détermine si touche par un sort du heros
* @access private
* @var boolean
*/
private var estGele: boolean;

/**
* Contient l'animateur de l'ogre
* @access private
* @var Animator
*/
private var animateur: Animator;

/**
* Velocite horizontale de l'ogre
* @access private
* @var Vector3
*/
private var velociteHorizontale: Vector3;

/**
* Massue de l'ogre
* @access public
* @var GameObject
*/
public var massue: GameObject;

/**
* Collider de la massue de l'ogre
* @access private
* @var Collider
*/
private var colliderMassue: Collider;

/**
* Distance du prochain point de patrouille qui fait arrêter l'ogre.
* @access private
* @var float
*/
private var distanceArret: float = 2.0;



function Start () {

    animateur = this.gameObject.GetComponent.<Animator>();
    //Initialisation et configuration du navMeshAgent
    navMeshOgre = this.gameObject.GetComponent(NavMeshAgent);
    navMeshOgre = GetComponentInChildren(NavMeshAgent);
    navMeshOgre.updateRotation = true;
    
    colliderMassue = massue.GetComponent(CapsuleCollider);
    
    cible = GameObject.FindWithTag("heros").transform;

    canvas = GameObject.FindWithTag("canvas");//chercher canvas
    gestionscAffichage=canvas.GetComponent.<scAffichage>();//:: Chercher LE SCRIPT
}

function Update () {

    velociteHorizontale = Vector3(navMeshOgre.velocity.x, 0, navMeshOgre.velocity.z);
    var vitesseHorizontale: float = velociteHorizontale.magnitude;
    animateur.SetFloat('vitesse', vitesseHorizontale);

    if (!estGele) {//Si le lutin n'est pas gelé...
        distanceHeros = Vector3.Distance (this.transform.position, cible.transform.position);//Calcul de la distance entre l'ogre et le héros.

        if (distanceHeros < distanceFrapper) {//Si suffisamment près pour attaquer...
            frapper();
    //        Debug.Log("frappe");
        }
        else if (distanceHeros < distancePoursuite) {//Si le héros est assez près pour être poursuivi...
            //Debug.Log("poursuite");
            poursuivre();
        }
        else {//Si le héros n'est pas suffisamment près...
            if(destinationPatrouilleActuelle < destinationsPatrouille.length){
                patrouiller();
                //Debug.Log("patrouille");
            }
            else {
                destinationPatrouilleActuelle = 0;//Reset de la prochaine destination de patrouille.
            }
        }
    }
    if (pointsVieOgre <= 0) {//L'ogre est mort
//    	Debug.Log('entre fonction moins 0');
        mort();
    }
}

//Méthode d'attaque de l'ogre.
function frapper () {
    
    navMeshOgre.speed = vitesseArret;
    navMeshOgre.SetDestination(this.transform.position);//Brake
    
    //Rotation vers le héros même en position arrêté.
    var positionHeros : Vector3 = cible.position - this.transform.position;
    var nouvelleRotation = Quaternion.LookRotation(positionHeros);
    this.transform.rotation = Quaternion.Lerp(this.transform.rotation, nouvelleRotation, vitesseRotation * Time.deltaTime);
    
//    if (donnerUnCoup) {//Si le temps est venu de frapper...
        animateur.SetTrigger('frapper');
//        donnerUnCoup = false;
        //Code pour donner un coup par animation
//        yield WaitForSeconds(delaiCoupOgre);//Timer...
//        donnerUnCoup = true;
//    }
}

//Méthode de poursuite de l'ogre.
function poursuivre () {
    navMeshOgre.speed = vitessePoursuite;
    navMeshOgre.SetDestination(cible.transform.position);//Poursuite du héros.
}

//Méthode de patrouille de l'ogre.
function patrouiller () { 
    
    navMeshOgre.speed = vitessePatrouille;
    
    //CODE SOURCE : http://answers.unity3d.com/questions/429623/enemy-movement-from-waypoint-to-waypoint.html
    //-----------------------------------------------

    var ciblePatrouille: Transform = destinationsPatrouille[destinationPatrouilleActuelle];
    navMeshOgre.SetDestination(ciblePatrouille.position);
    ciblePatrouille.position.y = this.transform.position.y; // Garde la destination à la hauteur du personnage
    
    var distanceDestination = Vector3.Distance (this.transform.position, ciblePatrouille.position);//Calcul de la distance entre l'ogre et sa destination de patrouille.
    if(distanceDestination <= distanceArret) {//Si rendu à destination...
        //Arrêt de l'ogre.
        navMeshOgre.speed = vitesseArret;
        navMeshOgre.SetDestination(this.transform.position);//Brake
        
        if (tempsActuel == 0) {
            tempsActuel = Time.time; // Pause sur chaque destination
        }
        if ((Time.time - tempsActuel) >= tempsPausePatrouille){//Si le temps de pause est écoulé...
            destinationPatrouilleActuelle++;//Prochaine destination.
            navMeshOgre.SetDestination(ciblePatrouille.position);
            tempsActuel = 0;//Reset du temps.
        }
    }
    //-----------------------------------------------
}

//Méthode qui détermine ce qui arrive quand l'ogre est tué, soit sa destruction et l'apparition d'une récompense.
function mort() {
    var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesRecompense")) as GameObject;
    etoiles.transform.position = this.gameObject.transform.position;
    var bonus:GameObject = Instantiate (Resources.Load ("Prefabs/Objets/gateau")) as GameObject;
    bonus.transform.position = this.gameObject.transform.position;
    Destroy(this.gameObject);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:float) {
    
    pointsVieOgre -= dommages;
    if (pointsVieOgre > 0) {
        var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesEnnemiTouche")) as GameObject;
        etoiles.transform.position = this.gameObject.transform.position;
    }
//    Debug.Log(pointsVieOgre);
}

//Gèle et dégèle l'ennemi avant et après avoir été touché par un sort
function setEstGele (state:boolean) {
    estGele = state;
}

//Le collider de la massue de l'ogre est active par un animation event quand il donne un coup et desactive lorsdque le coup a ete donnee
function toggleColliderMassue() {
    
    if (colliderMassue.enabled) {
        colliderMassue.enabled = false;
    }
    else {
        colliderMassue.enabled = true;
    }
}