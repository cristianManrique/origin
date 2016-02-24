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
* Nombre de Vie du hÃ©ros
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
* Vitesse de dÃ©placement de base
* @access public
* @var float
*/
private var vitesse:float;

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
private var vitesseCourse:float = 8.0;
/**
* Multiplicateur de marche
* @access public
* @var float
*/
private var vitesseMarche:float = 4.0;
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
private var vitesseRot:float =3.0;
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
* Contient le controller (accÃ¨s par l'inspecteur)
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

/**
 * DÃ©termine si le joueur est en contact avec le sol
 * @access private
 * @var boolean
 */
private var auSol:boolean = true;

/**
 * Permet de calculer le temps passÃ© sur le sol
 * @access private
 * @var float
 */
private var tempsAuSol:float = 0.0;//temps en secondes

/**
 * Permet de donner une marge de tolÃ©rence pour la propriÃ©tÃ© "auSol"
 * @access private
 * @var float
 */
private var toleranceAuSol:float = 0.3;//temps en secondes

/**
 * DÃ©termine si le heros est en train de sauter
 * @access private
 * @var float
 */
private var enSaut:boolean = false;

/**
 * DÃ©termine si l'aqnim de course doit jouer
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
*le joueuer
*@var GameObject
*@access public
**/
 private var vitesseRotation: float = 1.5;


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
    if (this.name == "malcom") {
        ColliderEpee = epee.GetComponent(CapsuleCollider);
    }
    scriptLookAtMouse = GetComponent(scLookAtMouse);
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
    
    //Permet de donner une marge de tolÃ©rence Ã  la propriÃ©tÃ© "auSol" qui dÃ©termine si le heros peut sauter.
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
    
    if(Input.GetKeyDown('space') && !enSaut && !voler)//:: Si space est enfoncÃ© et que le heros n'est pas en train de voler
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
        //:: dire Ã  l'animator d'utiliser cette variable du code
        dirMouvement = transform.TransformDirection(dirMouvement);
        dirMouvement *= vitesse;
        
//:::::::::::::: GERER COURSE :::::::::://
        
        if(Input.GetKey('left shift'))
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
        if(Input.GetKey(KeyCode.Z) && voler)
        {
            dirMouvement.y += 200 * Time.deltaTime;
            //Debug.Log('il vole');
            animateur.SetBool('voler', true);
            //:: dire Ã  l'animator d'utiliser cette variable du code

            //:: Smoothly inclinaisons a transform towards a target rotation.
            var smooth = 2.0;
            var angleRotation = 60.0;
            
            var inclinaisonAutourDuX = inputY * angleRotation;

            var target = Quaternion.Euler(inclinaisonAutourDuX, 0, 0);
            // // Dampen towards the target rotation
            this.transform.rotation = Quaternion.Slerp(transform.rotation, target,  Time.deltaTime * smooth);
            // this.transform.rotation = Quaternion.Slerp(transform.rotation, new Quaternion (0, 0, 0, 1),  Time.deltaTime * smooth);
        }

        if(Input.GetKey(KeyCode.X) && voler)
        {
            dirMouvement.y -= 300*Time.deltaTime;
            //Debug.Log('il descend');
            animateur.SetBool('voler', false);
            //:: dire Ã  l'animator d'utiliser cette variable du code

            reinitialiserRotation();//remettre rotation du héros à 0
        }
    }//FIN controller    

    //:: Application de la gravite au mouvement
    dirMouvement.y -= gravite*Time.deltaTime;
    //:: Affectation du mouvement au Character controller
    controller.Move(dirMouvement * Time.deltaTime);
    animateur.SetFloat('vitesseDeplace', inputY);
    animateur.SetBool('animCourse', animCourse);

    //:::::::::::::: GERER ATTAQUE :::::::::://
    if(Input.GetButtonDown("Fire1"))//:: Si clic gauche est enfoncÃ©
    {
        animateur.SetBool('animAttack', true);
        //:: dire Ã  l'animator d'utiliser cette variable du code
    }
    if(Input.GetButtonUp("Fire1"))//:: Si clic gauche est enfoncÃ©
    {
        animateur.SetBool('animAttack', false);
        //:: dire Ã  l'animator d'utiliser cette variable du code
    }
    
    if(Input.GetKeyDown(KeyCode.M)) {
        toggleLookAtMouse();
    }
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
//   Debug.Log("Vies du heros"+Vies);
}


//:::::::::::::: function AugmenteVies :::::::::::::://
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
function updateDommages(dommagesInfliges:int) {
//    Debug.Log("heros touche, baisse de : " + dommagesInfliges);
    
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
    animateur.SetBool('voler', false);

    reinitialiserRotation();//remettre rotation du héros à 0

}

//Retourne l'etat actuel de la sante du heros
function getSante() {
    return sante;
}

//Enleve une vie et retabli la sante au maximum
function enleverVie() {
    sante = santeMax;
    vies--;
}

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

//:::::::::::::: function qui reduire le nb de potion sort :::::::::::::://
function reductionPotionSort()
{
//condition pour rÃ©duire les potions sort
    if(nbPotionSort > 0)
    {
        nbPotionSort--;  
    }
    else
    {
        //condition pour que les potions ne soit pas en nÃ©gatif.
        nbPotionSort = 0;
    }
}

//Retourne le nombre de potions sort
function getNbPotionsSort()
{
    return nbPotionSort;
}

//Permet d'augmenter le nombre de potions de sort
function augmenterPotionsSort()
{
    nbPotionSort++;
}

//Le collider de l'epee de Malcom est active par un animation event quand Malcom donne un coup et desactive lorsdque le coup a ete donnee
function toggleColliderEpee() {
    
    if (ColliderEpee.enabled) {
        ColliderEpee.enabled = false;
    }
    else {
        ColliderEpee.enabled = true;
    }
}

//Permet d'activer ou dÃ©sactiver le mouse look du personnage
function toggleLookAtMouse() {
    if (scriptLookAtMouse.enabled) {
        scriptLookAtMouse.enabled = false;
    }
    else {
        scriptLookAtMouse.enabled = true;
    }
}

// Reinitialise la rotation du héros lorsqu'il ne vole pas ou descend
function reinitialiserRotation(){
    //:: Remettre la rotation du heros à 0 de X et Z
    var positionInitiale = this.transform.rotation;
    positionInitiale.x=0;
    positionInitiale.z=0;
    this.transform.rotation = positionInitiale;
    var smooth = 2.0;

    // this.transform.rotation = Quaternion.Slerp(transform.rotation, positionInitiale,  Time.deltaTime * smooth);
    // this.transform.rotation = Quaternion.Slerp(transform.rotation, new Quaternion (0, 0, 0, 1),  Time.deltaTime * smooth);

}
