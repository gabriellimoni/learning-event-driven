class MessagingError extends Error {
  requeue = true;
  constructor(msg, requeue) {
    super(msg);
    this.requeue = requeue;
  }

  toString() {
    return `Requeue: ${this.requeue} - msg: ${this.message}`;
  }
}

module.exports = {
  MessagingError,
};
