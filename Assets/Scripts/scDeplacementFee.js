#pragma strict

/**
*Script que gere les desplacements de la fee dans l'aire
*@author Cristina Mahneke
*@source https://www.youtube.com/watch?v=oLqWkR28ORM
*@source http://docs.unity3d.com/ScriptReference/Mathf.Sin.html
*@date 20/01/2016
**/

/**
*velocite en axes x, y et z
*@var float
*@access public
**/
var velX: float;
var velY: float;
var velZ: float;

/**
*increment de l'hauteur
*@var float
*@access public
**/
var incrementY: float;

/**
*les limites dans le worldspace ou la fee volera
*@var float
*@access public
**/

var limitXmax: float;
var limitXmin: float;
var limitYmax: float;
var limitYmin: float;
var limitZmax: float;
var limitZmin: float;

/**
*la position de l'objet sera gere par une vector
*@var Vector3
*@access private
**/
private var positionActuel: Vector3;


function Start () {

//etablir les valeurs de depart
	positionActuel = transform.position;

	velX = .03;
	velY = 1.1;
	velZ = .05;

	limitXmax = 8;
	limitYmax = 4;
	limitZmax = 13;
	limitXmin = 1;
	limitYmin = 1;
	limitZmin = 7;

	incrementY = .5;

}

function FixedUpdate () {

	positionActuel.x += velX;

	//positionActuel en axe verticale egale a la somme du produit de l'angle cree entre la position anterieur et l'incrementY, calcule a chaque frame
	positionActuel.y += Mathf.Sin(Time.deltaTime * velY)*incrementY;

	positionActuel.z += velZ;



	// si la fee atteint les limites predetermines, elle changera de direction
	if(positionActuel.x <=limitXmin || positionActuel.x >= limitXmax){
		velX = velX * -1;
	}

	if (positionActuel.y <=limitYmin || positionActuel.y >= limitYmax){
		velY = velY * -1;
	}
	if(positionActuel.z <= limitZmin || positionActuel.z >= limitZmax){
		velZ = velZ * -1;
	}

	//mise a jour de la position
	transform.position = positionActuel;

}