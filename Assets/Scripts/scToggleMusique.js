#pragma strict



private var sourceSon: AudioSource;

private var jouer: boolean;


function Start () {
	sourceSon = GetComponent.<AudioSource>();
	jouer = true;
}

function OnClick(){

	if(jouer==true){

		
		sourceSon.Stop();

		jouer = false;

	}else if(jouer == false){


		sourceSon.Play();

		jouer = true;

	}
}