var p10 = [3, 5, 2, 7, 4, 10, 1, 9, 8, 6]
var p8 = [6, 3, 7, 4, 8, 5, 10, 9]
var ip = [2, 6, 3, 1, 4, 8, 5, 7]
var IPi = [4, 1, 3, 5, 7, 2, 8, 6]
var E = [4, 1, 2, 3, 2, 3, 4, 1]
var p4 = [2, 4, 3, 1]
var s0 = [
    [1, 0, 3, 2],
    [3, 2, 1, 0],
    [0, 2, 1, 3],
    [3, 1, 3, 2],
];
var s1 = [
    [0, 1, 2, 3],
    [2, 0, 1, 3],
    [3, 0, 1, 0],
    [2, 1, 0, 3],
];


function convertToAscii(input, length) {
    var result = "";
    for (var i = 0; i < input.length; i++) {
        var bin = input[i].charCodeAt().toString(2);
        result += Array(8 - bin.length + 1).join("0") + bin;
    }

    document.getElementById('plainInBinary').innerHTML = input + " In Binary : " + result;
    return result;
}


function keyGeneration(input) {
    var result = [];

    var keyInP10 = P10(input);

    console.log("Key IN p10 :" + keyInP10)
    l0 = keyInP10.slice(0, keyInP10.length / 2);
    r0 = keyInP10.slice(keyInP10.length / 2, keyInP10.length);

    console.log("Left :" + l0)
    console.log("Right :" + r0)



    l = circular_shift(l0);
    console.log("ls-1 left :" + l)

    r = circular_shift(r0);
    console.log("ls-1 Right :" + r)
    console.log("Joint keyHalf : " + l + "," + r);
    var key1 = P8(l, r);
    console.log("key  in p8 :" + key1);


    l2 = circular_shift2(l);
    console.log("ls-2 left :" + l2)

    r2 = circular_shift2(r);
    console.log("ls-2 Right :" + r2)

    var key2 = P8(l2, r2);
    console.log("key  in p8 :" + key2);
    console.log("")

    console.log("Keys have been generated : ")
    console.log("")
    console.log("Key1 :" + key1)
    console.log("Key1 :" + key2)



    result = [key1, key2]
    return result;


}
function P8(l, r) {
    let combine = l.concat(r);

    var inputKey = [];
    for (var i = 0; i < p8.length; i++) {
        inputKey[i] = combine[p8[i] - 1];

    }
    // console.log(inputKey)
    return inputKey;

}



function circular_shift(leftShift) {

    var firstHalfLeft = leftShift.shift();
    leftShift.push(firstHalfLeft);

    return leftShift;

}
function circular_shift2(leftShift) {

    var firstHalfLeft = [];
    firstHalfLeft[0] = leftShift.shift();
    leftShift.push(firstHalfLeft[0]);
    firstHalfLeft[1] = leftShift.shift();
    leftShift.push(firstHalfLeft[1]);
    return leftShift;
}

function P10(input) {
    var inputKey = [];
    for (var i = 0; i < input.length; i++) {
        inputKey[i] = input[p10[i] - 1];
    }

    return inputKey;
}

function IP(plainText) {
    var ipOutPut = [];
    console.log("plainText  : " + plainText);
    for (let i = 0; i < plainText.length; i++) {
        ipOutPut[i] = plainText[ip[i] - 1];
    }
    var leftMostBits = ipOutPut.slice(0, ipOutPut.length / 2)
    var rightMostBits = ipOutPut.slice(ipOutPut.length / 2, ipOutPut.length)
    var LeftAndRight = [leftMostBits, rightMostBits];
    console.log("")
    console.log("plainText in IP : " + LeftAndRight);
    return LeftAndRight;

}
function f(RightLeft, key) {
    var Left = RightLeft[0]
    var Right = RightLeft[1];
    console.log("The left most :" + Left)
    console.log("The Right most :" + Right)

    var afterEP = ep(Right);
    console.log("The right half after expansion : " + afterEP)
    for (let i = 0; i < afterEP.length; i++) {
        afterEP[i] = afterEP[i] - 48 ^ key[i] - 48;
    }
    console.log("Xor Ep and key " + 1 + " : " + afterEP);

    var outPutOfS0 = S0(afterEP.slice(0, afterEP.length / 2))
    var outPutOfS1 = S1(afterEP.slice(afterEP.length / 2, afterEP.length))

    if (outPutOfS0.length == 1) {
        outPutOfS0 = "0" + outPutOfS0;
    }
    if (outPutOfS1.length == 1) {
        outPutOfS1 = "0" + outPutOfS1;
    }
    console.log("S0 output : " + outPutOfS0);
    console.log("S1 output : " + outPutOfS1);



    var finalP4 = P4(outPutOfS0, outPutOfS1);
    console.log("permut 4 : " + finalP4);
    var finalLeft = XorLeftAndF(Left, finalP4);
    console.log("XOR left half with f : " + finalLeft)

    var out = [];
    out = [finalLeft, Right];
    return out;

}
function swap(res) {
    var result = [res[1], res[0]];
    return result;
}



