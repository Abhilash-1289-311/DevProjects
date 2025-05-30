// Get DOM elements
const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Store transactions
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Generate unique ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transaction
function addTransaction(e) {
  e.preventDefault(); // Stop form from submitting

  // Check if fields are filled
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add description and amount");
    return;
  }

  // Create transaction object
  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value, // + converts string to number
  };

  // Add to array
  transactions.push(transaction);

  updateLocalStorage();

  // Add to UI
  addTransactionDOM(transaction);

  // Update totals
  updateValues();

  // Clear inputs
  text.value = "";
  amount.value = "";
}

// Add transaction to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? "-" : "+";

  // Create list item
  const item = document.createElement("li");

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  // Add HTML
  item.innerHTML = `
        ${transaction.text} <span>${sign}₹${Math.abs(transaction.amount)}</span>
        <button class="delete-btn" onclick="removeTransaction(${
          transaction.id
        })">x</button>
    `;

  // Add to list
  list.appendChild(item);
}

// Update balance, income and expense
function updateValues() {
  // Get all amounts
  const amounts = transactions.map((transaction) => transaction.amount);

  // Calculate total
  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  // Calculate income
  const incomeTotal = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  // Calculate expense
  const expenseTotal = (
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  // Update DOM
  balance.innerText = `₹${total}`;
  income.innerText = `+₹${incomeTotal}`;
  expense.innerText = `-₹${expenseTotal}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Clear all transactions
function clearAll() {
  if (confirm("Are you sure you want to clear all transactions?")) {
    transactions = [];
    updateLocalStorage();
    init();
  }
}

// Init app
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

// Save transactions to local storage
function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Event listeners
form.addEventListener("submit", addTransaction);

// Start app
init();
