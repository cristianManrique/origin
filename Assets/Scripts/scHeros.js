#pragma strict
@script RequireComponent(CharacterController)
@script RequireComponent(Animator)

//:::::::::::variables :::::::::://

/*
* Maximum de sante
* @access public
* @var float
*/
public var santeMax:float = 100.0;

/*
* Nombre de Vie du héros
* @access public
* @var GameObject
*/
public var vies:int = 3;

/*
* Sante c'est la resistance avant de perdre une vie
* @access private
* @var float
*/
private var sante:float;

/**
* Vitesse de déplacement de base
* @access public
* @var float
*/
private var vitesse:float;

/*
* Nombre de potions permettant de lancer un sort
* @access private
* @var integer
*/
public var nbPotionSort:int = 0;//potionSort

/**
* Vitesse de saut
* @access public
* @var float
*/
public var vitesseSaut:float = 10.0;
/**
* Multiplicateur de course
* @access public
* @var float
*/
public var vitesseCourse:float = 8.0;
/**
* Multiplicateur de marche
* @access public
* @var float
*/
public var vitesseMarche:float = 4.0;
/**
* Contient le vecteur de deplacement
* @access private
* @var Vector3
*/
private var dirMouvement : Vector3 = Vector3.zero;
/**
* Contient la vitesse de rotation
* @access public
* @var float
*/
public var vitesseRot:float =3.0;
/**
* Contient la vitesse de la gravite
* @access private
* @var float
*/
private var gravite: float = 20;


//::::::::::::::::::::://
/**
* Gerer si peut sauter
* @access private
* @var boolean
*/
private var saut: boolean = false;

/**
* Gerer si peut voler
* @access private
* @var boolean
*/
private var voler: boolean = false;

//::::::::::::::::::::://
/**
* Contient le controleur d'animation
* @access public
* @var Animator
*/
private var animateur: Animator;

/*
* Contient le controller (accÃƒÂ¨s par l'inspecteur)
* @access private
* @var CharacterController
*/
private var controller:CharacterController;

/*
* le Type AudioSource
* @access private
* @var AudioSource
*/
private var TypeAudioSource:AudioSource;

//::::::::::::::::::::://
/*
* Contient la camera
* @access private
* @var Camera
*/
private var cam:Camera;

//::::::::::::::::::::://
/*
* Contient le script affichage
* @access private
* @var scAffichage
*/
private var gestionAffichage: scAffichage;

/**
 * Pour diminuer la sante de facon progressive et constante
 * @access public
 * @var float
 */
public var vitesseDim:float = 0.3;

/**
 * Détermine si le joueur est en contact avec le sol
 * @access private
 * @var boolean
 */
private var auSol:boolean = true;

/**
 * Permet de calculer le temps passé sur le sol
 * @access private
 * @var float
 */
private var tempsAuSol:float = 0.0;//temps en secondes

/**
 * Permet de donner une marge de tolérence pour la propriété "auSol"
 * @access private
 * @var float
 */
private var toleranceAuSol:float = 0.3;//temps en secondes

/**
 * Détermine si le heros est en train de sauter
 * @access private
 * @var float
 */
private var enSaut:boolean = false;

/**
 * Détermine si l'aqnim de course doit jouer
 * @access private
 * @var float
 */
private var animCourse:boolean = false;

/*
* Collider de la pointe de l'epee de Malcom
* @access private
* @var CapsuleCollider
*/
private var ColliderEpee: CapsuleCollider;

/*
* contient le script LookAtMouse
* @access private
* @var scLookAtMouse
*/
private var scriptLookAtMouse: scLookAtMouse;


/**
*Détermine la distance que le héros pourra parcourir vers le haut après avoir attrapé une fée
*@var float
*@access public
**/
 public var distanceVerticaleVol: int = 10;

/*
* Contient le AudioClip Marche
* @access public
* @var AudioClip
*/
public var AudioWalk: AudioClip;

/*
* Pointe de l'epee de Malcom
* @access public
* @var GameObject
*/
public var epee: GameObject;

