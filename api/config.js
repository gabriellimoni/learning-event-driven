const exchanges = {
  event: {
    name: "app.event",
    queueBindings: [
      {
        name: "webhook",
        routingKey: "#",
      },
      {
        name: "negotiation.sent-to-approval",
        routingKey: "negotiation.sent-to-approval",
        deadLetterExchangeConfig: {
          name: "dlx.negotiation.sent-to-approval",
          queueName: "dlq.negotiation.sent-to-approval",
        },
      },
    ],
  },
};

module.exports = { exchanges };
