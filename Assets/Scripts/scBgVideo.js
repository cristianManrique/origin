#pragma strict

//the GUI texture  
private var textureVideo:GUITexture;  
//the Movie texture  
private var video:MovieTexture;  
//the movie name inside the resources folder  
private var nomVideo:String = "bgMenu";

function Awake() {
    //get the attached GUITexture  
    textureVideo = this.GetComponent(GUITexture);   
    //load the movie texture from the resources folder  
    video = Resources.Load(nomVideo) as MovieTexture; 
    //anamorphic fullscreen  
    textureVideo.pixelInset = new Rect(Screen.width/2, -Screen.height/2,0,0);
}

function Start () {
    //set the videoGUItex.texture to be the same as mTex  
    textureVideo.texture = video;  
    //Plays the movie  
    video.loop = true;
    video.Play();
}