# BenchEuro
Some benchmark results for consciousness..

## Getting a function value from Object / Array / Map
Hotpath: read u16 value from buffer and call a function from resource which holds handler functions. Fasest method is using a map with a dataview that bound to getter function of DataView without offset (surprisingly and relaxing). 

### key -> unsigned short (Uint16)
### value -> function

```nodejs
node nodejs-getter-object-array-map.js
```

Winner: map.get(view.getUint16.bind(view))
Results:
┌─────────┬──────────────────────────────────────────────┬────────────────────┬───────┬───────────┐
│ (index) │ name                                         │ tAvg               │ count │ iteration │
├─────────┼──────────────────────────────────────────────┼────────────────────┼───────┼───────────┤
│ 0       │ 'object[buffer.readUInt16BE()]'              │ 26.7512793         │ 10    │ 1000000   │
│ 1       │ 'array[buffer.readUInt16BE()]'               │ 26.838049800000004 │ 10    │ 1000000   │
│ 2       │ 'array.at()'                                 │ 75.58667900000003  │ 10    │ 1000000   │
│ 3       │ 'array.at.bind()'                            │ 74.99832490000003  │ 10    │ 1000000   │
│ 4       │ 'map.get(buffer.readUInt16BE())'             │ 3.9884874000000763 │ 10    │ 1000000   │
│ 5       │ 'map.get(view.getUint16())'                  │ 3.7551043000000393 │ 10    │ 1000000   │
│ 6       │ 'map.get(view.getUint16.bind(view))'         │ 3.351200199999903  │ 10    │ 1000000   │
│ 7       │ 'map.get(view.getUint16.bind(view, offset))' │ 3.383049899999878  │ 10    │ 1000000   │
│ 8       │ 'map.get.bind()'                             │ 3.7326415999999427 │ 10    │ 1000000   │
│ 9       │ 'Reflect.get(object)'                        │ 73.88561670000004  │ 10    │ 1000000   │
│ 10      │ 'Reflect.get(array)'                         │ 74.09491670000003  │ 10    │ 1000000   │
│ 11      │ 'Reflect.apply(Array.prototype.at)'          │ 77.27835839999989  │ 10    │ 1000000   │
│ 12      │ 'Reflect.apply(Map.prototype.at)'            │ 6.677641700000004  │ 10    │ 1000000   │
└─────────┴──────────────────────────────────────────────┴────────────────────┴───────┴───────────┘