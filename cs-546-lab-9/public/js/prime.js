(function() {
    function ifPrime(number) {
        if(number < 2)
            return false;
        const n = Math.sqrt(number);
        const n1 = Math.round(n);
        for(var i = 2; i <= n1; i++) {
            if(number % i == 0)
                return false;
        }
        return true;
    }

    const checker = document.getElementById("checker");

    if(checker) {
        const numberInput = document.getElementById("number");
        const resultText = document.getElementById("attempts");
        checker.addEventListener("submit", event => {
            event.preventDefault();
            try {
                const number = parseInt(numberInput.value);
                const boo = ifPrime(number);
                var s = "";
                if(boo) {
                    s = s + "<li class="+ '"is-prime"' + ">" + number + " is a prime number</li>";
                }
                else {
                    s = s + "<li class="+ '"not-prime"' + ">" + number + " is Not a prime number</li>";
                }
                var query = resultText.querySelectorAll("li");
                for(var i = 0; i < query.length; i++)
                    if(query[i].className == "is-prime") {
                        var str = "";
                        str = str + '<li class="is-prime">' + query[i].innerText + "</li>";
                        s = s + str;
                    }
                    else
                    if(query[i].className == "not-prime") {
                        var str = "";
                        str = str + '<li class="not-prime">' + query[i].innerText + "</li>";
                        s = s + str;
                    }
                resultText.innerHTML = s;
            }
            catch(e) {
                resultText.innerHTML = "error";
            }
        });
    }
})();