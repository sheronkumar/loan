'use strict';
window.Webflow || (window.Webflow = []);
window.Webflow.push(() => {
  // Query the elements
  const form = document.querySelector('[fs-element="form"]');
  const resultMonthly = document.querySelector('[fs-element="result-monthly"]');
  const resultInterest = document.querySelector('[fs-element="result-interest"]');
  const resultYear = document.querySelector('[fs-element="result-year"]');
  const resultTotal = document.querySelector('[fs-element="result-total"]');

  //Query label elements
  const labelAmount = document.querySelector('[fs-element="label-amount"]');
  const labelYear = document.querySelector('[fs-element="label-year"]');
  const labelMonthly = document.querySelector('[fs-element="label-monthly"]');
  const labelRate = document.querySelector('[fs-element="label-rate"]');

  // if there's no form or any of the below elements, just return from the function and don't do anything else
  if (
    !form ||
    !resultMonthly ||
    !resultInterest ||
    !resultYear ||
    !resultTotal ||
    !labelAmount ||
    !labelYear ||
    !labelMonthly ||
    !labelRate
  )
    return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation(); // prevent Webflow JS to do anything else
    // Get the data from the calculator
    // * the data outputted will be in string format, will need to convert to number type later *

    const formData = new FormData(form);
    const amount = formData.get('amount'); // returning the value of amount
    const interest = formData.get('interest');
    const term = formData.get('term');

    if (!amount || !interest || !term) return;

    // Calculate
    const calculateInterest = Number(interest) / 100 / 12;
    const calculatePayments = Number(term) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculateInterest, calculatePayments);
    const monthly = (Number(amount) * x * calculateInterest) / (x - 1);
    const monthlyPayment = monthly.toFixed(2); // 2 decimals

    // Compute Interest
    const totalInterest = (monthly * calculatePayments - Number(amount)).toFixed(2);

    // Compute Total Payment
    const totalPayment = (monthly * calculatePayments).toFixed(2);

    // Use toString() to convert the elements back to string before setting as a text content of the element
    // Display results
    labelAmount.textContent = '₹' + amount.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    labelYear.textContent = term.toString();
    labelMonthly.textContent = '₹' + monthlyPayment.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    labelRate.textContent = interest.toString() + '%';

    resultMonthly.textContent = '₹' + monthlyPayment.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    resultInterest.textContent = '₹' + totalInterest.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
    resultYear.textContent = term.toString();
    resultTotal.textContent = '₹' + totalPayment.toString().replace(/\d(?=(\d{3})+\.)/g, '$&,');
  });
});
