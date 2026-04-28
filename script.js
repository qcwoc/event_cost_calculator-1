const eventCostInput = document.getElementById("event-cost");
const chargeAmount = document.getElementById("charge-amount");
const feeAmount = document.getElementById("fee-amount");
const keepAmount = document.getElementById("keep-amount");
const formulaBreakdown = document.getElementById("formula-breakdown");

const PERCENT_FEE = 0.0299;
const FIXED_FEE = 0.3;

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function roundToCents(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function roundUpToNearestDime(value) {
  return Math.ceil((value - Number.EPSILON) * 10) / 10;
}

function calculate() {
  const eventCost = Number.parseFloat(eventCostInput.value);
  const safeCost = Number.isFinite(eventCost) && eventCost >= 0 ? eventCost : 0;

  const exactCharge = (safeCost + FIXED_FEE) / (1 - PERCENT_FEE);
  const charge = roundUpToNearestDime(exactCharge);
  const fees = roundToCents(charge * PERCENT_FEE + FIXED_FEE);
  const keep = roundToCents(charge - fees);

  chargeAmount.textContent = formatCurrency(charge);
  feeAmount.textContent = formatCurrency(fees);
  keepAmount.textContent = formatCurrency(keep);

  formulaBreakdown.textContent =
    `${formatCurrency(safeCost)} + ${formatCurrency(FIXED_FEE)} divided by 0.9701 gives an exact charge before rounding. ` +
    `That amount is always rounded up to the next $0.10 for a final charge of ${formatCurrency(charge)}. ` +
    `The fee on that charge is ${formatCurrency(fees)}, leaving ${formatCurrency(keep)}.`;
}

eventCostInput.addEventListener("input", calculate);
calculate();
