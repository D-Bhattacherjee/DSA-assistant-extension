/*
Psudo code____logic


ON button click:

    GET input

    IF empty → show error

    ELSE:
        SEND request to Gemini API
            include:
                - user problem
                - instruction: "give hint only"

        WAIT for response

        EXTRACT text from response

        DISPLAY it
*/

// Step 1: Get elements
const button = document.getElementById("hintBtn");
const textarea = document.getElementById("problem");
const output = document.getElementById("output");

// Adding the click event
button.addEventListener("click", () => {

    // Step 3: Get input value
    const input = textarea.value.trim();


    if (input === "") {
        // Step 4: Check if input area is empty (V1)
        output.textContent = "ERROR! Please Paste or Write Down The Problem Here First";
        return;

    } else {
        // Step 5: Show dummy hint (V1)
        output.textContent = "Try breaking the problem into smaller parts.";
    }
});