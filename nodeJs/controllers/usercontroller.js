import { fchQuery, connectToNetwork } from "@ndn/autoconfig";

// other imports for examples
import { Endpoint } from "@ndn/endpoint";
import { Forwarder } from "@ndn/fw";
import assert from "node:assert/strict";

if (process.env.CI) { process.exit(0); }

let res = await fchQuery();
showFchResponse("closest router", res);
assert.equal(res.routers.length, 1);

// Ask for multiple routers:
res = await fchQuery({ count: 4 });
showFchResponse("multiple routers", res);
assert(res.routers.length > 1);

// Ask for multiple transports:
res = await fchQuery({ transports: { udp: 4, wss: 2 } });
showFchResponse("multiple transports", res);
assert(res.routers.length > 1);

// Limit to particular network:
//   "ndn" = global NDN testbed
//   "yoursunny" = yoursunny ndn6 network
res = await fchQuery({ transport: "wss", count: 3, network: "yoursunny" });
showFchResponse("yoursunny ndn6 network", res);
assert(res.routers.length > 1);

// Ask for router at specific location:
res = await fchQuery({ position: [121.40335, 31.00799] });
showFchResponse("near @yoursunny's birthplace", res);
assert.equal(res.routers.length, 1);

function showFchResponse(title, res) {
  console.log(title, `updated ${res.updated}`);
  console.table(res.routers.map((r) => ({
    transport: r.transport,
    connect: r.connect,
    prefix: r.prefix ? `${r.prefix}` : undefined,
  })));
}