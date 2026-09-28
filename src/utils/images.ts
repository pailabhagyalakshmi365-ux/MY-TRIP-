import heroBannerImg from '../assets/images/india_hero_banner_1790613728923.jpg';
import southKeralaImg from '../assets/images/south_india_temples_kerala_1790613743486.jpg';
import rajasthanImg from '../assets/images/rajasthan_heritage_forts_1790613756791.jpg';
import kashmirImg from '../assets/images/himalayan_kashmir_hills_1790613773553.jpg';
import goaImg from '../assets/images/goa_coastal_beaches_1790613786800.jpg';

export const IMAGE_ASSETS: Record<'hero' | 'south_kerala' | 'rajasthan' | 'kashmir' | 'goa', string> = {
  hero: heroBannerImg,
  south_kerala: southKeralaImg,
  rajasthan: rajasthanImg,
  kashmir: kashmirImg,
  goa: goaImg,
};

export const ALL_GALLERY_IMAGES = [
  heroBannerImg,
  rajasthanImg,
  southKeralaImg,
  kashmirImg,
  goaImg,
];
