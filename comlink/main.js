if (window.Worker) {

    const SieveOfEratosthenes = Comlink.proxy(new Worker('worker.js'));
    const n = 100000000;
    const calculate = document.getElementById("calculatePrimes")

    calculate.addEventListener("click", async () => {
        const n = 100000000;
        const instance = await new SieveOfEratosthenes();
        calculate.setAttribute("disabled", true);
        calculate.innerText = "Calculating Primes..."
        calculate.style.cursor = "wait";
        document.getElementById("showPrimes").innerHTML = "Main thread not blocked, try highlighting this text :)";
        const totalPrimes = await instance.calculate(n); 
        calculate.innerText = "Done!"
        calculate.style.cursor = "initial";
        document.getElementById("showPrimes").innerHTML = `${totalPrimes.length} prime numbers calculated!`;
    });

}
