const priceElement = document.getElementById('price');
const currencySelect = document.getElementById('currency');
const getPriceBtn = document.getElementById('getPrice');

getPriceBtn.addEventListener('click', async () => {
  const currency = currencySelect.value;
  const apiURL = `https://api.metals.live/v1/spot/${currency}`;

  priceElement.textContent = "Loading...";

  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const goldData = data.find(item => item.gold);
    const goldPrice = goldData.gold;
    priceElement.textContent = `1 oz Gold = ${goldPrice} ${currency}`;
  } catch (error) {
    priceElement.textContent = "Error fetching price.";
  }
});