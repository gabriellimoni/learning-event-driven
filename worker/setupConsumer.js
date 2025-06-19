const amqp = require("amqplib/callback_api");

const connectAndConsume = async (queueName, callback, prefetchCount = 5) => {
  amqp.connect("amqp://rabbitmq", function (error0, connection) {
    if (error0) {
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        throw error1;
      }

      channel.prefetch(prefetchCount);

      channel.consume(
        queueName,
        async (msg) => {
          await callback(JSON.parse(msg.content.toString()))
            .then(() => {
              // console.log(msg);
              channel.ack(msg);
              console.log("acked");
            })
            .catch((err) => {
              if (err.requeue !== undefined) {
                console.log(err);
                channel.nack(msg, false, err.requeue);
              } else {
                channel.nack(msg);
              }
              console.log("nacked");
            });
        },
        {}
      );
    });
  });
};

module.exports = {
  connectAndConsume,
};
