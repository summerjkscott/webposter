// when you start dragging a box
function handleDragStart(event) {
    // save the box's ID so we know which one was dragged
    event.dataTransfer.setData("text/plain", event.target.id);
}

// while dragging over a drop area
function handleDragOver(event) {
    // let the drop happen (by default it's not allowed)
    event.preventDefault();
}

// when you drop a box into a drop area
function handleDrop(event) {
    event.preventDefault(); // allows the drop

    // get the box that was dragged
    const draggedElement = document.getElementById(event.dataTransfer.getData("text"));

    // get the thing you dropped it on
    const dropZone = event.target;

    // get the number from the box's ID 
    const number = draggedElement.id.slice(-1);

    // get the matching text block that should show up
    const textElement = document.getElementById("text" + number);

    // check if you dropped the box into the correct zone
    if (dropZone.id === "dropZone" + number) {
        // hides all the text blocks first
        document.querySelectorAll(".hidden-text").forEach(text => {
            text.style.display = "none";
        });

        // makes sure all drop zones are visible again
        document.querySelectorAll(".dropzone").forEach(zone => {
            zone.style.display = "flex";
        });

        // makes sure all draggable boxes are visible again
        document.querySelectorAll(".draggable").forEach(box => {
            box.style.display = "flex";
        });

        // hides the one drop zone and box that were just used
        dropZone.style.display = "none";
        draggedElement.style.display = "none";

        // shows the matching text
        textElement.style.display = "block";

        // scroll to the text smoothly
        textElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // changes background color based on which number it was
        switch (number) {
            case "1":
                document.body.style.backgroundColor = "rgb(255, 255, 200)"; // yellow
                break;
            case "2":
                document.body.style.backgroundColor = "rgb(200, 255, 200)"; // green
                break;
            case "3":
                document.body.style.backgroundColor = "rgb(200, 220, 255)"; // blue
                break;
            case "4":
                document.body.style.backgroundColor = "rgb(255, 200, 200)"; // pink
                break;
        }
    }
}

// tell all draggable boxes what to do when you start dragging them
document.querySelectorAll(".draggable").forEach(draggable => {
    draggable.addEventListener("dragstart", handleDragStart);
});

// tell all drop zones how to act when you drag over or drop something on them
document.querySelectorAll(".dropzone").forEach(dropzone => {
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("drop", handleDrop);
});