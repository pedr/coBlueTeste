/* global axios */

const FORM = document.getElementById('contato');

async function addContato(formData) {
  try {
    const response = await axios.post('/contatos', formData);
    if (!response.data) {
      return true;
    }

    return false;
  } catch (err) {
    console.error(err);
    return false;
  }
}


FORM.onsubmit = () => {
  const myForm = new FormData(FORM);

  const formData = {};

  myForm.forEach((value, key) => {
    formData[key] = value;
  });

  addContato(formData)
    .then(() => {
      FORM.reset();
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
  return false;
};


const frontFriendly = {
  nomeEmpresa: 'Nome da empresa',
  nomeContato: 'Nome do contato',
  email: 'Email',
  telefone: 'Telefone',
  dataValidade: 'Data de validade',
};

function getIdFromButton(str) {
  return str.split('-')[1];
}

function createButtons(id) {
  const btnDelete = document.createElement('button');
  btnDelete.appendChild(document.createTextNode('Deletar'));
  btnDelete.className = 'btn btn-danger';
  btnDelete.id = `contato-${id}`;
  btnDelete.addEventListener('click', removeContato);

  const update = document.createElement('button');
  update.appendChild(document.createTextNode('Atualizar'));
  update.className = 'btn btn-secondary';
  update.id = `contato-${id}`;
  update.addEventListener('click', updateContato);

  return [update, btnDelete];
}

function createCard(info) {
  const dl = document.createElement('dl');
  let upd;
  let del;
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
      [upd, del] = createButtons(info[key]);
    }
  });

  const card = document.createElement('div');
  dl.className = 'container';
  card.className = 'card mb-3';
  card.appendChild(dl);
  card.appendChild(upd);
  card.appendChild(del);
  return card;
}

async function getAll() {
  try {
    const response = await axios.get('/contatos');
    const { data } = response;
    const allContatos = document.getElementById('allContatos');
    data.forEach((obj) => {
      const card = createCard(obj);
      allContatos.appendChild(card);
    });
    return true;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function removeContato(event) {
  const btn = event.target;
  const stringId = btn.id;
  const id = getIdFromButton(stringId);

  axios.delete(`/contatos/${id}`)
    .then(() => {
      const allContatos = document.getElementById('allContatos');
      allContatos.innerHTML = '';
      getAll();
    })
    .catch((err) => { console.error(err); });
}

async function updateContato(event) {
}

getAll();
