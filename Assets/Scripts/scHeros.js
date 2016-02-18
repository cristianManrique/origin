#pragma strict
@script RequireComponent(CharacterController)
@script RequireComponent(Animator)

//:::::::::::variables :::::::::://

/*
* Nombre de Vie du héros
* @access private
* @var GameObject
*/
private var vies:int = 3;

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
private var vitesse:float = 1.0;

/*
* Nombre de potions permettant de lancer un sort
* @access private
* @var integer
*/
private var nbPotionSort:int = 0;//potionSort

/**
* Vitesse de saut
* @access public
* @var float
*/
private var vitesseSaut:float = 10.0;
/**
* Multiplicateur de course
* @access public
* @var float
*/
private var course:float = 6.0;
/**
* Multiplicateur de marche
* @access public
* @var float
*/
private var marche:float = 4.0;
/**
* Contient le vecteur de déplacement
* @access private
* @var Vector3
*/
private var dirMouvement : Vector3 = Vector3.zero;
/**
* Contient la vitesse de rotation
* @access public
* @var float
*/
private var vitesseRot:float =3.0;
/**
* Contient la vitesse de la gravité
* @access private
* @var float
*/
private var gravite: float = 15;


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

/**
* Gerer si anime Course
* @access private
* @var boolean
*/
private var animeCourse: boolean = false;

/**
* Gerer si peut attack
* @access private
* @var boolean
*/
private var attack: boolean = false;

/**
* Gerer si anime attack
* @access private
* @var boolean
*/
private var animeAtack: boolean = false;


//::::::::::::::::::::://
/*  
* Verifier si le panneau pause est disponible
* @access private
* @var integer
*/
private var checkPanneauPause: int = 0;


//::::::::::::::::::::://
/**
* Contient le controleur d'animation
* @access public
* @var Animator
*/
private var animateur: Animator;

/*
* Contient le controller (accès par l'inspecteur)
* @access private
* @var CharacterController
*/
private var controller:CharacterController;


//::::::::::::::::::::://

/*
* Contient le AudioClip Marche
* @access public
* @var AudioClip
*/
public var AudioWalk: AudioClip;
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

/*
* GameObject canvas contient UI
* @access public
* @var GameObject
*/
private var canvas: GameObject;

//::::::::::::::::::::://
/*
* Contient le script affichage
* @access private
* @var scAffichage
*/
private var gestionAffichage: scAffichage;

/**
 * Pour diminuer la sante de facon progressive et constante
 * @access private
 * @var float
 */
private var vitesseDim:float = 0.2;

/*
* Maximum de sante
* @access public
* @var float
*/
public var santeMax:float = 100.0;


//:::::::::::Awake :::::::::://
function Awake()
{

    animateur = this.gameObject.GetComponent.<Animator>();
    controller =this.gameObject.GetComponent.<CharacterController>();
    
}

//:::::::::::Start :::::::::://
function Start () 
{

    //::chercher le composant de type AudioSource
    TypeAudioSource = GetComponent.<AudioSource>();
    canvas = GameObject.FindWithTag("canvas");
    gestionAffichage = canvas.GetComponent.<scAffichage>();
    sante = santeMax;
}


