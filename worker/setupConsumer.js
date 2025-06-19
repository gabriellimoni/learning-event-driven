const amqp = require("amqplib/callback_api");

const connectAndConsume = async (queueName, callback) => {
  amqp.connect("amqp://rabbitmq", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.consume(queueName, async (msg) => {
        await callback(JSON.parse(msg.content.toString()));
        channel.ack(msg);
        console.log("acked");
      });
    });
  });
};

module.exports = {
  connectAndConsume,
};
