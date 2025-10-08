const price24 = document.getElementById("price24");
const price22 = document.getElementById("price22");
const updateTime = document.getElementById("updateTime");
const refreshBtn = document.getElementById("refresh");
const currencySelect = document.getElementById("currency");

async function getGoldPrice() {
  price24.textContent = "Loading...";
  price22.textContent = "Loading...";
  updateTime.textContent = "";

  const currency = currencySelect.value;

  try {
    const res = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=gold&vs_currencies=${currency}`);
    const data = await res.json();

    const goldPricePerOunce = data.gold[currency]; // price per ounce
    const goldPerGram = goldPricePerOunce / 31.1035; // 1 oz = 31.1035 g

    const price24K = goldPerGram.toFixed(2);
    const price22K = (goldPerGram * 0.916).toFixed(2);

    const symbol = currency === "inr" ? "₹" : "$";
    price24.textContent = `${symbol} ${price24K}`;
    price22.textContent = `${symbol} ${price22K}`;

    const now = new Date();
    updateTime.textContent = `Last updated: ${now.toLocaleTimeString()}`;
  } catch (error) {
    price24.textContent = "Error";
    price22.textContent = "Error";
    updateTime.textContent = "Failed to fetch price.";
  }
}

refreshBtn.addEventListener("click", getGoldPrice);
window.onload = getGoldPrice;