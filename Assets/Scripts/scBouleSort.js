#pragma strict
/**
* Script qui gère le comportement de la boule de sort
* @author Cristina Mahneke
* @author Cristian Manrique
* @author David Lachambre
* @date 19/02/2016
**/

/**
*la vitesse de déplacement du projectile
*@var int
*@access private
**/
private var vitesseSort: int = 10;

/**
*la vitesse en seconde avant de dégeler un ennemi touché
*@var int
*@access private
**/
private var vitesseDegele: int;


function Start () {
    var particulesSort: ParticleSystem = transform.Find("particulesMagie").GetComponent(ParticleSystem);
    vitesseDegele = particulesSort.duration - 0.5;
    Destroy(this.gameObject, particulesSort.duration);
}

function Update () {
    transform.Translate(Vector3.forward * vitesseSort * Time.deltaTime);
}

//Gèle les ennemis touchés
function OnTriggerEnter(other:Collider) {
    //:::::::::::::: Gérer le jeu
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "ogre":
//                Debug.Log(other.gameObject.tag);
		        var agentEnnemiOgre: NavMeshAgent = other.gameObject.GetComponent(NavMeshAgent);
                var scriptOgre:scOgre = other.gameObject.GetComponent(scOgre);
                
                scriptOgre.setEstGele(true);
		        agentEnnemiOgre.Stop();
		        yield WaitForSeconds(vitesseDegele);
                if (agentEnnemiOgre) {
                    agentEnnemiOgre.Resume();
                    scriptOgre.setEstGele(false);
                }
                break;

            case "diable":
//               Debug.Log(other.gameObject.tag);
				var agentEnnemiDiable: NavMeshAgent = other.gameObject.GetComponent(NavMeshAgent);
                var scriptDiable:scDiable = other.gameObject.GetComponent(scDiable);
                
                scriptDiable.setEstGele(true);
		        agentEnnemiDiable.Stop();
		        yield WaitForSeconds(vitesseDegele);
                if (agentEnnemiDiable) {
                    agentEnnemiDiable.Resume();
                    scriptDiable.setEstGele(false);
                }
            	break;

            case "lutin":
//	           	Debug.Log(other.gameObject.tag);
                var scriptLutin:scLutin = other.gameObject.GetComponent(scLutin);
                
                scriptLutin.setEstGele(true);
		        yield WaitForSeconds(vitesseDegele);
                if (scriptLutin) {
                    scriptLutin.setEstGele(false);
                }
            	break;

            case "boss1":
//                Debug.Log(other.gameObject.tag);
				var agentEnnemiBoss1: NavMeshAgent = other.gameObject.GetComponent(NavMeshAgent);
                var scriptBoss1:scBoss1 = other.gameObject.GetComponent(scBoss1);
                var animBoss1:Animator = other.gameObject.GetComponent(Animator);
                
                scriptBoss1.setEstGele(true);
				agentEnnemiBoss1.Stop();
                animBoss1.enabled = false;
		        yield WaitForSeconds(vitesseDegele);
                if (agentEnnemiBoss1) {
                    agentEnnemiBoss1.Resume();
                    scriptBoss1.setEstGele(false);
                    animBoss1.enabled = true;
                }
            	break;

            case "boss2":
//                Debug.Log(other.gameObject.tag);
				var agentEnnemiBoss2: NavMeshAgent = other.gameObject.GetComponent(NavMeshAgent);
                var scriptBoss2:scBoss2 = other.gameObject.GetComponent(scBoss2);
                var animBoss2:Animator = other.gameObject.GetComponent(Animator);
                
                scriptBoss2.setEstGele(true);
				agentEnnemiBoss2.Stop();
                animBoss2.enabled = false;
		        yield WaitForSeconds(vitesseDegele);
                if (agentEnnemiBoss2) {
                    agentEnnemiBoss2.Resume();
                    scriptBoss2.setEstGele(false);
                    animBoss2.enabled = true;
                }
            	break;
        }
    }
}