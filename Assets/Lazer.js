#pragma strict

var speed: float;
var left = false;

function Start () {

}

function FixedUpdate () {
	transform.position.x += (left) ? -speed : speed;
	
	if (Mathf.Abs(transform.position.x) > 100) {
		Destroy(gameObject);
	}
}