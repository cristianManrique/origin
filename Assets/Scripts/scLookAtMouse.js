//CODE SOURCE : http://wiki.unity3d.com/index.php?title=LookAtMouse


// LookAtMouse will cause an object to rotate toward the cursor, along the y axis.
//
// To use, drop on an object that should always look toward the mouse cursor.
// Change the speed value to alter how quickly the object rotates toward the mouse.
 
// speed is the rate at which the object will rotate
public var speed = 4.0;

private var cam:Camera;
 
function Start() {
    var sceneActuelle:String = SceneManager.GetActiveScene.name;
    
    if (sceneActuelle != "menu" && sceneActuelle != "gameOver" && sceneActuelle != "gagnant") {
        cam = GameObject.FindWithTag("camPrincipale").GetComponent.<Camera>();//Doit aller chercher la cam à chaque activation car elle n'est pas la même d'un niveau à l'autre.
    }
}

function Update () {
    // Generate a plane that intersects the transform's position with an upwards normal.
    var playerPlane = new Plane(Vector3.up, transform.position);
 
    // Generate a ray from the cursor position
    var ray = cam.ScreenPointToRay (Input.mousePosition);
 
    // Determine the point where the cursor ray intersects the plane.
    // This will be the point that the object must look towards to be looking at the mouse.
    // Raycasting to a Plane object only gives us a distance, so we'll have to take the distance,
    //   then find the point along that ray that meets that distance.  This will be the point
    //   to look at.
    var hitdist = 0.0;
    // If the ray is parallel to the plane, Raycast will return false.
    if (playerPlane.Raycast (ray, hitdist)) {
        // Get the point along the ray that hits the calculated distance.
        var targetPoint = ray.GetPoint(hitdist);
 
        // Determine the target rotation.  This is the rotation if the transform looks at the target point.
        var targetRotation = Quaternion.LookRotation(targetPoint - transform.position);
 
        // Smoothly rotate towards the target point.
        transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, speed * Time.deltaTime);
    }
}

//À chaque nouveau chargement de niveau...
function OnLevelWasLoaded() {
    
    var sceneActuelle:String = SceneManager.GetActiveScene.name;
    
    if (sceneActuelle != "menu" && sceneActuelle != "gameOver" && sceneActuelle != "gagnant") {
        var camActuelle:GameObject;
        camActuelle = GameObject.FindWithTag("camPrincipale");
        if (camActuelle) {
            cam = camActuelle.GetComponent.<Camera>();//Doit aller chercher la cam à chaque activation car elle n'est pas la même d'un niveau à l'autre.;
        }
    }
}