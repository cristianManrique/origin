#pragma strict

var agentEnnemiOgre: NavMeshAgent;
var agentEnnemiDiable: NavMeshAgent;
var agentEnnemiLutin: NavMeshAgent;
var agentEnnemiBoss1: NavMeshAgent;
var agentEnnemiBoss2: NavMeshAgent;
function Start () {

}

//Infliges des dommages aux Ennemis
function OnTriggerEnter(other:Collider) {
    
    //:::::::::::::: Gérer le jeu
    if(other.gameObject.tag)
    {
        switch(other.gameObject.tag)
        {
            case "ogre":
                Debug.Log(other.gameObject.tag);
		        agentEnnemiOgre = other.gameObject.GetComponent(NavMeshAgent);
		        agentEnnemiOgre.Stop();
		        yield WaitForSeconds(5);
        		agentEnnemiOgre.Resume();

                break;

            case "diable":
               Debug.Log(other.gameObject.tag);
				agentEnnemiDiable = other.gameObject.GetComponent(NavMeshAgent);
		        agentEnnemiDiable.Stop();
		        yield WaitForSeconds(5);
        		agentEnnemiDiable.Resume();
            	break;

            case "lutin":
	           	Debug.Log(other.gameObject.tag);
				agentEnnemiLutin = other.gameObject.GetComponent(NavMeshAgent);
		        agentEnnemiLutin.Stop();
		        yield WaitForSeconds(5);
        		agentEnnemiLutin.Resume();
            	break;

            case "boss1":
                Debug.Log(other.gameObject.tag);

				agentEnnemiBoss1 = other.gameObject.GetComponent(NavMeshAgent);
				agentEnnemiBoss1.Stop();
		        yield WaitForSeconds(5);
        		agentEnnemiBoss1.Resume();
		     
            	break;

            case "boss2":
                Debug.Log(other.gameObject.tag);

				agentEnnemiBoss2 = other.gameObject.GetComponent(NavMeshAgent);
				agentEnnemiBoss2.Stop();
		        yield WaitForSeconds(5);
		        agentEnnemiBoss2.Resume();

            	break;
        }


    }

}