import { BiHotel } from 'react-icons/bi';
import { GiChopsticks, GiPalmTree } from 'react-icons/gi';
import { useCallback, useEffect, useState } from 'react';
import { MdOutlineTempleBuddhist } from 'react-icons/md';
import Head from '@docusaurus/Head';
import { IoIosClose, IoIosMenu } from 'react-icons/io';

import { BsFillTaxiFrontFill, BsThermometerHalf } from 'react-icons/bs';
import { TbPlaneArrival } from 'react-icons/tb';
import { FiCalendar, FiMapPin } from 'react-icons/fi';
import { PiCoatHanger, PiHandTapThin } from 'react-icons/pi';
import classes from './index.module.css';


// const staticBaseUrl = 'http://127.0.0.1:8080/dist/2025/mifiyuan/';
const staticBaseUrl = 'https://static.mifi.no/dist/2025/mifiyuan/';

const rsvpLink = 'https://forms.gle/wFF2FbJyusforbhn9';

function makeConfetti({ decay = 0.99, ticks = 1, ...opts }: Record<string, unknown>) {
  // @ts-expect-error no type
  confetti({
    spread: 360,
    ticks,
    gravity: 0,
    decay,
    startVelocity: 5,
    ...opts,
    particleCount: 50,
    scalar: 4,
  });
}

function makeHearts(origin: unknown) {
  makeConfetti({
    shapes: ['heart'],
    // colors: ['FFC0CB', 'FF69B4', 'FFD0DB', 'C71585'],
    colors: ['FFCCCC', 'FF9999', 'FFDDDD', 'C74444'],
    origin,
  });
}

function makeColorHearts(e: React.MouseEvent<HTMLImageElement>, colors: string[]) {
  makeConfetti({
    ticks: 300,
    shapes: ['heart'],
    colors: colors.map((c) => c.replace(/^#/, '')),
    origin: {
      // mouse position
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    },
  });
}
function handleRsvpClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  makeConfetti({
    shapes: ['emoji'],
    shapeOptions: {
      emoji: {
        value: ['🦄', '🌈', '🤩'],
      },
    },
    origin: {
      // mouse position
      x: e.clientX / window.innerWidth,
      y: e.clientY / window.innerHeight,
    },
  });

  setTimeout(() => {
    window.location.href = (e.target as HTMLAnchorElement).href;
  }, 1500);
}

const Location = ({ href, name }: { href: string, name: string }) => (
  <a rel="noopener nofollow noreferrer" target="_blank" href={href} style={{ textDecoration: 'underline', color: 'inherit', display: 'flex', alignItems: 'center' }}>
    <FiMapPin className={classes['locationPin']} style={{ fontSize: '1.7em' }} />
    <span>{name}</span>
  </a>
);

function Event({ locationShort, locationHref, title, description, time, startDate, endDate, location }: { locationShort?: string, locationHref?: string, title: string, description?: string, time: string, startDate: Date, endDate: Date, location: string }) {
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
      <p style={{ fontSize: '1.1em', textAlign: 'center' }}>{title}</p>

      {locationShort && locationHref && (
        <a rel="noopener nofollow noreferrer" target="_blank" href={locationHref} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', marginBottom: '.1em' }}>
          <FiMapPin className={classes['locationPin']} style={{ fontSize: '.8em', marginRight: '.4em' }} />
          <span>{locationShort}</span>
        </a>
      )}
      <p style={{ opacity: 0.7 }}>{time}</p>
      <button type="button" onClick={downloadCal} className={classes['button']} style={{ marginBottom: '2em', display: 'flex', alignItems: 'center', fontSize: '.7em', padding: '.3em .8em' }}>
        <FiCalendar style={{ fontSize: '1.2em', marginRight: '.5em' }} /> Add to Calendar
      </button>
      {description && <p style={{ textAlign: 'center' }}>{description}</p>}
    </>
  );
}

