# BenchEuro
Some benchmark results for consciousness..

## Getting a function value from Object / Array / Map
Hotpath: read u16 value from buffer and call a function from resource which holds handler functions. Fasest method is using a map with a dataview that bound to getter function of DataView without offset (surprisingly and relaxing). 

* key -> unsigned short (Uint16)
* value -> function

```shell
node nodejs-getter-object-array-map.js
```
Code and objects used in this test:
```js
function handle_arp () {} //match with
function handle_eth () {} //maybe other
function unhandle   () {} //no match

const object        = new Object;
const map           = new Map;
const array         = new Array;

array[ 0x0806 ]     = handle_arp; 
object[ 0x0806 ]    = handle_arp;
map.set( 0x0806,    handle_arp );

let 
    i, m = 1e6,    //time measure range length
    j, c = 10,     //run test times and find average
    t0,            //startedAt: time value
    t1,            //finishedAt: time value 
    tAvg           //average: sum( 10 x (t1-t0) ) / 10
;

const buffer    = Buffer.alloc( 4096 );
const view      = new DataView( buffer.buffer );

buffer.writeUInt16BE(0x0806, 0); //write key to buffer

let Map_prototype_get   = Map.prototype.get;
let Array_prototype_at  = Array.prototype.at;
let map_get_bind        = map.get.bind(map);
let array_at_bind       = array.at.bind(array);
let view_bind           = view.getUint16.bind(view);
let view_bind_offset    = view.getUint16.bind(view, 0);
```

### Winner: map.get(view.getUint16.bind(view))
<img src="nodejs-getter-object-array-map.png" width="100%">
