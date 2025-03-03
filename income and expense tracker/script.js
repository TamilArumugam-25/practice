document.addEventListener("DOMContentLoaded", function () {
    const descriptionInput = document.getElementById("description");
    const amountInput = document.getElementById("amount");
    const dateInput = document.getElementById("date");
    const typeInput = document.getElementById("type");
    const addBtn = document.getElementById("add-btn");
    const resetBtn = document.getElementById("reset-btn");
    const entriesList = document.getElementById("entries");
    const balanceEl = document.getElementById("balance");
    const totalIncomeEl = document.getElementById("total-income");
    const totalExpenseEl = document.getElementById("total-expense");
    const filters = document.querySelectorAll("input[name='filter']");
    
    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    function updateUI() {
        let income = 0, expense = 0;
        entriesList.innerHTML = "";
        transactions.forEach((transaction, index) => {
            if (getSelectedFilter() === "all" || getSelectedFilter() === transaction.type) {
                const li = document.createElement("li");
                li.className = `p-3 rounded-lg shadow-lg flex justify-between items-center fade-in ${transaction.type === "income" ? "bg-green-600" : "bg-red-600"}`;
                li.innerHTML = `<span>${transaction.date} - ${transaction.description}: <strong>$${transaction.amount}</strong></span>
                    <div>
                        <button onclick="editEntry(${index})" class="text-blue-300 hover:text-blue-500">✏️</button>
                        <button onclick="deleteEntry(${index})" class="text-red-300 hover:text-red-500 ml-2">❌</button>
                    </div>`;
                entriesList.appendChild(li);
            }
            if (transaction.type === "income") income += transaction.amount;
            else expense += transaction.amount;
        });
        balanceEl.textContent = `$${(income - expense).toFixed(2)}`;
        totalIncomeEl.textContent = `$${income.toFixed(2)}`;
        totalExpenseEl.textContent = `$${expense.toFixed(2)}`;
        localStorage.setItem("transactions", JSON.stringify(transactions));
    }
    
    function getSelectedFilter() {
        return document.querySelector("input[name='filter']:checked").value;
    }
    
    addBtn.addEventListener("click", function () {
        const description = descriptionInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;
        const type = typeInput.value;
        if (description && date && !isNaN(amount) && amount > 0) {
            transactions.push({ description, amount, date, type });
            updateUI();
            descriptionInput.value = "";
            amountInput.value = "";
            dateInput.value = "";
        }
    });
    
    resetBtn.addEventListener("click", function () {
        descriptionInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
    });
    
    filters.forEach(filter => filter.addEventListener("change", updateUI));
    updateUI();
});