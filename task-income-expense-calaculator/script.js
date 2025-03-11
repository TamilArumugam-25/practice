let entries = JSON.parse(localStorage.getItem("entries")) || [];

function addEntry() {
    const description = document.getElementById("description").value;
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    
    if (!description || isNaN(amount)) return alert("Please enter valid details");

    entries.push({ id: Date.now(), description, amount, type });
    localStorage.setItem("entries", JSON.stringify(entries));
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    renderEntries();
}

function renderEntries(filter = "all") {
    const list = document.getElementById("entries-list");
    list.innerHTML = "";
    let totalIncome = 0, totalExpense = 0;

    entries.filter(entry => filter === "all" || entry.type === filter).forEach(entry => {
        const li = document.createElement("li");
        li.classList = "p-3 flex justify-between items-center bg-white rounded-lg shadow-md border-l-4 " + (entry.type === 'income' ? 'border-green-500' : 'border-red-500');
        li.innerHTML = `
            <span>${entry.description} - <strong class="${entry.type === 'income' ? 'text-green-600' : 'text-red-600'}">$${entry.amount}</strong></span>
            <div>
                <button onclick="editEntry(${entry.id})" class="text-yellow-500 font-bold mr-2">Edit</button>
                <button onclick="deleteEntry(${entry.id})" class="text-red-500 font-bold">Delete</button>
            </div>
        `;
        list.appendChild(li);
        entry.type === "income" ? (totalIncome += entry.amount) : (totalExpense += entry.amount);
    });

    document.getElementById("total-income").textContent = `$${totalIncome}`;
    document.getElementById("total-expense").textContent = `$${totalExpense}`;
    document.getElementById("net-balance").textContent = `$${totalIncome - totalExpense}`;
}

function deleteEntry(id) {
    entries = entries.filter(entry => entry.id !== id);
    localStorage.setItem("entries", JSON.stringify(entries));
    renderEntries();
}

function editEntry(id) {
    const entry = entries.find(e => e.id === id);
    document.getElementById("description").value = entry.description;
    document.getElementById("amount").value = entry.amount;
    document.getElementById("type").value = entry.type;
    deleteEntry(id);
}

function filterEntries() {
    const filter = document.querySelector("input[name='filter']:checked").value;
    renderEntries(filter);
}

renderEntries();