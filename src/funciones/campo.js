let a = 'costanabcdesinsin'
let abc = [...a.matchAll(/(cos)|(tan)|(sin)/g)]

console.log(abc[1].index);
