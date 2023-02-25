'use strict';

//Variables
const inputBill = document.querySelector('.form--input--bill');
const inputCustomTip = document.querySelector('.input__tip--amount');
const inputPeople = document.querySelector('.input__people--amount');

const btnsTipAmount = document.querySelectorAll('.btn--tip--amount');
const btnReset = document.querySelector('.btn--reset');

const labelTipAmount = document.querySelector('.tip--amount');
const labelTotalAmount = document.querySelector('.total--amount');
const labelErrorBill = document.querySelector('.error--message--bill');
const labelErrorPerc = document.querySelector('.error--message--perc');
const labelErrorPeople = document.querySelector('.error--message--people');

const primaryClr = getComputedStyle(document.documentElement).getPropertyValue(
  '--color-primary'
);
const secondaryClr1 = getComputedStyle(
  document.documentElement
).getPropertyValue('--color-secondary-1');

/////////////////////////////////////////////////
//Functions
const calcTipPerson = function (bill, perc, amount) {
  const tipPerson = (((bill / 100) * perc) / amount).toFixed(2);
  console.log(tipPerson);
  return tipPerson;
};
const calcTipTotal = function (bill, perc) {
  const tipTotal = ((bill / 100) * perc).toFixed(2);
  console.log(tipTotal);
  return tipTotal;
};
const styleSelectedTip = function (target) {
  target.style.backgroundColor = primaryClr;
  target.style.color = secondaryClr1;
};
const removeSelectedStyle = function () {
  btnsTipAmount.forEach(btn => {
    btn.style.backgroundColor = secondaryClr1;
    btn.style.color = 'white';
  });
};
const removeErrorMessage = function () {
  //Remove error message on bill
  labelErrorBill.classList.add('hidden');
  inputBill.style.border = 'none';
  //rempve error message on people amount
  labelErrorPeople.classList.add('hidden');
  inputPeople.style.border = 'none';

  //remove error message on %

  labelErrorPerc.classList.add('hidden');
};

///////////////////////////////////////
//Event Listeners
let bill;
let percentage;
let people;

document.querySelector('.percentages').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('btn--tip--amount')) {
    removeSelectedStyle();
    styleSelectedTip(e.target);
    percentage = +e.target.textContent.replace('%', '');
  }

  if (e.target.classList.contains('input__tip--amount')) {
    removeSelectedStyle();
    percentage = undefined;
  }

  //Clear input field
  inputCustomTip.value = '';
});

btnReset.addEventListener('click', function (e) {
  //Remove error message, clear previous timeout
  removeErrorMessage();

  bill = inputBill.value;
  console.log(bill);
  if (!percentage) {
    percentage = Number.parseFloat(inputCustomTip.value);
  }
  people = inputPeople.value;
  console.log(percentage);

  //Display error message on bill
  if (!bill) {
    labelErrorBill.classList.remove('hidden');
    inputBill.style.border = '1px solid red';
  }
  //Display error message on people amount
  if (!people) {
    labelErrorPeople.classList.remove('hidden');
    inputPeople.style.border = '1px solid red';
  }
  //Display error message on %
  if (!percentage) {
    labelErrorPerc.classList.remove('hidden');
  }

  //only if bill, tip, number of people is selected calc tips
  if (bill && people && percentage) {
    const tipPerson = `$${calcTipPerson(bill, percentage, people)}`;
    const tipTotal = `$${calcTipTotal(bill, percentage)}`;

    labelTipAmount.textContent = tipPerson;
    labelTotalAmount.textContent = tipTotal;
  }

  //Set all labels back to normal after 10 sec
  const backToStandard = setTimeout(() => {
    percentage = bill = people = undefined;

    labelTipAmount.textContent = labelTotalAmount.textContent = '$0.00';

    inputBill.value = inputCustomTip.value = inputPeople.value = '';

    removeSelectedStyle();
    removeErrorMessage();
  }, 10000);
});
