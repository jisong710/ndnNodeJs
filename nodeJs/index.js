import { openUplinks } from "@ndn/cli-common";
import { Endpoint } from "@ndn/endpoint";
import { Data } from "@ndn/packet";
import app from "./firebase";

const db = app.firestore();
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
endpoint.produce("/addkomentar", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // // Extract x and y numbers, then compute the sum.
  const x = interest.name.at(1).text;
  const y = interest.name.at(2).text;
  const z = interest.name.at(3).text;
  // const y = Number.parseInt(interest.name.at(2).text, 10);
  // const sum = x + y;
  // console.log(`${x} + ${y} = ${sum}`);
  const docRef = db.collection('collectionName').doc(x);

    const data = {
      field1: y,
      field2: z,
    };

docRef.set(data)
  .then(() => {
    console.log('Data berhasil ditambahkan');
  })
  .catch((error) => {
    console.error('Terjadi kesalahan:', error);
  });
},


// options
);

endpoint.produce("/infopasien", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // // Extract x and y numbers, then compute the sum.
  const x = interest.name.at(1).text;
  // const y = Number.parseInt(interest.name.at(2).text, 10);
  // const sum = x + y;
  // console.log(`${x} + ${y} = ${sum}`);
  const collectionRef = db.collection('collectionName');

  collectionRef.where('field', '==', x)
    .get()
    .then((snapshot) => {
      const jsonData = [];

      snapshot.forEach((doc) => {
        const docData = doc.data();
        const docId = doc.id;
  
        const docObject = { id: docId, ...docData };
  
        jsonData.push(docObject);
      });
      const data = new Data(interest.name);
      data.freshnessPeriod = 1000;
      data.content = new TextEncoder().encode((JSON.stringify(jsonData)));
      return data;
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
},


// options
);

endpoint.produce("/komentardokter", async (interest) => {
  console.log(`Got Interest ${interest.name}`);

  // // Extract x and y numbers, then compute the sum.
  const x = interest.name.at(1).text;
  const collectionRef = db.collection('collectionName');

  collectionRef.where('field', '==', x)
    .get()
    .then((snapshot) => {
      const jsonData = [];

      snapshot.forEach((doc) => {
        const docData = doc.data();
        const docId = doc.id;
  
        const docObject = { id: docId, ...docData };
  
        jsonData.push(docObject);
      });
      const data = new Data(interest.name);
      data.freshnessPeriod = 1000;
      data.content = new TextEncoder().encode((JSON.stringify(jsonData)));
      return data;
    })
    .catch((error) => {
      console.error('Terjadi kesalahan:', error);
    });
},


// options
);

console.log("Producer running, press CTRL+C to stop");