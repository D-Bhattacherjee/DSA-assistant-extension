// ===============================
// Step 1: Get HTML Elements
// ===============================
const button = document.getElementById("hintBtn");     // Button user clicks
const textarea = document.getElementById("problem");   // Input field (problem)
const output = document.getElementById("output");      // Where hint will be shown

// ===============================
// Step 2: Your API Key
// ===============================
const API_KEY = "YOUR_API_KEY_HERE"; // ⚠️ Replace with your actual key

// ===============================
// Step 3: Add Click Event
// ===============================
button.addEventListener("click", async () => {

    // Get user input and remove extra spaces
    const input = textarea.value.trim();

    // ===============================
    // Step 4: Handle Empty Input
    // ===============================
    if (input === "") {
        output.textContent = "ERROR! Please paste a problem first.";
        return; // stop execution
    }

    // Show loading text
    output.textContent = "Thinking...";

    try {
        // ===============================
        // Step 5: Send Request to Gemini API
        // ===============================
        const response = await fetch(
            // ✅ Updated working model
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },

                // Body = what we send to AI
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    // Prompt: tell AI to give hint only
                                    text: `Give ONLY a hint (no full solution) for this DSA problem:\n\n${input}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        
        console.log("STATUS:", response.status);
        // ===============================
        // Step 6: Convert Response to JSON
        // ===============================
        const data = await response.json();

        // Debug: see full response in console
        console.log("FULL DATA:", data);

        // ===============================
        // Step 7: Safe Extraction of Hint
        // ===============================

        // Check if API returned anything
        if (!data.candidates) {
            output.textContent = "No candidates returned from AI!";
            return;
        }

        if (data.candidates.length === 0) {
            output.textContent = "AI returned empty response!";
            return;
        }

        // Extract parts (actual text chunks)
        const parts = data.candidates[0]?.content?.parts;

        if (!parts) {
            output.textContent = "No content parts found!";
            return;
        }

        // Combine all text parts into one string
        const hint = parts.map(p => p.text).join(" ");

        // ===============================
        // Step 8: Show Result
        // ===============================
        output.textContent = hint || "No hint generated.";

    } catch (error) {
        // ===============================
        // Step 9: Error Handling
        // ===============================
        output.textContent = "Error getting hint. Try again.";
        console.error("ERROR:", error);
    }
});