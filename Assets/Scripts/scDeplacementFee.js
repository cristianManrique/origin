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

/**
*Détermine si le déplacement de la fée peut commencer.
*@var boolean
*@access private
**/
private var deplacement:boolean;

//private var rotationCible: Quaternion;

//private var rotationActuel: Quaternion; 
function Start () {

//etablir les valeurs de depart
	positionActuel = transform.position;

	velX = .03;
	velY = 1.1;
	velZ = .05;


	limitXmax = positionActuel.x + 1;

	limitYmax = positionActuel.y + 2;

	limitZmax = positionActuel.z + 2;

	limitXmin = positionActuel.x - 1;

	limitYmin = positionActuel.y -.5;

	limitZmin = positionActuel.z - 1;

	incrementY = .5;

    debutRandomMouvement();
}

function FixedUpdate () {

    if (deplacement) {//Si la fée peut se déplacer...
        positionActuel.x += velX;

        //positionActuel en axe verticale egale a la somme du produit de l'angle cree entre la position anterieur et l'incrementY, calcule a chaque frame
        positionActuel.y += Mathf.Sin(Time.deltaTime * velY)*incrementY;

        positionActuel.z += velZ;

        //rotationCible= Quaternion.LookRotation(positionActuel);
        //rotationActuel = transform.localRotation;

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
        //transform.localRotation = Quaternion.Slerp(rotationActuel, rotationCible, Time.deltaTime);

        transform.position = positionActuel;
    }
}

//Détermine quand la fée commence à bouger (pour désynchroniser leurs mouvements quand il y en a plusieurs à proximité)
function debutRandomMouvement() {
    var chiffreRandom = Random.Range(0, 2);
    yield WaitForSeconds(chiffreRandom);
    deplacement = true;
}
