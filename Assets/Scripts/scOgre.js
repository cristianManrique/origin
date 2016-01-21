#pragma strict

/**
* Script de gestion des comportements de l'ogre.
* @author David Lachambre
* @date 16-01-2015
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
* Détermine si l'ogre est en train d'attaquer.
* @access private
* @var boolean
*/
private var modeAttaque:boolean;

/*
* Héros (Clara ou Malcom).
* @access private
* @var GameObject
*/
private var heros:GameObject;

/*
* Vitesse de déplacement lors de l'attaque.
* @access private
* @var float
*/
private var vitesseAttaque:float = 3;

/*
* Vitesse de déplacement régulière.
* @access private
* @var float
*/
private var vitesseNormale:float = 1;

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
* Distance à laquelle l'ogre donne des coups de massue.
* @access private
* @var float
*/
private var distanceHerosAttaque:float = 2;

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
* Détermine si l'ogre doit changer de direction.
* @access private
* @var boolean
*/
private var changementDirection:boolean = true;

/*
* Détermine l'angle de rotation quand l'ogre tourne.
* @access private
* @var Vector3
*/
private var angleCible:Vector3;

/*
* Détermine l'incrémentation de l'angle de rotation quand l'ogre tourne.
* @access private
* @var Vector3
*/
private var incrementCible:Vector3 = new Vector3(0, 90, 0);

/*
* Détermine l'orientation actuelle de l'ogre.
* @access private
* @var Vector3
*/
private var angleActuel:Vector3;

/*
* Temps en secondes avant que l'ogre ne change de direction.
* @access private
* @var int
*/
private var delaiAvantTourner:int = 5;

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
    modeAttaque = false;//N'est pas en mode attaque au départ.
    heros = GameObject.FindWithTag("heros");
    angleActuel = this.transform.eulerAngles;//Détermine l'orientation de départ de l'ogre.
    canvas = GameObject.FindWithTag("canvas");//chercher canvas
    gestionscAffichage=canvas.GetComponent.<scAffichage>();//:: Chercher LE SCRIPT
}

function Update () {
    
    vitesse = vitesseNormale;
    
    if (pointsVieOgre <= 0) {
        mort();
    }
    
    distanceHeros = Vector3.Distance (this.transform.position, heros.transform.position);//Calcul de la distance entre l'ogre et le héros.
    if (modeAttaque) {//Si en mode attaque...
        vitesse = vitesseAttaque;
        if (distanceHeros < distanceHerosAttaque) {//Si le héros est suffisamment près...
            if (donnerUnCoup) {//Si doit donner un coup de massue...
                frapper();
            }
        }
        //Code qui permet de faire une rotation progressive en direction du héros lorsqu'en mode attaque.
        var positionHeros : Vector3 = heros.transform.position - this.transform.position;
        var nouvelleRotation = Quaternion.LookRotation(positionHeros);
        this.transform.rotation = Quaternion.Lerp(this.transform.rotation, nouvelleRotation, vitesse * Time.deltaTime); 
    }
    if (!modeAttaque) {//Si le héros n'est pas suffisamment près...
        if (changementDirection) {//Si l'ogre doit changer de direction...
            gererDirection();
        }
        //CODE SOURCE : http://answers.unity3d.com/questions/643141/how-can-i-lerp-an-objects-rotation.html
        //Permet de faire une rotation progressive lors du déplacement.
        //-------------------------------------------------
        angleActuel = this.transform.eulerAngles;
        angleActuel = new Vector3(
            0,
            Mathf.LerpAngle(angleActuel.y, angleCible.y, Time.deltaTime),
            0
        );
        this.transform.eulerAngles = angleActuel;
        //-------------------------------------------------
    }

    var position3D:Vector3 = Vector3(0,0,0);//Vecteur de déplacement (x,y,z).
    position3D.y -= gravite * Time.deltaTime;//Permet d'appliquer la gravite sur l'ogre en diminuant progressivement la hauteur sur l'axe des Y.
    if (distanceHeros > distanceHerosAttaque) {
        position3D.z += vitesse * Time.deltaTime;//Permet de faire avancer l'ogre vers l'avant.
    }
    this.transform.rotation.x = 0;//Pour que l'ogre tourne seulement sur un axe (Y).
    this.transform.rotation.z = 0;//Pour que l'ogre tourne seulement sur un axe (Y).
	position3D = transform.TransformDirection(position3D);//Permet de déterminer la direction en fonction de l'axe de rotation et non des coordonnées du monde.
	controleurOgre.Move(position3D);//Faire avancer l'ogre.
}

//Si le héros est détecté à proximité, l'ogre se met en mode attaque.
function OnTriggerEnter(autreObjet:Collider) {
    if (autreObjet.name == "malcom") {
        Debug.Log("Malcom à proximité de l'ogre");
        modeAttaque = true;
    }
}

//Si le héros n'est plus détecté à proximité, l'ogre se remet en mode passif.
function OnTriggerExit(autreObjet:Collider) {
    if (autreObjet.name == "malcom") {
        Debug.Log("Malcom n'est plus près de l'ogre");
        modeAttaque = false;
    }
}

//Ce qui arrive quand l'ogre est tué, soit sa destruction et l'apparition d'une récompense.
function mort() {
    var bonus:GameObject = Instantiate (Resources.Load ("gateau")) as GameObject;
    bonus.transform.position = ogre.transform.position;
    bonus.AddComponent.<BoxCollider>();
    bonus.GetComponent(BoxCollider).isTrigger = true;
    bonus.tag = "bonbon";
    Destroy(ogre);
    gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);//ne pas afficher Barre de vie de Ennemi
}

//Détermine la direction vers laquelle l'ogre doit tourner et le moment ou il doit changer de direction.
function gererDirection() {
    changementDirection = false;
    angleActuel = this.transform.eulerAngles;
    angleCible = angleActuel + incrementCible;
    //Debug.Log("tourne");
    yield WaitForSeconds(delaiAvantTourner);
    changementDirection = true;
}

//Détermine si l'ogre doit donner un coup et la fréquence de ceux-ci.
function frapper() {
    donnerUnCoup = false;
    //Code pour donner un coup par animation
    yield WaitForSeconds(delaiCoupOgre);
    donnerUnCoup = true;
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:int) {
    pointsVieOgre -= dommages;
    Debug.Log(pointsVieOgre);
}