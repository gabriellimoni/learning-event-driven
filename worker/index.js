const { webhookQueueName, negotiationQueues } = require("./config");
const { connectAndConsume } = require("./setupConsumer");

console.log("Worker Service started.");

connectAndConsume(webhookQueueName, async (data) => {
  return new Promise((res) => {
    setTimeout(() => {
      console.log(webhookQueueName, data);
      res();
    }, 5000);
  });
});

connectAndConsume(negotiationQueues.sentToApproval, async (data) => {
  console.log(negotiationQueues.sentToApproval, data);
});
