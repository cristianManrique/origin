#pragma strict

/**
 * Dev Jeu
 * Gestion de tout le Jeu
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2016-01-16
 * 
 */

 //:::::::::::variables :::::::::://
  
    /*
    * GameObject canvas contient panneaux d'affichage
    * @access public
    * @var GameObject
    */
    public var nbVies: int= 3;


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
    * Contient le script scBarreVies.js
    * @access private
    * @var scBarreVies.js
    */
    private var gestionscBarreVies: scBarreVies;


    //::::::::::::::::::::://
    /*
    * Contient le son Victoire de type AudioClip 
    * @access public
    * @var AudioClip
    */
    public var AudioVictoire: AudioClip;

    //::::::::::::::::::::://
    /*
    * Verifie quel potion il faut augmente ou diminue le ALPHA
    * @access private
    * @var boolean
    */
    private var checkPotion1:boolean = false;
    private var checkPotion2:boolean = false;

    //::::::::::::::::::::://
    /*
    * Mettre à jour les textes des Potions trouvées
    * @access private
    * @var int
    */
    private var objet01:int;
    private var objet02:int;
    /*
    * Verifie quel coeur il faut augmente ou diminue le ALPHA
    * @access private
    * @var int
    */
    private var numCoeurG:int;

    //::::::::::::::::::::://
    /*
    * Gerer le niv d'Alpha du coeur
    * @access private
    * @var float
    */
    private var AlphaCoeurG:float;

    

function Start () {

    //:: Débuter les objets textes à 0
    objet01 = 0;
    objet02 = 0;

    canvas = GameObject.FindWithTag("canvas");

    //:: Chercher LES SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();
    gestionscBarreVies=canvas.GetComponent.<scBarreVies>();

    //:: Débuter Affichages des panneaux à FALSE
    gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);

}

function Update () {

    //::: Mettre à jour la variable numCoeur dans scBarredeVie.js
    numCoeurG = gestionscBarreVies.numCoeur;

}

//:::::::::::::: OnTriggerEnter :::::::::::::://
function OnTriggerEnter(other: Collider) {

	//:::::::::::::: Gérer le jeu
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "bonbon":
                gestionscBarreVies.AugmenteBarreVies();
                AlphaCoeurG++;//Augmente le Alpha
                gestionscAffichage.AugmenteAlphaCoeurUI(AlphaCoeurG, numCoeurG);
                var message="un bonbon";
                //Debug.Log("bonbon");
                Destroy(other.gameObject);
                break;

            case "gateau":
                gestionscBarreVies.AugmenteBarreVies();
                message="un gateau";
                //Debug.Log("gateau");
                Destroy(other.gameObject);
                AlphaCoeurG++;//Augmente le Alpha
                gestionscAffichage.AugmenteAlphaCoeurUI(AlphaCoeurG, numCoeurG);
                break;

            case "potionVie":
                objet01++;//potionVie trouvée
                checkPotion1=true;
                gestionscAffichage.MettreAJourPotionsUI(checkPotion1, checkPotion2);
                message="une potion Vie";
                //Debug.Log("potionVie");
                Destroy(other.gameObject);
                checkPotion1=false;//remettre à false
                break;

            case "potionReveille":
                message="une potion Reveille";
                Destroy(other.gameObject);
                break;

            case "potionSort":
                objet02++;//potionSort trouvée
                checkPotion2=true;
                gestionscAffichage.MettreAJourPotionsUI(checkPotion1, checkPotion2);
                message="une potion magique";
                //Debug.Log("potionSort");
                Destroy(other.gameObject);
                checkPotion2=false;//remettre à false
                break;

            case "potionSort":
                objet02++;//potionSort trouvée
                checkPotion2=true;
                gestionscAffichage.MettreAJourPotionsUI(checkPotion1, checkPotion2);
                message="une potion magique";
                //Debug.Log("potionSort");
                Destroy(other.gameObject);
                checkPotion2=false;//remettre à false
                break;

            case "ogre":
                gestionscAffichage.AfficherPanneauBarreVieEnnemi(true);//Afficher le panneau
                message="Attention c'est un boss";
                //Debug.Log("potionSort");
                break;


        }
       if (other.gameObject.tag == "bonbon" || other.gameObject.tag == "gateau" || other.gameObject.tag == "potionVie" || other.gameObject.tag == "potionReveille" || other.gameObject.tag == "potionSort") {
          //nbVies++;
          JoueSonVictoire();
        }
        gestionscAffichage.MettreAJourMessage(message);
        // mettre à jour le text affiché, cette fonction est dans scAffichageTP.js
        gestionscAffichage.MettreAJourText(objet01, objet02);
        // mettre à jour le text affiché, cette fonction est dans scAffichage.js
    }

}

function OnTriggerExit(other:Collider) {
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "boss1":
                gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);//ne pas afficher ce panneau
                break;
        }
    }



}





//:::::::::::::: function jouer une fois l'AudioVictoire :::::::::::::://
function JoueSonVictoire(){
    GetComponent.<AudioSource>().PlayOneShot(AudioVictoire);
}

//:::::::::::::: function updateDommages :::::::::::::://
function updateDommages(dommages:int) {
    nbVies -= dommages;
    Debug.Log(nbVies);
}