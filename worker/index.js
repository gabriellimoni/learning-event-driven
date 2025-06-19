const { webhookQueueName } = require("./config");
const { connectAndConsume } = require("./setupConsumer");

console.log("Worker Service started.");

connectAndConsume(webhookQueueName, async (data) => {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(data);
      res();
    }, 5000);
  });
});
