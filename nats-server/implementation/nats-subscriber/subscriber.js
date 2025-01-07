const { connect } = require('nats');

(async () => {
  try {
    // Connect to the NATS server
    const nc = await connect({ servers: ['nats://localhost:4222'] });
    console.log('Subscriber connected to NATS');

    // nc.subscribe("subject") creates a subscription to the specified subject
    // Subscribe to the 'order_updates' subject
    const sub = nc.subscribe('order_updates');

    // immediately invoked asynchronous function (IIFE) to handle messages as they are received.
    (async () => {
      for await (const msg of sub) {
        const order = JSON.parse(msg.data);  
        console.log('Received new order:', order);
      }
    })();

  } catch (err) {
    console.error('Error:', err);
  }
})();
