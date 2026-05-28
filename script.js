console.log("Hello World!");


// JS code to handle the form visibility
let addExpenseBtn = document.getElementById("addExpenseBtn");
let expenseForm = document.querySelector(".ExpenseForm");
let closeFormBtn = document.getElementById("closeForm");

addExpenseBtn.addEventListener("click", () => {
      expenseForm.classList.add("fixed");
      expenseForm.classList.remove("hidden");
});

closeFormBtn.addEventListener("click", () => {
        expenseForm.classList.remove("fixed");
        expenseForm.classList.add("hidden");
});

//------------------------------------------------

// JS Clock Code 
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
    const dateString = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    document.getElementById('myDate').textContent = dateString;
    document.getElementById('myClock').textContent = timeString;
}

setInterval(updateClock, 1000);
updateClock(); 
//--------------------------------------------- 

// // JS code to handle the form submission

const expenses = [];
const formTag = document.querySelector(".ExpenseForm form");
let expenseInput = document.querySelector("#title");
let amountInput = document.querySelector("#amount");
let dateInput = document.querySelector("#date");
let expenseTable  = document.getElementById("expenseTableBody");

function renderExpenses(){
    expenseTable.innerHTML = "";
    expenses.forEach((expense)=>{
        const tr = document.createElement("tr");
        tr.className = "border-b hover:bg-gray-100 transition duration-150";
        tr.innerHTML = `
        <td class="p-2 text-center text-gray-800">${expense.title}</td>
            <td class="p-2 text-center text-red-600 font-semibold">৳${expense.amount}</td>
            <td class="p-2 text-center text-gray-500">${expense.date}</td>
        `;
        expenseTable.appendChild(tr);
    
    });
}

formTag.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = expenseInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if(title === "" || isNaN(amount)|| amount <= 0 || date === ""){
        alert("Please fill in all fields with valid data.");
        return;
    }

    const newExpense = {
       id: Date.now(),
       title: title,
       amount: amount,
       date: date
    };

    expenses.push(newExpense);
    renderExpenses();
    formTag.reset();
    expenseForm.classList.add("hidden");
    expenseForm.classList.remove("fixed");

});