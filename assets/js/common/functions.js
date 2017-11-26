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
