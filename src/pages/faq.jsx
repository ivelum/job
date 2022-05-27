import { Link } from 'gatsby';
import React from 'react';

import jobs from '@/Jobs';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'На главную' };

export default function FAQPage() {
  return (
    <Layout pageTitle="Вопросы и ответы" backLink={backLink}>
      <p>
        Здесь собраны ответы на частые, не очень частые, и довольно редкие
        вопросы о работе, которые нам задавали.
      </p>

      <ul>
        <li>
          <b>Расскажите о проекте и технологиях</b> - на странице каждой
          вакансии на сайте <Link to="/">job.ivelum.com</Link> есть описание и
          короткое видео (до 5 минут) с рассказом о проекте и технологическом
          стеке.
        </li>
        <li>
          <b>Что если я не работал с технологией X</b> - если у вас уже есть
          опыт в веб-разработке хотя бы с частичным пересечением со стеком в
          вакансии, и при этом вы готовы освоить недостающие технологии -
          отлично, это именно то, чего мы ожидаем.
        </li>
        <li>
          <b>Актуальна ли еще вакансия Х</b> - мы следим за тем чтобы на
          сайте <Link to="/">job.ivelum.com</Link> была всегда самая актуальная
          информация. Если вакансия здесь висит как открытая, значит это так и
          есть. Как только вакансия закрывается, мы сразу помечаем ее на сайте
          как закрытую. Иногда мы размещаем объявления о вакансиях в различных
          тематических чатах и группах, за ними уследить бывает сложнее, и там
          может встретиться устаревшее объявление.
          На <Link to="/">job.ivelum.com</Link> - всегда все актуальное.
        </li>
        <li>
          <b>Почему вакансии так долго висят открытыми?</b> Потому что у нас
          много открытых позиций для них. В частности,
          вакансия <Link to={jobs.python.url}>Python / full-stack</Link> у нас
          открыта практически постоянно, это наш основной технологический стек,
          использующийся почти во всех наших проектах, так что мы ведем набор
          по ней уже не первый год, и успешно 🙂 К нам уже присоединилось много
          замечательных людей по этой вакансии, но нужно еще.
        </li>
        <li>
          <b>Есть ли вакансии для джунов</b> - к сожалению, пока нет.
          Минимальные требования - от пары лет практического опыта в
          веб-разработке.
        </li>
        <li>
          <b>С какими странами вы работаете?</b> На форме отклика на каждую
          вакансию есть выбор страны с моментальной проверкой, есть ли
          возможность работать с данной страной. Если возможности нет, вы сразу
          увидите об этом сообщение. В частности, сейчас нет возможности
          работать с Россией, Беларусью, Казахстаном, и рядом других стран.
          Ограничения касаются физического нахождения на территории данных
          стран и заключения контракта с переводом денег в эти страны, но не
          касаются гражданства, национальности, или краткосрочных поездок. К
          примеру, если вы гражданин РФ, но переехали или планируете скорый
          переезд в Грузию, Армению, Сербию или куда-то еще - отлично, будем
          рады вашему отклику.
        </li>
        <li>
          <b>Каков рабочий график?</b> Свободный.{' '}
          <ExternalLink href={ExternalLinks.wiki.remoteWork}>
            Пруф
          </ExternalLink>.
        </li>
        <li>
          <b>Можно ли работать с частичной занятостью?</b> Нет. Все вакансии
          подразумевают полную занятость.
        </li>
        <li>
          <b>Есть ли ежедневные созвоны?</b> Мы стараемся избегать их. В разных
          командах работа устроена немного по-разному, у каких-то созвоны чаще,
          у других реже. Тем не менее, мы стараемся по возможности избегать
          ежедневных статус-митингов.
        </li>
        <li>
          <b>Как устроена работа в командах?</b> Мы работаем небольшими
          командами, в идеале не более 5 человек, в каждой из которых есть
          тимлид (см. статью в нашей вики -{' '}
          <ExternalLink href={ExternalLinks.wiki.teamsStructure}>
            подробнее о том, что делает тимлид
          </ExternalLink>). Каждая команда работает над своим проектом или
          несколькими связанными проектами. С командой также обычно работает
          менеджер продукта, который приносит задачи и приоритеты от бизнеса.
          Мы ценим автономность разработчиков и прямые коммуникации,
          приветствуем самостоятельный поиск наилучших вариантов решения задачи.
        </li>
        <li>
          <b>Как происходит обучение?</b> Для новых людей в команде мы
          организуем период плавной адаптации, когда погружение в проект и
          изучение новых технологий происходит на реальных практических
          задачах, но при этом не срочных, чтобы было достаточно времени во
          всем разобраться. Менторство, публичные коммуникации, парное
          программирование и код-ревью отлично работают для нас в качестве
          обучающих инструментов. Помимо этого, компания оплачивает обучение
          на любых платных курсах, загляните в разделы{' '}
          <ExternalLink href={ExternalLinks.wiki.learning}>
            Обучение
          </ExternalLink> и{' '}
          <ExternalLink href={ExternalLinks.wiki.compensationPackage}>
            Пакет компенсаций
          </ExternalLink> в нашей вики.
        </li>
        <li>
          <b>Каков процент бека и фронта в работе?</b> Слово
          &quot;фулл-стек&quot; в нашем понимании подразумевает работу над
          задачей &quot;от и до&quot;, включая анализ задачи, проектирование,
          воплощение на беке и на фронте, самостоятельное тестирование своей
          работы и самостоятельную выкладку в прод. Мы ожидаем, что для
          фуллстек-вакансий разработчики готовы работать над всеми этими
          аспектами, и не можем гарантировать что будет выдерживаться какой-то
          определенный процент бека или фронта.
        </li>
        <li>
          <b>Как часто пересматривается зарплата?</b> Дважды в год, в феврале
          и в августе. Пересмотр зарплаты приурочен к сезону сбора и выдачи
          обратной связи для коллег, который мы называем Feedback Apocalypse™.
          В нашей вики более подробно написано о том{' '}
          <ExternalLink href={ExternalLinks.wiki.feedback}>
            как это происходит
          </ExternalLink>.
        </li>
        <li>
          <b>Правда ли что мы пушаем прямо в мастер?</b> И да, и нет. В вики
          описан{' '}
          <ExternalLink href={ExternalLinks.wiki.developmentFlow}>
            наш любимый процесс
          </ExternalLink>, как мы любим организовывать работу над проектами -
          с применением Continuous Deployment и асинхронными код-ревью. Часть
          наших проектов уже давно работают именно по такому флоу. Другие еще
          не достигли нужного уровня просветления и пока еще работают
          по-старинке - с блокирующими пулл-реквестами и деплоями по кнопке
          (разумеется, тоже автоматизированными, но не по пушу в мастер). Тем
          не менее, мы очень любим частые деплои в прод и стараемся
          оптимизировать работу в этом направлении на всех проектах.
        </li>
      </ul>
    </Layout>
  );
}
