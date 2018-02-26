
const sieveOfEratosthenes = (limit) => {

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

}

self.addEventListener('message', function(event) {
    // Send the message back.
    console.log("Calculating ", event.data, "primes in a web worker");
    self.postMessage(sieveOfEratosthenes(event.data));
}, false);