//:::::::::::::: UPDATE :::::::::::::://
function Update()
{

//    Debug.Log(sante);
    sante -= (vitesseDim * Time.deltaTime);
//:::::::::::::: GERER VIES :::::::::://

    if(vies == 0)
    {
     SceneManager.LoadScene("gameOver");
    }


//:::::::::::::: GERER DEPLACEMENT :::::::::://
    //:: Lecture des variables d'axe
    var inputX = Input.GetAxis('Horizontal');   
    var inputY = Input.GetAxis('Vertical');

    //:: Application de la rotation directement sur le transform
    transform.Rotate(0, inputX * vitesseRot, 0);


    animateur.SetFloat('vitesseRot', inputX);
    //:: dire à l'animator d'utiliser cette variable du code
    
    if(controller.isGrounded || voler)//s'il est sol OU si voler est true 
    { 
        dirMouvement = Vector3(0, 0, inputY);   // Calcul du mouvement
        // ajouter l'animateur pour les animation
        animateur.SetFloat('vitesseDeplace', inputY * course);
        //:: dire à l'animator d'utiliser cette variable du code    
        dirMouvement = transform.TransformDirection(dirMouvement);


//:::::::::::::: GERER ATTAQUE :::::::::://
    if(Input.GetButtonDown("Fire1"))//:: Si clic gauche est enfoncé
    {
        attack = true;
        animateur.SetBool('animeAtack', true);
        //:: dire à l'animator d'utiliser cette variable du code
    }
    if(Input.GetButtonUp("Fire1"))//:: Si clic gauche est enfoncé
    {
        attack = false;
        animateur.SetBool('animeAtack', false);
        //:: dire à l'animator d'utiliser cette variable du code
    }


//:::::::::::::: GERER COURSE :::::::::://
        if(Input.GetKey('left shift'))
        {
            dirMouvement *= vitesse * course;
            animateur.SetFloat('vitesseDeplace', inputY * course);
            animeCourse= true;
        }
        else
        {
            dirMouvement *= vitesse * marche;
        }


//:::::::::::::: GERER animeCourse ::::::::::// 
        if(animeCourse)
        {
            animeCourse=false;//:: remettre à FALSE
            animateur.SetBool('animeCourse', true);
            //:: dire à l'animator d'utiliser cette variable du code    
        }
        else {
            animateur.SetBool('animeCourse', false);
            //:: dire à l'animator d'utiliser cette variable du code
        }
    
        if(Input.GetKeyDown('space') && !voler)//:: Si space est enfoncé et que le heros n'est pas en train de voler
        {
            dirMouvement.y = vitesseSaut; // Calcul du mouvement saut
            saut=false;//:: remettre à FALSE
            animateur.SetBool('saut', true);

            //:: dire à l'animator d'utiliser cette variable du code
        }
        if(Input.GetKey(KeyCode.Z) && voler)
        {
            animateur.SetBool('saut', false);
            dirMouvement.y += 200 * Time.deltaTime;

            //il peut voler!!!
            //Debug.Log('il vole');
        }

        if(Input.GetKey(KeyCode.X) && voler)
        {
            animateur.SetBool('saut', false);
            dirMouvement.y -= 600*Time.deltaTime;
            //Debug.Log('il descend');

        }
    }//FIN controller
    if(Input.GetKeyUp('space'))//:: Si space est enfoncé
    {
        saut = false;
        animateur.SetBool('saut', false);
        //:: dire à l'animator d'utiliser cette variable du code
    }


//appelle de la function voler dans les airs.
    

    //:: Application de la gravité au mouvement
    dirMouvement.y -= gravite*Time.deltaTime;
    //:: Affectation du mouvement au Character controller
    controller.Move(dirMouvement * Time.deltaTime);

}//FIN UPDATE



//:::::::::::::: OnTriggerExit :::::::::::::://
function OnTriggerEnter(other: Collider) {

    //:::::::::::::: ACTIVER Jetpack   
    if (other.gameObject.tag == 'feeVolante') 
    {
        voler = true;// mettre a true
        Destroy(other.gameObject);
        timerVoler();
    }
}//FIN OnTriggerExit




//:::::::::::::: function DiminueVies :::::::::::::://
function DiminueVies() {
    if (vies > 0) {
        vies--;
    }
//   Debug.Log("Vies du héros"+Vies);
}


//:::::::::::::: function AugmenteVies :::::::::::::://
function AugmenteVies() {
    if (vies == 3) {
        sante = santeMax;
    }
    else {
        vies++;
    }
   // Debug.Log("Vies du héros"+Vies);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommagesInfliges:int) {
    Debug.Log("heros touche, baisse de : " + dommagesInfliges);
    
    sante -= dommagesInfliges;
    
    if(sante <= 0) {//Si 0 ou negatif...
      vies--;//Enleve une vie
      sante = santeMax + sante;//Repporte l'excedent enleve sur sante sur le prochain cycle de barre de vie (santeMax + 0 ou nombre negatif)
    }
}

//:::::::::::::: function updateDommages :::::::::::::://
function getNbVies() {
    return vies;
}
//:::::::::::::: function qui permet de voler:::::::::://
function timerVoler()
{
    yield WaitForSeconds(10);
    voler = false; 
}

function getSante() {
    return sante;
}

function zeroSante() {
    sante = 0;
}

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

//:::::::::::::: function qui reduire le nb de potion sort :::::::::::::://
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

function getNbPotionsSort()
{
    return nbPotionSort;
}

function augmenterPotionsSort()
{
    nbPotionSort++;
}