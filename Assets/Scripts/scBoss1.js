#pragma strict

/**
* Script de gestion des comportements du boss 1.
* @author David Lachambre
* @update 12-02-2016
*/

/*
* La distance de tremblement de la camera
* @access public
* @var float
*/
public var distanceTremblementInitiale: float = 0.8;

/*
* La vitesse de diminution du tremblement de la camera
* @access public
* @var float
*/
public var decrementationTremblement: float = 0.5;

/*
* La vitesse de tremblement de la camera
* @access public
* @var float
*/
public var vitesseTremblement: float = 100.0;

/*
* Le nombre de tremblements de la camera (détermine la durée des tremblements)
* @access public
* @var int
*/
public var nombreTremblements: int = 20;

/*
* La camera du jeu
* @access public
* @var Camera
*/
public var cameraPrincipale: Camera;

/*
* Animateur du Boss 1
* @access public
* @var Animator
*/
public var animateurBoss1:Animator;

/*
* Vitesse de deplacement.
* @access private
* @var float
*/
public var vitesse:float = 4.0;

/*
* Vitesse de rotation du boss1.
* @access public
* @var float
*/
public var vitesseRotation:float = 2.0;

/*
* Tableau qui contient toutes les destinations des patrouilles.
* @access public
* @var Transform[]
*/
public var destinationsPatrouille:Transform[];

/*
* Vitesse lors d'un arret.
* @access public
* @var float
*/
private var vitesseArret:float = 0.0;

/*
* controleur du boss1.
* @access public
* @var CharacterController
*/
private var controleurBoss1:CharacterController;

/*
* Controleur navMeshAgent du boss1.
* @access private
* @var NavMeshAgent
*/
private var navMeshBoss1:NavMeshAgent;

/*
* Cible du boss1 (heros).
* @access private
* @var Transform
*/
private var cible:Transform;

/*
* Destination actuelle du boss1 en mode patrouille.
* @access private
* @var int
*/
private var destinationPatrouilleActuelle:int;

/*
* Le temps de pause entre chaque nouvelle destination lors d'une patrouille.
* @access private
* @var float
*/
private var tempsPause : float = 5;

/*
* Le temps actuel dans le jeu.
* @access private
* @var float
*/
private var tempsActuel: float;

/*
* Distance restante entre le heros et le boss1.
* @access private
* @var float
*/
private var distanceHeros:float;

/*
* Ã‰tat de sante du boss1
* @access private
* @var float
*/
private var pointsVieBoss1:float = 20.0;

/*
* determine la vitesse a laquelle le boss1 retombe au sol.
* @access private
* @var float
*/
private var gravite:float = 10.0;

/*
* Temps en secondes avant que le boss1 ne donne un autre coup.
* @access private
* @var int
*/
private var delaiTirBoss1:int = 2;

/*
* Temps en secondes avant que le boss1 ne saute.
* @access private
* @var int
*/
private var delaiSautBoss1:int = 5;

/*
* determine si le boss1 doit tirer.
* @access private
* @var boolean
*/
private var tirer:boolean = false;

/*
* determine si le boss1 doit sauter.
* @access private
* @var boolean
*/
private var sauter:boolean = false;

/*
* determine si le boss1 peut sauter.
* @access private
* @var boolean
*/
private var peutSauter:boolean = false;

/*
* determine si le boss1 est vivant.
* @access private
* @var boolean
*/
private var estVivant:boolean = true;

/*
* GameObject canvas contient panneaux d'affichage
* @access private
* @var GameObject
*/
private var canvas: GameObject;

/*
* GameObject rigidbody du boss
* @access private
* @var Rigidbody
*/
private var rigidBody: Rigidbody;

/*
* Permet l'acces au script scAffichage
* @access private
* @var scAffichage
*/
private var gestionscAffichage: scAffichage;

/*
* Décalage entre la hauteur du heros et la hauteur a laquelle un rocher est instancie
* @access private
* @var float
*/
private var decalageRocher: float = 10.0;

/*
* Décalage entre la position en X et Z du gros rocher et celle des petits
* @access private
* @var float
*/
private var decalagePositionPetitRocher: float = 5.0;

