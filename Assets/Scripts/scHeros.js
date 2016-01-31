#pragma strict
@script RequireComponent(CharacterController)
@script RequireComponent(Animator)

/**
 * TP Developpement de JEU
 * Gestion du Héros
 *  gérer l'attaque, les vies, le nombre de potions et le health et les déplacements
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2016-01-20

oui l'affichage c'est de la gestion du jeu. 
Pense au script du héros comme son blueprint. 
Il peut faire quoi (se déplacer, attaquer). 
Il est caractérisé par quoi (des vies, un health). 
Il a x nb de vies, il perd x nombre de points, etc. 
C'est son propre update qui gère tout ça.


Le script gestionJeu va créer des ennemis, 
dire au script d'affichage d'afficher les trucs 
en fonctions de ce qui se passe dans 
le jeu, faire le chargement des niveaux, etc. 
C'est un peu le "controler" du MVC

 * 
 */

//:::::::::::variables :::::::::://

    /*
    * Nombre de Vie du héros
    * @access private
    * @var GameObject
    */
    private var Vies: int= 3;

    /*
    * Sante
    * @access private
    * @var GameObject
    */
    private var Sante: int= 10;


    //::::::::::::::::::::://
    /**
     * Vitesse de déplacement de base
     * @access private
     * @var float
     */
    private var vitesse:float = 1.0;

    /**
     * Vitesse de saut
     * @access private
     * @var float
     */
    private var vitesseSaut:float = 5.0;
    /**
     * Multiplicateur de course
     * @access private
     * @var float
     */
    private var course:float = 6.0;
    /**
     * Multiplicateur de marche
     * @access private
     * @var float
     */
    private var marche:float = 2.0;
    /**
     * Contient le vecteur de déplacement
     * @access private
     * @var Vector3
     */
    private var dirMouvement : Vector3 = Vector3.zero;
    /**
     * Contient la vitesse de rotation
     * @access private
     * @var float
     */
    private var vitesseRot:float =2.0;
    /**
     * Contient la vitesse de la gravité
     * @access private
     * @var float
     */
    private var gravite: float = 10;


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
	
}


//:::::::::::::: UPDATE :::::::::::::://
function Update()
{

//:::::::::::::: GERER VIES :::::::::://
    if(Sante ==0)
    {
      Vies--;

    }

    if(Vies==0)
    {
        //Debug.Log("GAMEOVER");
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
		dirMouvement = Vector3(0, 0, inputY);	// Calcul du mouvement
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




//::::::::::::::Jouer le son AudioWalk avec CLAVIER :::::::::://
    if (Input.GetKeyDown(KeyCode.W) || Input.GetKeyDown(KeyCode.UpArrow) || Input.GetKeyDown(KeyCode.S) || Input.GetKeyDown(KeyCode.DownArrow)) 
     {
        TypeAudioSource.clip =AudioWalk;
        TypeAudioSource.pitch=1;
        TypeAudioSource.Play();

     }
     if (Input.GetKeyUp(KeyCode.W) || Input.GetKeyUp(KeyCode.UpArrow) || Input.GetKeyUp(KeyCode.S) || Input.GetKeyUp(KeyCode.DownArrow)) 
     {        
          TypeAudioSource.Stop();
     }
//:::::::::::::: Gérer le pitch AudioWalk avec CLAVIER :::::::::://
    if (Input.GetKeyDown (KeyCode.LeftShift))
     {         
         TypeAudioSource.pitch=2.5;
     }
     //:: SI la touche left shift est relaché
    if (Input.GetKeyUp (KeyCode.LeftShift))
     {      
         TypeAudioSource.pitch=1;
     }
	
	
}//FIN UPDATE




//:::::::::::::: OnTriggerEnter :::::::::::::://
function OnTriggerEnter(other: Collider) {
    if (other.gameObject.name == 'trigger') 
    {
    	//Debug.Log("trigger");
        
    }

}// FIN OnTriggerEnter




//:::::::::::::: OnTriggerStay :::::::::::::://
//Permet de verifier à chq frame s'il vole et si on voit le jetpack
/*function OnTriggerStay(other: Collider){

    //:::::::::::::: ACTIVER Jetpack   
    if (other.gameObject.tag == 'feeVolante') 
    {
        voler=true;// mettre a true
         Debug.Log('stayfee');

    }

}//FIN OnTriggerStay
*/

//:::::::::::::: OnTriggerExit :::::::::::::://
function OnTriggerExit(other: Collider) {

	//:::::::::::::: ACTIVER Jetpack   
    if (other.gameObject.tag == 'feeVolante') 
    {
        voler = true;// mettre a true
        Destroy(other.gameObject);
       
    }
}//FIN OnTriggerExit




//:::::::::::::: function DiminueVies :::::::::::::://
function DiminueVies(nbVies:int) {
    Vies -= nbVies;
   // Debug.Log("Vies du héros"+Vies);
}


//:::::::::::::: function AugmenteVies :::::::::::::://
function AugmenteVies(nbVies:int) {
    Vies += nbVies;
   // Debug.Log("Vies du héros"+Vies);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommagesInfliges:int) {
    Sante -= dommagesInfliges;
    //Debug.Log("Santée du héros" +Sante);
}