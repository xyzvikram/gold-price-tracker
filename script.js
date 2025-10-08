const price24 = document.getElementById("price24");
const price22 = document.getElementById("price22");
const updateTime = document.getElementById("updateTime");
const refreshBtn = document.getElementById("refresh");

async function getGoldPrice() {
  price24.textContent = "Loading...";
  price22.textContent = "Loading...";
  updateTime.textContent = "";

  try {
    const res = await fetch("https://api.metals.live/v1/spot");
    const data = await res.json();
    const goldUSD = data.find(item => item.gold).gold; // gold price per ounce in USD
    const usdToInr = 83.1; // approx conversion rate
    const goldPerOunceInr = goldUSD * usdToInr;

    // 1 ounce = 31.1035 grams
    const goldPerGramINR = goldPerOunceInr / 31.1035;

    const price24K = goldPerGramINR.toFixed(2);
    const price22K = (goldPerGramINR * 0.916).toFixed(2); // 22K = 91.6% of 24K

    price24.textContent = `₹ ${price24K}`;
    price22.textContent = `₹ ${price22K}`;

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