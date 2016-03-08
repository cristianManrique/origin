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
* la musique du menu debut
* @access public
* @var AudioClip
*/
public var musiqueMenu: AudioClip;

/*
* la musique du niveau 1
* @access public
* @var AudioClip
*/
public var musiqueNiveau1: AudioClip;

/*
* la musique du niveau 2
* @access public
* @var AudioClip
*/
public var musiqueNiveau2: AudioClip;

/*
* la musique des niveaux bosses
* @access public
* @var AudioClip
*/
public var musiqueBoss: AudioClip;

private var nomScene: String;

function Start () {
	sourceSon = GetComponent.<AudioSource>();

	nomScene = SceneManager.GetActiveScene().name;

	choisirMusique(nomScene);
}

function Update () {

}

function choisirMusique(nomScene){

	switch(nomScene){

		case "menu":
			sourceSon.clip = musiqueMenu;
			sourceSon.Play();
		break;

		case "choixPerso":
			sourceSon.clip = musiqueMenu;
			sourceSon.Play();
		break;

		case "gagnant":
			sourceSon.clip = musiqueMenu;
			sourceSon.Play();
		break;

		case "gameOver":
			sourceSon.clip = musiqueMenu;
			sourceSon.Play();
		break;

		case "tutoriel":
			sourceSon.clip = musiqueNiveau1;
			sourceSon.Play();
		break;

		case "niveau1":
			sourceSon.clip = musiqueNiveau1;
			sourceSon.Play();
		break;

		case "niveau2":
			sourceSon.clip = musiqueNiveau2;
			sourceSon.Play();
		break;

		case "boss1":
			sourceSon.clip = musiqueBoss;
			sourceSon.Play();
		break;

		case "boss2":
			sourceSon.clip = musiqueBoss;
			sourceSon.Play();
		break;
	}
}