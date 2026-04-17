export type PrayerTime = {
  name: string;
  nameBn: string;
  time: string;
  id: string;
};

export type Surah = {
  id: number;
  name: string;
  nameBn: string;
  ayahs: number;
  type: 'Meccan' | 'Medinan';
};

export type Ayat = {
  surahId: number;
  verseId: number;
  text: string;
  translationBn: string;
};

export type Hadith = {
  id: number;
  text: string;
  translationBn: string;
  source: string;
  category: string;
};

export type AppState = 'home' | 'prayer' | 'quran' | 'hadith' | 'calendar' | 'ramadan' | 'tools' | 'reminder' | 'settings';
