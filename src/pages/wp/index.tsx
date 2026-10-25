import Layout from '@theme/Layout';

import classes from './index.module.css';


// Wallpapers: my photos, published from the photo library (static.mifi.no/media/<public id>/<size>.jpg: 300 is about 0.3 megapixels, 2000
// about 2, for downloading)
const media = (publicId: string, size: '300' | '2000') => `https://static.mifi.no/media/${publicId}/${size}.jpg`;

const wallpapers = [
  { publicId: 'Dh1-fklTTZgeL_-d', title: 'Nusa Penida, Bali' },
  { publicId: 'brdoVvdtx_iGaB9u', title: 'Cairo Citadel, Egypt' },
  { publicId: 'wSEIyP4gb01Z9Py1', title: 'Bauxite quarry near Otranto, Italy' },
  { publicId: 'fTv8BXXFfrtw-P81', title: 'Český Krumlov, Czechia' },
  { publicId: 'HJz8FiHBINJq9DoO', title: 'Kelimutu, Flores, Indonesia' },
  { publicId: 'QPzGHMvO-lvW-nvE', title: 'Gravina in Puglia, Italy' },
  { publicId: 'n0vcEJcMtyp1WwkL', title: 'Prague, Czechia' },
  { publicId: '-ASDv0RW5O5a0u_F', title: 'Castlepoint, New Zealand' },
  { publicId: 'qU5Hgq_tgtRETJkU', title: 'Whangamatā, New Zealand' },
  { publicId: 'T8wcRZ_d4ShaKNX9', title: 'Trosky Castle, Czechia' },
];

export default function Wallpapers() {
  return (
    <Layout title="Wallpapers" description="Wallpapers from my travels, free to download">
      <main className={classes['wallpapers']}>
        {wallpapers.map(({ publicId, title }) => (
          <a key={publicId} href={media(publicId, '2000')} title={`${title} (download)`}>
            <img src={media(publicId, '300')} alt={title} className={classes['image']} loading="lazy" />
          </a>
        ))}
      </main>
    </Layout>
  );
}
