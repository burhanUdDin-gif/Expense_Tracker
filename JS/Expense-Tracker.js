const expenseStorer = JSON.parse(localStorage.getItem("storeData")) || [];

function onClickEvent(event){
    if(event.key === "Enter"){
        filterData()
    }
}
function extractData(){
    const nameInputElement = document.querySelector('.js-expense-name-input');
    const nameInputValue = nameInputElement.value;
    const amountInputElement = document.querySelector('.js-expense-amount-input');

    if(nameInputElement.value.trim() === '') return;
    if(amountInputElement.value.trim() === '') return;
    const amountInputValue = Number(amountInputElement.value);

    expenseStorer.push({
        name: nameInputValue,
        amount: amountInputValue
    });

    localStorage.setItem('storeData', JSON.stringify(expenseStorer));
    console.log(expenseStorer);

    nameInputElement.value = ''
    amountInputElement.value = ''

    showExpensesList()
    totalPrice();
}

//show Expenses on the screen:
showExpensesList()
function showExpensesList(){

    let expensesResult = '';
    let dataStorer;
    for(let i = 0; i < expenseStorer.length; i++){
        dataStorer = `
        <div>${expenseStorer[i].name}</div>
        <div>${expenseStorer[i].amount}</div>
        <button class="js-delete-button" onclick="
            expenseStorer.splice(${i}, 1);
            localStorage.setItem('storeData', JSON.stringify(expenseStorer));
            showExpensesList();
            totalPrice();
        ">🗑️ Delete</button>
        `;
        expensesResult += dataStorer;
    }
    
    document.querySelector('.js-added-expenses-detail')
        .innerHTML = expensesResult
}
function filterData(){
    const filterPrices = document.querySelector('.js-filter-input');
    if(filterPrices.value.trim() ===  '') return;
    // showExpensesList();
    const filterValue = Number(filterPrices.value);

    let expenseResult = '';
    const filterExpenses = expenseStorer.filter(function(data){
        return data.amount >= filterValue;
    });
    let expenses = ''

    filterExpenses.forEach(function(eachValue){
        const originalIndex = expenseStorer.findIndex(function(data){
        return data.name === eachValue.name &&
            data.amount === eachValue.amount;
    });
        expenses = `
            <div>${eachValue.name}</div>
            <div>${eachValue.amount}</div>
            <button class="js-delete-button" onclick="
                expenseStorer.splice(${originalIndex}, 1);
                localStorage.setItem('storeData', JSON.stringify(expenseStorer));
                showExpensesList();
                totalPrice();
            ">🗑️ Delete</button>
        `;
        expenseResult += expenses;
    });

    document.querySelector('.js-added-expenses-detail')
        .innerHTML = expenseResult;
        filterPrices.value = ''
}

totalPrice()
function totalPrice(){
    let price = 0;
    for(let i = 0; i < expenseStorer.length; i++){
        price += expenseStorer[i].amount;
    }

    document.querySelector('.js-total-price')
        .innerHTML = `<span class="price-span">Total Expenses:</span> Rs${price}`
        
}