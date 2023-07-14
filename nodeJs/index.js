import { openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Data } from "@ndn/packet";
import fs from 'fs';
import express from "express";
import cors from "cors";
import mysql from 'mysql';
import { EndpointProducer } from "@ndn/endpoint/lib/producer";

var mysqli = mysql.createConnection({host: 'localhost',
user: 'root',
password: '',
database: 'ndn'});
mysqli.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected!:)');
  }
});

const app = express();

// It returns a Promise, so remember to await it.
await openUplinks();

// Endpoint is a centerpiece of NDNts. You can use it to create a producer or a consumer.
// It is similar to, but more powerful than, "face" in other NDN libraries.
// You'll soon see some of its powers.
const endpoint = new Endpoint();

// endpoint.produce() creates a producer.
// The first argument is the name prefix.
// The second argument is a callback function that is invoked for each incoming Interest;
// this must be an async function that returns a Promise.
endpoint.produce("/add", async (interest) => {
  console.log(`Got Interest ${interest.name}`);
  
  // Make a Data packet that has the same name as the Interest.
  const data = new Data(interest.name);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode();

  // Sending the Data is as simple as returning it from the function.
  return data;
},
// options
);

endpoint.produce("/namapasien", async (interest) => {
  console.log(`Got Interest ${interest.name}`);
  const data = await mysqli.query(`select * from pasien where id_pasien ='${interest.name.at[1]}'`);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${sum}\n`);

  // Sending the Data is as simple as returning it from the function.
  return data;
},
// options
);

endpoint.produce("/komentardokter", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // Extract x and y numbers, then compute the sum.
  const datadb = await mysqli.query(`select * from chat where id_pasien ='${interest.name.at[1]}'`);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${datadb}\n`);

  // Sending the Data is as simple as returning it from the function.
  return data;
},
// options
);
endpoint.produce("/scanfoto", async (interest) => {
  console.log(`Got Interest ${interest.name}`);
  const data = new Data(interest.name)
  // Extract x and y numbers, then compute the sum.
  data.content = await mysqli.query(`select * from chat where id_pasien ='${interest.name.at[1]}'`);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${data}\n`);

  // Sending the Data is as simple as returning it from the function.
  return data;
},
// options
);


console.log("Producer running, press CTRL+C to stop");
// import { openUplinks } from "@ndn/cli-common";
// import { Endpoint } from "@ndn/endpoint";
// import { Data } from "@ndn/packet";

// // openUplinks() creates a connection to the "uplink", in this case the local NFD forwarder.
// // It returns a Promise, so remember to await it.
// await openUplinks();

// // Endpoint is a centerpiece of NDNts. You can use it to create a producer or a consumer.
// // It is similar to, but more powerful than, "face" in other NDN libraries.
// // You'll soon see some of its powers.
// const endpoint = new Endpoint();

// // endpoint.produce() creates a producer.
// // The first argument is the name prefix.
// // The second argument is a callback function that is invoked for each incoming Interest;
// // this must be an async function that returns a Promise.
// endpoint.produce("/add", async (interest) => {
//   console.log(`Got Interest ${interest.name}`);
//   // This producer is a calculator. It expects Interest name to have three
//   // components: "add", x, and y. If it's not, reject the Interest.
//   if (interest.name.length !== 3) {
//     console.log("Wrong name length.");
//     return;
//   }

//   // Extract x and y numbers, then compute the sum.
//   const x = Number.parseInt(interest.name.at(1).text, 10);
//   const y = Number.parseInt(interest.name.at(2).text, 10);
//   const sum = x + y;
//   console.log(`${x} + ${y} = ${sum}`);

//   // Make a Data packet that has the same name as the Interest.
//   const data = new Data(interest.name);
//   data.freshnessPeriod = 1000;
//   data.content = new TextEncoder().encode(`${sum}\n`);

//   // Sending the Data is as simple as returning it from the function.
//   return data;
// },
// // options
// );

// console.log("Producer running, press CTRL+C to stop");