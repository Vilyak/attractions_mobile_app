import axios from 'axios';

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

export default async function Scrape(query) {
  const { data: response } = await axios.get(`https://www.google.com/search?tbm=map&authuser=0&hl=en&gl=us&pb=!4m12!1m3!1d129315.5159015119!2d-74.11976397304606!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1920!2i513!4f13.1!7i20!8i20!10b1!12m8!1m1!18b1!2m3!5m1!6e2!20e3!10b1!16b1!19m4!2m3!1i360!2i120!4i8!20m57!2m2!1i203!2i100!3m2!2i4!5b1!6m6!1m2!1i86!2i86!1m2!1i408!2i240!7m42!1m3!1e1!2b0!3e3!1m3!1e2!2b1!3e2!1m3!1e2!2b0!3e3!1m3!1e3!2b0!3e3!1m3!1e8!2b0!3e3!1m3!1e3!2b1!3e2!1m3!1e9!2b1!3e2!1m3!1e10!2b0!3e3!1m3!1e10!2b1!3e2!1m3!1e10!2b0!3e4!2b1!4b1!9b0!22m6!1sMgqqXsfiDJfRtAaowr5A%3A1!2s1i%3A0%2Ct%3A11886%2Cp%3AMgqqXsfiDJfRtAaowr5A%3A1!7e81!12e5!17sMgqqXsfiDJfRtAaowr5A%3A57!18e15!24m48!1m12!13m6!2b1!3b1!4b1!6i1!8b1!9b1!18m4!3b1!4b1!5b1!6b1!2b1!5m5!2b1!3b1!5b1!6b1!7b1!10m1!8e3!14m1!3b1!17b1!20m2!1e3!1e6!24b1!25b1!26b1!30m1!2b1!36b1!43b1!52b1!54m1!1b1!55b1!56m2!1b1!3b1!65m5!3m4!1m3!1m2!1i224!2i298!26m4!2m3!1i80!2i92!4i8!30m28!1m6!1m2!1i0!2i0!2m2!1i458!2i513!1m6!1m2!1i1870!2i0!2m2!1i1920!2i513!1m6!1m2!1i0!2i0!2m2!1i1920!2i20!1m6!1m2!1i0!2i493!2m2!1i1920!2i513!34m13!2b1!3b1!4b1!6b1!8m3!1b1!3b1!4b1!9b1!12b1!14b1!20b1!23b1!37m1!1e81!42b1!47m0!49m1!3b1!50m4!2e2!3m2!1b1!3b0!65m0&q=${query}`);

  const json = response.substring(4);
  const normalizedJson = replaceAll(json, 'null,', '"",');
  const data = JSON.parse(normalizedJson);
  const result = [];
  if (data[0][1]) {
    // eslint-disable-next-line no-restricted-syntax,guard-for-in
    for (const single of data[0][1]) {
      const object = single[14];

      if (object) {
        const name = object[11] ? object[11] : '';
        const location = object[18] || '';
        const coords = object[9] ? object[9].filter((item) => item !== '') : [];
        // const phone = object[178][0][0] || '';
        result.push({ name, location, coords });
      }
    }
  }

  return result;
}
