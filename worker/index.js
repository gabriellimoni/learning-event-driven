console.log("Worker Service started.");
// In a real application, this would connect to RabbitMQ and process messages
setInterval(() => {
  console.log("Worker is doing some work...");
}, 5000);
