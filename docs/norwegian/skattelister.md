# Skattelister

Hvis du logger inn på [Skattelistesøk](https://skatt.skatteetaten.no/web/skattelistesoek/) så har du muligheten til å se hvem som har søkt deg opp i skattelistene. Men du får bare se de som har søkt deg opp siste år. Hvordan se hvem som har søkt på dine skattelister, i alle tidligere år?

Først gå inn på ["Søkehistorikk"](https://skatt.skatteetaten.no/web/skattelistesoek/soekestat). åpne Developer Tools (Chrome). Oppdater/refresh siden. I Developer Tools Network tab Let etter en forespørsel som ligner på `/api/skattelistesoek/hent/soekestatistikk/2023`. Høyreklikk -> "Copy as fetch". Åpne Console og lim inn.

```js
await (await fetch("https://skatt.skatteetaten.no/api/skattelistesoek/hent/soekestatistikk/2023", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en,no;q=0.9",
    "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin"
  },
  "referrer": "https://skatt.skatteetaten.no/web/skattelistesoek/soekestat",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
})).json();
```

Nå kan du endre parameteren på slutten av URL'en (`2023` her) til det året du vil. Jeg har testet og kan bekrefte at det fungerer (jeg fant en person som hadde søkt meg opp:)
