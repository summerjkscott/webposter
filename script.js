
function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const draggedElement = document.getElementById(event.dataTransfer.getData("text"));
    const dropZone = event.target;
    const number = draggedElement.id.slice(-1);
    const textElement = document.getElementById("text" + number);

    if (dropZone.id === "dropZone" + number) {
        // hides all text blocks
        document.querySelectorAll(".hidden-text").forEach(text => {
            text.style.display = "none";
        });

        // hides all of the dropzones and draggable boxes
        document.querySelectorAll(".dropzone").forEach(zone => {
            zone.style.display = "flex"; // reset in case it was hidden before
        });
        document.querySelectorAll(".draggable").forEach(box => {
            box.style.display = "flex";
        });

        // shows the selected text
        dropZone.style.display = "none";
        draggedElement.style.display = "none";
        textElement.style.display = "block";

        textElement.scrollIntoView({ behavior: "smooth", block: "center" });

        // change background color based on the number
        switch (number) {
            case "1":
                document.body.style.backgroundColor = "rgb(255, 255, 200)";
                break;
            case "2":
                document.body.style.backgroundColor = "rgb(200, 255, 200)";
                break;
            case "3":
                document.body.style.backgroundColor = "rgb(200, 220, 255)";
                break;
            case "4":
                document.body.style.backgroundColor = "rgb(255, 200, 200)";
                break;
        }
    }
}

document.querySelectorAll(".draggable").forEach(draggable => {
    draggable.addEventListener("dragstart", handleDragStart);
});
document.querySelectorAll(".dropzone").forEach(dropzone => {
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("drop", handleDrop);
});