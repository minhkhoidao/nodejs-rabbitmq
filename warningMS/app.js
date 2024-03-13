const amqp = require("amqplib");

const consumeMessage = async () => {
  const connection = await amqp.connect("amqp://localhost");
  const channel = await connection.createChannel();

  await channel.assertExchange("logExchange", "direct");
  const q = channel.assertQueue("WarningQueue");

  await channel.bindQueue(q.queue, "logExchange", "warning");

  channel.consume(q.queue, (mes) => {
    const data = JSON.parse(mes.content);
    console.log(data);
    channel.ack(mes);
  });
};

consumeMessage();