/**
*Le script de gestion du jeu
*@var scGestionJeu
*@access private
**/
 private var scriptGestionJeu: scGestionJeu;

/**
*Détermine la hauteur maximum de vol pour le héros (variable, change à chaque nouvelle fée)
*@var float
*@access private
**/
 private var hauteurMaxVol: float = 0.0;

/**
*Détermine le temps restant pour voler
*@var float
*@access private
**/
private var tempsVolRestant: float;

/**
*Durée d'un vol (en secondes)
*@var float
*@access public
**/
public var dureeVol: int = 10;


//:::::::::::Awake :::::::::://
function Awake()
{
    animateur = this.gameObject.GetComponent.<Animator>();
    controller =this.gameObject.GetComponent.<CharacterController>();
}

//:::::::::::Start :::::::::://
function Start () 
{
    tempsVolRestant = dureeVol;
    
    var canvas:GameObject = GameObject.FindWithTag("canvas");
    gestionAffichage = canvas.GetComponent.<scAffichage>();
    
    scriptGestionJeu = GetComponent.<scGestionJeu>();
    TypeAudioSource = GetComponent.<AudioSource>();
    
    if (PlayerPrefs.GetInt("partieSauvegardee") == 0) {//Si le jeu n'est pas une sauvegarde...
        sante = santeMax;
    }
    if (this.name == "malcom") {
        ColliderEpee = epee.GetComponent(CapsuleCollider);
    }
    scriptLookAtMouse = GetComponent(scLookAtMouse);
    hauteurMaxVol = this.transform.position.y + distanceVerticaleVol;
}


