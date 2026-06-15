console.log("Hello World!");

// JS code to handle the mobile menu toggle

// let menuToggle = document.getElementById("menuToggle");
let sidebar = document.querySelector("#statusSection");
let mobileButton = document.querySelector(".mobileBtns");

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
    const dateString = now.toLocaleDateString('en-US', 
        { month: 'long', day: 'numeric', year: 'numeric' });

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
let thisMonthExpense = document.getElementById("monthExpenseTotal");
let editExpenseId = null;


// Function to render expenses in the table

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
        updateDashboard()
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
    updateDashboard()
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

//JS code to Tab switching between Income and Expense and Total Month tables
let incomeBtn = document.getElementById("incomeHistory");
let expenseBtn = document.getElementById("expenseHistory");
let totalMonthBtn = document.getElementById("monthHistory");
let totalMonthSection = document.querySelector(".TotalMonthHistory");
let incomeTableSection = document.getElementById("incomeTableSection");
let expenseTableSection = document.getElementById("expenseTableSection"); 


const savedTab = localStorage.getItem('activeTab');


totalMonthBtn.addEventListener("click", ()=>{
    totalMonthSection.classList.remove("hidden");
    totalMonthSection.classList.add("flex");
    incomeTableSection.classList.add("hidden");
    expenseTableSection.classList.add("hidden");
    addIncomeBtn.classList.add("hidden");
    localStorage.setItem('activeTab', 'totalMonth');
    sidebar.classList.remove("StatusBox");

});

incomeBtn.addEventListener("click", ()=>{
    incomeTableSection.classList.remove("hidden");
    expenseTableSection.classList.add("hidden");
    addIncomeBtn.classList.remove("hidden");
    addExpenseBtn.classList.add("hidden");
    totalMonthSection.classList.add("hidden");
    localStorage.setItem('activeTab', 'income');
    sidebar.classList.remove("StatusBox");
})
expenseBtn.addEventListener("click", ()=>{
    expenseTableSection.classList.remove("hidden");
    incomeTableSection.classList.add("hidden");
    totalMonthSection.classList.add("hidden");
    addExpenseBtn.classList.remove("hidden");
    addIncomeBtn.classList.add("hidden");
    localStorage.setItem('activeTab', 'expense');
    sidebar.classList.remove("StatusBox");
});

if (savedTab === 'income') {
    incomeBtn.click();
} else if (savedTab === 'totalMonth') {
    totalMonthBtn.click(); 
} else {
    expenseBtn.click(); 
}


//Mobile Responsive Tab Switch
let mbincomeBtn = document.getElementById("mbincomeHistory");
let mbexpenseBtn = document.getElementById("mbexpenseHistory");
let mbtotalMonthBtn = document.getElementById("mbmonthHistory");

mbtotalMonthBtn.addEventListener("click", ()=>{
    totalMonthSection.classList.remove("hidden");
    totalMonthSection.classList.add("flex");
    incomeTableSection.classList.add("hidden");
    expenseTableSection.classList.add("hidden");
    addIncomeBtn.classList.add("hidden");
    localStorage.setItem('activeTab', 'totalMonth');
    sidebar.classList.remove("StatusBox");

});

mbincomeBtn.addEventListener("click", ()=>{
    incomeTableSection.classList.remove("hidden");
    expenseTableSection.classList.add("hidden");
    addIncomeBtn.classList.remove("hidden");
    addExpenseBtn.classList.add("hidden");
    totalMonthSection.classList.add("hidden");
    localStorage.setItem('activeTab', 'income');
    sidebar.classList.remove("StatusBox");
})
mbexpenseBtn.addEventListener("click", ()=>{
    expenseTableSection.classList.remove("hidden");
    incomeTableSection.classList.add("hidden");
    totalMonthSection.classList.add("hidden");
    addExpenseBtn.classList.remove("hidden");
    addIncomeBtn.classList.add("hidden");
    localStorage.setItem('activeTab', 'expense');
    sidebar.classList.remove("StatusBox");
});



// JS code to handle the form submission for income

