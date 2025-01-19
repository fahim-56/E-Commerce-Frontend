const button = document.createElement('button');
button.textContent = 'Click Me';

button.addEventListener('click', () => {
  console.log('Hello World');
});

document.body.appendChild(button);