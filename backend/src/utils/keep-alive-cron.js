const cron = require('node-cron');
const axios = require('axios');

function startKeepAliveCron() {
  cron.schedule('*/17 * * * *', function () {
    console.log('Sending keep-alive ping to the API');
    axios.get('https://mamaput-eshop-1.onrender.com/keep-alive')
      .then(response => {
        console.log('Keep-alive ping successful:', response.status);
      })
      .catch(error => {
        console.error('Error sending keep-alive ping:', error);
      });
  });
}

function keepEshopAliveCron() {
  cron.schedule('*/23 * * * *', function () {
    console.log('Sending keep-alive ping to the API');
    axios.get('https://mamaput-eshop-1.onrender.com/keep-alive')
      .then(response => {
        console.log('Keep-alive ping successful:', response.status);
      })
      .catch(error => {
        console.error('Error sending keep-alive ping:', error);
      });
  });
}

function keepChatAliveCron() {
  cron.schedule('*/19 * * * *', function () {
    console.log('Sending keep-alive ping to the API');
    axios.get('https://mamaput-chat.onrender.com/keep-alive')
      .then(response => {
        console.log('Keep-alive ping successful:', response.status);
      })
      .catch(error => {
        console.error('Error sending keep-alive ping:', error);
      });
  });
}

module.exports = { startKeepAliveCron, keepEshopAliveCron, keepChatAliveCron };
