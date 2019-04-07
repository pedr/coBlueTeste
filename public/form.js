/* global axios */

const frontFriendly = {
  nomeEmpresa: 'Nome da empresa',
  nomeContato: 'Nome do contato',
  email: 'Email',
  telefone: 'Telefone',
  dataValidade: 'Data de validade',
};

const FORM = document.getElementById('contato');

async function addContato(formData) {
  try {
    const response = await axios.post('/contatos', formData);
    if (!response.data) {
      return true;
    }

    await refreshContatos();
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

async function updateContato(formData, id) {
  try {
    const response = await axios.put(`/contatos/${id}`, formData);
    if (!response.data) {
      return true;
    }

    await refreshContatos();
    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}

FORM.onsubmit = (event) => {
  const myForm = new FormData(FORM);
  const formData = {};

  myForm.forEach((value, key) => {
    formData[key] = value;
  });

  const tel = transformTel(formData.telefone);
  if (!tel) {
    alert('Telefone no formato errado');
    return false;
  }
  formData.telefone = tel;

  const target = event.explicitOriginalTarget;

  if (target.id === 'updateSubmit') {
    const id = target.getAttribute('contato-id');
    updateContato(formData, id);
  } else if (target.id === 'contatoSubmit') {
    addContato(formData);
  }

  FORM.reset();
  const updateSubmit = document.querySelector('#updateSubmit');
  updateSubmit.className = 'd-none';
  return false;
};

function getIdFromButton(button) {
  const stringId = button.id;
  // pega contato-192 e retorna 192
  return stringId.split('-')[1];
}

function createButtons(id) {
  const div = document.createElement('div');
  div.className = 'row ml-2 mr-2 mb-2';

  const btnDelete = document.createElement('button');
  btnDelete.appendChild(document.createTextNode('Deletar'));
  btnDelete.className = 'm-1 btn btn-danger col';
  btnDelete.id = `contato-${id}`;
  btnDelete.addEventListener('click', removeContato);

  const update = document.createElement('button');
  update.appendChild(document.createTextNode('Atualizar'));
  update.className = 'm-1 btn btn-secondary col';
  update.id = `contato-${id}`;
  update.addEventListener('click', addUpdateButton);

  div.appendChild(update);
  div.appendChild(btnDelete);

  return div;
}

function createCard(info) {
  const dl = document.createElement('dl');
  let buttons;
  Object.keys(info).forEach((key) => {
    if (key !== 'id') {
      const div = document.createElement('div');
      const dt = document.createElement('dt');
      const text = document.createTextNode('');
      text.appendData(frontFriendly[key]);
      dt.appendChild(text);
      dt.className = 'col';

      const dd = document.createElement('dd');
      const textDD = document.createTextNode('');
      textDD.appendData(info[key]);
      dd.appendChild(textDD);
      dd.className = 'col-7';

      div.appendChild(dt);
      div.appendChild(dd);
      div.className = 'row';
      dl.appendChild(div);
    } else {
      // key é o id
      buttons = createButtons(info[key]);
    }
  });

  const card = document.createElement('div');
  dl.className = 'container';
  card.className = 'card mb-3';
  card.appendChild(dl);
  card.appendChild(buttons);
  return card;
}

function isEmpty(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}

async function getAll() {
  try {
    const response = await axios.get('/contatos');
    const { data } = response;
    if (!data) {
      return;
    }
    const allContatos = document.getElementById('allContatos');

    if (data.length == undefined && !isEmpty(data)) {
      data.dataValidade = transformDateToBrowser(data.dataValidade);
      const card = createCard(data);
      allContatos.appendChild(card);
      return;
    }

    data.forEach((obj) => {
      obj.dataValidade = transformDateToBrowser(obj.dataValidade);
      const card = createCard(obj);
      allContatos.appendChild(card);
    });
    return true;
  } catch (err) {
    return null;
  }
}

function refreshContatos() {
  const allContatos = document.getElementById('allContatos');
  allContatos.innerHTML = '';
  getAll();
}

async function removeContato(event) {
  const id = getIdFromButton(event.target);

  axios.delete(`/contatos/${id}`)
    .then(() => {
      refreshContatos();
    })
    .catch((err) => { console.error(err); });
}

function populateUpdateForm(data, id) {
  const updateSubmit = document.querySelector('#updateSubmit');
  Object.keys(data).forEach((key) => {
    if (key !== 'id') {
      const element = document.querySelector(`#${key}`);
      element.value = data[key];
    }
    updateSubmit.setAttribute('contato-id', id);
  });
  updateSubmit.className = 'btn btn-secondary';
}

function transformDateToServer(date) {
  return date.split('T')[0];
}

function transformDateToBrowser(date) {
  const iso = transformDateToServer(date);
  return iso.split('-').reverse().join('/');
}

async function addUpdateButton(event) {
  const id = getIdFromButton(event.target);

  axios.get(`/contatos/${id}`)
    .then((response) => {
      const { data } = response;
      data.dataContato = transformDateToServer(data.dataContato);
      data.dataValidade = transformDateToServer(data.dataValidade);
      populateUpdateForm(data, id);
    })
    .catch((err) => { console.error(err); });
}

function transformTel(tel) {
  const numberRegex = /^[0-9]+$/;
  const spaceRegex = /^[0-9]{2} [0-9]{5} [0-9]{4}$/;
  if (tel.length === 11 && numberRegex.exec(tel)) {
    return tel;
  }
  if (tel.length === 13 && spaceRegex.exec(tel)) {
    return tel.split(' ').join('');
  }
  return null;
}

function setMaxDate() {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }

  today = `${yyyy}-${mm}-${dd}`;
  document.getElementById('dataContato').setAttribute('max', today);
}

setMaxDate();
getAll();
