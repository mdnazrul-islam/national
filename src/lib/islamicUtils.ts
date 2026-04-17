/**
 * Simplified Islamic Utilities for Offline Use
 */

export const getHijriDate = (date: Date) => {
  // A very simplified Hijri calculation for demo purposes
  // In a real app, one would use Intl.DateTimeFormat with 'islamic' calendar if available
  try {
    const formatter = new Intl.DateTimeFormat('bn-BD-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
    return formatter.format(date);
  } catch (e) {
    return "১১ শাওয়াল, ১৪৪৭"; // Fallback
  }
};

export const getBengaliDate = (date: Date) => {
  const formatter = new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatter.format(date);
};

export const getPrayerTimes = (city: string = "Dhaka") => {
  // Mock prayer times for Dhaka (April approximate)
  // In production, use adhan library or precise astronomical formulas
  return [
    { id: 'fajr', name: 'Fajr', nameBn: 'ফজর', time: '০৪:২৫' },
    { id: 'sunrise', name: 'Sunrise', nameBn: 'সূর্যোদয়', time: '০৫:৪০' },
    { id: 'dhuhr', name: 'Dhuhr', nameBn: 'যোহর', time: '১২:০৫' },
    { id: 'asr', name: 'Asr', nameBn: 'আসর', time: '০৪:৩০' },
    { id: 'maghrib', name: 'Maghrib', nameBn: 'মাগরিব', time: '০৬:২৫' },
    { id: 'isha', name: 'Isha', nameBn: 'এশা', time: '০৭:৪৫' },
    { id: 'tahajjud', name: 'Tahajjud', nameBn: 'তাহাজ্জুদ', time: '০২:৩০' },
  ];
};

export const getNextPrayer = (times: any[]) => {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
  for (const prayer of times) {
    if (prayer.id === 'sunrise') continue;
    const [h, m] = prayer.time.split(':').map((s: string) => {
      // Handle Bengali numbers for parsing if necessary, 
      // but here we use standard digits for logic
      const bnMap: any = {'০': '0', '১': '1', '২': '2', '৩': '3', '৪': '4', '৫': '5', '৬': '6', '৭': '7', '৮': '8', '৯': '9'};
      const englishTime = s.split('').map(char => bnMap[char] || char).join('');
      return parseInt(englishTime);
    });
    const prayerMinutes = h * 60 + m;
    
    if (prayerMinutes > currentMinutes) {
      return prayer;
    }
  }
  return times[0]; // If all passed, next is Fajr tomorrow
};
