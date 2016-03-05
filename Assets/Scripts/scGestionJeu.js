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
 private var nbPotionsReveille:int = 0;
 
 /*
* Variable de contrôle pour les points de vies du boss de la sauvegarde
* @access private
* @var false
*/
 private var santeBossSauvegarde:boolean = false;


function Awake () {
    DontDestroyOnLoad (transform.gameObject);
}

function Start () {
    
    scriptHeros = GetComponent.<scHeros>();
    
    canvas = GameObject.FindWithTag("canvas");//GUI jeu

    //:: Chercher LES SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();
    scriptLancerSort = GetComponent.<scLancerSort>();
}

function Update () {
    
    if (SceneManager.GetActiveScene().name != "tutoriel" && SceneManager.GetActiveScene().name != "gagnant" && SceneManager.GetActiveScene().name != "gameOver" && SceneManager.GetActiveScene().name != "menu" && SceneManager.GetActiveScene().name != "choixPerso") {
        //Tout effacer
        if (Input.GetKeyDown(KeyCode.F5)) {
            PlayerPrefs.DeleteKey("niveau");
            PlayerPrefs.SetInt("partieSauvegardee", 0);
            PlayerPrefs.Save();
            gestionscAffichage.afficherMessage("Sauvegarde effacée");
        }
        //Sauvegarder
        if (Input.GetKeyDown(KeyCode.F9)) {

            if (SceneManager.GetActiveScene().name != "tutoriel") {//On ne peut pas sauvegarder au niveau tutoriel.
                PlayerPrefs.SetFloat("positionX", this.transform.position.x);
                PlayerPrefs.SetFloat("positionY", this.transform.position.y);
                PlayerPrefs.SetFloat("positionZ", this.transform.position.z);
                PlayerPrefs.SetFloat("rotationX", this.transform.rotation.x);
                PlayerPrefs.SetFloat("rotationY", this.transform.rotation.y);
                PlayerPrefs.SetFloat("rotationZ", this.transform.rotation.z);
                PlayerPrefs.SetInt("nbPotionsSort", scriptHeros.getNbPotionsSort());
                PlayerPrefs.SetInt("nbPotionsReveil", nbPotionsReveille);
                PlayerPrefs.SetFloat("sante", scriptHeros.getSante());
                PlayerPrefs.SetInt("vies", scriptHeros.getVies());
                PlayerPrefs.SetString("niveau", SceneManager.GetActiveScene().name);
                PlayerPrefs.SetString("heros", this.gameObject.transform.name);
                PlayerPrefs.SetString("dateSauvegarde", System.DateTime.Now.ToString());

                if (SceneManager.GetActiveScene().name == "boss1" || SceneManager.GetActiveScene().name == "boss2") {
                    var boss1:GameObject = GameObject.FindWithTag("boss1");
                    if (boss1) {
        //                Debug.Log("Boss 1");
                        var scriptBoss1:scBoss1 = boss1.GetComponent.<scBoss1>();
                        PlayerPrefs.SetFloat("santeBoss", scriptBoss1.getSanteBoss());
                    }
                    else {
                        var boss2:GameObject = GameObject.FindWithTag("boss2");
                        if (boss2) {
        //                    Debug.Log("Boss 2");
                            var scriptBoss2:scBoss2 = boss2.GetComponent.<scBoss2>();
                            PlayerPrefs.SetFloat("santeBoss", scriptBoss2.getSanteBoss());
                        }
                    }
                }

                PlayerPrefs.Save();
                gestionscAffichage.afficherMessage("Partie sauvegardée");
            }
        }

        //Charger
        if (Input.GetKeyDown(KeyCode.F12)) {

            if (PlayerPrefs.HasKey("niveau")) {
                
                PlayerPrefs.SetInt("partieSauvegardee", 1);
                
                SceneManager.LoadScene(PlayerPrefs.GetString("niveau"));

                if (PlayerPrefs.HasKey("positionX")) {
                    this.transform.position.x = PlayerPrefs.GetFloat("positionX");
                }
                if (PlayerPrefs.HasKey("positionY")) {
                    this.transform.position.y = PlayerPrefs.GetFloat("positionY");
                }
                if (PlayerPrefs.HasKey("positionZ")) {
                    this.transform.position.z = PlayerPrefs.GetFloat("positionZ");
                }
                if (PlayerPrefs.HasKey("rotationX")) {
                    this.transform.rotation.x = PlayerPrefs.GetFloat("rotationX");
                }
                if (PlayerPrefs.HasKey("rotationY")) {
                    this.transform.rotation.y = PlayerPrefs.GetFloat("rotationY");
                }
                if (PlayerPrefs.HasKey("rotationZ")) {
                    this.transform.rotation.z = PlayerPrefs.GetFloat("rotationZ");
                }
                if (PlayerPrefs.HasKey("nbPotionsSort")) {
                    scriptHeros.setNbPotionsSort(PlayerPrefs.GetInt("nbPotionsSort"));
                }
                if (PlayerPrefs.HasKey("nbPotionsReveil")) {
                    nbPotionsReveille = PlayerPrefs.GetInt("nbPotionsReveil");
                }
                if (PlayerPrefs.HasKey("sante")) {
                    scriptHeros.setSante(PlayerPrefs.GetFloat("sante"));
                }
                if (PlayerPrefs.HasKey("vies")) {
                    scriptHeros.setVies(PlayerPrefs.GetInt("vies"));
                }
                if (PlayerPrefs.HasKey("santeBoss")) {
                    santeBossSauvegarde = true;
                }
            }
            else {
                gestionscAffichage.afficherMessage("Aucune partie sauvegardée");
            }
        }
    }
}//Fin update

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

function setNbPotionsReveille(nbPotions:int) {
    nbPotionsReveille = nbPotions;
}

function getNbPotionsReveille() {
    return nbPotionsReveille;
}

function setSanteBossSauvegarde(etat:boolean) {
    santeBossSauvegarde = etat;
}

//Quand un niveau a fini de charger...
function OnLevelWasLoaded() {
    
    if (santeBossSauvegarde) {//Si on arrive d'une sauvegarde de niveau boss...
        var santeBoss:float = PlayerPrefs.GetFloat("santeBoss");
        var boss1:GameObject = GameObject.FindWithTag("boss1");
        if (boss1) {
//            Debug.Log("Boss 1");
            var scriptBoss1:scBoss1 = boss1.GetComponent.<scBoss1>();
            gestionscAffichage.setBarreBoss(scriptBoss1.getSanteBoss());//Afficher le panneau + rempli barre de vie en fonction des points de vie sauvegardés du boss.
            yield WaitForSeconds(0.1);
            scriptBoss1.setSanteBoss(PlayerPrefs.GetFloat("santeBoss"));
        }
        else {
            var boss2:GameObject = GameObject.FindWithTag("boss2");
            if (boss2) {
//                Debug.Log("Boss 2");
                var scriptBoss2:scBoss2 = boss2.GetComponent.<scBoss2>();
                gestionscAffichage.setBarreBoss(scriptBoss2.getSanteBoss());//Afficher le panneau + rempli barre de vie en fonction des points de vie sauvegardés du boss.
                yield WaitForSeconds(0.1);
                scriptBoss2.setSanteBoss(PlayerPrefs.GetFloat("santeBoss"));
            }
        }
    }
}

//Quand on quite le jeu
function OnApplicationQuit () {
    
    PlayerPrefs.SetInt("partieSauvegardee", 0);//Reset valeur à false.
}