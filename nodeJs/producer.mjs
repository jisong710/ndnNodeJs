import { fchQuery, connectToNetwork } from "@ndn/autoconfig";

// other imports for examples
import { Endpoint } from "@ndn/endpoint";
import { Forwarder } from "@ndn/fw";
import assert from "node:assert/strict";

if (process.env.CI) { process.exit(0); }

const fw = Forwarder.create();

// Connect to NDN network via routers in FCH response, consider default IPv4 gateway as a candidate.
// Also provide a fallback list in case the above candidates fail.
// Keep only the fastest face and close others.
const faces = await connectToNetwork({
  fw,
  fallback: ["suns.cs.ucla.edu", "ndn.qub.ac.uk"],
  connectTimeout: 3000,
});
assert.equal(faces.length, 1);
const [fastestFace] = faces;
console.log("fastest face is", `${fastestFace}`);

// By default, default route "/" is added to the face, so that you can send Interests right away.
try {
  const t0 = Date.now();
  const data = await new Endpoint({ fw }).consume(`/ndn/edu/ucla/ping/${Math.trunc(Math.random() * 1e8)}`);
  console.log("Interest satisfied", `${data}`, `${Date.now() - t0}ms`);
} catch (err) {
  console.warn(err);
}

fastestFace.close();