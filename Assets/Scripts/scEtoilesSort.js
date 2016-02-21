#pragma strict

function Start () {
    var particulesEtoiles: ParticleSystem = GetComponent(ParticleSystem);
    Destroy(this.gameObject, particulesEtoiles.duration);
}

function Update () {

}