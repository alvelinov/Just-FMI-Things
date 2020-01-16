function processData(input) {
    var result = [];
    input = eval(input);
    
    //count numbers and delete them from input
    let numcount = 0
    for (let i = 0; i < input.length; i++) {
        if (typeof input[i] == 'number') {
            numcount++
            input.splice(i,1)
            --i
        }
    }
    if(numcount)
        result.push(numcount)
    
    
    for (let i = 0; i < input.length; i++) {
        if (typeof input[i] == 'string') {
            let arr = input[i].split("")
            let reversed = arr.reverse()
            result.push(arr.join(""))           
        }
        else if (input[i] && {}.toString.call(input[i]) === '[object Function]') {
            result.push(input[i](42))
        }
        else if (Array.isArray(input[i])) {
            let multnest = false
            while(1) {
                let nested = false
                for (let j = 0; j < input[i].length; j++) {
                    if (Array.isArray(input[i][j])) {
                        nested = true
                        multnest = true
                        break
                    }
                }
                if (!nested)
                    break
                input[i] = Array.prototype.concat.apply([], input[i])
            }
            if (multnest)
                result.push(input[i])
            else 
                result.push(input[i].sort())
        }
        else if (Object.prototype.toString.call(input[i]) == "[object Object]") {
            let keys = Object.keys(input[i])
            let values = Object.values(input[i])
            let str = ""
            if (keys.length == 0 || values.length == 0){
                result.push(str)
                continue
            }
            for (let j = 0; j < keys.length - 1; j++){
                str += keys[j] + ": " + values[j] + ", "                
            }
            str += keys[keys.length - 1] + ": " + values[values.length - 1]
            result.push(str)
        }
    }
    
    
    
    console.log(JSON.stringify(result));
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
