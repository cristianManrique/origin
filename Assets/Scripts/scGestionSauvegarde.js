#pragma strict

/**
* Gestion des sauvegardes
* @author David Lachambre
* @date 2016-02-03
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

/*
* Point Origin des sorts, objet parent du scLancerSort
* @access private
* @var GameObject
*/
private var scriptHeros: scHeros;

/*
* Héros
* @access private
* @var GameObject
*/
private var heros: GameObject;

/*
* Script de gestion du jeu
* @access private
* @var scGestionJeu
*/
private var scriptGestionJeu: scGestionJeu;

/*
* détermine le choix de personnage
* @access private
* @var String
*/
 private var nomHeros:String = "malcom";

/*
* Variable de contrôle pour les chargements de parties sauvegardées
* @access private
* @var false
*/
 private var partieEnChargement:boolean = false;
 
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
    
    heros = GameObject.FindWithTag("heros");
    
    if (heros) {
        nomHeros = heros.transform.name;
        scriptHeros = heros.GetComponent.<scHeros>();
        scriptGestionJeu = heros.GetComponent.<scGestionJeu>();
    }
    
    canvas = GameObject.FindWithTag("canvas");//GUI jeu

    if (canvas) {
        gestionscAffichage = canvas.GetComponent.<scAffichage>();
    }
}

function Update () {

    //GESTION SAUVEGARDE
    
    //Tout effacer
    if (Input.GetKeyDown(KeyCode.F5)) {
        PlayerPrefs.DeleteAll();
        PlayerPrefs.Save();
        gestionscAffichage.afficherMessage("Sauvegarde effacée");
    }
    //Sauvegarder
    if (Input.GetKeyDown(KeyCode.F9)) {
        
        PlayerPrefs.SetFloat("positionX", this.transform.position.x);
        PlayerPrefs.SetFloat("positionY", this.transform.position.y);
        PlayerPrefs.SetFloat("positionZ", this.transform.position.z);
        PlayerPrefs.SetFloat("rotationX", this.transform.rotation.x);
        PlayerPrefs.SetFloat("rotationY", this.transform.rotation.y);
        PlayerPrefs.SetFloat("rotationZ", this.transform.rotation.z);
        PlayerPrefs.SetInt("nbPotionsSort", scriptHeros.getNbPotionsSort());
        PlayerPrefs.SetInt("nbPotionsReveil", scriptGestionJeu.getNbPotionsReveille());
        PlayerPrefs.SetFloat("sante", scriptHeros.getSante());
        PlayerPrefs.SetInt("vies", scriptHeros.getVies());
        PlayerPrefs.SetString("niveau", SceneManager.GetActiveScene().name);
        PlayerPrefs.SetString("heros", nomHeros);
        PlayerPrefs.SetString("dateSauvegarde", System.DateTime.Now.ToString());
        Debug.Log(PlayerPrefs.GetString("dateSauvegarde"));
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
    
    //Charger
    if (Input.GetKeyDown(KeyCode.F12)) {
        
        if (PlayerPrefs.HasKey("niveau")) {
            SceneManager.LoadScene(PlayerPrefs.GetString("niveau"));
            
            if (PlayerPrefs.GetString("niveau") != "boss1" && PlayerPrefs.GetString("niveau") != "boss2") {

                partieEnChargement = true;//Pour empêcher les autres scripts de repositionner le héros au début du niveau.
        
                if (PlayerPrefs.HasKey("positionX")) {
                    this.transform.position.x = PlayerPrefs.GetFloat("positionX");
                    Debug.Log(this.transform.position.x);
                    Debug.Log(PlayerPrefs.GetFloat("positionX"));
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
            }
            
            if (PlayerPrefs.HasKey("nbPotionsSort")) {
                scriptHeros.setNbPotionsSort(PlayerPrefs.GetInt("nbPotionsSort"));
            }
            if (PlayerPrefs.HasKey("nbPotionsReveil")) {
                scriptGestionJeu.setNbPotionsReveille(PlayerPrefs.GetInt("nbPotionsReveil"));
            }
            if (PlayerPrefs.HasKey("sante")) {
                scriptHeros.setSante(PlayerPrefs.GetFloat("sante"));
            }
            if (PlayerPrefs.HasKey("vies")) {
                scriptHeros.setVies(PlayerPrefs.GetInt("vies"));
            }
            if (PlayerPrefs.HasKey("heros")) {
                nomHeros = PlayerPrefs.GetString("heros");
            }
            if (PlayerPrefs.HasKey("santeBoss")) {
                santeBossSauvegarde = true;
            }
            resetPartieEnChargement();//Remise à la valeur d'origine.
        }
        else {
            gestionscAffichage.afficherMessage("Aucune partie sauvegardée");
        }
    }
}//Fin update

//Retourne la valeur (true ou false) de partieEnChargement
function getPartieEnChargement() {
    return partieEnChargement;
}

//Met à jour la valeur (true ou false) de partieEnChargement
function setPartieEnChargement(etat:boolean) {
    partieEnChargement = etat;
}

//Remet partieEnChargement à false après un délai
function resetPartieEnChargement() {
    yield WaitForSeconds(5);
    partieEnChargement = false;
    Debug.Log("partie chargée");
}

function OnLevelWasLoaded() {

    if (PlayerPrefs.HasKey("heros")) {

        heros = GameObject.Find(PlayerPrefs.GetString("heros"));
        Debug.Log(heros);
        heros.SetActive(true);
    }
    if (santeBossSauvegarde) {
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