const incomes = localStorage.getItem('incomes') ? JSON.parse(localStorage.getItem('incomes')) : [];
const incomeFormTag = document.querySelector(".IncomeForm form");
let editIncomeId = null;
let incomeInput = document.querySelector("#inTitle");
let incomeAmountInput = document.querySelector("#inAmount");
let incomeDateInput = document.querySelector("#inDate");
let incomeTable  = document.getElementById("incomeTableBody");
let inCloseBtn = document.getElementById("inCloseForm");

let thisMonthIncome = document.getElementById("monthIncomeTotal");




inCloseBtn.addEventListener("click", () => {
        incomeForm.classList.remove("fixed");
        incomeForm.classList.add("hidden");
        document.querySelector(".btnsInc button[type='submit']").textContent = "Add Income";
        editIncomeId = null;
        incomeFormTag.reset();
});

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
                                <button class="deleteIncome px-4 py-2 my-1 border border-gray-500 bg-white hover:bg-red-500 transition-all duration-300 ease-in-out rounded-xl" data-id="${income.id}">
                                <i class="fa-regular fa-trash-can"></i>
                                </button>
                                <button class=" editIncome px-4 py-2 my-1 border border-gray-500 bg-white hover:bg-blue-500 transition-all duration-300 ease-in-out rounded-xl" data-id="${income.id}">
                                <i class="fa-regular fa-pen-to-square"></i>
                                </button>
                            </td>
        `;
        incomeTable.appendChild(tr);
    
    });
}


// Event delegation for edit and delete buttons in the income table
incomeTable.addEventListener("click", (e)=>{
    //Edit Income Handle Logic
    inEditBtn = e.target.closest(".editIncome");
    if(inEditBtn){
        const idToEdit = parseInt(inEditBtn.getAttribute("data-id"));
        const incomeToEdit = incomes.find(item => item.id === idToEdit);
        if(incomeToEdit){
            incomeInput.value = incomeToEdit.title;
            incomeAmountInput.value = incomeToEdit.amount;
            incomeDateInput.value = incomeToEdit.date;
            editIncomeId = idToEdit;
            document.querySelector(".btnsInc button[type='submit']").textContent = "Update Income";
            incomeForm.classList.add("fixed");
            incomeForm.classList.remove("hidden");
        }          

        return;
    }


    //Delete Income Handle Logic
const deleteBtn = e.target.closest(".deleteIncome");
    if(!deleteBtn) return;

    const idToDelete = parseInt(deleteBtn.getAttribute("data-id"));
    const index = incomes.findIndex(item => item.id === idToDelete);
    if (index !== -1) {
        incomes.splice(index, 1);
        renderIncomes();
        localStorage.setItem('incomes', JSON.stringify(incomes));
        updateDashboard()
    };
});

incomeFormTag.addEventListener("submit", (e)=>{
    e.preventDefault();
    const title = incomeInput.value.trim();
    const amount = parseFloat(incomeAmountInput.value);
    const date = incomeDateInput.value;

    if(title === "" || isNaN(amount)|| amount <= 0 || date === ""){
        alert("Please fill in all fields with valid data.");
        return;
    }

if(editIncomeId === null){
    const newIncome = {
       id: Date.now(),
       title: title,
       amount: amount,
       date: date
    };
    incomes.push(newIncome);
}else{
    const incomeIndex = incomes.findIndex(item => item.id === editIncomeId);
    if(incomeIndex !== -1){
        incomes[incomeIndex].title = title;
        incomes[incomeIndex].amount = amount;
        incomes[incomeIndex].date = date;
    }
    editIncomeId = null;
        document.querySelector(".btnsInc button[type='submit']").textContent = "Add Income";
        incomeForm.classList.remove("fixed");
        incomeForm.classList.add("hidden");
}
    // incomes.push(newIncome);
    renderIncomes();
    incomeFormTag.reset();
    localStorage.setItem('incomes', JSON.stringify(incomes));
    updateDashboard()

}); 
renderIncomes();

//Update the total income and expense in the dashboard
 function updateDashboard(){
const totalExpenses = expenses.reduce((sum, expense)=>{return sum + expense.amount},0);
// console.log(totalExpenses);

const monthTotlalExpenses = expenses.reduce((sum, expense)=>{
    const expenseDate = new Date(expense.date);
    const now = new Date();
    if(expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()){
        return sum + expense.amount;
    }
    return sum;
},0);
// console.log(monthTotlalExpenses);

document.querySelector("#totalExpenseTotal").textContent = `৳${totalExpenses}`;
thisMonthExpense.textContent = `৳${monthTotlalExpenses}`;

// Update Income Dashboard
const totalIncome = incomes.reduce((sum, income)=>{return sum + income.amount},0);
console.log(totalIncome);

const monthTotlalIncome = incomes.reduce((sum, income)=>{
    const incomeDate = new Date(income.date);
    const now = new Date();
    if(incomeDate.getMonth() === now.getMonth() && incomeDate.getFullYear() === now.getFullYear()){
        return sum + income.amount;
    }
    return sum;
},0);
// console.log(monthTotlalIncome);
document.querySelector("#totalIncomeTotal").textContent = `৳${totalIncome}`;
thisMonthIncome.textContent = `৳${monthTotlalIncome}`;


const netServing = totalIncome - totalExpenses;
let totalSavingsElement = document.querySelector("#totalSavings");
totalSavingsElement.textContent = `৳${netServing}`;
if(netServing < 0){
    totalSavingsElement.style.color = "red";
} else{
    totalSavingsElement.style.color = "green";
}
 }

 updateDashboard()


// JS Code For Monthtly Report Generation

let totalMonthTableBody = document.getElementById("totalMonthTableBody");
let totalMonthIncome = document.getElementById("totalMonthIncome");


// JS Code For Monthly Report Generation
function renderMonthlyReport() { 
    let YearlyCalc = {
        "January": {income: 0, expense: 0},
        "February": {income: 0, expense: 0},
        "March": {income: 0, expense: 0},
        "April": {income: 0, expense: 0},
        "May": {income: 0, expense: 0},
        "June": {income: 0, expense: 0},
        "July": {income: 0, expense: 0},
        "August": {income: 0, expense: 0},
        "September": {income: 0, expense: 0},
        "October": {income: 0, expense: 0},
        "November": {income: 0, expense: 0},
        "December": {income: 0, expense: 0} 
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    incomes.forEach(income => {
        if(income.date) {
            const monthIndex = parseInt(income.date.split("-")[1]) - 1; 
            const monthName = monthNames[monthIndex];
            if(YearlyCalc[monthName]){
                YearlyCalc[monthName].income += income.amount;
            }
        }
    });

    expenses.forEach(expense => {
        if(expense.date) {
            const monthIndex = parseInt(expense.date.split("-")[1]) - 1; 
            const monthName = monthNames[monthIndex];
            if(YearlyCalc[monthName]){
                YearlyCalc[monthName].expense += expense.amount;
            }
        }
    }); 

    totalMonthTableBody.innerHTML = "";
    for (const month in YearlyCalc) {
        const data = YearlyCalc[month];
        
        if (data.income === 0 && data.expense === 0) {
            continue; 
        }

        const netSaving = data.income - data.expense;
        const savingColor = netSaving < 0 ? "text-red-600" : "text-green-600";

        const tr = document.createElement("tr");
        tr.className = "border-b hover:bg-gray-100 transition duration-150";
        tr.innerHTML = `
            <td class="p-2 text-center text-gray-800 font-medium">${month}</td>
            <td class="p-2 text-center text-green-600 font-semibold">৳${data.income}</td>
            <td class="p-2 text-center text-red-600 font-semibold">৳${data.expense}</td>
            <td class="p-2 text-center ${savingColor} font-semibold">৳${netSaving}</td>
            <td class="p-2 text-center">
                <button class=" px-4 py-2 my-1 border border-gray-500 bg-white hover:bg-green-500 transition-all duration-300 ease-in-out rounded-xl" data-month="${month}">
                    <i class="fa-regular fa-circle-question"></i>
                </button>
            </td>
        `;
        totalMonthTableBody.appendChild(tr);
    }
}

renderMonthlyReport();



// Event delegation for the details button in the monthly report table
totalMonthTableBody.addEventListener("click", (e)=>{
let detailsBtn = e.target.closest("button[data-month]");
let detailsModal = document.getElementById("detailsSection");
let detailsList = document.getElementById("detailsTableBody");
// detailsBtn.(e)=>{
    const month = detailsBtn.getAttribute("data-month");
    detailsList.innerHTML = "";
    let filteredIncomes = [];
    let filteredExpenses = [];

    if(detailsBtn){
        const month = detailsBtn.getAttribute("data-month");
        const monthIndex = new Date(`${month} 1, 2024`).getMonth() + 1; 
        filteredIncomes = incomes.filter(income => {
            const incomeMonth = parseInt(income.date.split("-")[1]);
            return incomeMonth === monthIndex;
        })
        .map(income =>{
            return {...income, type:"income"}
        });

        filteredExpenses = expenses.filter(expense => {
            const expenseMonth = parseInt(expense.date.split("-")[1]);
            return expenseMonth === monthIndex;
        })
        .map(expense => {
            return {...expense, type:"expense"}
        });


    }

    [...filteredIncomes, ...filteredExpenses].forEach(item => {
        const tr = document.createElement("tr");
        tr.className = "border-b hover:bg-gray-100 transition duration-150";
        tr.innerHTML = `
    <td class="p-2 text-center text-gray-800">${item.date}</td>
    
    <td class="p-2 text-center text-green-600 font-semibold">
        ${item.type === "income" ? `৳${item.amount}` : "-"}
    </td>
    
    <td class="p-2 text-center text-red-600 font-semibold">
        ${item.type === "expense" ? `৳${item.amount}` : "-"}
    </td>
    
    <td class="p-2 text-center text-gray-700">${item.title}</td>
