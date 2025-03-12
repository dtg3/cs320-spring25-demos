window.addEventListener('keydown', function(event) {
    console.log("KeyDown: " + event.code);
    var msgSpan = document.getElementById("say");
    var text = msgSpan.innerHTML;
    switch(event.code) {
        case "Backspace":
            text = text.slice(0, text.length - 1);
            break;
        case "ShiftRight":
            break;
        case "ShiftLeft":
            break;
        case "Enter":
            text = ""
            break;
        default:
            text += event.key;
    }

    msgSpan.innerHTML = text
});

function quack() {
    console.log("I clicked the duck!");
    var noiseDiv = document.getElementById("duck-noise");
    noiseDiv.innerHTML = "QUACK!";
}

function scritch() {
    console.log("Mouseover");
    var touchDiv = document.getElementById("touch-duck");
    touchDiv.innerHTML = "SCRITCH";
}

function scratch() {
    console.log("Mouseout");
    var touchDiv = document.getElementById("touch-duck");
    touchDiv.innerHTML = "SCRATCH";
}