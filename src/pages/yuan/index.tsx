import { BiHotel } from 'react-icons/bi';
import { GiChopsticks, GiPalmTree } from 'react-icons/gi';
import { useEffect } from 'react';
import { MdOutlineTempleBuddhist } from 'react-icons/md';
import Head from '@docusaurus/Head';

import { BsFillTaxiFrontFill, BsThermometerHalf } from 'react-icons/bs';
import { TbPlaneArrival } from 'react-icons/tb';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { PiCoatHanger } from 'react-icons/pi';
import classes from './index.module.css';


// const staticBaseUrl = 'http://127.0.0.1:8080/dist/2025/mifiyuan/';
const staticBaseUrl = 'https://static.mifi.no/dist/2025/mifiyuan/';

const Location = ({ href, name }: { href: string, name: string }) => (
  <a rel="noopener nofollow noreferrer" target="_blank" href={href} style={{ textDecoration: 'underline', color: 'inherit', display: 'flex', alignItems: 'center' }}>
    <FiMapPin style={{ marginRight: '.6em', fontSize: '2em' }} />
    <span>{name}</span>
  </a>
);

function Event({ title, description, time, startDate, endDate, location }: { title: string, description?: string, time: string, startDate: Date, endDate: Date, location: string }) {
  function downloadCal() {
    function formatDate(date: Date) {
      return `${date.toISOString().replaceAll(/[:-]/g, '').split('.')[0]}Z`;
    }

    const icsContent = `\
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Company//Your Product//EN
BEGIN:VEVENT
UID:${Date.now()}@example.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:${title}
DESCRIPTION:${description ?? title}
LOCATION:${location}
END:VEVENT
END:VCALENDAR
`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'event.ics';
    link.click();
  }

  return (
    <>
      <p>{title}</p>
      <p>{time}</p>
      <button type="button" onClick={downloadCal} className={classes['button']} style={{ marginBottom: '2em', display: 'flex', alignItems: 'center' }}>
        <FiCalendar style={{ fontSize: '1.4em', marginRight: '.5em' }} /> Add to Calendar
      </button>
      {description && <p>{description}</p>}
    </>
  );
}

function Img({ src }: { src: string }) {
  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt
    <img src={`${staticBaseUrl}${src}`} alt="Image" style={{ width: '100vw' }} />
  );
}

function Li({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li><a rel="noopener nofollow noreferrer" target="_blank" href={href} style={{ textDecoration: 'underline', color: 'inherit', display: 'flex' }}>{children}</a></li>
  );
}

