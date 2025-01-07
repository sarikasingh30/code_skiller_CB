const { connect } = require('nats');   // import nats npm package
(async () => {
  try {
      // Connect to the NATS server
      const nc = await connect({ servers: ['nats://localhost:4222'] });
      console.log('Publisher connected to NATS');

      // Function => publish a new order message
      const publishOrder = (order) => {
        // nc.publish method to send a message to the specified subject
        nc.publish('order_updates', JSON.stringify(order));
        console.log('Order published:', order);
      };

      // Order need to be published
      const newOrder = { id: 1, item: 'Laptop', quantity: 1 };
      publishOrder(newOrder);

      // Close the connection when done
      await nc.flush();   // ensures that all published messages have been processed
      await nc.close();   // closes the connection to the NATS server
  } 
  catch (err) {
      console.error('Error:', err);
  }
})();            // it starts an  asynchronous IIFE (Immediately Invoked Function Expression)

