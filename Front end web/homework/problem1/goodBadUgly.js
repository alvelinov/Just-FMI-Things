function processData(input) {
    input.toLowerCase()
    var letters = []
    for(let i = 0; i < 26; i++) {
        letters.push(0)
    }
    for(let i = 0; i < input.length; i++) {
      const id = input.charCodeAt(i) - 97
      letters[id]++
    }
    
    for(let i = 0; i < letters.length; i++){
        if(letters[i] == 0){
            letters.splice(i,1)
            --i
        }
    }
    
    var uniqueValues = []
    uniqueValues.push(letters[0])
    for(let i = 1; i < letters.length; i++){
        var found = false
        for(let j = 0; j < uniqueValues.length; j++){
            if(uniqueValues[j] == letters[i]){
                found = true
                break
            }            
        }
        if(!found){
            uniqueValues.push(letters[i])
        }
    }
    
    if(uniqueValues.length == 1 || letters.length == 0){
        console.log("GOOD")
    }
    else if(uniqueValues.length == 2){    
        let bigger = uniqueValues[0] > uniqueValues[1] ? uniqueValues[0] : uniqueValues[1]
        let smaller = uniqueValues[0] > uniqueValues[1] ? uniqueValues[1] : uniqueValues[0]
        let count = 0
            
        if (smaller == 1) {
            for (let i = 0; i < letters.length; i++) {
                if (letters[i] == smaller)
                   count++
            }
            if (count == 1)
                console.log("BAD")
            else
                console.log("UGLY")
            
        } else {
            count = 0
            for (let i = 0; i < letters.length; i++) {
               if (letters[i] == bigger)
                   count++
            }
            if (count == 1 && bigger - smaller == 1)
                console.log("BAD")
            else
                console.log("UGLY")
        }
    }
    else {
        console.log("UGLY")
    }
} 
/*
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
*/
