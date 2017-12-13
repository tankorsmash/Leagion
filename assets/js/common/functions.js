export const onKeyPress = R.curry((key, current, e) => {
    if(e.key === key){
        return e.target.value;
    } else {
        return current;
    }
});

window.trace = R.curry(function(tag, x) {
  console.log(tag, x);
  return x;
});

export const areEqualShallow = (a, b) => {
    for(var key in a) {
        if(!(key in b) || a[key] !== b[key]) {
            return false;
        }
    }
    for(var key in b) {
        if(!(key in a) || a[key] !== b[key]) {
            return false;
        }
    }
    return true;
};
