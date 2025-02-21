const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Read synchronously and to convert service.proto into a usable format
const packageDefinition = protoLoader.loadSync('./proto/service.proto');

// Loads the employees package from the .proto file
const empProto = grpc.loadPackageDefinition(packageDefinition).employees;

// Create a gRPC client to connect to the server
const client = new empProto.EmployeeInfo('localhost:50051', grpc.credentials.createInsecure());

//Sends a request to the SayInfo method on the server and passes an object as input
client.SayInfo({ name: 'Sam', role: 'SDE-1', empID: 23 }, (err, response) => {
  if (err) console.error(err);
  console.log('Server Response:', response.message);
});