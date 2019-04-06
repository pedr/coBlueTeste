CREATE TABLE IF NOT EXISTS contato (
  id SERIAL,
  nome_vendedor VARCHAR(128) NOT NULL,
  nome_empresa VARCHAR(128),
  nome_contato VARCHAR(128) NOT NULL,
  email VARCHAR(64) NOT NULL,
  telefone VARCHAR(11) NOT NULL,
  data_contato DATE DEFAULT NOW()::DATE,
  data_validade DATE,
  PRIMARY KEY (id)
  );
