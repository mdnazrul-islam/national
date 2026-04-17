import { Surah, Hadith } from './types';

export const SURAHS: Surah[] = [
  { id: 1, name: "Al-Fatihah", nameBn: "আল-ফাতিহা", ayahs: 7, type: "Meccan" },
  { id: 2, name: "Al-Baqarah", nameBn: "আল-বাকারা", ayahs: 286, type: "Medinan" },
  { id: 3, name: "Ali 'Imran", nameBn: "আলে ইমরান", ayahs: 200, type: "Medinan" },
  { id: 4, name: "An-Nisa", nameBn: "আন-নিসা", ayahs: 176, type: "Medinan" },
  { id: 5, name: "Al-Ma'idah", nameBn: "আল-মায়িদাহ", ayahs: 120, type: "Medinan" },
  { id: 36, name: "Ya-Sin", nameBn: "ইয়াসিন", ayahs: 83, type: "Meccan" },
  { id: 55, name: "Ar-Rahman", nameBn: "আর-রাহমান", ayahs: 78, type: "Meccan" },
  { id: 67, name: "Al-Mulk", nameBn: "আল-মুলক", ayahs: 30, type: "Meccan" },
  { id: 112, name: "Al-Ikhlas", nameBn: "আল-ইখলাস", ayahs: 4, type: "Meccan" },
  { id: 113, name: "Al-Falaq", nameBn: "আল-ফালাক", ayahs: 5, type: "Meccan" },
  { id: 114, name: "An-Nas", nameBn: "আন-নাস", ayahs: 6, type: "Meccan" },
];

export const HADITHS: Hadith[] = [
  {
    id: 1,
    text: "إنما الأعمال بالنيات",
    translationBn: "নিশ্চয়ই প্রতিটি কাজ নিয়তের ওপর নির্ভরশীল।",
    source: "বুখারী ও মুসলিম",
    category: "চরিত্র"
  },
  {
    id: 2,
    text: "খাইরুন্নাসি মান ইয়ানফাউন নাস",
    translationBn: "সর্বোত্তম মানুষ সে, যে মানুষের উপকার করে।",
    source: "তাবারানী",
    category: "দান"
  },
  {
    id: 3,
    text: "আস-সালাতু ইমাদুদ্দীন",
    translationBn: "নামাজ দ্বীনের স্তম্ভ।",
    source: "বায়হাকী",
    category: "নামাজ"
  }
];

export const DAILY_AYATS = [
  {
    surah: "আল-বাকারা",
    ayat: "১৫৩",
    text: "يا أيها الذين آمنوا استعينوا بالصبر والصلاة",
    translation: "হে মুমিনগণ! তোমরা ধৈর্য ও নামাজের মাধ্যমে সাহায্য প্রার্থনা কর।"
  },
  {
    surah: "আল-ইমরান",
    ayat: "১৩৯",
    text: "ولا تهنوا ولا تحزنوا وأنتم الأعلون ان كنتم مؤمنين",
    translation: "তোমরা হতাশ হয়ো না এবং দুঃখ করো না, তোমরাই বিজয়ী হবে যদি তোমরা মুমিন হও।"
  }
];
