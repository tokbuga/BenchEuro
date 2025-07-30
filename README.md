# BenchEuro
Some benchmark results for consciousness..

## Getting a function value from Object / Array / Map
Hotpath: read u16 value from buffer and call a function from resource which holds handler functions. Fasest method is using a map with a dataview that bound to getter function of DataView without offset (surprisingly and relaxing). 

Winner: map.get(view.getUint16.bind(view))
### key => unsigned short (Uint16)
### value => function
```nodejs
node nodejs-getter-object-array-map.js
```
