#pragma strict

/**
* Dev Jeu
* Gestion de tout le Jeu
* @author Cristian Manrique
* @author stéphane Leclerc
* @author David Lachambre
* @author Jonathan Martel
* @date 2016-01-16
* 
*/

//:::::::::::variables :::::::::://


//::::::::::::::::::::://
/*
* GameObject canvas contient panneaux d'affichage
* @access private
* @var GameObject
*/
private var canvas: GameObject;


//::::::::::::::::::::://
/*
* Contient le script scAffichage.js
* @access private
* @var scAffichageTP.js
*/
private var gestionscAffichage: scAffichage;


//::::::::::::::::::::://
/*
* Contient le son Victoire de type AudioClip 
* @access public
* @var AudioClip
*/
public var AudioVictoire: AudioClip;

//::::::::::::::::::::://
/*
* Nombbre de potions de vie
* @access private
* @var int
*/
private var nbPotionVie:int = 0;

/*
* Nombre de potions pour jetter un sort
* @access private
* @var int
*/
private var nbPotionSort:int = 0;

/*
* Script pour lancer un sort
* @access private
* @var Script
*/
 private var scriptLancerSort: scLancerSort;

/*
* Point Origin des sorts, objet parent du scLancerSort
* @access private
* @var GameObject
*/
private var scriptHeros: scHeros;

/*
* détermine le nombre de potions de réveil ammassées par le joueur
 * Permet de loader la prochaine scenes
* @access private
* @var Script
*/
 private var nbPotionsReveille = 0;

function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}

function Start () {
    
    scriptHeros = GameObject.FindWithTag("heros").GetComponent.<scHeros>();
    
    canvas = GameObject.FindWithTag("canvas");//GUI jeu

    //:: Chercher LES SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();
    scriptLancerSort = GetComponent.<scLancerSort>();
    
    var camActuelle:Camera = GameObject.FindWithTag("camPrincipale").GetComponent.<Camera>();//Doit aller chercher la cam à chaque activation car elle n'est pas la même d'un niveau à l'autre.
    var scriptLookAtMouse:scLookAtMouse = this.gameObject.GetComponent.<scLookAtMouse>();
    scriptLookAtMouse.setCam(camActuelle);//Actualisation de la caméra dans le script LookAtMouse
}

function Update () {

	 //::::::envoyer le numero de potions que le heros possede vers le script de lancer un sort  et changerArme:::::::::::::::://

//    scriptLancerSort.noPotions = nbPotionSort;

}//FIn update

//:::::::::::::: OnTriggerEnter :::::::::::::://
function OnTriggerEnter(other: Collider) {
//    Debug.Log(other.gameObject.tag);
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            //:::::::::::::: Gestion des objets trouvées
            case "bonbon":
                JoueSonVictoire();
                scriptHeros.augmenterSante(5);
                Destroy(other.gameObject);
                break;

            case "gateau":
                JoueSonVictoire();
                scriptHeros.augmenterSante(10);
                Destroy(other.gameObject);
                break;

            case "potionVie":
                JoueSonVictoire();
                scriptHeros.AugmenteVies();
                Destroy(other.gameObject);
                break;        
            case "potionReveille":
                nbPotionsReveille++;
                if (nbPotionsReveille == 1) {
                    //permet de passé au niveau deux après avoir tuer le boss niveau1
                    SceneManager.LoadScene("niveau2");
                }
                else if (nbPotionsReveille == 2) {
                    //permet de passé à la scène de fin de jeu
                    SceneManager.LoadScene("gagnant");
                }
                break;
            case "PotionReveilleMenu":
                SceneManager.LoadScene("menu");
                break;
           case "potionSort":
                JoueSonVictoire();
         		scriptHeros.augmenterPotionsSort();
            	Destroy(other.gameObject);
               	break;
        }
    }

}//fin trigger enter

//:::::::::::::: function jouer une fois l'AudioVictoire :::::::::::::://
function JoueSonVictoire(){
    GetComponent.<AudioSource>().PlayOneShot(AudioVictoire);
}