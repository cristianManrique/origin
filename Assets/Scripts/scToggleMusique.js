#pragma strict
/**
* Script de gestion musique ouvert/ferme
* @author Cristina Mahneke
* @date 06/03/2016
*/

/*
* composant de la source d'audio
* @access private
* @var AudioSource
*/
private var sourceSon: AudioSource;

/*
* variable qui gere l'etat de la musique
* @access private
* @var boolean
*/
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