const amqp = require("amqplib/callback_api");
const { exchanges } = require("./config");

let _channel = null;

const connectAndAssert = async () => {
  if (_channel) return _channel;

  return new Promise((res, rej) => {
    amqp.connect("amqp://rabbitmq", function (error0, connection) {
      if (error0) {
        rej(error0);
        return;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          rej(error1);
          return;
        }

        Object.values(exchanges).forEach((exchange) => {
          channel.assertExchange(exchange.name, "topic", {
            durable: false,
          });
          exchange.queueBindings.forEach((queue) => {
            channel.assertQueue(queue.name, {
              durable: false,
            });
            channel.bindQueue(queue.name, exchange.name, queue.routingKey);
          });
        });

        _channel = channel;
        res(channel);
      });
    });
  });
};

const sendMessage = async (exchange, eventName, msg) => {
  const channel = await connectAndAssert();
  channel.publish(exchange, eventName, Buffer.from(JSON.stringify(msg)));
  console.log(" [x] Sent %s", msg);
};

module.exports = {
  connectAndAssert,
  sendMessage,
};
