#pragma strict

var movementForce: float;
var sheild: GameObject;
var indicator: Material;
var lazer: GameObject;
var player: int;

private var maxEnergy = 100.0;
private var energy = 100.0;
private var blinkTime = energy;

private var energyMove = 0.1;
private var energyShield = 0.5;
private var energyLazer = 1;
private var energyDamage = 20;
private var energyDamageWithSheild = 5;
private var lazerDelay = 10;
private var lazerDelayTick = 0;
private var left = false;

function Start () {
	rigidbody.freezeRotation = true;
}

function Update () {
	transform.position.z = 0;
}

function OnTriggerEnter(collider: Collider) {
	if (collider.tag == "Lazer") {
		Destroy(collider.transform.parent.gameObject);
		energy -= sheild.renderer.enabled ? energyDamageWithSheild : energyDamage;
	}
}

function FixedUpdate() {
	if ((player == 1 && Input.GetKey(KeyCode.UpArrow)) || (player == 2 && Input.GetKey(KeyCode.W))) {
		rigidbody.AddForce (Vector3.up * movementForce, ForceMode.Acceleration);
		energy -= energyMove;
	} else if (player == 1 && Input.GetKey(KeyCode.DownArrow) || (player == 2 && Input.GetKey(KeyCode.S))) {
		rigidbody.AddForce (Vector3.down * movementForce, ForceMode.Acceleration);
		energy -= energyMove;
	}
	
	if ((player == 1 && Input.GetKey(KeyCode.RightArrow)) || (player == 2 && Input.GetKey(KeyCode.D))) {
		energy -= energyMove;
		left = false;
		rigidbody.AddForce (Vector3.right * movementForce, ForceMode.Acceleration);
	} else if (player == 1 && Input.GetKey(KeyCode.LeftArrow) || (player == 2 && Input.GetKey(KeyCode.A))) {
		energy -= energyMove;
		left = true;
		rigidbody.AddForce (Vector3.left * movementForce, ForceMode.Acceleration);
	}
	
	if ((player == 1 && Input.GetKey(KeyCode.Keypad8)) || (player == 2 && Input.GetKey(KeyCode.Q))) {
		sheild.renderer.enabled = true;
		energy -= energyShield;
	} else {
		sheild.renderer.enabled = false;
	}
	
	if (lazerDelayTick <= 0) {
		if ((player == 1 && Input.GetKey(KeyCode.Keypad2)) || (player == 2 && Input.GetKey(KeyCode.E))) {
			energy -= energyLazer;
			
			var lazerScript = lazer.GetComponent(Lazer);
			lazerScript.left = left;
			
			if (left) {
				lazer.transform.position = Vector3(transform.position.x - 2.5, transform.position.y, 0);
			} else {
				lazer.transform.position = Vector3(transform.position.x + 2.5, transform.position.y, 0);
			}
			var newLazer = Instantiate(lazer);
			lazerDelayTick = lazerDelay;
		}
	} else {
		lazerDelayTick -= 0.1;
	}
	
	blinkTime -= 1;
	
	if (blinkTime <= 0) {
		blinkTime = energy;
	} else if (blinkTime <= 1 + energy / 10) {
		indicator.color = Color.black;
	} else {
		if (energy >= 50) {
			indicator.color = Color.green;
		} else if (energy >= 15) {
			indicator.color = Color.yellow;
		} else {
			indicator.color = Color.red;
		}
	}
	
	if (energy <= 0) {
		Destroy(gameObject);
	}
}