import { openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Data } from "@ndn/packet";

// openUplinks() creates a connection to the "uplink", in this case the local NFD forwarder.
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

console.log("Producer running, press CTRL+C to stop");