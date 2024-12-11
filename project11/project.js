const canvas = document.getElementById("whiteboard");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 400;

let isDrawing = false;
let isEraser = false;
let lastX = 0;
let lastY = 0;


ctx.lineWidth = 4; 
ctx.lineCap = "round";
ctx.lineJoin = "round";
ctx.strokeStyle = "#000"; 


canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;
    drawOrErase(e.offsetX, e.offsetY);
});

canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mouseleave", () => (isDrawing = false));


function drawOrErase(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    [lastX, lastY] = [x, y];
}

document.getElementById("toggleEraser").addEventListener("click", () => {
    isEraser = !isEraser;
    ctx.strokeStyle = isEraser ? "#fff" : "#000"; 
    ctx.lineWidth = isEraser ? 20 : 4; 
    const mode = isEraser ? "Eraser" : "Pen";
    document.getElementById("toggleEraser").innerText = `Switch to ${mode === "Eraser" ? "Pen" : "Eraser"}`;
});


document.getElementById("clearCanvas").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});


document.getElementById("clearText").addEventListener("click", () => {
    document.getElementById("output").innerText =
        "Draw on the canvas and click \"Recognize and Speak\"!";
});


document.getElementById("recognizeText").addEventListener("click", () => {
    const image = canvas.toDataURL("image/png");

    Tesseract.recognize(image, "eng", {
        logger: (info) => console.log("Tesseract Progress:", info),
    })
        .then(({ data: { text } }) => {
            const processedText = text.trim();
            document.getElementById("output").innerText =
                processedText || "No recognizable text found!";
            if (processedText) convertToVoice(processedText);
        })
        .catch((error) => {
            console.error("Tesseract Error:", error);
            document.getElementById("output").innerText =
                "Error recognizing text!";
        });
});


function convertToVoice(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}



document.getElementById("speakText").addEventListener("click", () => {
    const typedText = document.getElementById("typedText").value.trim();
    if (typedText) {
        convertToVoice(typedText); 
    } else {
        alert("Please type some text to speak!");
    }
});


function convertToVoice(text) {
    try {
        const synth = window.speechSynthesis;
        if (!synth) {
            console.error("Speech Synthesis not supported!");
            return;
        }
        const utterance = new SpeechSynthesisUtterance(text);
        synth.speak(utterance);
        console.log("Speaking:", text); 
    } catch (error) {
        console.error("Error in text-to-speech:", error);
    }
}

canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    drawOrErase(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointerup", () => (isDrawing = false));
canvas.addEventListener("pointerout", () => (isDrawing = false));
canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    ctx.lineWidth = e.pressure * 10 || 4; 
    drawOrErase(e.offsetX, e.offsetY);
});
canvas.addEventListener("pointerdown", (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener("pointermove", (e) => {
    if (!isDrawing) return;
    drawOrErase(e.offsetX, e.offsetY);
});

canvas.addEventListener("pointerup", () => (isDrawing = false));
canvas.addEventListener("pointerout", () => (isDrawing = false));

Tesseract.recognize(processedImage, 'eng', {
    logger: (info) => console.log("Tesseract Progress:", info),
    lang: 'eng',
    tessedit_char_whitelist: '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 
    psm: 6,  
    oem: 1   
})
    .then(({ data: { text } }) => {
        const processedText = text.trim();
        document.getElementById("output").innerText =
            processedText || "No recognizable text found!";
        if (processedText) convertToVoice(processedText);
    })
    .catch((error) => {
        console.error("Tesseract Error:", error);
        document.getElementById("output").innerText =
            "Error recognizing text!";
    });
