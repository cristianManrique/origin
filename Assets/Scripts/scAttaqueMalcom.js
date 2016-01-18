#pragma strict
@script RequireComponent(CharacterController)
@script RequireComponent(Animator)

/**
 * TP Developpement de JEU
 * Gestion de l'attaque de Malcom
 * @author Cristian Manrique
 * @author Jonathan Martel
 * @date 2015-11-25
 * 
 */


 //:::::::::::variables :::::::::://

    //::::::::::::::::::::://
    /**
     * Contient le controleur d'animation
     * @access public
     * @var Animator
     */
    public var animateur: Animator;

 	//::::::::::::::::::::://
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

function Start () {

}

function Update () {



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

 





}