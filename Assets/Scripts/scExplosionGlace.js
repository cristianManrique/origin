#pragma strict

 /**
*Script qui demarre une systeme de particules quand la stalag est active
*@author Cristina Mahneke
*@author David Lachambre
*@date 28/02/2016
**/

/**
*prefab particules explosion de glace
*@var GameObject
*@access public
**/
 public var explosionGlace: GameObject;


function exploserGlace(){

		//Debug.Log("boom");
		var pointExplosion: Vector3 = Vector3(transform.position.x, transform.position.y+3, transform.position.z);
		var explosion: GameObject = Instantiate (explosionGlace, pointExplosion , transform.rotation) as GameObject;//on cree une explosion de glace qunad le stalag franchit la surface
 
    
    var particulesExplosion: ParticleSystem = explosion.transform.Find("eclatsGlace").GetComponent(ParticleSystem);//Particules de l'explosion
    Destroy(explosion, particulesExplosion.duration);//L'explosion est detruite quand sa duree est ecoulee
	
}