function XorLeftAndF(Left, finalP4) {
    var finalLeft = [];
    for (let i = 0; i < Left.length; i++) {
        finalLeft[i] = Left[i] - 48 ^ finalP4[i] - 48;
    }
    return finalLeft;
}
function P4(left, right) {
    let combine = left.concat(right);

    var inputP4 = [];
    for (var i = 0; i < p4.length; i++) {

        inputP4[i] = combine[p4[i] - 1];

    }
    return (inputP4);
}

function S0(left) {
    var row = String(left[0]) + String(left[left.length - 1]);
    row = parseInt(row, 2).toString(10);
    var col = String(left[1]) + String(left[2]);
    col = parseInt(col, 2).toString(10);
    var result = s0[row][col];

    return (result >>> 0).toString(2);


}


function S1(right) {
    var row = String(right[0]) + String(right[right.length - 1]);
    row = parseInt(row, 2).toString(10);

    var col = String(right[1]) + String(right[2]);

    col = parseInt(col, 2).toString(10);
    var result = s1[row][col];


    return (result >>> 0).toString(2);

}
function ep(rightMost) {
    rightMostBits = [];
    for (var i = 0; i < E.length; i++) {
        rightMostBits[i] = rightMost[E[i] - 1];
    }
    return rightMostBits;
}
function IpInverse(finalEnc) {
    var ipOutPut = [];
    var finalEnc = finalEnc[0].concat(finalEnc[1]);

    for (let i = 0; i < IPi.length; i++) {
        ipOutPut[i] = finalEnc[IPi[i] - 1];
    }
    return ipOutPut;
}
function toAscii(input) {
    var result = "";
    var arr = input.match(/.{1,8}/g);
    for (var i = 0; i < arr.length; i++) {
        result += String.fromCharCode(parseInt(arr[i], 2).toString(10));
    }
    return result;
}

function removeComa(scipher) {
    for (let i = 0; i < scipher.length; i++) {
        scipher = scipher.replace(",", "");
    }
    return scipher;
}


function Enc() {
    var key = document.getElementById('key').value;
    var plainText = document.getElementById('plain').value;
    var keys = keyGeneration(key);
    document.getElementById('key1').innerHTML = "key 1 :" + keys[0];
    document.getElementById('key2').innerHTML = "key 2 :" + keys[1];
    //KEys have been generated ....................................././///./..././//.///./
    var plainTextIPed = IP(convertToAscii(plainText, 8));
    var res = f(plainTextIPed, keys[0])
    var afterSwap = swap(res);
    document.getElementById('round1').innerHTML = afterSwap
    console.log("after Swap :" + afterSwap);
    var finalEnc = f(afterSwap, keys[1]);
    document.getElementById('round2').innerHTML = finalEnc
    console.log("joining the last left and right  : " + finalEnc);
    var cipher = IpInverse(finalEnc);
    console.log(" cipher text  : " + cipher);
    document.getElementById('cipher').innerHTML = cipher

}
function Dec() {
    var key = document.getElementById('key').value;
    var plainText = document.getElementById('plain').value;
    var keys = keyGeneration(key);
    document.getElementById('key1').innerHTML = "key 1 :" + removeComa(keys[0].toString());
    document.getElementById('key2').innerHTML = "key 2 :" + removeComa(keys[1].toString());
    //KEys have been generated ....................................././///./..././//.///./
    var plainTextIPed = IP(plainText);
    var res = f(plainTextIPed, keys[1])
    var afterSwap = swap(res);
    document.getElementById('round1').innerHTML = afterSwap
    console.log("after Swap :" + afterSwap);
    var finalEnc = f(afterSwap, keys[0]);
    document.getElementById('round2').innerHTML = finalEnc
    console.log("joining the last left and right  : " + finalEnc);
    var cipher = IpInverse(finalEnc);
    console.log(" cipher text  : " + cipher);
    document.getElementById('cipher').innerHTML = removeComa(cipher.toString());
    document.getElementById('char').innerHTML = toAscii(removeComa(cipher.toString()));


}
