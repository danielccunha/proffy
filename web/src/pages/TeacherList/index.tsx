import React from 'react';
import { PageHeader } from 'components';

import whatsappIcon from 'assets/images/icons/whatsapp.svg';

import './styles.css';

export default function TeacherList() {
  return (
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponíveis.">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input id="subject" type="text" />
          </div>

          <div className="input-block">
            <label htmlFor="weekday">Dia da semana</label>
            <input id="weekday" type="text" />
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input id="time" type="text" />
          </div>
        </form>
      </PageHeader>

      <main>
        <article className="teacher-item">
          <header>
            <img
              src="https://avatars3.githubusercontent.com/u/32555455?s=460&u=ffda6cff6f9c621ab60b4aa875fc74ed6a35487c&v=4"
              alt="Daniel Cunha"
            />
            <div>
              <strong>Daniel Cunha</strong>
              <span>Química</span>
            </div>
          </header>

          <p>
            Entusiasta das melhores tecnologias de química avançada.
            <br />
            <br />
            Apaixonado por explodir coisas em laboratório e por mudar a vida das
            pessoas através de experiências. Mais de 200.000 pessoas já passaram
            por uma das minhas explosões.
          </p>

          <footer>
            <p>
              Preço/hora
              <strong>R$ 80,00</strong>
            </p>
            <button type="button">
              <img src={whatsappIcon} alt="Entrar em contato" />
              Entrar em contato
            </button>
          </footer>
        </article>
      </main>
    </div>
  );
}
