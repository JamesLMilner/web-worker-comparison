if (window.Worker) {

    var primes = operative({
        sieveOfEratosthenes: (limit, callback) => {

            const sieve = [];
            const primes = [];
            let k;
            let l;

            sieve[1] = false;
            for (k = 2; k <= limit; k += 1) {
            sieve[k] = true;
            }

            for (k = 2; k * k <= limit; k += 1) {
            if (sieve[k] !== true) {
                continue;
            }
            for (l = k * k; l <= limit; l += k) {
                sieve[l] = false;
            }
            }

            sieve.forEach(function (value, key) {
            if (value) {
                this.push(key);
            }
            }, primes);

            callback(primes);

        }
    });

    const n = 100000000;
    const calculate = document.getElementById("calculatePrimes");
    const show = document.getElementById("showPrimes");

    calculate.addEventListener("click", () => {
        calculate.setAttribute("disabled", true);
        calculate.innerText = "Calculating Primes..."
        calculate.style.cursor = "wait";
        show.innerHTML = "Main thread not blocked, try highlighting this text :)";

        primes.sieveOfEratosthenes(n, (primes) => {
            calculate.innerText = "Done!"
            calculate.style.cursor = "initial";
            show.innerHTML = `${primes.length} prime numbers calculated!`;
        });

    });

}
