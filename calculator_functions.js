const input = document.getElementById('input')

function appendToDisplay(value) {
    input.value += value;
}

// This function wraps the rightmost number in a negative and parenthesis
// For example: 3+22 -> 3+(-22)
// Works by starting from the right and searching until an element that isn't an integer or decimal place is found.
// Then inserts (-...)

function negative() {
    is_wrapped = check_wrapped()
    if (is_wrapped.wrapped) {
        remove_wrap(is_wrapped.index);
    }
    else {
        wrap_negative();
    }
}

// Checks if the rightmost number is already wrapped.
function check_wrapped() {
    const inp = input.value;
    const len_input = inp.length;
    let split_inp = inp.split('');
    // Rightmost element isn't ')' means it isn't wrapped
    if (split_inp[len_input-1] != ')') {
        return {wrapped: false, index: -1};
    }
    for (let i=len_input-1; i>-1; i--) {
        if (/^[0-9.]$/.test(split_inp[i])) {
            continue;
        }
        else if (split_inp[i] == '-' && split_inp[i-1] == '(') {
            return {wrapped: true, index: i};
        }
    }
    return {wrapped: false, index: -1};
}

// If the rightmost number is already wrapped, this removes the wrap given the index of the '-'
function remove_wrap(index) {
    const inp = input.value.split('');
    inp.pop();                // Remove the last character which should be ')'
    inp.splice(index, 1);     // Remove '-' at index
    inp.splice(index - 1, 1); // Remove '(' at index - 1
    input.value = inp.join('');
}

// Wraps the rightmost number with (- ... )
function wrap_negative() {
    const inp = input.value;
    const len_input = inp.length;
    let split_inp = inp.split('');
    let found = false;
    for (let i=len_input-1; i > -1; i--) {
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

// Removes the last element of the input
function del() {
    const inp = input.value;
    if (inp.length == 0) {
        return;
    }
    else {
        input.value = inp.substring(0, inp.length - 1);
    }
}

// Evaluates the input expression
function equal() {
    input.value = eval(input.value);
}