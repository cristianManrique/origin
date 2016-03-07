#pragma strict

/**
* Script de gestion du background animé du menu
* @author David Lachambre
* @date 31-12-2015
*/

//CODE SOURCE : http://www.41post.com/3687/programming/unity-how-to-use-a-gui-texture-to-play-fullscreen-videos

/**
* Composant GUITexture qui contient le clip vidéo
* @access private
* @var GUITexture
*/
private var textureVideo:GUITexture;

/**
* Vidéo à jouer en background
* @access private
* @var MovieTexture
*/
private var video:MovieTexture;

/**
* Le nom du fichier vidéo à charger
* @access private
* @var String
*/
public var nomVideo:String;

function Awake() {
    textureVideo = this.GetComponent(GUITexture);//Récupère le composant GUITexture.  
    //load the movie texture from the resources folder  
    video = Resources.Load("Video/" + nomVideo) as MovieTexture;//Chargement du vidéo à partir du dossier Resources.
    //anamorphic fullscreen  
    textureVideo.pixelInset = new Rect(Screen.width/2, -Screen.height/2,0,0);//Pour mettre le vidéo en anamorphic plein écran.
}

function Start () {
    video.loop = true;
    video.Play();
}