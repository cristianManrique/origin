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
* Verifie si on augmente ou on diminue le ALPHA de la potion sort
* @access private
* @var boolean
*/
private var checkPotion:boolean = false;

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
private var objOriginSorts: GameObject;

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
    
    canvas = GameObject.FindWithTag("canvas");//GUI jeu

    //:: Chercher LES SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();

    objOriginSorts = GameObject.FindWithTag("originSort");
    scriptLancerSort = objOriginSorts.GetComponent.<scLancerSort>();
}

function Update () {

	 //::::::envoyer le numero de potions que le heros possede vers le script de lancer un sort  et changerArme:::::::::::::::://

    scriptLancerSort.noPotions = nbPotionSort;

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
                gestionscAffichage.AugmenteBarreVies();
//                AlphaCoeurG++;//Augmente le Alpha
                //gestionscAffichage.AugmenteAlphaCoeurUI(AlphaCoeurG, numCoeurG);
                //var message="un bonbon";
                //Debug.Log("bonbon");
                Destroy(other.gameObject);
                break;

            case "gateau":
                JoueSonVictoire();
                gestionscAffichage.AugmenteBarreVies();
                //message="un gateau";
                //Debug.Log("gateau");
                Destroy(other.gameObject);
//                AlphaCoeurG++;//Augmente le Alpha
                //gestionscAffichage.AugmenteAlphaCoeurUI(AlphaCoeurG, numCoeurG);
                break;

            case "potionVie":
                JoueSonVictoire();
                nbPotionVie++;//potionVie trouvée
                //checkPotion=true;
                //gestionscAffichage.MettreAJourPotionsUI(checkPotion, checkPotion2);
                //message="une potion Vie";
                //Debug.Log("potionVie");
                Destroy(other.gameObject);
                break;        
            case "potionReveille":
                nbPotionsReveille++;
                // message="une potion Reveille";
                if (nbPotionsReveille == 1) {
                    //permet de passé au niveau deux après avoir tuer le boss niveau1
                    SceneManager.LoadScene("niveau2");
                }
                else if (nbPotionsReveille == 2) {
                    //permet de passé au boss1
                    SceneManager.LoadScene("gagnant");
                }
                break;
           case "potionSort":
                //::addition de chaque potion rammassée.
                JoueSonVictoire();
                checkPotion=true;
                gestionscAffichage.MettreAJourPotionsUI(checkPotion);
         		nbPotionSort++;
            	Destroy(other.gameObject);
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
        //:: Mise à jour de l'affichage de la quantité total des potion de Sort
        gestionscAffichage.quantitePotionSort(nbPotionSort);
    }

}//fin trigger enter

//:::::::::::::: function jouer une fois l'AudioVictoire :::::::::::::://
function JoueSonVictoire(){
    GetComponent.<AudioSource>().PlayOneShot(AudioVictoire);
}

//:::::::::::::: function qui reduire le nb de potion sort :::::::::::::://
function reductionPotionSort()
{
    nbPotionSort--;
    gestionscAffichage.quantitePotionSort(nbPotionSort);//affichage UI
}

function getNbPotionsSort()
{
    return nbPotionSort;//affichage UI
}


