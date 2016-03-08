#pragma strict

/**
* Script de gestion des comportements du boss 2.
* @author David Lachambre
* @update 14-02-2016
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
public var animateurBoss2:Animator;

/*
* Vitesse de deplacement.
* @access private
* @var float
*/
public var vitesse:float = 4.0;

/*
* Vitesse de rotation du Boss2.
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
* controleur du Boss2.
* @access public
* @var CharacterController
*/
private var controleurBoss2:CharacterController;

/*
* Controleur navMeshAgent du Boss2.
* @access private
* @var NavMeshAgent
*/
private var navMeshBoss2:NavMeshAgent;

/*
* Cible du Boss2 (heros).
* @access private
* @var Transform
*/
private var cible:Transform;

/*
* Destination actuelle du Boss2 en mode patrouille.
* @access private
* @var int
*/
private var destinationPatrouilleActuelle:int;

/*
* Le temps de pause entre chaque nouvelle destination lors d'une patrouille.
* @access private
* @var float
*/
private var tempsPause : float = 3.5;

/*
* Le temps actuel dans le jeu.
* @access private
* @var float
*/
private var tempsActuel: float;

/*
* Distance restante entre le heros et le Boss2.
* @access private
* @var float
*/
private var distanceHeros:float;

/*
* Ã‰tat de sante du Boss2
* @access private
* @var float
*/
private var pointsVieBoss2:float = 30.0;

/*
* determine la vitesse a laquelle le Boss2 retombe au sol.
* @access private
* @var float
*/
private var gravite:float = 10.0;

/*
* Temps en secondes avant que le Boss2 ne donne un autre coup.
* @access private
* @var int
*/
private var delaiTirBoss2:int = 2;

/*
* Temps en secondes avant que le Boss2 ne saute.
* @access private
* @var int
*/
private var delaiSautBoss2:int = 5;

/*
* determine si le Boss2 doit tirer.
* @access private
* @var boolean
*/
private var tirer:boolean = false;

/*
* determine si le Boss2 doit sauter.
* @access private
* @var boolean
*/
private var sauter:boolean = false;

/*
* determine si le Boss2 peut sauter.
* @access private
* @var boolean
*/
private var peutSauter:boolean = false;

/*
* determine si le Boss2 est vivant.
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
* Décalage entre la hauteur du heros et la hauteur a laquelle un morceau de lave est instancie
* @access private
* @var float
*/
private var decalageMorceauLave: float = 10.0;

/*
* Décalage entre la position en X et Z du gros morceau de lave et celle des petits
* @access private
* @var float
*/
private var decalagePositionPetitMorceauLave: float = 5.0;

/*
* Décalage entre la position en Y du gros morceau de lave et celle des petits
* @access private
* @var float
*/
private var decalageHauteurPetitMorceauLave: float = 2.0;

/*
* Détermine si touche par un sort du heros
* @access private
* @var boolean
*/
 private var estGele: boolean;

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

/*
* Contient le son se blesser
* @access public
* @var AudioClip
*/
public var sonMort: AudioClip;

/*
* Son produit quand la boule eclat
* @access public
* @var AudioClip
*/
public var sonEclater: AudioClip;


function Start () {

    animateurBoss2.SetBool('enDeplacement', true);
    //Initialisation et configuration du navMeshAgent
    navMeshBoss2 = this.gameObject.GetComponent(NavMeshAgent);
    navMeshBoss2 = GetComponentInChildren(NavMeshAgent);
    navMeshBoss2.updateRotation = false;
    navMeshBoss2.updatePosition = true;
    
    cible = GameObject.FindWithTag("heros").transform;
    
    controleurBoss2 = this.gameObject.GetComponent(CharacterController);

    canvas = GameObject.FindWithTag("canvas");//chercher canvas
    gestionscAffichage=canvas.GetComponent.<scAffichage>();//:: Chercher LE SCRIPT
    gestionscAffichage.setBarreBoss(pointsVieBoss2);//Afficher le panneau + rempli barre de vie en fonction des points de vie du boss.

    sourceSon = GetComponent.<AudioSource>();
}

function Update () {

    if (pointsVieBoss2 <= 0) {//le Boss2 est mort
        estVivant = false;
        mort();
    }
    gestionscAffichage.EnnemiSlider.value = pointsVieBoss2;//Update de la barre de vie du boss
    
    if (estVivant && !estGele) {
        
        distanceHeros = Vector3.Distance (this.transform.position, cible.transform.position);//Calcul de la distance entre le Boss2 et le heros.
    
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
            animateurBoss2.SetTrigger('sauter');//Saut par animation.
        }
        //Les animations de deplacement sont determinees par la velocite et la vitesse du boss.
        animateurBoss2.SetFloat('velociteX', navMeshBoss2.velocity.x / vitesse);
        animateurBoss2.SetFloat('velociteZ', navMeshBoss2.velocity.z / vitesse);
    }
}

