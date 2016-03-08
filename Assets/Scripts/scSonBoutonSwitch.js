#pragma strict
public var sonSwitch: AudioClip;

private var sourceSon: AudioSource;



function Start () {
	sourceSon = GetComponent.<AudioSource>();
}

function OnClick(){

		sourceSon.clip = sonSwitch;

		sourceSon.PlayOneShot(sonSwitch);
	
}