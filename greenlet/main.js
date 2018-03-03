
const asyncSieveOfEratosthenes = greenlet(async (limit) => {

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

    return primes;

});

const calculate = document.getElementById("calculatePrimes");
const message = document.getElementById("showPrimes")

calculate.addEventListener("click", async () => {
    const n = 100000000;
    calculate.setAttribute("disabled", true);
    calculate.innerText = "Calculating Primes..."
    calculate.style.cursor = "wait";
    message.innerHTML = "Main thread not blocked, try highlighting this text :)";
    const totalPrimes = await asyncSieveOfEratosthenes(n);
    calculate.innerText = "Done!"
    calculate.style.cursor = "initial";
    message.innerHTML = `${totalPrimes.length} prime numbers calculated!`;
});

