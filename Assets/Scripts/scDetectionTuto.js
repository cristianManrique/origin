#pragma strict

/**
* Script de détection pour faire apparaître les messages du tutoriel
* Mise à jour Messages UI
* @author Stéphane Leclerc
* @date 2016-01-16
*/

/*
* Contient le script scAffichage.js
* @access private
* @var scAffichageTP.js
*/
private var gestionscAffichageTuto: scAffichageTuto;

/*
* GameObject canvas contient panneaux d'affichage du tuto
* @access public
* @var GameObject
*/
public var canvasTuto: GameObject;





function Start() {
    gestionscAffichageTuto=canvasTuto.GetComponent.<scAffichageTuto>();//:: Chercher LE SCRIPT
}

//:::::::::::::: OnTriggerEnter ::::::::::::::
function OnTriggerEnter(other: Collider) {
    
 
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            //:::::::::::::: Gestion Panneaux Tuto
            case "MessageBonbon":
                //regleBonbon.informationBonbon(true);
                gestionscAffichageTuto.messageBonbon.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessagePotionSort":
                gestionscAffichageTuto.messagePotionSort.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageOgre":
                gestionscAffichageTuto.messageOgre.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageFeeVolante":
                gestionscAffichageTuto.messageFeeVolante.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageDiable":
                gestionscAffichageTuto.messageDiable.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageFantome":
                gestionscAffichageTuto.messageFantome.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageLutin":
                gestionscAffichageTuto.messageLutin.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessageBonbon":
                gestionscAffichageTuto.messageBonbon.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;

            case "MessagePotionReveille":
                gestionscAffichageTuto.messagePotionReveille.SetActive(true);
                Time.timeScale=0;
                Destroy(other.gameObject);
                break;
        }
    }
}