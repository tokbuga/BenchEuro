const CONSTANT = 0x0806;

function handle_arp ( buffer ) {
    if ( buffer.readUInt16BE(0) !== CONSTANT ) {
        throw "error";
    }
} //match with

function handle_eth () {} //maybe other
function unhandle   () {} //no match

const object        = new Object;
const map           = new Map;
const array         = new Array;

object[ CONSTANT ]    = handle_arp;
array[ CONSTANT ]     = handle_arp;
map.set( CONSTANT,      handle_arp);

let 
    i, m = 1e6,    //time measure range length
    j, c = 10,     //run test times and find average
    t0,            //startedAt: time value
    t1,            //finishedAt: time value 
    tAvg           //average: sum( 10 x (t1-t0) ) / 10
;

const buffer    = Buffer.alloc( 4096 );
const view      = new DataView( buffer.buffer );

buffer.writeUInt16BE(CONSTANT, 0); //write key to buffer

let Map_prototype_get   = Map.prototype.get;
let Array_prototype_at  = Array.prototype.at;
let map_get_bind        = map.get.bind(map);
let array_at_bind       = array.at.bind(array);
let view_bind           = view.getUint16.bind(view);
let view_bind_offset    = view.getUint16.bind(view, 0);

const rs = [
    { name : "object[buffer.readUInt16BE()]", tAvg:0 },
    { name : "array[buffer.readUInt16BE()]", tAvg:0 },
    { name : "array.at()", tAvg:0 },
    { name : "array.at.bind()", tAvg:0 },
    { name : "map.get(buffer.readUInt16BE())", tAvg:0 },
    { name : "map.get(view.getUint16())", tAvg:0 },
    { name : "map.get(view.getUint16.bind(view))", tAvg:0 },
    { name : "map.get(view.getUint16.bind(view, offset))", tAvg:0 },
    { name : "map.get.bind()", tAvg:0 },
    { name : "Reflect.get(object)", tAvg:0 },
    { name : "Reflect.get(array)", tAvg:0 },
    { name : "Reflect.apply(Array.prototype.at)", tAvg:0 },
    { name : "Reflect.apply(Map.prototype.at)", tAvg:0 },
    { name : "if (buffer.readUInt16BE() === CONSTANT) {}", tAvg:0 },
    { name : "if (view.getUint16() === CONSTANT) {}", tAvg:0 },
    { name : "switch (buffer.readUInt16BE()) { case CONSTANT: }", tAvg:0 },
    { name : "switch (view.getUint16()) { case CONSTANT: }", tAvg:0 },
].map(r => {
    r.tAvg = 0;
    r.count = c;
    r.iteration = m;
    j = c;
    switch ( r.name ) {
        case "object[buffer.readUInt16BE()]":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    object[ buffer.readUInt16BE(0) ]( buffer );
                };
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "array[buffer.readUInt16BE()]":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    array[ buffer.readUInt16BE(0) ]( buffer );
                };
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "map.get(buffer.readUInt16BE())":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    map.get( buffer.readUInt16BE(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "map.get(view.getUint16())":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    map.get( view.getUint16(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "map.get(view.getUint16.bind(view))":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    map.get( view_bind(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "map.get(view.getUint16.bind(view, offset))":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    map.get( view_bind_offset() )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "map.get.bind()":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    map_get_bind( buffer.readUInt16BE(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "Reflect.apply(Map.prototype.at)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    Reflect.apply( Map_prototype_get, map, [ buffer.readUInt16BE(0) ] )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "Reflect.apply(Array.prototype.at)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    Reflect.apply( Array_prototype_at, array, [ buffer.readUInt16BE(0) ] )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "array.at()":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    array.at( buffer.readUInt16BE(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "array.at.bind()":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    array_at_bind( buffer.readUInt16BE(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "Reflect.get(array)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    Reflect.get( array, buffer.readUInt16BE(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "Reflect.get(object)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    Reflect.get( object, buffer.readUInt16BE(0) )( buffer );
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;


        case "if (buffer.readUInt16BE() === CONSTANT) {}":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (buffer.readUInt16BE(0) === CONSTANT) {
                        handle_arp( buffer );
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;


        case "if (view.getUint16() === CONSTANT) {}":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (view.getUint16(0) === CONSTANT) {
                        handle_arp( buffer );
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "switch (buffer.readUInt16BE()) { case CONSTANT: }":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    switch (buffer.readUInt16BE(0)) {
                        case CONSTANT:
                            handle_arp( buffer );
                        break;
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        
        case "switch (view.getUint16()) { case CONSTANT: }":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    switch (view.getUint16(0)) {
                        case CONSTANT:
                            handle_arp( buffer );
                        break;
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        
    }

    return r;
}) 

console.table(rs);