let mainSendBtn = document.querySelector(".sendmainbtn");
let loader = document.getElementById("loader");
let mainPageWrapper = document.querySelector(".main-page-wrapper");
let sendMoneyWrapper = document.querySelector(".send-money-wrapper");
let successWrapper = document.querySelector(".success-wrapper");
let sendMoneyBtn = document.querySelector(".send-btn-btn");
let newTransactionBtn = document.querySelector(".newtransaction-btn");
let backBtn = document.querySelector(".back-btn");
let usserWrap = document.querySelector(".useerwrap");
let numberWrap = document.querySelector(".numberwrap");
let errorTxt = document.querySelector(".error");
let showHideBtn = document.querySelector(".add-contact");
let balanceShow = document.querySelector("#balance");
let balanceTwo = document.querySelector("#balancetwo");

showHideBtn.addEventListener("click", () => {
  balanceShow.classList.toggle("hidden");
  balanceTwo.classList.toggle("hidden");
});

mainSendBtn.addEventListener("click", () => {
  loader.classList.remove("hidden");
  mainPageWrapper.classList.add("hidden");
  setTimeout(() => {
    loader.classList.add("hidden");
    sendMoneyWrapper.classList.remove("hidden");
  }, 1000);
});

sendMoneyBtn.addEventListener("click", () => {
  loader.classList.remove("hidden");
  sendMoneyWrapper.classList.add("hidden");

  setTimeout(() => {
    processTransaction();

    loader.classList.add("hidden");
  }, 1000);
  setTimeout(() => {
    usserWrap.value = "";
    numberWrap.value = "";
  }, 1300);
});

newTransactionBtn.addEventListener("click", () => {
  successWrapper.classList.add("hidden");
  mainPageWrapper.classList.remove("hidden");
});

backBtn.addEventListener("click", () => {
  sendMoneyWrapper.classList.add("hidden");
  mainPageWrapper.classList.remove("hidden");
  usserWrap.value = "";
  numberWrap.value = "";
});

// ტრანზაქციის დამუშავება
function processTransaction() {
  const recipient = document.getElementById("recipient").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  let balance = getBalance();

  if (recipient && amount > 0) {
    if (balance >= amount) {
      // თანხის გამოკლება და განახლება
      balance -= amount;
      updateBalance(balance);

      // ტრანზაქციის დამატება სიაში
      const transactionList = document.getElementById("transactions");
      const newTransaction = document.createElement("div");
      newTransaction.classList.add("transaction");
      newTransaction.innerHTML = `<span>@${recipient}</span><span>-${formatCurrency(
        amount
      )} US</span>`;

      // ახალი ტრანზაქციის დამატება ზემოთ
      transactionList.insertBefore(newTransaction, transactionList.firstChild);

      // ტრანზაქციების რაოდენობის შემოწმება და წაშლა
      const transactions =
        transactionList.getElementsByClassName("transaction");
      if (transactions.length > 20) {
        // წავშლით ყველაზე ძველ ტრანზაქციას
        transactionList.removeChild(transactions[transactions.length - 1]);
      }

      // წარმატების გვერდზე გადასვლა
      document.getElementById("success-recipient").textContent = recipient;
      document.getElementById("success-amount").textContent = `${formatCurrency(
        amount
      )} `;
      successWrapper.classList.remove("hidden");
    } else {
      mainPageWrapper.classList.add("hidden");
      loader.classList.add("hidden");
      successWrapper.classList.add("hidden");
      sendMoneyWrapper.classList.remove("hidden");
      errorTxt.classList.remove("hidden");
      setTimeout(() => {
        errorTxt.classList.add("hidden");
      }, 2300);
    }
  } else {
    mainPageWrapper.classList.add("hidden");
    loader.classList.add("hidden");
    successWrapper.classList.add("hidden");
    sendMoneyWrapper.classList.remove("hidden");
    errorTxt.classList.remove("hidden");
    setTimeout(() => {
      errorTxt.classList.add("hidden");
    }, 2300);
  }
}

// ბალანსის სწორად გადაყვანა
function getBalance() {
  const balanceElement = document.getElementById("balance");
  return parseFloat(
    balanceElement.textContent.replace(/,/g, "").replace(" US", "")
  );
}

// ბალანსის განახლება
function updateBalance(amount) {
  document.getElementById("balance").textContent =
    formatCurrency(amount) + " US";
}

// თანხის ფორმატირების ფუნქცია
function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