//:::::::::::::: UPDATE :::::::::::::://
function Update()
{    
//    Debug.Log(sante);
    sante -= (vitesseDim * Time.deltaTime);
//:::::::::::::: GERER VIES :::::::::://
    
    if(vies == 0)
    {
        PlayerPrefs.SetInt("partieSauvegardee", 0);
        SceneManager.LoadScene("gameOver");
    }

//:::::::::::::: GERER DEPLACEMENT :::::::::://
    
    //Permet de donner une marge de tolérence à la propriété "auSol" qui détermine si le heros peut sauter.
    //-------------------------------------

    if (controller.isGrounded) {
        enSaut = false;
        tempsAuSol = Time.time;
        animateur.SetBool('saut', false);
    }
    if (Time.time - tempsAuSol < toleranceAuSol) {
        auSol = true;
    }
    else {
        auSol = false;
    }
    //-------------------------------------
    
    //:: Lecture des variables d'axe
    var inputX = Input.GetAxis('Horizontal');   
    var inputY = Input.GetAxis('Vertical');

    //:: Application de la rotation directement sur le transform
    transform.Rotate(0, inputX * vitesseRot, 0);
    animateur.SetFloat('vitesseRot', inputX);
    
//:::::::::::::: GERER SAUT :::::::::://
    
    if(Input.GetKeyDown('space') && !enSaut && !voler)//:: Si space est enfoncé et que le heros n'est pas en train de voler
    {
        dirMouvement.y = vitesseSaut; // Calcul du mouvement saut
        animateur.SetBool('animCourse', false);
        animateur.SetBool('saut', true);
        inputY = 0;//Pour ameliorer l'animation
        enSaut = true;
    }
    
    if((auSol && !enSaut) || voler)//s'il est sol OU si voler est true 
    {
        
//:::::::::::::: GERER DEPLACEMENT :::::::::://
        
        dirMouvement = Vector3(0, 0, inputY);   // Calcul du mouvement
        //:: dire à l'animator d'utiliser cette variable du code
        dirMouvement = transform.TransformDirection(dirMouvement);
        dirMouvement *= vitesse;
        
//:::::::::::::: GERER COURSE :::::::::://
        
        if(Input.GetKey('left shift') && !voler)
        {
            vitesse = vitesseCourse;
            animCourse = true;
        }
        else
        {
            vitesse = vitesseMarche;
            animCourse = false;
        }
    
//:::::::::::::: GERER VOLER :::::::::://
//source rotation: http://docs.unity3d.com/ScriptReference/Transform-rotation.html
        if (voler) {
            
            if (tempsVolRestant >= 0) {
                tempsVolRestant -= Time.deltaTime;
                gestionAffichage.affichageTempsVol.text = "Vol : " + Mathf.Round(tempsVolRestant).ToString();
            }
            else {
                gestionAffichage.affichageTempsVol.enabled = false;
                animateur.SetBool('voler', false);//:: dire à l'animator d'utiliser cette variable du code
                if (!auSol) {
                    enSaut = true;
                }
                voler = false;
            }
            if (Input.GetKeyDown('left shift')) {
                animateur.SetBool('saut', false);
                animateur.SetBool('voler', true);//:: dire à l'animator d'utiliser cette variable du code
            }
            
            //Monter dans les airs
            if(Input.GetKey('left shift')) {
                if (this.transform.position.y < hauteurMaxVol) {
                    var monter:Vector3 = new Vector3(0,0,0);
                    monter.x = this.transform.position.x;
                    monter.y = hauteurMaxVol;
                    monter.z = this.transform.position.z;
                    transform.position = Vector3.Slerp(transform.position, monter, Time.deltaTime * 1);
                }
            }
            //Descendre
            else if (Input.GetKey(KeyCode.LeftControl)) {
                var descendre:Vector3 = new Vector3(0,0,0);
                descendre.x = this.transform.position.x;
                descendre.y = 0;
                descendre.z = this.transform.position.z;
                transform.position = Vector3.Slerp(transform.position, descendre, Time.deltaTime * 1);
            }
            //Fin du vol
            if (Input.GetKey(KeyCode.X)) {
                gestionAffichage.affichageTempsVol.enabled = false;
                animateur.SetBool('voler', false);//:: dire à l'animator d'utiliser cette variable du code
                enSaut = true;
                voler = false;
            }
        }
    }//FIN controller    

    //:: Application de la gravite au mouvement
    dirMouvement.y -= gravite*Time.deltaTime;
    //:: Affectation du mouvement au Character controller
    controller.Move(dirMouvement * Time.deltaTime);
    animateur.SetFloat('vitesseDeplace', inputY);
    animateur.SetBool('animCourse', animCourse);

    //:::::::::::::: GERER ATTAQUE :::::::::://
    if(Input.GetButtonDown("Fire1"))//:: Si clic gauche est enfoncé
    {
        animateur.SetTrigger('animAttack');
        //:: dire à l'animator d'utiliser cette variable du code
    }

    if(Input.GetButtonUp("Fire1"))//:: Si clic gauche est enfoncé
    {
        animateur.SetBool('animAttack', false);
        //:: dire à l'animator d'utiliser cette variable du code
    }
    
    if(Input.GetKeyDown(KeyCode.M) || Input.GetMouseButtonDown(2)) {
        toggleLookAtMouse();
    }
}//FIN UPDATE



//:::::::::::::: OnTriggerExit :::::::::::::://
function OnTriggerEnter(other: Collider) {

//    Debug.Log(other);
    //:::::::::::::: ACTIVER Jetpack   
    if (other.gameObject.tag == 'feeVolante') 
    {
        gestionAffichage.affichageTempsVol.enabled = true;
        tempsVolRestant = dureeVol;
        hauteurMaxVol = this.transform.position.y + distanceVerticaleVol;
        voler = true;// mettre a true
        Destroy(other.gameObject);
    }
}//FIN OnTriggerExit




//:::::::::::::: function DiminueVies :::::::::::::://
//Permet de diminuer la vie du héros
function DiminueVies() {
    if (vies > 0) {
        vies--;
    }
//   Debug.Log("Vies du heros"+Vies);
}


//:::::::::::::: function AugmenteVies :::::::::::::://
//Permet d'augmenter la vie du héros
function AugmenteVies() {
    if (vies == 3) {
        sante = santeMax;
    }
    else {
        vies++;
    }
   // Debug.Log("Vies du heros"+Vies);
}