//Methode de lancer d'un projectile du Boss2.
function lancer () {
    
}

//Methode de patrouille du Boss2.
//CODE SOURCE : http://answers.unity3d.com/questions/429623/enemy-movement-from-waypoint-to-waypoint.html
function patrouiller () {
    
    navMeshBoss2.speed = vitesse;

    var ciblePatrouille: Transform = destinationsPatrouille[destinationPatrouilleActuelle];
    navMeshBoss2.SetDestination(ciblePatrouille.position);
    ciblePatrouille.position.y = this.transform.position.y;// Garde la destination a la hauteur du personnage
    
    var distanceDestination = Vector3.Distance (this.transform.position, ciblePatrouille.position);//Calcul de la distance entre le Boss2 et sa destination de patrouille.
    if(distanceDestination <= 1) {//Si rendu a destination...
        //Arret du Boss2.

        animateurBoss2.SetBool('enDeplacement', false);
        
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
            animateurBoss2.SetBool('enDeplacement', true);
            destinationPatrouilleActuelle++;//Prochaine destination.
            navMeshBoss2.SetDestination(ciblePatrouille.position);
            tempsActuel = 0;//Reset du temps.
            peutSauter = true;//Peut à nouveau sauter.
        }
    }
}

//Methode qui determine ce qui arrive quand le Boss2 est tue, soit sa destruction et l'apparition d'une recompense.
function mort() {

	sourceSon.PlayOneShot(sonMort);
	    
    navMeshBoss2.SetDestination(this.transform.position);//Brake
    animateurBoss2.SetTrigger('mort');
    navMeshBoss2.speed = vitesseArret;
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
    
    //appel la méthode qui instancie des morceaux de lave.
    pluieDeLave();
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

//Methode qui instancie des morceaux de lave et les fait tomber au sol.
function pluieDeLave() {
    
    var grosMorceauLave: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/grosMorceauLaveProjectile")) as GameObject;
    grosMorceauLave.transform.position = cible.transform.position;
    grosMorceauLave.transform.position.y = cible.transform.position.y + decalageMorceauLave;
    
    var petitMorceauLave1: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/petitMorceauLaveProjectile")) as GameObject;
    petitMorceauLave1.transform.position = grosMorceauLave.transform.position;
    petitMorceauLave1.transform.position.z = grosMorceauLave.transform.position.z + Random.Range(-decalagePositionPetitMorceauLave, decalagePositionPetitMorceauLave);
    petitMorceauLave1.transform.position.y = grosMorceauLave.transform.position.y + Random.Range(0, decalageHauteurPetitMorceauLave);
    
    var petitMorceauLave2: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/petitMorceauLaveProjectile")) as GameObject;
    petitMorceauLave2.transform.position = grosMorceauLave.transform.position;
    petitMorceauLave2.transform.position.z = grosMorceauLave.transform.position.z + Random.Range(-decalagePositionPetitMorceauLave, decalagePositionPetitMorceauLave);
    petitMorceauLave2.transform.position.y = grosMorceauLave.transform.position.y + Random.Range(0, decalageHauteurPetitMorceauLave);
    
    var petitMorceauLave3: GameObject = Instantiate (Resources.Load ("Prefabs/Objets/petitMorceauLaveProjectile")) as GameObject;
    petitMorceauLave3.transform.position = grosMorceauLave.transform.position;
    petitMorceauLave3.transform.position.z = grosMorceauLave.transform.position.z + Random.Range(-decalagePositionPetitMorceauLave, decalagePositionPetitMorceauLave);
    petitMorceauLave3.transform.position.y = grosMorceauLave.transform.position.y + Random.Range(0, decalageHauteurPetitMorceauLave); 

    sourceSon.PlayOneShot(sonEclater);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:float) {

	sourceSon.PlayOneShot(sonBlesse);
    
    pointsVieBoss2 -= dommages;
    if (estVivant) {
        var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesEnnemiTouche")) as GameObject;
        etoiles.transform.position = this.gameObject.transform.position;
//    Debug.Log(pointsVieBoss2);
    }
}

//Gèle et dégèle l'ennemi avant et après avoir été touché par un sort
function setEstGele (state:boolean) {
    estGele = state;
}

//Retourne l'état de santé du boss
function getSanteBoss() {
    return pointsVieBoss2;
}

//Met à jour l'état de santé du boss
function setSanteBoss(valeurSante:float) {
    pointsVieBoss2 = valeurSante;
}