const log = x => (console.log(x), x)
const isEmpty = (rest=[]) => rest.length === 0

const Cons    = (a, b=[]) => cons(a)(b)
const cons    = a => b => [a, b]
const compose = f => g => x => f(g(x))

// foldr f x [] = x
// foldr f x [h, t] = f h (foldr f x t)
const foldr = f => x => ([a,l]) => f(a)( isEmpty(l) ? x : foldr(f)(x)(l) )

// map f [] = []
// map f [x xs] = [ f x, map f xs ]
const map = f => foldr( compose(cons)(f) )([])

const sum     = foldr( a => b => a+b )(0)
const product = foldr( a => b => a*b )(1)
const anytrue = foldr( a => b => a || b )(false)
const alltrue = foldr( a => b => a && b )(true)
const append  = foldr( cons )([])
const length  = foldr( a => b => b+1 )(0)

const double = a => a*2
const doubleAll = map( double )

const logAll = map( log )

const sumMatrix = compose(sum)(map(sum))
// sumMatrix(
//  listOf(
//    listOf(1,2,3),
//    listOf(1,2,3),
//    listOf(1,2,3),
//  ))

// foldtree f g a (Node label subtrees) = f label (foldtree f g a subtrees)
// foldtree f g a (Cons subtree rest)   = g (foldtree f g a subtree) (foldtree f g a rest)
// foldtree f g a [] = a
const foldTree = f => g => a => pair => {
  // foldtree f g a [] = a
  const [fst, snd] = pair
  if( pair instanceof Array && isEmpty(pair)) {
    console.log(`pair is an empty Array, we assume it's a final node: `, fst)
    return a
  }

  // foldtree f g a (Cons subtrees rest)
  if( fst instanceof Array && !isEmpty(fst)) {
    console.log(`fst is a non-empty Array, we assume it's a subtree: `, fst)
    return g( foldTree(f)(g)(a)(fst) )( foldTree(f)(g)(a)(snd) )
  }

  // foldtree f g a (Node label subtrees)
  console.log(`fst is not an Array, we assume it's a node: ${fst}`)
  return f(fst)( foldTree(f)(g)(a)(snd) )
}

const mapTree = f => foldTree( compose(cons)(f) )( cons )( [] )

const logTree = mapTree( log )

export {
  isEmpty,
  Cons,
  cons,
  compose,
  foldr,
  map,
  sum,
  product,
  anytrue,
  alltrue,
  append,
  length,
  double,
  doubleAll,
  logall,
  sumMatrix,
  foldTree,
  mapTree,
  logTree,
}
