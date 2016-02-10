#pragma strict

/**
 * Dev Jeu
 * Gestion de tout le Jeu
 * @author Cristian Manrique
 * @author stéphane Leclerc
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



   
   /*
	* GameObject contient les panneaux avec le texte pour l'informations du jeu pour chaque éléments.
	*@acces public
	* var GameObject
	*/
    public var messageBonbon:GameObject;
    public var messagePotionSort:GameObject;
  	public var messageOgre:GameObject;
  	public var messageFeeVolante:GameObject;
  	public var messageDiable:GameObject;
  	public var messageFantome:GameObject;
  	public var messageLutin:GameObject;
  	public var messagePotionReveille:GameObject;



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
    private var nbPotionSort:int=0;
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


 
   /*
    * c'est la quantite total des potion
    * @access private
    * @var int
    */
//    private var quantitePotionSort:int=0;


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
    private var objOriginSorts: GameObject;

     /*
    * Script pour changer d'arme
    * @access private
    * @var Script
    */
     private var scriptChoisirArme: scChoisirArme;

     private var objet02;

    /*
    * détermine le nombre de potions de réveil ammassées par le joueur
    * @access private
    * @var Script
    */
     private var nbPotionsReveille = 0;

function Start () {

    //:: Débuter les objets textes à 0
    objet01 = 0;
    
    canvas = GameObject.FindWithTag("canvas");

    //:: Chercher LES SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();
    gestionscBarreVies=canvas.GetComponent.<scBarreVies>();

    //:: Débuter Affichages des panneaux à FALSE
    gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);

    objOriginSorts = GameObject.FindWithTag("originSort");
    scriptLancerSort = objOriginSorts.GetComponent(scLancerSort);

    scriptChoisirArme = GetComponent(scChoisirArme);

}

function Update () {

	//Debug.Log("objet02 = "+objet02);
	 //::::::envoyer le numero de potions que le heros possede vers le script de lancer un sort  et changerArme:::::::::::::::://
    scriptLancerSort.noPotions = nbPotionSort;
//	scriptChoisirArme.noPotions = nbPotionSort;

    //:: Permet de mettre à jour L'affichage des coeurs
    //:: ATTENTION:  numCoeur dans scBarredeVie.js
    numCoeurG = gestionscBarreVies.numCoeur;




   




}

//:::::::::::::: OnTriggerEnter :::::::::::::://
function OnTriggerEnter(other: Collider) {
     
    Debug.Log(other);
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            //:::::::::::::: Gestion des objets trouvées
            case "bonbon":
                gestionscBarreVies.AugmenteBarreVies();
                AlphaCoeurG++;//Augmente le Alpha
                gestionscAffichage.AugmenteAlphaCoeurUI(AlphaCoeurG, numCoeurG);
                //var message="un bonbon";
                //Debug.Log("bonbon");
                Destroy(other.gameObject);
                break;

            case "gateau":
                gestionscBarreVies.AugmenteBarreVies();
                //message="un gateau";
                //Debug.Log("gateau");
                Destroy(other.gameObject);
                AlphaCoeurG++;//Augmente le Alpha
                gestionscAffichage.AugmenteAlphaCoeurUI(AlphaCoeurG, numCoeurG);
                break;

            case "potionVie":
                objet01++;//potionVie trouvée
                checkPotion1=true;
                gestionscAffichage.MettreAJourPotionsUI(checkPotion1, checkPotion2);
                //message="une potion Vie";
                //Debug.Log("potionVie");
                Destroy(other.gameObject);
                checkPotion1=false;//remettre à false
                break;
            case "potionReveille":
                nbPotionsReveille++;
                // message="une potion Reveille";
                if (nbPotionsReveille == 1) {
                    //permet de passé au niveau deux après avoir tuer le boss niveau1
                    SceneManager.LoadScene("niveau2");
                }
                else if (nbPotionsReveille == 2) {
                    //permet de finir le jeu après avoir tuer le bos niveau 2
                    SceneManager.LoadScene("gagnant");
                }
                break;
           case "potionSort":
         //addition de chaque potion rammassée.
                checkPotion2=true;
                gestionscAffichage.MettreAJourPotionsUI(checkPotion1, checkPotion2);
         		nbPotionSort++;
            	Destroy(other.gameObject);
                checkPotion2=false;//remettre à false
               	break;

    

            //:::::::::::::: Gestion Barre de vies Ennemis
            case "ogre":
                gestionscAffichage.AfficherPanneauBarreVieEnnemi(true);//Afficher le panneau

               // message="Attention c'est un ennemi";

                //message="Attention c'est un ennemi";

                //Debug.Log("potionSort");
                break;

            //:::::::::::::: Gestion Panneaux Tuto
            case "MessageBonbon":
                //regleBonbon.informationBonbon(true);
                messageBonbon.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessagePotionSort":
                messagePotionSort.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageOgre":
                messageOgre.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageFeeVolante":
                messageFeeVolante.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageDiable":
                messageDiable.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageFantome":
                messageFantome.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageLutin":
                messageLutin.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageBonbon":
                //regleBonbon.informationBonbon(true);
                messageBonbon.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessagePotionReveille":
                //regleBonbon.informationBonbon(true);
                messagePotionReveille.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;
        }
        //permet l'affichage de la quantité total des potion de Sort
        gestionscAffichage.quantitePotionSort(objet01, nbPotionSort);
    }

}/*fin trigger enter*/

	function OnTriggerExit(other:Collider) {
	    if(other.gameObject.tag)
	    {
	       switch(other.gameObject.tag)
	        {
	          case "ogre":
	                gestionscAffichage.AfficherPanneauBarreVieEnnemi(false);//ne pas afficher ce panneau
	               break;
	       }
	   }
	}//fin OnTriggerEXit



	//:::::::::::::: function jouer une fois l'AudioVictoire :::::::::::::://
	function JoueSonVictoire(){
	    GetComponent.<AudioSource>().PlayOneShot(AudioVictoire);
	}

		function reductionPotionSort()
		{
		    nbPotionSort--;
           // Debug.Log(nbPotionSort);
		}



