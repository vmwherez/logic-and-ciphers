const origin = 'abcdefghijklmnopqrstuvwxyz .!?' 
let text = 'hello. this is a message. you can say a lot. que bono?'

const rotate = (arr, reverse) =>  {
  if (reverse) arr.unshift(arr.pop());
  else arr.push(arr.shift());
  return arr;
}

const encode = (text, shift) => {
        let alphabet = origin.split('')
	let cipher = []       

	text = text.split('')
	
  for (var i=0; i<=shift - 1; i++)
    {
	 rotate(alphabet, true)
    }

   for (var a in text)
   {
	let j = alphabet.indexOf(text[a])
	// console.log(a, text[a], '->', origin[j], j)
	cipher.push(origin[j])
   }
    return cipher.join('')
}


const decode = (ciphertext, shift) => {
        let decoded = []	
	let alphabet = origin.split('')

	for (var i=0; i<shift; i++) {
          rotate(alphabet)
        }  
	
        for (var a in text) { 
	  let j = alphabet.indexOf(ciphertext[a])
          // console.log(a, ciphertext[a], '->', origin[j], j)
	  decoded.push(origin[j])
        }
         return decoded.join('')
}


const analyzeFrequency = (text, limit, s) =>  {
	let alphabet = origin.split('')
	let counts = []
	let highs = []
	let guesses = []
	let key = alphabet.indexOf(s) 
	console.log('analyze frequency, key ' + s + ':'+ key +  ' ... ')

        for (a in origin) {
         let freq = text.split('').map( function(e,i){ if(e === origin[a]) return i;} )
             .filter(Boolean)
	  counts.push({'character':origin[a], 'freq': freq.length})
         }    

        counts.sort(function(a, b){
         return a.freq - b.freq
          })


	for (let i=0; i<=limit; i++) {
           highs.push(counts.pop()) 
	}

	for (h in highs) {
	  //resolve shift from top frequency
		//if character is frequent, substitute for key
		let shiftGuess = alphabet.indexOf(highs[h].character) - key 
		let g = decode(text, shiftGuess)
		guesses.push(g);
	}
	return guesses
}




const bruteCaeser = (ciphertext, limit) => {
	console.log('brute force...')
	for (var i=0; i<=limit; i++) {
	console.log(i, decode(ciphertext, i))
	}
}



const ciphertext = encode(text, 6)
console.log(ciphertext)

// if we know shift we can decode easily
// const plaintext = decode('nkrrucznoycoycgcskyygmkdcau cigtcygacgcruzdcw kchutuf', 6)
// console.log(plaintext)

// if we suspect a simple transposition, we have more options. 
// let's try brute force decoding the transposition. Easy again.
bruteCaeser(ciphertext, 10)

// if the cipher evolved into a more random substitution,
// we could look at character frequency. It certainly works here.
console.log(analyzeFrequency(ciphertext, 6, 's'))
console.log(analyzeFrequency(ciphertext, 6, 'e'))

