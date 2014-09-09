#pragma strict

var maxIntensity: float;
var minIntensity: float;
var intensitySpeed: float;

private var intensity = 0.0;
private var direction = 1.0;

function Start () {

}

function Update () {
	if (intensity >= maxIntensity) {
		intensity = maxIntensity;
		direction = -direction;
	} else if (intensity <= minIntensity) {
		intensity = minIntensity;
		direction = -direction;
	}
	
	intensity += direction * intensitySpeed * Time.deltaTime;
	light.intensity = intensity;
}