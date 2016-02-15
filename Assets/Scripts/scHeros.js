#pragma strict
@script RequireComponent(CharacterController)
@script RequireComponent(Animator)

/**
* TP Developpement de JEU
* Gestion du Héros
*  gérer l'attaque, les vies, le nombre de potions et le health et les déplacements
* @author Cristian Manrique
* @author Stephane Leclerc
* @author Jonathan Martel
* @date 2016-01-20
*/

/*
* Nombre de Vie du héros
* @access private
* @var GameObject
*/
private var Vies: int = 3;

/*
* Sante c'est la resistance avant de perdre une vie
* @access private
* @var GameObject
*/
private var Sante: int = 10;

/**
* Vitesse de déplacement de base
* @access public
* @var float
*/
private var vitesse:float = 1.0;

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

/*  
* Verifier si c'est le dernier objet a trouver
* @access private
* @var checkSiFin
*/
private var checkSiFin:boolean = false;

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

/*  
* Verifier si le panneau pause est disponible
* @access private
* @var integer
*/
private var checkPanneauPause: int = 0;

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

/*
* Contient le script scAffichages
* @access private
* @var scAffichage
*/
private var gestionAffichage: scAffichage;

/*
* Correspond à la var restante dans scAffichage
* elle permet de diminuer la var
* @access private
* @var int
*/
private var restanteSante:int;





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
  
}


//:::::::::::::: UPDATE :::::::::::::://
function Update()
{

//:::::::::::::: GERER VIES :::::::::://
    if(Sante ==0)
    {
      Vies--;
      Sante=10;//remettre à 10


    }

    if(Vies==0)
    {
     SceneManager.LoadScene("gameOver");
     Debug.Log("GAMEOVER");
    }


//:::::::::::::: GERER DEPLACEMENT :::::::::://
    //:: Lecture des variables d'axe
    var inputX = Input.GetAxis('Horizontal');   
    var inputY = Input.GetAxis('Vertical');

    
    if(Input.GetKeyDown('space'))//:: Si space est enfoncé
    {
        saut = true;
        animateur.SetBool('saut', true);
        //:: dire à l'animator d'utiliser cette variable du code
    }
    if(Input.GetKeyUp('space'))//:: Si space est enfoncé
    {
        saut = false;
        animateur.SetBool('saut', false);
        //:: dire à l'animator d'utiliser cette variable du code
    }
    

    //:: Application de la rotation directement sur le transform
    transform.Rotate(0, inputX * vitesseRot, 0);


    animateur.SetFloat('vitesseRot', inputX);
    //:: dire à l'animator d'utiliser cette variable du code


    
    if(controller.isGrounded || voler==true)//s'il est sol OU si voler est true 
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
        
            
//:::::::::::::: GERER SAUT :::::::::://  
        if(saut)
        {
            dirMouvement.y = vitesseSaut; // Calcul du mouvement saut
            saut=false;//:: remettre à FALSE
            animateur.SetBool('saut', true);
            //:: dire à l'animator d'utiliser cette variable du code    
        }
        else {
            animateur.SetBool('saut', false);
            //:: dire à l'animator d'utiliser cette variable du code
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
    }//FIN controller


//:::::::::::::: GÉRER VOLE :::::::::://
    if(Input.GetKey(KeyCode.Z) && voler==true)
    {

        dirMouvement.y += 200 * Time.deltaTime;
        //il peut voler!!!
        //Debug.Log('il vole');
    }

    if(Input.GetKeyDown(KeyCode.X) && voler==true)
    {

        dirMouvement.y -= gravite* 200 *Time.deltaTime;
        //Debug.Log('il descend');

    }
    
    //:: Application de la gravité au mouvement
    dirMouvement.y -= gravite*Time.deltaTime;
    //:: Affectation du mouvement au Character controller
    controller.Move(dirMouvement * Time.deltaTime);

}//FIN UPDATE


//:::::::::::::: function DiminueVies :::::::::::::://
function DiminueVies() {
    if (Vies > 0) {
        Vies--;
    }
//   Debug.Log("Vies du héros"+Vies);
}


//:::::::::::::: function AugmenteVies :::::::::::::://
function AugmenteVies() {
    //Vies += nbVies;
    Vies++;
   // Debug.Log("Vies du héros"+Vies);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommagesInfliges:int) {
    Sante -= dommagesInfliges;
    gestionAffichage.DiminuerBarreVies(dommagesInfliges);
    //Debug.Log("Santée du héros" +Sante);

}

//:::::::::::::: function updateDommages :::::::::::::://
function getNbVies() {
    return Vies;
}