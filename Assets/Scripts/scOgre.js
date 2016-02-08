#pragma strict

/**
* Script de gestion des comportements de l'ogre.
* @author David Lachambre
* @update 20-01-2016
*/

/*
* Ogre
* @access public
* @var GameObject
*/
public var ogre:GameObject;

/*
* controleur de l'ogre.
* @access public
* @var CharacterController
*/
public var controleurOgre:CharacterController;

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
public var cible:Transform;

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
private var tempsPausePatrouille : float = 2;

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
* Distance à laquelle l'ogre se met en mode poursuite.
* @access private
* @var float
*/
private var distancePoursuite:float = 1.5;

/*
* Distance à laquelle l'ogre se met en mode patrouille.
* @access private
* @var float
*/
private var distancePatrouille:float = 10.0;

/*
* État de santé de l'ogre
* @access private
* @var float
*/
private var pointsVieOgre:float = 10.0;

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
private var delaiCoupOgre:int = 2;

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

function Start () {

    
    //Initialisation et configuration du navMeshAgent
    navMeshOgre = ogre.GetComponent(NavMeshAgent);
    navMeshOgre = GetComponentInChildren(NavMeshAgent);
    navMeshOgre.updateRotation = true;
    navMeshOgre.updatePosition = true;
    
    cible = GameObject.FindWithTag("heros").transform;
    
    controleurOgre = ogre.GetComponent(CharacterController);

    canvas = GameObject.FindWithTag("canvas");//chercher canvas
    gestionscAffichage=canvas.GetComponent.<scAffichage>();//:: Chercher LE SCRIPT
}

function Update () {

    distanceHeros = Vector3.Distance (this.transform.position, cible.transform.position);//Calcul de la distance entre l'ogre et le héros.
    
    if (distanceHeros < distancePoursuite) {//Si suffisamment près pour attaquer...
        frapper();
//        Debug.Log("frappe"); 
    }
    else if (distanceHeros < distancePatrouille) {//Si le héros est assez près pour être poursuivi...
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
//    var position3D:Vector3 = Vector3(0,0,0);//Vecteur de déplacement (x,y,z).
//    position3D.y -= gravite * Time.deltaTime;//Permet d'appliquer la gravite sur l'ogre en diminuant progressivement la hauteur sur l'axe des Y.
//    controleurOgre.Move(position3D);//Appliquer la gravité seulement, le déplacement en x et z est régi par le navMesh.

  
    if (pointsVieOgre <= 0) {//L'ogre est mort
    	Debug.Log('entre fonction moins 0');
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
    
    if (donnerUnCoup) {//Si le temps est venu de frapper...
        donnerUnCoup = false;
        //Code pour donner un coup par animation
        yield WaitForSeconds(delaiCoupOgre);//Timer...
        donnerUnCoup = true;
    }
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
    if(distanceDestination <= 1) {//Si rendu à destination...
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
    var bonus:GameObject = Instantiate (Resources.Load ("Prefabs/Objets/gateau")) as GameObject;
    bonus.transform.position = ogre.transform.position;
    Destroy(ogre);
    gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);//ne pas afficher Barre de vie de Ennemi

}




//Détermine la direction vers laquelle l'ogre doit tourner et le moment ou il doit changer de direction.
/*function gererDirection() {
    changementDirection = false;
    angleActuel = this.transform.eulerAngles;
    angleCible = angleActuel + incrementCible;
    //Debug.Log("tourne");
    yield WaitForSeconds(delaiAvantTourner);
    changementDirection = true;
}*/

//Détermine si l'ogre doit donner un coup et la fréquence de ceux-ci.
/*function frapper() {
    donnerUnCoup = false;
    //Code pour donner un coup par animation
    yield WaitForSeconds(delaiCoupOgre);
    donnerUnCoup = true;
>>>>>>> upstream/master
}*/


//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:int) {
    pointsVieOgre -= dommages;
    Debug.Log(pointsVieOgre);
}