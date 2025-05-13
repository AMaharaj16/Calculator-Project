const input = document.getElementById('input')

function appendToDisplay(value) {
    input.value += value;
}

// This function wraps the rightmost number in a negative and parenthesis
// For example: 3+22 -> 3+(-22)
// Works by starting from the right and searching until an element that isn't an integer or decimal place is found.
// Then inserts (-...)
function negative() {
    const inp = input.value;
    const len_input = inp.length;
    let split_inp = inp.split('');
    let found = false;
    for (let i=len_input; i > -1; i--) {
        if (/^[0-9.]$/.test(split_inp[i])) {
            continue;
        }
        else {
            split_inp.splice(i+1, 0, "(-");
            split_inp.push(')');
            input.value = split_inp.join('');
            found = true;
            break;
        }
    }
    // Whole input is a number
    if (!found) {
        split_inp.unshift("(-");
        split_inp.push(')');
        input.value = split_inp.join('');
    }  
}

function del() {
    const inp = input.value;
    if (inp.length == 0) {
        return;
    }
    else {
        input.value = inp.substring(0, inp.length - 1);
    }
}

function equal() {
    input.value = eval(input.value)
}