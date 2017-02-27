const { isEmpty, Cons, cons, compose, foldr, map, sum, product, anytrue, alltrue, append, length, double, doubleAll, logall, sumMatrix, foldTree, mapTree, logTree } = require('./glueing-functions-together')

const someTree = Cons(1, Cons( Cons(2), Cons(3, Cons(4))))

const add = a => b => a+b
const sumTree = foldTree(add)(add)(0)

const addTree = x => mapTree( a => a+x )
const multiplyTree = x => mapTree( a => a*x )

sumTree(someTree)
addTree(1)(someTree)
addTree(100)(someTree)
multiplyTree(2)(someTree)
multiplyTree(100)(someTree)

const { log, repeat, take, succ, within, map, relative } = require('./glueing-programs-together')

const sqrt_next = n => x => (x+n/x)/2
const sqrt = a0 => eps => n => within(eps)(repeat(sqrt_next(n))(a0))
const sqrt_rel = a0 => eps => n => relative(eps)(repeat(sqrt_next(n))(a0))

sqrt(0.01)(0.01)(49)
sqrt_rel(0.01)(0.01)(49)

const easydiff = f => x => h => ( f(x+h)-f(x) ) / h
const halve = x => x/2.0
const differentiate = h0 => f => x => map(easydiff(f)(x))(repeat(halve)(h0))

const y = x => Math.pow(x,3)+2*Math.pow(x,2)+2.02*x+2
const dx = x => within(0.000001)(differentiate(100)(y)(x))
