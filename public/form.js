const form = document.getElementById('contato');
const formData = {};

form.onsubmit = () => {
  const myForm = new FormData(form);
  for (const [key, value] of myForm) {
    formData[key] = value;
  }
  console.log(formData);

  return false;
}