//:::::::::::::: function updateDommages :::::::::::::://
//Lorsque le héros est attaqué, cette function lui afflige des dommages à la barre de vie
function updateDommages(dommagesInfliges:int) {
   //Debug.Log("heros touche, baisse de : " + dommagesInfliges);
    
    var etoiles: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/etoilesHerosTouche")) as GameObject;
    etoiles.transform.position = this.gameObject.transform.position;
    sante -= dommagesInfliges;

    if(sante <= 0) {//Si 0 ou negatif...
      vies--;//Enleve une vie
      sante = santeMax + sante;//Repporte l'excedent enleve sur sante sur le prochain cycle de barre de vie (santeMax + 0 ou nombre negatif)
    }
}

//:::::::::::::: function getNbVies :::::::::::::://
//Retourne le nombre de vie
function getNbVies() {
    return vies;
}
//:::::::::::::: function setVies :::::::::::::://
//Met à jour le nombre de vie
function setVies(valeurVies:int) {
    vies = valeurVies;
}

//:::::::::::::: function getSante:::::::::://
//Retourne la valeur de sante du heros
function getSante() {
    return sante;
}
//:::::::::::::: function setSante:::::::::://
//Donne une nouvelle valeur à la sante du heros
function setSante(valeurSante:float) {
    sante = valeurSante;
}

//:::::::::::::: function enleverVie:::::::::://
//Enleve une vie et retabli la sante au maximum
function enleverVie() {
    sante = santeMax;
    vies--;
}
//:::::::::::::: function augmenterSante:::::::::://
//Augmente la sante du heros d'une valeur determinee par le passage d'un parametre
function augmenterSante(increment:int) {
    if (sante < santeMax) {
        if (sante + increment < santeMax) {
            sante += increment;
        }
        else {
            sante = santeMax;
        }
    }
}

//:::::::::::::: function reductionPotionSort :::::::::::::://
//function qui reduire le nb de potion sort
function reductionPotionSort()
{
//condition pour réduire les potions sort
    if(nbPotionSort > 0)
    {
        nbPotionSort--;  
    }
    else
    {
        //condition pour que les potions ne soit pas en négatif.
        nbPotionSort = 0;
    }
}

//:::::::::::::: function getNbPotionsSort:::::::::://
//Retourne le nombre de potions sort
function getNbPotionsSort()
{
    return nbPotionSort;
}
//:::::::::::::: function getNbPotionsSort:::::::::://
//Met à jour le nombre de potions sort
function setNbPotionsSort(valeurPotion:int)
{
    nbPotionSort = valeurPotion;
}

//:::::::::::::: function getVies:::::::::://
//Retourne le nombre de vies
function getVies()
{
    return vies;
}

//:::::::::::::: function augmenterPotionsSort:::::::::://
//Permet d'augmenter le nombre de potions de sort
function augmenterPotionsSort()
{
    nbPotionSort++;
}
//:::::::::::::: function toggleColliderEpee:::::::::://
//Le collider de l'epee de Malcom est active par un animation event quand Malcom donne un coup et desactive lorsdque le coup a ete donnee
function toggleColliderEpee() {
    
    if (ColliderEpee.enabled) {
        ColliderEpee.enabled = false;
    }
    else {
        ColliderEpee.enabled = true;
    }
}

//:::::::::::::: function toggleLookAtMouse:::::::::://
//Permet d'activer ou desactive le mouse look du personnage

function toggleLookAtMouse() {
    var message:String;
    if (scriptLookAtMouse.enabled) {
        scriptLookAtMouse.enabled = false;
        message = "Contrôle souris désactivé";
    }
    else {
        scriptLookAtMouse.enabled = true;
        message = "Contrôle souris activé";
    }
    gestionAffichage.afficherMessage(message);
}

//Méthode pour initialiser la hauteur maximum que le héros pourra atteindre en attrapant une fée
function setHauteurMaxVol(hauteur:float) {
    hauteurMaxVol = hauteur;
}