/*
* Décalage entre la position en Y du gros rocher et celle des petits
* @access private
* @var float
*/
private var decalageHauteurPetitRocher: float = 2.0;

/*
* Détermine si touche par un sort du heros
* @access private
* @var boolean
*/
 private var estGele: boolean;


function Start () {

    
    //Initialisation et configuration du navMeshAgent
    navMeshBoss1 = this.gameObject.GetComponent(NavMeshAgent);
    navMeshBoss1 = GetComponentInChildren(NavMeshAgent);
    navMeshBoss1.updateRotation = false;
    navMeshBoss1.updatePosition = true;
    
    cible = GameObject.FindWithTag("heros").transform;
    
    controleurBoss1 = this.gameObject.GetComponent(CharacterController);

    canvas = GameObject.FindWithTag("canvas");//chercher canvas
    gestionscAffichage=canvas.GetComponent.<scAffichage>();//:: Chercher LE SCRIPT
    
    gestionscAffichage.setBarreBoss(pointsVieBoss1);//Afficher le panneau + rempli barre de vie en fonction des points de vie du boss.
}

function Update () {

    if (pointsVieBoss1 <= 0) {//le boss1 est mort
//    	Debug.Log('entre fonction moins 0');
        estVivant = false;
        mort();
    }
    gestionscAffichage.EnnemiSlider.value = pointsVieBoss1;//Update de la barre de vie du boss
    
    if (estVivant && !estGele) {
        
        distanceHeros = Vector3.Distance (this.transform.position, cible.transform.position);//Calcul de la distance entre le boss1 et le heros.
    
        if(destinationPatrouilleActuelle >= destinationsPatrouille.length){
            destinationPatrouilleActuelle = 0;//Reset de la prochaine destination de patrouille.
        }

        patrouiller();

        //Le boss regarde toujours vers le heros.
        var positionHeros : Vector3 = cible.position - this.transform.position;
        var nouvelleRotation = Quaternion.LookRotation(positionHeros);
        this.transform.rotation = Quaternion.Lerp(this.transform.rotation, nouvelleRotation, vitesseRotation * Time.deltaTime);

        if (sauter && peutSauter) {//Si le Boss peut et doit sauter...
            peutSauter = false;//Ne pourra plus sauter.
            animateurBoss1.SetBool('sauter', true);//Saut par animation.
        }
        else {
            animateurBoss1.SetBool('sauter', false);
        }
        //Les animations de deplacement sont determinees par la velocite du boss.
        animateurBoss1.SetFloat('velociteX', navMeshBoss1.velocity.x / vitesse);
        animateurBoss1.SetFloat('velociteZ', navMeshBoss1.velocity.z / vitesse);
    }
}

//Methode de lancer d'un projectile du boss1.
function lancer () {
    
}

//Methode de patrouille du boss1.
//CODE SOURCE : http://answers.unity3d.com/questions/429623/enemy-movement-from-waypoint-to-waypoint.html
function patrouiller () {
    
    navMeshBoss1.speed = vitesse;

    var ciblePatrouille: Transform = destinationsPatrouille[destinationPatrouilleActuelle];
    navMeshBoss1.SetDestination(ciblePatrouille.position);
    ciblePatrouille.position.y = this.transform.position.y;// Garde la destination a la hauteur du personnage
    
    var distanceDestination = Vector3.Distance (this.transform.position, ciblePatrouille.position);//Calcul de la distance entre le boss1 et sa destination de patrouille.
    if(distanceDestination <= 1) {//Si rendu a destination...
        //Arret du boss1.
//        navMeshBoss1.speed = vitesseArret;

        if (peutSauter) {//Si le boss peut sauter...
            sauter = true;//Le Boss saute
        }
        else {
            sauter = false;
        }
        
        if (tempsActuel == 0) {
            tempsActuel = Time.time;// Pause sur chaque destination
        }
        if ((Time.time - tempsActuel) >= tempsPause){//Si le temps de pause est ecoule...
            destinationPatrouilleActuelle++;//Prochaine destination.
            navMeshBoss1.SetDestination(ciblePatrouille.position);
            tempsActuel = 0;//Reset du temps.
            peutSauter = true;//Peut à nouveau sauter.
        }
    }
}

