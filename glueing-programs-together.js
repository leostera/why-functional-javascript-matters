const log = x => (console.log(x),x)

/*
 * This function generates an infinite number of values (although V8 seems to
 * die at around 3451)
 */
const repeat = f => function *(x) { yield x, yield *repeat(f)(f(x)) }

const take = n => i => (new Array(n)).fill(true).map( () => i.next().value )

const map = f => function *(i) { yield f(i.next().value), yield *map(f)(i) }

const succ = repeat(y => y+1)

const abs = x => x < 0 ? -x : x

const within = eps => list => {
  const a = list.next().value
  const b = list.next().value
  console.log(`comparing: |${a}-${b}| <= ${eps} -> ${ abs(a-b) <= eps }`)
  if( abs(a-b) <= eps ) {
    console.log(`hooray! found: ${b}`)
    return b
  } else {
    return within(eps)(list)
  }
}

const relative = eps => list => {
  const a = list.next().value
  const b = list.next().value
  console.log(`comparing: |(${a}/${b})-1| <= ${eps} -> ${ abs(a-b) <= eps }`)
  if( abs( (a/b)-1 ) <= eps ) {
    console.log(`hooray! found: ${b}`)
    return b
  } else {
    return relative(eps)(list)
  }
}

export {
  log,
  repeat,
  map,
  take,
  succ,
  within,
  relative,
}
