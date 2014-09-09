#pragma strict

var base: Transform;
var speed: float;
var height: float;
private var margin: float;
private var counter = 0.0;

function Start () {
	margin = transform.localScale.y / 2 + base.localScale.y / 2;
}

function Update () {
	counter += speed * Time.deltaTime;
	transform.position.y = base.position.y + margin + height * Mathf.Sin(counter);
}