//Methode qui determine ce qui arrive quand le boss1 est tue, soit sa destruction et l'apparition d'une recompense.
function mort() {
    
    navMeshBoss1.SetDestination(this.transform.position);//Brake
    animateurBoss1.SetBool('mort', true);
    navMeshBoss1.speed = vitesseArret;
    gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);//ne pas afficher Barre de vie de Ennemi

}

//Détruit le boss et instancie la potion qui permet de passer au niveau suivant.
function destructionBoss() {
    
    var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesRecompense")) as GameObject;
    etoiles.transform.position = this.gameObject.transform.position;
    
    var bonus:GameObject = Instantiate (Resources.Load ("Prefabs/Objets/potionReveille")) as GameObject;
    bonus.transform.position = this.gameObject.transform.position;
    
    Destroy(this.gameObject);
}

//Methode qui fait trembler le sol lors des sauts du boss. Appelé par un animation event.
//CODE SOURCE : https://www.youtube.com/watch?v=e1TYKuTtPW4
function tremblementTerre() {
    
    //Initialisation des variables de travail.
    var tempsDebutTremblement: float;
    var positionOriginaleX: float = cameraPrincipale.transform.localPosition.x;
    var positionOriginaleY: float = cameraPrincipale.transform.localPosition.y;
    var tremblement: int = nombreTremblements;
    var distanceTremblement: float = distanceTremblementInitiale;
    
    //appel la méthode qui instancie des rochers.
    pluieDeRochers();
    
    //Fait trembler la camera et diminue le tremblement de façon progressive.
    while (tremblement) {
        var minuterie: float = (Time.time - tempsDebutTremblement) * vitesseTremblement;
        cameraPrincipale.transform.localPosition.x = positionOriginaleX + Mathf.Sin(minuterie) * distanceTremblement;
        cameraPrincipale.transform.localPosition.y = positionOriginaleY + Mathf.Sin(minuterie) * distanceTremblement;
        
        if (minuterie > Mathf.PI * 2) {
            tempsDebutTremblement = Time.time;
            distanceTremblement *= decrementationTremblement;
            tremblement--;
        }
        yield;
    }
    //Retour aux valeurs initiales de la camera.
    cameraPrincipale.transform.localPosition.x = positionOriginaleX;
    cameraPrincipale.transform.localPosition.y = positionOriginaleY;
}

//Methode qui instancie des rochers et les fait tomber au sol.
function pluieDeRochers() {
    
    var grosRocher: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/grosRocherProjectile")) as GameObject;
    grosRocher.transform.position = cible.transform.position;
    grosRocher.transform.position.y = cible.transform.position.y + decalageRocher;
    
    var petitRocher1: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/petitRocherProjectile")) as GameObject;
    petitRocher1.transform.position = grosRocher.transform.position;
    petitRocher1.transform.position.z = grosRocher.transform.position.z + Random.Range(-decalagePositionPetitRocher, decalagePositionPetitRocher);
    petitRocher1.transform.position.y = grosRocher.transform.position.y + Random.Range(0, decalageHauteurPetitRocher);
    
    var petitRocher2: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/petitRocherProjectile")) as GameObject;
    petitRocher2.transform.position = grosRocher.transform.position;
    petitRocher2.transform.position.z = grosRocher.transform.position.z + Random.Range(-decalagePositionPetitRocher, decalagePositionPetitRocher);
    petitRocher2.transform.position.y = grosRocher.transform.position.y + Random.Range(0, decalageHauteurPetitRocher);
    
    var petitRocher3: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/petitRocherProjectile")) as GameObject;
    petitRocher3.transform.position = grosRocher.transform.position;
    petitRocher3.transform.position.z = grosRocher.transform.position.z + Random.Range(-decalagePositionPetitRocher, decalagePositionPetitRocher);
    petitRocher3.transform.position.y = grosRocher.transform.position.y + Random.Range(0, decalageHauteurPetitRocher);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:float) {
    pointsVieBoss1 -= dommages;
//    Debug.Log(pointsVieBoss1);
}

//Gèle et dégèle l'ennemi avant et après avoir été touché par un sort
function setEstGele (state:boolean) {
    estGele = state;
}