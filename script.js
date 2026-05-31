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
        document.querySelector(".btns button[type='submit']").textContent = "Add Expense";
        editExpenseId = null;
        formTag.reset();
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

// JS code to handle the form submission

const expenses = localStorage.getItem('expenses') ? JSON.parse(localStorage.getItem('expenses')) : [];
const formTag = document.querySelector(".ExpenseForm form");
let expenseInput = document.querySelector("#exTitle");
let amountInput = document.querySelector("#exAmount");
let dateInput = document.querySelector("#exDate");
let expenseTable  = document.getElementById("expenseTableBody");
let editExpenseId = null;

function renderExpenses(){
    expenseTable.innerHTML = "";
    expenses.forEach((expense)=>{
        const tr = document.createElement("tr");
        tr.className = "border-b hover:bg-gray-100 transition duration-150";
        tr.innerHTML = `
        <td class="p-2 text-center text-gray-800">${expense.title}</td>
            <td class="p-2 text-center text-red-600 font-semibold">৳${expense.amount}</td>
            <td class="p-2 text-center text-gray-500">${expense.date}</td>
            <td class="flex items-center justify-center gap-2">
                                <button class="deleteExpense px-4 py-2 my-1 border border-gray-500 bg-white hover:bg-red-500 transition-all duration-300 ease-in-out rounded-xl" data-id="${expense.id}">
                                <i class="fa-regular fa-trash-can"></i>
                                </button>
                                <button class="editExpense px-4 py-2 my-1  border border-gray-500 bg-white hover:bg-blue-500 transition-all duration-300 ease-in-out rounded-xl" data-id="${expense.id}">
                                <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                            </td>
        `;
        expenseTable.appendChild(tr);
    
    });
}

expenseTable.addEventListener("click", (e)=>{

    //Edit Expense Handle Logic
    editBtn = e.target.closest(".editExpense");
    if(editBtn){
        const idToEdit = parseInt(editBtn.getAttribute("data-id"));
        const expenseToEdit = expenses.find(item => item.id === idToEdit);
        if(expenseToEdit){
            expenseInput.value = expenseToEdit.title;
            amountInput.value = expenseToEdit.amount;
            dateInput.value = expenseToEdit.date;
            editExpenseId = idToEdit;
            document.querySelector(".btns button[type='submit']").textContent = "Update Expense";
            expenseForm.classList.add("fixed");
            expenseForm.classList.remove("hidden");
        }          

        return;
    }


    //Delete Expense Handle Logic
const deleteBtn = e.target.closest(".deleteExpense");
    if(!deleteBtn) return;

    const idToDelete = parseInt(deleteBtn.getAttribute("data-id"));
    const index = expenses.findIndex(item => item.id === idToDelete);
    if (index !== -1) {
        expenses.splice(index, 1);
        renderExpenses();
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }
});

// Form Submission Handle Logic

formTag.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = expenseInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const date = dateInput.value;

    if(title === "" || isNaN(amount)|| amount <= 0 || date === ""){
        alert("Please fill in all fields with valid data.");
        return;
    }


    if(editExpenseId === null){
    const newExpense = {
       id: Date.now(),
       title: title,
       amount: amount,
       date: date
    };
    expenses.push(newExpense);
}else{
    const expenseIndex = expenses.findIndex(item => item.id === editExpenseId);
    if(expenseIndex !== -1){
        expenses[expenseIndex].title = title;
        expenses[expenseIndex].amount = amount;
        expenses[expenseIndex].date = date;
    }
    editExpenseId = null;
        document.querySelector(".btns button[type='submit']").textContent = "Add Expense";
        expenseForm.classList.remove("fixed");
        expenseForm.classList.add("hidden");

}
    
    renderExpenses();
    formTag.reset();
    localStorage.setItem('expenses', JSON.stringify(expenses));
});

renderExpenses();

// JS code to handle the Income form visibility
let addIncomeBtn = document.getElementById("addIncomeBtn");
let incomeForm = document.querySelector(".IncomeForm");
let inCloseFormBtn = document.getElementById("inCloseForm");

addIncomeBtn.addEventListener("click", () => {
      incomeForm.classList.add("fixed");
      incomeForm.classList.remove("hidden");
});

inCloseFormBtn.addEventListener("click", () => {
        incomeForm.classList.remove("fixed");
        incomeForm.classList.add("hidden");
});

//------------------------------------------------

//JS code to Tab switching between Income and Expense tables
let incomeBtn = document.getElementById("incomeHistory");
let expenseBtn = document.getElementById("expenseHistory");
let incomeTableSection = document.getElementById("incomeTableSection");
let expenseTableSection = document.getElementById("expenseTableSection"); 

incomeBtn.addEventListener("click", ()=>{
    incomeTableSection.classList.remove("hidden");
    expenseTableSection.classList.add("hidden");
    addIncomeBtn.classList.remove("hidden");
    addExpenseBtn.classList.add("hidden");
})
expenseBtn.addEventListener("click", ()=>{
    expenseTableSection.classList.remove("hidden");
    incomeTableSection.classList.add("hidden");
    addExpenseBtn.classList.remove("hidden");
    addIncomeBtn.classList.add("hidden");
});

// JS code to handle the form submission for income

const incomes = [];
const incomeFormTag = document.querySelector(".IncomeForm form");
let incomeInput = document.querySelector("#inTitle");
let incomeAmountInput = document.querySelector("#inAmount");
let incomeDateInput = document.querySelector("#inDate");
let incomeTable  = document.getElementById("incomeTableBody");

function renderIncomes(){
    incomeTable.innerHTML = "";
    incomes.forEach((income)=>{
        const tr = document.createElement("tr");
        tr.className = "border-b hover:bg-gray-100 transition duration-150";
        tr.innerHTML = `
        <td class="p-2 text-center text-gray-800">${income.title}</td>
            <td class="p-2 text-center text-green-600 font-semibold">৳${income.amount}</td>
            <td class="p-2 text-center text-gray-500">${income.date}</td>
            <td class="flex items-center justify-center gap-2">
                                <button class="deleteIncome px-4 py-2 my-1border border-gray-500 bg-white hover:bg-red-500 transition-all duration-300 ease-in-out rounded-xl" >
                                <i class="fa-regular fa-trash-can"></i>
                                </button>
                                <button class=" editIncome px-4 py-2 my-1 border border-gray-500 bg-white hover:bg-blue-500 transition-all duration-300 ease-in-out rounded-xl" >
                                <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                            </td>
        `;
        incomeTable.appendChild(tr);
    
    });
}

incomeFormTag.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = incomeInput.value.trim();
    const amount = parseFloat(incomeAmountInput.value);
    const date = incomeDateInput.value;

    if(title === "" || isNaN(amount)|| amount <= 0 || date === ""){
        alert("Please fill in all fields with valid data.");
        return;
    }

    const newIncome = {
       id: Date.now(),
       title: title,
       amount: amount,
       date: date
    };

    incomes.push(newIncome);
    renderIncomes();
    incomeFormTag.reset();
    // incomeForm.classList.add("hidden");
    // incomeForm.classList.remove("fixed");

}); 