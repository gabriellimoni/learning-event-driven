const { webhookQueueName, negotiationQueues } = require("./config");
const { MessagingError } = require("./errors");
const { connectAndConsume } = require("./setupConsumer");

console.log("Worker Service started.");

connectAndConsume(
  webhookQueueName,
  async (data) => {
    return new Promise((res) => {
      setTimeout(() => {
        console.log(webhookQueueName, data);
        res();
      }, 2000);
    });
  },
  1
);

connectAndConsume(negotiationQueues.sentToApproval, async (data) => {
  console.log(negotiationQueues.sentToApproval, data);
  throw new MessagingError("", false);
});

connectAndConsume("dlq." + negotiationQueues.sentToApproval, async (data) => {
  console.log("DQL", negotiationQueues.sentToApproval, data);
});
