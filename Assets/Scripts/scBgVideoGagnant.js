#pragma strict

private var textureVideo:MovieTexture;

function Start () {
    textureVideo = GetComponent.<RawImage>().texture as MovieTexture;
    textureVideo.Play ();
}