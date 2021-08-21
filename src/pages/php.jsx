import React from 'react';

import About from '../About';
import Benefits from '../Benefits';
import InterviewProcess from '../InterviewProcess';
import JobPage from '../JobPage';
import Youtube from '../Youtube';

export default function php() {
  return (
    <JobPage title="Fullstack-разработчик (PHP + frontend)">
      <About />

      <h2>О проекте</h2>
      <p>
        Мы ищем разработчика в команду которая занимается разработкой и
        поддержкой новостных сайтов. Тематика - автомобили, обустройство дома,
        ремонт и другие. Аудитория большинства из них измеряется в миллионах
        уникальных посетителей в месяц. Мы трудимся совместно с
        профессиональной командой редакторов, дизайнеров и специалистов по
        рекламе.
      </p>
      <p>
        Посмотрите короткое видео (3 мин) с рассказом о проекте:
      </p>
      <Youtube videoId="EPhvHNWfmQI" />;

      <h2>Технологии и процессы</h2>
      <p>
        На данный момент эти проекты используют Wordpress в качестве основного
        движка. Хостинг - в AWS на Kubernetes/EKS. Мы используем
        автоматизированный деплой и Infrastructure-as-a-Code, применяем
        линтеры и автоматизированное тестирование, делаем код-ревью.
      </p>
      <p>
        Через несколько месяцев планируется миграция с Wordpress на новую
        платформу, в основе которой Python, Django и Next.js. Эта платформа
        сейчас активно разрабатывается отдельной командой и постепенно вводится
        в строй отдельными модулями.
      </p>

      <h2>О вас</h2>
      <p>
        Мы ожидаем, что у вас не меньше пары лет опыта в веб-разработке, и вы
        готовы работать как над бекендом, так и над фронтендом, и
        инфраструктурная часть вам также не чужда. Идеально, если вы уже имеете
        опыт работы с PHP, но открыты к работе с Python и Node.js в будущем.
      </p>
      <p>
        Мы всячески приветствуем креатив, самостоятельность и открытые
        обсуждения. Поэтому, кроме технических скиллов, мы ожидаем что вы
        настроены на командную работу, готовы исследовать разные варианты
        решения задачи, обсуждать их с коллегами, проектировать, принимать
        решения и воплощать их в жизнь.
      </p>
      <p>
        У нас русскоязычная команда, но продукты, над которыми мы работаем,
        имеют англоязычный интерфейс и рассчитаны на интернациональную
        аудиторию. Также мы активно общаемся с нашими партнерами из США.
        В связи с этим, русский знать обязательно; английский - достаточно
        уровня Intermediate и готовности его улучшать (у нас налажено
        корпоративное обучение английскому).
      </p>

      <Benefits />

      <InterviewProcess />
    </JobPage>
  );
}
