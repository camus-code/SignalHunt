// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const rp = require('request-promise');
const port = process.env.PORT || 8000;
const index = require("./routes/index");

const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected. SocketID:", socket.id), setInterval(
    () => getTickersAndEmit(socket),
    10000
  );
  socket.on("disconnect", () => console.log("Client disconnected"));
});


//Gets all tickers and sends it to Tickers component
const getTickersAndEmit = async socket => {
	const tickersURL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest"
  try {
    const res = await axios.get(tickersURL, {
    	method: 'GET',
    	headers: {
    		'X-CMC_PRO_API_KEY': 'd75ae6ac-824a-4708-9952-e90df6c4f840'
    	},
    	json: true,
    	gzip: true
    });
    console.log(res.data),
    socket.emit("fromAPI", res.data);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

server.listen(port, () => console.log(`Listening on port ${port}!`));