`;
        detailsList.appendChild(tr);
    });
    detailsModal.classList.remove("hidden");
    detailsModal.classList.add("flex");


document.getElementById("closeDetails").addEventListener("click", ()=>{
    detailsModal.classList.add("hidden");
    detailsModal.classList.remove("flex");

});

});


//Calculator JS Code
//Take Buttons Vlue


function takeValue(value){
    document.getElementById('display').value += value;  
}

function clearDisplay(){
    document.getElementById('display').value = '';
}

function deleteValue(){
    let currentValue = document.getElementById('display').value;
    document.getElementById('display').value = currentValue.slice(0, -1);
}

function calculateResult(){
    let expression = document.getElementById('display').value;
    try {
        
        expression = expression.replace(/Math\.sin\(([^)]+)\)/g, 'Math.sin(($1) * Math.PI / 180)');
        expression = expression.replace(/Math\.cos\(([^)]+)\)/g, 'Math.cos(($1) * Math.PI / 180)');
        expression = expression.replace(/Math\.tan\(([^)]+)\)/g, 'Math.tan(($1) * Math.PI / 180)');
        
        let result = eval(expression);
        document.getElementById('display').value = Number(result.toFixed(10)); 
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function shoeSci() {
    let sciCals = document.querySelectorAll('.sci_cal');

    sciCals.forEach(panel => {
        let currentVisibility = window.getComputedStyle(panel).visibility;
        
        if (currentVisibility === 'hidden') {
            panel.style.visibility = 'visible';
            panel.style.width = "auto"
        } else {
            panel.style.visibility = 'hidden';
            panel.style.width = 0;
        }
    });
}

let openCalcBtn =  document.querySelector("#CalculatorBtn");
let closeCalcBtn = document.querySelector("#CalculatorClose");
let calcBody =  document.querySelector(".calculator");

openCalcBtn.addEventListener("click", ()=>{
    calcBody.classList.toggle("hidden");
    calcBody.classList.toggle("fixed")
});

closeCalcBtn.addEventListener("click", ()=>{
    calcBody.classList.add("hidden");
    calcBody.classList.remove("fixed");
    clearDisplay()
});



//---------------------------