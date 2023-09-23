const axios = require('axios');
const Data = require('./dataModel');

exports.fetchData = async (req, res) => {
  try {
    console.log("yo");
    await fetchDataAndStoreInDatabase();
    const data = await Data.find().sort({ volume: -1 }).limit(10); 
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

async function fetchDataAndStoreInDatabase() {
  try {
    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const responseData = response.data;

    const sortedData = Object.keys(responseData)
      .map((symbol) => ({
        name: responseData[symbol].name,
        last: responseData[symbol].last,
        buy: responseData[symbol].buy,
        sell: responseData[symbol].sell,
        volume: responseData[symbol].volume,
        base_unit: responseData[symbol].base_unit,
      }))
      .sort((a, b) => b.volume - a.volume);

    for (const item of sortedData) {
      await Data.findOneAndUpdate(
        { name: item.name },
        item,
        { upsert: true, new: true }
      );
    }

    console.log('Top 10 data has been fetched and stored in MongoDB.');
  } catch (error) {
    console.error(error);
  }
}
