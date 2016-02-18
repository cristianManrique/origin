#pragma strict

private var dommages: int = 5;//Le dommage inflige au heros
private var scriptHeros: scHeros;

function OnTriggerEnter(objetEnCollision: Collider) {

    if (objetEnCollision.tag == "heros") {//Si le rocher touche le heros...
        scriptHeros = objetEnCollision.gameObject.GetComponent(scHeros);
        scriptHeros.updateDommages(dommages);//Dommages au heros
    }
    var explosion: GameObject = Instantiate (Resources.Load ("Prefabs/EmmeteursPreFabs/explosionPetitRocher")) as GameObject;//Le rocher eclate quand il entre en collision
    explosion.transform.position = this.transform.position;
    
    var particulesExplosion: ParticleSystem = explosion.transform.Find("eclatsRoches").GetComponent(ParticleSystem);//Particules de l'explosion
    Destroy(explosion, particulesExplosion.duration);//L'explosion est detruite quand sa duree est ecoulee
    
    Destroy(this.gameObject);
}