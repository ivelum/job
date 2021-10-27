import { Link } from 'gatsby';
import React from 'react';

export default function InterviewProcess() {
  return (
    <>
      <p>
        После заполнения <Link to="form/">формы отклика</Link> вы увидите
        приглашение для записи на короткий ознакомительный звонок в Zoom, он
        занимает буквально 15 минут. Вы сможете выбрать удобное для вас время
        и немедленно забронировать его. На этом звонке можно обсудить любые
        интересующие вас вопросы по проектам или по вакансии, а также решить,
        каким образом продолжить общение - или пойти на техническое
        интервью, или же попробовать сначала выполнить тестовое задание.
      </p>
      <p>
        Техническое интервью также проводится в режиме видеозвонка в Zoom и
        обычно занимает не более полутора часов. По вашему желанию его можно
        провести не только в рабочий день, но и в выходной. Как правило, мы
        обсуждаем следующие три основные темы:
      </p>
      <ol>
        <li>
          любые вопросы от&nbsp;вас&nbsp;&mdash; о&nbsp;компании,
          о&nbsp;вакансии, о&nbsp;проекте и&nbsp;др.;
        </li>
        <li>
          разговор о&nbsp;каком-то проекте из&nbsp;вашего опыта;
        </li>
        <li>
          экспресс-опросник по&nbsp;технологиям из&nbsp;нашего стека.
        </li>
      </ol>
      <p>
        Мы&nbsp;не&nbsp;задаем никаких абстрактных вопросов,
        не&nbsp;гоняем по&nbsp;алгоритмам и&nbsp;не предлагаем
        вам писать код во&nbsp;время собеседований.
        Все общение&nbsp;&mdash; только по&nbsp;делу
        и&nbsp;в&nbsp;комфортной обстановке.
      </p>
    </>
  );
}
