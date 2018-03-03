
const dataProcessing = (input) => {
    // returns the byte length of an utf8 inputing
    let s = input.length;
    for (var i=input.length-1; i>=0; i--) {
        let code = input.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s+=2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }

    // Synthetic wait
    const ms = 500;
    let start = Date.now(),
    now = start;
    while (now - start < ms) {
        now = Date.now();
    }

    return s;
};

const dataProcessingAsync = async (input) => {
    // returns the byte length of an utf8 inputing
    let s = input.length;
    for (var i=input.length-1; i>=0; i--) {
        let code = input.charCodeAt(i);
        if (code > 0x7f && code <= 0x7ff) s++;
        else if (code > 0x7ff && code <= 0xffff) s+=2;
        if (code >= 0xDC00 && code <= 0xDFFF) i--; //trail surrogate
    }

    // Synthetic wait
    const ms = 333;
    let start = Date.now(),
    now = start;
    while (now - start < ms) {
        now = Date.now();
    }

    return s;
};

// Example: No Web Worker
const input = document.getElementById("userInput");
const message = document.getElementById("userMessage");
const spinner = document.getElementById("spinner");

input.addEventListener("keyup", (event) => {
    spinner.className = "visible";
    const bytes = dataProcessing(event.target.value);
    
    requestAnimationFrame(() =>{
        message.innerHTML = bytes + " bytes in user input"
        spinner.className = "hidden";
    });
    
});

// Example: No Web Worker: requestIdleCallback
const inputRID = document.getElementById("userInputRID");
const messageRID = document.getElementById("userMessageRID");
const spinnerRID = document.getElementById("spinnerRID");

inputRID.addEventListener("keyup", (event) => {
    spinnerRID.className = "visible";
    requestIdleCallback(() => {
        const bytes = dataProcessing(event.target.value);
    
        requestAnimationFrame(() =>{
            messageRID.innerHTML = bytes + " bytes in user input"
            spinnerRID.className = "hidden";
        });
    });
});

const renderAllProcessing = greenlet(dataProcessingAsync);
const renderLatestProcessing = greenlet(dataProcessingAsync);

// Example: Only Render all results
const inputRenderAll = document.getElementById("userInputRenderAll");
const messageRenderAll = document.getElementById("userMessageRenderAll");
const spinnerRenderAll = document.getElementById("spinnerRenderAll");

inputRenderAll.addEventListener("keyup", async (event) => {
    spinnerRenderAll.className = "visible";
    bytes = await renderAllProcessing(event.target.value);
    
    requestAnimationFrame(() =>{
        messageRenderAll.innerHTML = bytes + " bytes in user input"
        spinnerRenderAll.className = "hidden";
    });

});


// Example: Only render the latest result
const inputRenderLatest = document.getElementById("userInputRenderLatest");
const messageRenderLatest = document.getElementById("userMessageRenderLatest")
const spinnerRenderLatest = document.getElementById("spinnerRenderLatest");

let latest = new Date();

inputRenderLatest.addEventListener("keyup", async (event) => {
    console.log(event.target.value)
    const timestamp = new Date();
    latest = timestamp;
    spinnerRenderLatest.className = "visible";
    bytes = await renderLatestProcessing(event.target.value);
    
    requestAnimationFrame(() => {
        if (timestamp.getTime() === latest.getTime()) {
            spinnerRenderLatest.className = "hidden";
            messageRenderLatest.innerHTML = bytes + " bytes in user input"
        }
    });
    
});

