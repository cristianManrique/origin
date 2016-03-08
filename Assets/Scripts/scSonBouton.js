#pragma strict


public var sonOuvert: AudioClip;

public var sonFerme: AudioClip;

private var sourceSon: AudioSource;

private var estOuvert: boolean;


function Start () {
	sourceSon = GetComponent.<AudioSource>();
	estOuvert = false;
}

function OnClick(){

	if(estOuvert==false){

		sourceSon.clip = sonOuvert;

		sourceSon.PlayOneShot(sonOuvert);

		estOuvert = true;

	}else if(estOuvert == true){

		sourceSon.clip = sonFerme;

		sourceSon.PlayOneShot(sonFerme);

		estOuvert = false;

	}
}