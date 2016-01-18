#pragma strict

/**
 * Dev Jeu
 * Gestion de tout le Jeu
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2015-11-25
 * 
 */

 //:::::::::::variables :::::::::://
  
    /*
    * GameObject canvas contient panneaux d'affichage
    * @access public
    * @var GameObject
    */
    public var nbVies: int= 20;


    //::::::::::::::::::::://
    /*
    * GameObject canvas contient panneaux d'affichage
    * @access public
    * @var GameObject
    */
    public var canvas: GameObject;


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

   

    public var messageBonbon:GameObject;

    public var messagePotionSort:GameObject;
  
  	public var messageOgre:GameObject;

  	public var messageFeeVolante:GameObject;

  	public var messageDiable:GameObject;

  	public var messageFantome:GameObject;

  	public var messageLutin:GameObject;

function Start () {
    //:: ACTIVER LES SCRIPTS JS
    gestionscAffichage=canvas.GetComponent.<scAffichage>();

}

function Update () {

}

//:::::::::::::: OnTriggerEnter :::::::::::::://
function OnTriggerEnter(other: Collider) {

	//:::::::::::::: Gérer le SCORE TEXTE
    if(other.gameObject.tag)
    {
//        switch(other.gameObject.tag)
//        {
//            case "bonbon"://cleA 
//                nbVies++;
//                var message="un bonbon";
//                Debug.Log("bonbon");
//                Destroy(other.gameObject);
//
//                break;
//
//            case "gateau"://cleA 
//                nbVies++;
//                message="un gateau";
//                Debug.Log("gateau");
//                Destroy(other.gameObject);
//                break;
//
//            case "potionVie"://cleA 
//                nbVies++;
//                message="une potion Vie";
//                Debug.Log("potionVie");
//                Destroy(other.gameObject);
//                break;
//
//            case "potionReveille"://cleA 
//                nbVies++;
//                message="une potion Reveille";
//                Debug.Log("potionReveille");
//                Destroy(other.gameObject);
//                break;
//
//            case "potionSort"://cleA 
//                nbVies++;
//                message="une potion jeter un sort";
//                Debug.Log("potionSort");
//                Destroy(other.gameObject);
//                break;
//         }
        if (other.gameObject.tag == "bonbon" || other.gameObject.tag == "gateau" || other.gameObject.tag == "potionVie" || other.gameObject.tag == "potionReveille" || other.gameObject.tag == "potionSort") {
            nbVies++;
            var message="un bonbon";
           Debug.Log("bonbon");
            Destroy(other.gameObject);
            JoueSonVictoire();
        }
        gestionscAffichage.MettreAJourVie(nbVies);
        // mettre à jour le text affiché, cette fonction est dans scAffichageTP.js
         gestionscAffichage.MettreAJourMessage(message);
        // mettre à jour le text affiché, cette fonction est dans scAffichageTP.js
    }
    if(other.gameObject.tag=='MessageBonbon')
	{
		//regleBonbon.informationBonbon(true);
		messageBonbon.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}
	if(other.gameObject.tag=='MessagePotionSort')
	{
		
		messagePotionSort.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}

	if(other.gameObject.tag=='MessageOgre')
	{
		
		messageOgre.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}
	if(other.gameObject.tag=='MessageFeeVolante')
	{
		
		messageFeeVolante.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}

	if(other.gameObject.tag=='MessageDiable')
	{
		
		messageDiable.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}

	if(other.gameObject.tag=='MessageFantome')
	{
		
		messageFantome.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}

	if(other.gameObject.tag=='MessageLutin')
	{
		
		messageLutin.SetActive(true);
		Time.timeScale=0;
		Destroy(other.gameObject);

	}


}





//:::::::::::::: function jouer une fois l'AudioVictoire :::::::::::::://
function JoueSonVictoire(){
    GetComponent.<AudioSource>().PlayOneShot(AudioVictoire);
}

function updateDommages(dommages:int) {
    nbVies -= dommages;
    Debug.Log(nbVies);
}