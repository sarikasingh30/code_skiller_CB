const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Read synchronously and to convert service.proto into a usable format
const packageDefinition = protoLoader.loadSync('./proto/service.proto');

// Loads the employees package from the .proto file
const empProto = grpc.loadPackageDefinition(packageDefinition).employees;

function sayHello(call, callback) {
    // Sends the response back to the client with a formatted message
    callback(null, 
        { message: `Hello, ${call.request.name}!, Role: ${call.request.role}! Emp Id: ${call.request.empID}` });
}

// Initializes a new gRPC server instance
const server = new grpc.Server();
// Registers the EmployeeInfo service & maps the SayInfo RPC method to the sayHello function
server.addService(empProto.EmployeeInfo.service, { SayInfo: sayHello });


// server to listen for requests on port 50051.
// 0.0.0.0 means it will accept connections from any IP address (localhost or other machines on the network).
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    console.log('gRPC Server running at http://0.0.0.0:50051');
});