export default function MifiYuan() {
  useEffect(() => {
    const wf = document.createElement('script');
    const s = document.scripts[0];
    wf.src = 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js';
    wf.async = true;
    s!.parentNode!.insertBefore(wf, s!);
    wf.addEventListener('load', () => {
      WebFont.load({
        google: {
          families: ['Alegreya', 'WindSong', 'Merriweather'],
        },
      });
    });
  }, []);

  return (
    <div className={classes['wrapper']}>
      <Head>
        <title>Yuan + Mikael</title>
        <link rel="icon" href={`${staticBaseUrl}favicon.ico`} />
        <link rel="stylesheet" href={`${staticBaseUrl}styles.css`} />
      </Head>

      <div>
        <div style={{ position: 'relative' }}>
          <img src={`${staticBaseUrl}${'26351e10-56b5-11f0-9f27-effbe8e7bb58-100-1000.jpg'}`} alt="Main" style={{ objectFit: 'cover', width: '100vw', height: '100vh' }} />

          <div style={{ position: 'absolute', bottom: 0, left: 0, color: 'white', padding: '0 3em' }}>
            <div style={{ paddingBottom: '.5em', fontFamily: 'WindSong', fontSize: '3em' }}>
              Yuan +<br />
              Mikael
            </div>
            <div style={{ paddingBottom: '3em', fontSize: '1em' }}>
              We can&apos;t wait to share our special day with you!
            </div>
          </div>
        </div>

        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 3em' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.7em' }}>
              Saturday<br />
              December 13, 2025<br />
            </div>
            <div style={{ fontSize: '1.4em', padding: '1em 0' }}>
              Chiang Mai, Mueang Chiang Mai District, Chiang Mai, Thailand
            </div>

            <a className={classes['button']} style={{ fontSize: '1.3em' }} href="https://withjoy.com/yuan-and-mikael/rsvp">RSVP</a>
          </div>
        </div>

        <Img src="a6fa92a0-56c9-11f0-97fb-595f0db69573-ppf.jpg" />

        <div className={classes['box']}>
          <h1>Accomodation</h1>

          <p>We will be providing a complimentary one-night stay on 13-14th Dec at Proud Phu Fah Muang Chiang Mai, along with shuttle service to the event venue.</p>
        </div>

        <Img src="aedbb6f0-56cb-11f0-a43d-71246f6bde58-terra.jpg" />

        <div className={classes['box']}>
          <h1>Schedule</h1>

          <div className={classes['locationHeader']}>Friday, December 12</div>

          <div className={classes['schedule']}>
            <Event title="🎂 Celebrating Mikael's Birthday" time="6:00 PM to 8:00 PM" startDate={new Date('2025-12-12T18:00:00+07:00')} endDate={new Date('2025-12-12T20:00:00+07:00')} description="We're planning an Italian dinner at Terra in Mae Rim for Mikael's birthday the day before. Let me know if you'd like to join so I can add you into the booking!" location="Terra Rim Tai, Mae Rim District, Chiang Mai, Thailand" />

            <Location href="https://www.google.com/maps/search/?api=1&query=Terra+Rim+Tai%2C+Mae+Rim+District%2C+Chiang+Mai%2C+Thailand" name="Terra Rim Tai, Mae Rim District, Chiang Mai, Thailand" />
          </div>


          <div className={classes['locationHeader']}>Saturday, December 13</div>

          <div className={classes['schedule']}>
            <Event title="🚌 Shuttle Bus" time="3:30 PM to 4:00 PM" startDate={new Date('2025-12-13T15:30:00+07:00')} endDate={new Date('2025-12-13T16:00:00+07:00')} description="Shuttle buses leave from Proud Phu Fah Muang Chiang Mai hotel and straight to the venue and back to the hotel at 8pm." location="Proud Phu Fah Muang Chiangmai, ถนนค่ายลูกเสือ Chang Phueak, Mueang Chiang Mai District, Chiang Mai, Thailand" />

            <Location href="https://www.google.com/maps/search/?api=1&amp;query=Proud+Phu+Fah+Muang+Chiangmai%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD+Chang+Phueak%2C+Mueang+Chiang+Mai+District%2C+Chiang+Mai%2C+Thailand" name="Proud Phu Fah Muang Chiangmai, ถนนค่ายลูกเสือ Chang Phueak, Mueang Chiang Mai District, Chiang Mai, Thailand" />
          </div>


          <div className={classes['schedule']}>
            <Event title="🥂 Reception and Light Bites" time="4:00 PM to 5:30 PM" startDate={new Date('2025-12-13T16:00:00+07:00')} endDate={new Date('2025-12-13T17:30:00+07:00')} location="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" />

            <div>
              <div style={{ marginBottom: '1em' }}><PiCoatHanger style={{ fontSize: '2em', verticalAlign: 'middle', marginRight: '.4em' }} /> Happy Colours</div>

              <Location href="https://www.google.com/maps/search/?api=1&amp;query=The+Ironwood%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B4%E0%B8%A1+-+%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87+Mae+Raem%2C+Mae+Rim+District%2C+Chiang+Mai%2C+Thailand" name="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" />
            </div>
          </div>

          <div className={classes['schedule']}>
            <Event title="🍽 Dinner" time="6:00 PM to 8:00 PM" startDate={new Date('2025-12-13T18:00:00+07:00')} endDate={new Date('2025-12-13T20:00:00+07:00')} location="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" />

            <Event title="🍹🪩 Party!" time="9:00 PM to 11:00 PM" startDate={new Date('2025-12-13T21:00:00+07:00')} endDate={new Date('2025-12-13T23:00:00+07:00')} description="We will first head back to hotel to change and go to a nice bar after that!" location="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" />
          </div>


          <div className={classes['locationHeader']}>Sunday, December 14</div>

          <div className={classes['schedule']}>
            <Event title="Breakfast Get Together 🍳🥐🥓" time="8:30 AM to 10:00 AM" startDate={new Date('2025-12-14T08:30:00+07:00')} endDate={new Date('2025-12-14T10:00:00+07:00')} description="Complimentary breakfast at the hotel, let's all meet at 8:30am!" location="Proud Phu Fah Muang Chiangmai, ถนนค่ายลูกเสือ Chang Phueak, Mueang Chiang Mai District, Chiang Mai, Thailand" />

            <Location href="https://www.google.com/maps/search/?api=1&amp;query=Proud+Phu+Fah+Muang+Chiangmai%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD+Chang+Phueak%2C+Mueang+Chiang+Mai+District%2C+Chiang+Mai%2C+Thailand" name="Proud Phu Fah Muang Chiangmai, ถนนค่ายลูกเสือ Chang Phueak, Mueang Chiang Mai District, Chiang Mai, Thailand" />
          </div>
        </div>

        <Img src="13b68050-56cc-11f0-8c28-6bf975c32ddf-CM.jpg" />

        <div className={classes['box']}>
          <h1>Travel</h1>

          <div className={classes['headingIcon']}><TbPlaneArrival /></div>
          <h2>Getting In</h2>

          <p>We recommend flying into Chiang Mai International Airport (CNX) or taking a train from Bangkok. For a shorter itinerary, a one-night stop in Ayutthaya followed by direct travel to Chiang Mai also works well. If you have more time, you can take a slower, more scenic journey up north.</p>

          <ul>
            <li>Day 1: Bangkok → Ayutthaya (1–2 nights)</li>

            <li>Day 2: Ayutthaya → Lopburi (1 night)</li>

            <li>Day 3: Lopburi → Phitsanulok → Sukhothai area (1–2 nights)</li>

            <li>Day 4–5: Phitsanulok → Chiang Mai (overnight sleeper or day train)</li>
          </ul>

          <div className={classes['headingIcon']}><BsFillTaxiFrontFill /></div>
          <h2>Getting Downtown</h2>

          <p>There a lots of ways to get in downtown! There are several car rental options and Grab. If you need car rentals, please let Yuan knows!</p>

          <Location href="https://www.google.com/maps/search/?api=1&amp;query=Chiang+Mai+International+Airport+%28CNX%29%2C+%E0%B8%96%E0%B8%99%E0%B8%99+%E0%B8%A1%E0%B8%AB%E0%B8%B4%E0%B8%94%E0%B8%A5+Mueang+Chiang+Mai+District%2C+Chiang+Mai%2C+Thailand" name="Chiang Mai International Airport (CNX), ถนน มหิดล Mueang Chiang Mai District, Chiang Mai, Thailand" />

          <div className={classes['headingIcon']}><BsThermometerHalf /></div>
          <h2>Things to Note</h2>

          <p>December in Chiang Mai marks the continuation of the cool season, with temperatures approximately ranging from 15°C to 28°C.</p>

          <div className={classes['headingIcon']}><MdOutlineTempleBuddhist /></div>
          <h2>What to See</h2>

          <ul className={classes['big']}>
            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2F2ARbfLj')}>Wat Phra Singh</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FbFwRAa1')}>Wat Chedi Luang</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FHhQWQUw')}>Wat Phra That Doi Suthep</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FAW9jFY5')}>Wat Pha Lat</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FzYBXw77')}>Jing Jai Farmer’s Market</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FMfZ2CfQ')}>Baan Kang Wat Craft Market</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fwww.viator.com%2Fen-SG%2Ftours%2FChiang-Mai%2FExperience-Elephant-Sanctuary-Sticky-Waterfall%2Fd5267-60309P32%3Fpid%3DP00058688%26uid%3DU00668569%26mcid%3D58086%26currency%3DSGD')}>Elephant Sanctuary Chiang Mai + Sticky Waterfall </Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FuKVfEC3')}>Kad Na Mor Night Market </Li>
          </ul>

          <div className={classes['headingIcon']}><GiChopsticks /></div>
          <h2>Where to Eat &amp; Drink</h2>

          <ul className={classes['big']}>
            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FQB7W9F3')}>Greensmoked - Smoke house &amp; wine bar</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FyScFi1u')}>Khao-Soi- i</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FqTKrPAs')}>Flour Flour Bakery</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FRBveS2n')}>Khagee</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FN9RsVQW')}>Blackitch Artisan Kitchen</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2Fe7tWvrq')}>Ohu Bakery</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FxxWeHkj')}>Penicillin Oden Bar</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FrwRiLpF')}>Kini Panit</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2F1iTQPh9')}>Foo Coffee x Loaf &amp; Fish</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FKu6uYEH')}>Araksa Tea Garden</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FjnYQntY')}>Rab-a-bit</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2F6twtaLz')}>Fleur Cafe &amp; Eatery</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2Fta1xsWA')}>Pluto Cafe </Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FYw3Q5hH')}>Akma Ama</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FLtmKH8Q')}>Roast8ry</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FQM4sNL7')}>Graph Coffee Co</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FwpU5jxR')}>The Baristro x Ping River</Li>

            <Li href={decodeURIComponent('https%3A%2F%2Fg.co%2Fkgs%2FN7kR8Xj')}>Bar San</Li>
          </ul>

          <div className={classes['headingIcon']}><GiPalmTree /></div>
          <h2>Where to Relax</h2>

          <ul className={classes['big']}>
            <Li href="https://www.klook.com/en-US/activity/711-fah-lanna-spa-chiangmai/?aid=35757&aff_adid=1079589&aff_pid=&aff_sid=&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=35757&utm_term=&utm_content=&aff_klick_id=102706179879-35757-1079589-adb4ae7">Fah Lanna Spa Old City</Li>
            <Li href="https://www.klook.com/en-US/activity/711-fah-lanna-spa-chiangmai/?aid=35757&aff_adid=1079589&aff_pid=&aff_sid=&utm_medium=affiliate-alwayson&utm_source=non-network&utm_campaign=35757&utm_term=&utm_content=&aff_klick_id=102706186726-35757-1079589-de8427d">Cheeva Spa</Li>
          </ul>

          <div className={classes['headingIcon']}><BiHotel /></div>

          <h2>Where to Stay</h2>

          <p>We&apos;re providing a complimentary night’s stay on December 13–14 at Proud Phu Fah, Chiang Mai. <b>If you&apos;d like to stay additional nights at the same hotel, please let us know.</b> The hotel is offering a special rate of 3,700 THB ~ SGD145 per night.</p>

          <p>There are a few nice hotels around the city. Yuan can help you check or book the hotel.</p>
          <p>Lower Tier:</p>
          <ol>
            <li>Glory Wabi Sabi Hotel ~ SGD52/night</li>
            <li>TravelLodge Nimman ~SGD76/night</li>
            <li>Book Design Hotel ~ SGD101/night</li>
          </ol>

          <p>For those with kids, you can consider staying at this Mori Natural Farm at Mae Rim (direct contact FB).</p>

          <p>Mid-tier</p>
          <ol>
            <li>Coucou Hotel ~SGD122/night</li>
            <li>Sala Lanna ~SGD172/night</li>
            <li>Villa Alanna ~SGD 190/night</li>
          </ol>

          <p>High-tier</p>
          <ol>
            <li>Amanor Hotel ~SGD213/night</li>
            <li>Aleeta Retreat~ SGD410/night</li>
            <li>Raya Heritage ~SGD665/night</li>
          </ol>
        </div>
      </div>

      <Img src="94bcd530-5732-11f0-8836-e57660e7e040-love-1000.jpg" />

      <div className={classes['box']}>
        <h2 className={classes['qa']}>Q & A</h2>

        <div className={classes['qa']}>
          <p>For all our friends and family who have lots of questions, please check out our Q & A first!</p>

          <p>When is the RSVP deadline?</p>

          <p>Please RSVP by July 31st, so we can have an accurate headcount. :)</p>

          <p>What will the weather be like?</p>

          <p>
            In December, Chiang Mai enjoys cool, dry, and pleasant weather—one of the best times to visit.<br />

            Daytime highs: 25–30°C (77–86°F)<br />
            Nighttime lows: 10–18°C (50–64°F)
          </p>

          <p>What should I wear?</p>

          <p>Please see our Schedule for the dress code.</p>

          <p>Are there any colors that guests should avoid wearing?</p>

          <p>None, as you please.</p>

          <p>Is the wedding indoors or outdoors?</p>

          <p>The pre-drinks will be held outdoors, and the dinner will be indoors.</p>

          <p>Is there transportation being provided between reception and hotels?</p>

          <p>Yes! The shuttle bus leaves at 3pm from the hotel and back to the hotel at 8:30pm.</p>

          <p>Do you have hair and makeup contact?</p>

          <p>Yes, please contact Yuan!</p>
        </div>
      </div>

      <div style={{ marginBottom: '3em', marginTop: '5em', textAlign: 'center' }}>mifi.no</div>
    </div>
  );
}
