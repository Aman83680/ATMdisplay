const correctPin = "1234";

let balance = Number(localStorage.getItem("balance")) || 10000;
let history = JSON.parse(localStorage.getItem("history")) || [];

function login() {
    const pin = document.getElementById("pin").value;

    if (pin === correctPin) {
        document.getElementById("loginBox").classList.add("hidden");
        document.getElementById("dashboard").classList.remove("hidden");

        loadData();
    } else {
        alert("Wrong PIN");
    }
}

function loadData() {
    document.getElementById("balance").textContent = balance;

    const historyList = document.getElementById("history");
    historyList.innerHTML = "";

    history.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        historyList.appendChild(li);
    });
}

function deposit() {
    let amount = Number(document.getElementById("amount").value);

    if (amount > 0) {
        balance += amount;

        let transaction =
            `Deposit ₹${amount} - ${new Date().toLocaleString()}`;

        history.unshift(transaction);

        saveData();
        loadData();

        document.getElementById("amount").value = "";
    }
}

function withdraw() {
    let amount = Number(document.getElementById("amount").value);

    if (amount > balance) {
        alert("Insufficient Balance");
        return;
    }

    if (amount > 0) {
        balance -= amount;

        let transaction =
            `Withdraw ₹${amount} - ${new Date().toLocaleString()}`;

        history.unshift(transaction);

        saveData();
        loadData();

        document.getElementById("amount").value = "";
    }
}

function saveData() {
    localStorage.setItem("balance", balance);
    localStorage.setItem("history", JSON.stringify(history));
}

function logout() {
    document.getElementById("dashboard").classList.add("hidden");
    document.getElementById("loginBox").classList.remove("hidden");
}