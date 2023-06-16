import { openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Data } from "@ndn/packet";
import fs from 'fs';
import express from "express";
import cors from "cors";
import pasien from "./controllers/pasien.js";
import diagnosa from "./controllers/diagnosa.js";
import statusPasien from "./controllers/statusPasien.js";
 

// It returns a Promise, so remember to await it.
await openUplinks();

// Endpoint is a centerpiece of NDNts. You can use it to create a producer or a consumer.
// It is similar to, but more powerful than, "face" in other NDN libraries.
// You'll soon see some of its powers.
const endpoint = new Endpoint();
const router = new express.Router();
// endpoint.produce() creates a producer.
// The first argument is the name prefix.
// The second argument is a callback function that is invoked for each incoming Interest;
// this must be an async function that returns a Promise.
endpoint.produce("/add", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // Extract x and y numbers, then compute the sum.
  const x = Number.parseInt(interest.name.at(1).text, 10);
  const y = Number.parseInt(interest.name.at(2).text, 10);
  const sum = x + y;
  console.log(`${x} + ${y} = ${sum}`);

  // Make a Data packet that has the same name as the Interest.
  const data = new Data(interest.name);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${sum}\n`);

  // Sending the Data is as simple as returning it from the function.
  return data;
},


// options
);

endpoint.produce("/namapasien", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // Extract x and y numbers, then compute the sum.
  const x = Number.parseInt(interest.name.at(1).text, 10);
  const y = Number.parseInt(interest.name.at(2).text, 10);
  const sum = x + y;
  console.log(`${x} + ${y} = ${sum}`);

  // Make a Data packet that has the same name as the Interest.
  const data = new Data(interest.name);
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
  const x = Number.parseInt(interest.name.at(1).text, 10);
  const y = Number.parseInt(interest.name.at(2).text, 10);
  const sum = x + y;
  console.log(`${x} + ${y} = ${sum}`);

  // Make a Data packet that has the same name as the Interest.
  const data = new Data(interest.name);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${sum}\n`);

  // Sending the Data is as simple as returning it from the function.
  return data;
},


// options
);
endpoint.produce("/scanfoto", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // Extract x and y numbers, then compute the sum.
  const x = Number.parseInt(interest.name.at(1).text, 10);
  const y = Number.parseInt(interest.name.at(2).text, 10);
  const sum = x + y;
  console.log(`${x} + ${y} = ${sum}`);

  // Make a Data packet that has the same name as the Interest.
  const data = new Data(interest.name);
  data.freshnessPeriod = 1000;
  data.content = new TextEncoder().encode(`${sum}\n`);

  // Sending the Data is as simple as returning it from the function.
  return data;
},


// options
);

const app = express();
 
app.use(cors());
app.use(express.json());

app.listen(5000, ()=> console.log('Server up and running...'));
app.get('/tulissaran', (req, res) => {
  fs.readFile('namapasien.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan dalam membaca file HTML');
      return;
    }

    // Kirim file HTML sebagai respons
    res.send(data);
  });
});
app.get('/diagnosa', (req, res) => {
  fs.readFile('diagnosa.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan dalam membaca file HTML');
      return;
    }

    // Kirim file HTML sebagai respons
    res.send(data);
  });
});
app.get('/pasien', (req, res) => {
  fs.readFile('pasien.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan dalam membaca file HTML');
      return;
    }

    // Kirim file HTML sebagai respons
    res.send(data);
  });
});
app.get('/', (req, res) => {
  fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Terjadi kesalahan dalam membaca file HTML');
      return;
    }

    // Kirim file HTML sebagai respons
    res.send(data);
  });
});
console.log("Producer running, press CTRL+C to stop");