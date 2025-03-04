let transactions = [];
let totalIncome = 0;
let remainingBalance = 0;

function addIncome() {
    const amount = parseFloat(document.getElementById("incomeAmount").value);
    if (!isNaN(amount) && amount >= 0) {
        totalIncome = amount;
        recalculateBalance();
    }
}

function addExpense() {
    const date = document.getElementById("expenseDate").value;
    const description = document.getElementById("expenseDescription").value;
    const amount = parseFloat(document.getElementById("expenseAmount").value);
    
    if (date && description && !isNaN(amount) && amount > 0) {
        transactions.push({ id: Date.now(), date, description, amount, type: "expense" });
        recalculateBalance();
        displayTransactions();
    }
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    recalculateBalance();
    displayTransactions();
}

function recalculateBalance() {
    let totalExpense = transactions.reduce((sum, t) => sum + t.amount, 0);
    remainingBalance = totalIncome - totalExpense;
    
    document.getElementById("totalIncome").textContent = totalIncome;
    document.getElementById("totalExpense").textContent = totalExpense;
    document.getElementById("balance").textContent = remainingBalance;

    checkBalance();
}

function displayTransactions() {
    const transactionList = document.getElementById("transactions");
    transactionList.innerHTML = "";

    transactions.forEach(transaction => {
        let li = document.createElement("li");
        li.classList.add("p-2", "rounded", "flex", "justify-between", "items-center", "bg-red-600", "mt-2");

        li.innerHTML = `
            ${transaction.date} - ${transaction.description} - ₹${transaction.amount}
            <button class="text-xs bg-gray-800 text-white px-2 py-1 rounded" onclick="deleteTransaction(${transaction.id})">❌</button>
        `;

        transactionList.appendChild(li);
    });
}

function checkBalance() {
    const warning = document.getElementById("warning");
    if (remainingBalance <= 0) {
        warning.textContent = "Warning: Your balance has reached zero!";
        warning.classList.remove("hidden");
        warning.classList.add("animate-bounce", "text-red-500");
    } else if (remainingBalance <= totalIncome / 2) {
        warning.textContent = "Warning: Your income is getting low! Please spend wisely.";
        warning.classList.remove("hidden");
        warning.classList.add("animate-pulse", "text-yellow-400");
    } else {
        warning.classList.add("hidden");
    }
}

function clearAllTransactions() {
    transactions = [];
    totalIncome = 0;
    remainingBalance = 0;

    document.getElementById("transactions").innerHTML = "";
    document.getElementById("totalIncome").textContent = "0";
    document.getElementById("totalExpense").textContent = "0";
    document.getElementById("balance").textContent = "0";

    document.getElementById("incomeAmount").value = "";
    document.getElementById("expenseDate").value = "";
    document.getElementById("expenseDescription").value = "Food";
    document.getElementById("expenseAmount").value = "";

    document.getElementById("warning").classList.add("hidden");
}
