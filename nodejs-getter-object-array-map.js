function handle_arp ( pkt ) {
}

const object = new Object;
const map = new Map;
const array = new Array;
const hascheck_set = new Set;


object[ 0x0806 ] = handle_arp;
array[ 0x0806 ] = handle_arp;
map.set( 0x0806, handle_arp );
hascheck_set.add( 0x0806 )

let t0, t1, tAvg, m = 1e6, i, c = 10, j;
const buffer = Buffer.alloc( 4096 );
const view = new DataView( buffer.buffer );

buffer.writeUInt16BE(0x0806, 0);

let Map_prototype_get = Map.prototype.get;
let Array_prototype_at = Array.prototype.at;
let map_get_bind = map.get.bind(map);
let array_at_bind = array.at.bind(array);
let view_bind = view.getUint16.bind(view);
let view_bind_offset = view.getUint16.bind(view, 0);


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
                    if (object[ buffer.readUInt16BE(0) ] !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (array[ buffer.readUInt16BE(0) ] !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (map.get( buffer.readUInt16BE(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (map.get( view.getUint16(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (map.get( view_bind(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (map.get( view_bind_offset() ) !== handle_arp) {
                        throw ["error", r];
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "map.has(buffer)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (map.has( buffer.readUInt16BE(0) ) !== true) {
                        throw ["error", r];
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;


        case "map.has(view)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (map.has( view.getUint16(0) ) !== true) {
                        throw ["error", r];
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "set.has(buffer)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (hascheck_set.has( buffer.readUInt16BE(0) ) !== true) {
                        throw ["error", r];
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;


        case "set.has(view)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (hascheck_set.has( view.getUint16(0) ) !== true) {
                        throw ["error", r];
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "has(object)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (Reflect.has( object, buffer.readUInt16BE(0) ) !== true) {
                        throw ["error", r];
                    }
                }
                t1 = performance.now();
                r.tAvg += t1-t0;
            }
            r.tAvg /= c;
        break;

        case "has(array)":
            while (j--) {
                t0 = performance.now();
                i = m;
                while (i--) {
                    if (Reflect.has( array, buffer.readUInt16BE(0) ) !== true) {
                        throw ["error", r];
                    }
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
                    if (map_get_bind( buffer.readUInt16BE(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (Reflect.apply( Map_prototype_get, map, [ buffer.readUInt16BE(0) ] ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (Reflect.apply( Array_prototype_at, array, [ buffer.readUInt16BE(0) ] ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (array.at( buffer.readUInt16BE(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (array_at_bind( buffer.readUInt16BE(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (Reflect.get( array, buffer.readUInt16BE(0) ) !== handle_arp) {
                        throw ["error", r];
                    }
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
                    if (Reflect.get( object, buffer.readUInt16BE(0) ) !== handle_arp) {
                        throw ["error", r];
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