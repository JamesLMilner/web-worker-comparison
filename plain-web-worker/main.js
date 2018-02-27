if (window.Worker) {

    var worker = new Worker('worker.js');
    const n = 100000000;
    const calculate = document.getElementById("calculatePrimes")

    worker.addEventListener('message', function(event) {
        console.log("Primes sent back to the main thread")
        document.getElementById("showPrimes").innerHTML = `${event.data.length} prime numbers calculated!`;
        calculate.removeAttribute("disabled");
        calculate.innerText = "Done!"
        calculate.style.cursor = "initial";
    }, false);

    calculate.addEventListener("click", () => {
        calculate.setAttribute("disabled", true);
        calculate.innerText = "Calculating Primes..."
        calculate.style.cursor = "wait";
        document.getElementById("showPrimes").innerHTML = "Main thread not blocked, try highlighting this text :)";
        worker.postMessage(n);
    });

}
