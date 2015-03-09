'use strict';

console.log('client javascript!');

let request = new XMLHttpRequest();

request.onreadystatechange = function () {
  if (request.responseText === ''){
    return false;
  }
  document.getElementById("data").innerHTML = request.responseText;
  console.log('Got', request.responseText);
};

request.open('GET', '/api/test', true);
setTimeout(function () {
	request.send();
}, 2000);