function Img({ src, style, colors, ...props }: { src: string, colors: string[] } & React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    // eslint-disable-next-line jsx-a11y/img-redundant-alt, react/jsx-props-no-spreading, jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-to-interactive-role
    <img src={`${staticBaseUrl}${src}`} alt="Image" style={{ width: '100vw', cursor: 'pointer', ...style }} {...props} role="button" tabIndex={0} onClick={(e) => makeColorHearts(e, colors)} />
  );
}

function Li({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <li><a rel="noopener nofollow noreferrer" target="_blank" href={href} style={{ textDecoration: 'underline', color: 'inherit', display: 'flex' }}>{children}</a></li>
  );
}

export default function MifiYuan() {
  useEffect(() => {
    (async () => {
      const loadScript = (src: string) => new Promise<void>((resolve, reject) => {
        const wf = document.createElement('script');
        const s = document.scripts[0];
        wf.src = src;
        wf.async = true;
        s!.parentNode!.insertBefore(wf, s!);
        wf.addEventListener('load', () => {
          resolve();
        });
        wf.addEventListener('error', (e) => {
          reject(e);
        });
      });

      await Promise.all([
        loadScript('https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js'),
        loadScript('https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.0.3/tsparticles.confetti.bundle.min.js'),
      ]);

      WebFont.load({
        google: {
          families: ['Alegreya', 'WindSong', 'Merriweather', 'Libertinus Math'],
        },
      });

      makeHearts({ x: 0.5, y: 0.3 });
    })();
  }, []);

  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuClose = useCallback(() => setMenuVisible(false), []);

  return (
    <>
      <Head>
        <title>Yuan + Mikael</title>
        <meta property="og:image" content={`${staticBaseUrl}26351e10-56b5-11f0-9f27-effbe8e7bb58-100-1000.jpg`} />
      </Head>
      <div className={classes['outerWrapper']}>
        <div className={classes['wrapper']}>
          <div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <div style={{ position: 'relative', cursor: 'pointer', userSelect: 'none' }} role="button" onClick={(e) => makeHearts({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight })} tabIndex={0}>
              <div
                className={classes['mainImg']}
                style={{ backgroundImage: `url(${staticBaseUrl}26351e10-56b5-11f0-9f27-effbe8e7bb58-100-2000.jpg` }}
              />

              <div style={{ position: 'absolute', bottom: 0, left: 0, color: 'white', padding: '0 3em' }}>
                <div style={{ paddingBottom: '.5em', fontFamily: 'WindSong', fontSize: '3em' }}>
                  Yuan +<br />
                  Mikael
                </div>
                <div style={{ paddingBottom: '3em', fontSize: '1em' }}>
                  We can&apos;t wait to share our special day with you!
                </div>
              </div>

              <div style={{ position: 'absolute', right: '2vw', bottom: '2vw', color: 'white', fontSize: '2em' }}>
                <PiHandTapThin className={classes['tapIndicator']} />
              </div>
            </div>

            <div id="home" style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 3em' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.7em' }}>
                  Saturday<br />
                  December 13, 2025<br />
                </div>
                <div style={{ fontSize: '1.4em', padding: '1em 0' }}>
                  Chiang Mai, Thailand 🇹🇭
                </div>

                <a className={classes['button']} style={{ fontSize: '1.3em' }} href={rsvpLink} onClick={handleRsvpClick}>RSVP</a>
                <p style={{ marginTop: '.5em', opacity: 0.8 }}>Please RSVP by 31st July 2025.</p>
              </div>
            </div>

            <Img src="a6fa92a0-56c9-11f0-97fb-595f0db69573-ppf-1000.jpg" colors={['#26e9f1', '#4ba8ac']} />

            <div className={classes['box']} id="home">
              <h1 id="accomodation">Accomodation</h1>

              <p>We will be providing a complimentary one-night stay on 13-14th Dec at <a href="https://www.proudphufah.com/muang/" target="_blank" rel="noopener noreferrer">Proud Phu Fah Muang Chiang Mai</a>, along with shuttle service to the event venue.</p>
            </div>

            <Img src="aedbb6f0-56cb-11f0-a43d-71246f6bde58-terra-1000.jpg" colors={['#2c442c', '#39bf39']} />

            <div className={classes['box']}>
              <h1 id="schedule">Schedule</h1>

              <div className={classes['locationHeader']}>Friday, December 12</div>

              <div className={classes['schedule']}>
                <Event title="🎂 Celebrating Mikael's Birthday" time="6:00 PM to 8:00 PM" startDate={new Date('2025-12-12T18:00:00+07:00')} endDate={new Date('2025-12-12T20:00:00+07:00')} description="We're planning an Italian dinner at Terra in Mae Rim for Mikael's birthday the day before. Let me know if you'd like to join so I can add you into the booking!" locationShort="Terra" location="Terra" locationHref="https://www.google.com/maps/search/?api=1&query=Terra+Rim+Tai%2C+Mae+Rim+District%2C+Chiang+Mai%2C+Thailand" />
              </div>


              <div className={classes['locationHeader']}>Saturday, December 13</div>

              <div className={classes['schedule']}>
                <Event title="🚌 Shuttle Bus" time="3:30 PM to 4:00 PM" startDate={new Date('2025-12-13T15:30:00+07:00')} endDate={new Date('2025-12-13T16:00:00+07:00')} description="Shuttle buses leave from Proud Phu Fah Muang Chiang Mai hotel and straight to the venue and back to the hotel at 8pm." locationShort="Proud Phu Fah" location="Proud Phu Fah Muang Chiangmai, ถนนค่ายลูกเสือ Chang Phueak, Mueang Chiang Mai District, Chiang Mai, Thailand" locationHref="https://www.google.com/maps/search/?api=1&amp;query=Proud+Phu+Fah+Muang+Chiangmai%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD+Chang+Phueak%2C+Mueang+Chiang+Mai+District%2C+Chiang+Mai%2C+Thailand" />
              </div>


              <div className={classes['schedule']}>
                <Event title="🥂 Reception and Light Bites" time="4:00 PM to 5:30 PM" startDate={new Date('2025-12-13T16:00:00+07:00')} endDate={new Date('2025-12-13T17:30:00+07:00')} locationShort="The Ironwood" location="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" locationHref="https://www.google.com/maps/search/?api=1&amp;query=The+Ironwood%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B4%E0%B8%A1+-+%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87+Mae+Raem%2C+Mae+Rim+District%2C+Chiang+Mai%2C+Thailand" />

                <div style={{ marginBottom: '1em', textAlign: 'center' }}><PiCoatHanger style={{ fontSize: '1.2em', verticalAlign: 'middle', marginRight: 0 }} /> Dress code: Happy Colours</div>
              </div>

              <div className={classes['schedule']}>
                <Event title="🍽 Dinner" time="6:00 PM to 8:00 PM" startDate={new Date('2025-12-13T18:00:00+07:00')} endDate={new Date('2025-12-13T20:00:00+07:00')} locationShort="The Ironwood" location="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" locationHref="https://www.google.com/maps/search/?api=1&amp;query=The+Ironwood%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B9%81%E0%B8%A1%E0%B9%88%E0%B8%A3%E0%B8%B4%E0%B8%A1+-+%E0%B8%AA%E0%B8%B0%E0%B9%80%E0%B8%A1%E0%B8%B4%E0%B8%87+Mae+Raem%2C+Mae+Rim+District%2C+Chiang+Mai%2C+Thailand" />
              </div>

              <div className={classes['schedule']}>
                <Event title="🍹🪩 Party!" time="9:00 PM to 11:00 PM" startDate={new Date('2025-12-13T21:00:00+07:00')} endDate={new Date('2025-12-13T23:00:00+07:00')} description="We will first head back to hotel to change and go to a nice bar after that!" locationShort="The Ironwood" location="The Ironwood, ถนนแม่ริม - สะเมิง Mae Raem, Mae Rim District, Chiang Mai, Thailand" />
              </div>


              <div className={classes['locationHeader']}>Sunday, December 14</div>

              <div className={classes['schedule']}>
                <Event title="Breakfast Get Together 🍳🥐🥓" time="8:30 AM to 10:00 AM" startDate={new Date('2025-12-14T08:30:00+07:00')} endDate={new Date('2025-12-14T10:00:00+07:00')} description="Complimentary breakfast at the hotel, let's all meet at 8:30am!" locationShort="Proud Phu Fah" location="Proud Phu Fah Muang Chiangmai, ถนนค่ายลูกเสือ Chang Phueak, Mueang Chiang Mai District, Chiang Mai, Thailand" locationHref="https://www.google.com/maps/search/?api=1&amp;query=Proud+Phu+Fah+Muang+Chiangmai%2C+%E0%B8%96%E0%B8%99%E0%B8%99%E0%B8%84%E0%B9%88%E0%B8%B2%E0%B8%A2%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD+Chang+Phueak%2C+Mueang+Chiang+Mai+District%2C+Chiang+Mai%2C+Thailand" />
              </div>
            </div>

            <Img src="13b68050-56cc-11f0-8c28-6bf975c32ddf-CM-1000.jpg" colors={['#ffd03e', '#e9b000']} />

            <div className={classes['box']}>
              <h1 id="travel">Travel</h1>

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
                <Li href="https://affiliate.klook.com/redirect?aid=35757&aff_adid=1081200&k_site=https%3A%2F%2Fwww.klook.com%2Fen-US%2Factivity%2F78957-cheeva-spa-experience-chiangmai%2F">Cheeva Spa</Li>
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

          <Img src="94bcd530-5732-11f0-8836-e57660e7e040-love-1000.jpg" className={classes['kenBurns1']} style={{ margin: '10vw 0' }} colors={['#ffd03e', '#ff603e']} />

          <div className={classes['box']}>
            <h2 id="qa" className={classes['qa']}>Q & A</h2>

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

              <p>Yes! The shuttle bus leaves at 3:30pm from the hotel and back to the hotel at 8:30pm.</p>

              <p>Do you have hair and makeup contact?</p>

              <p>Yes, please contact Yuan!</p>
            </div>
          </div>

          <div style={{ marginBottom: '3em', marginTop: '5em', textAlign: 'center', opacity: 0.7 }}>
            <a href="https://mifi.no/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>mifi.no</a> <span style={{ opacity: 0.4 }}> | <a href="https://github.com/mifi/mifi.no/blob/master/src/pages/yuan/index.tsx" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Source code 🤓</a></span>
          </div>
        </div>

        <button className={classes['button']} type="button" style={{ position: 'fixed', top: '5vw', left: '5vw', backgroundColor: 'white', opacity: 0.8, fontFamily: 'Libertinus Math', letterSpacing: '.1em', display: 'flex', alignItems: 'center' }} onClick={() => setMenuVisible((v) => !v)}>
          <IoIosMenu style={{ marginRight: '.5em' }} />
          <span>MENU</span>
        </button>

        <div className={classes['menu']} data-visible={menuVisible}>
          <div style={{ paddingBottom: '.5em', fontFamily: 'WindSong', fontSize: '2em', padding: '.5em .5em' }}>
            Yuan +<br />
            Mikael
          </div>

          <ul className={classes['menu-items']}>
            <li><a href="#home" onClick={handleMenuClose}>Home</a></li>
            <li><a href="#accomodation" onClick={handleMenuClose}>Accomodation</a></li>
            <li><a href="#schedule" onClick={handleMenuClose}>Schedule</a></li>
            <li><a href="#travel" onClick={handleMenuClose}>Travel</a></li>
            <li><a href="#qa" onClick={handleMenuClose}>Q &amp; A</a></li>
          </ul>

          <a className={classes['buttonInverse']} style={{ fontSize: '1.3em', width: '100%', boxSizing: 'border-box', textAlign: 'center', fontWeight: 400 }} href={rsvpLink} onClick={handleRsvpClick}>RSVP</a>

          <button type="button" style={{ all: 'unset', position: 'absolute', right: 0, top: 0 }} onClick={handleMenuClose}>
            <IoIosClose style={{ fontSize: '2em', color: 'black', padding: '.3em', boxSizing: 'content-box', cursor: 'pointer' }} />
          </button>
        </div>
      </div>
    </>
  );
}
