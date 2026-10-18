import type { EventDetails } from "../types/invitation";

export const couple = {
  groom: "Febry",
  bride: "Sasha",
  displayName: "Febry & Sasha",
} as const;

export const wedding = {
  dateLabel: "30 MEI 2030",
  countdownTarget: new Date("2030-05-30T08:00:00+07:00").getTime(),
  venue: "Maldives",
  venueName: "Four Seasons Resort Maldives",
} as const;

export const eventDetails: EventDetails = {
  date: "Kamis, 30 Mei 2030",
  time: "08.00 WIB - Selesai",
  location: wedding.venue,
  address: wedding.venueName,
};

interface StoryChapter {
  number: string;
  title: string;
  subtitle?: string;
  text: string;
}

const storyChapters: readonly StoryChapter[] = [
  {
    number: "01",
    title: "Di Mana Semua Bermula",
    text: "Seolah telah ditulis oleh takdir, kami dipertemukan di tempat magang, tempat sebuah pertemuan sederhana tumbuh menjadi cinta yang membawa kami memilih satu sama lain.",
  },
  {
    number: "02",
    title: "Bertumbuh Bersama Waktu",
    text: "Hari demi hari, kami belajar memahami, menerima, dan mengenal satu sama lain lebih dalam, sembari menumbuhkan cinta yang terus menemukan alasan untuk bertahan.",
  },
  {
    number: "03",
    title: "Menuju Janji Selamanya",
    subtitle: "Mengikat janji",
    text: "Pada 1 Januari 2030, dua keluarga dipertemukan dalam hangatnya restu dan kebahagiaan, menyepakati langkah kami untuk mengikat cinta dalam sebuah janji selamanya.",
  },
];

export const story = {
  eyebrow: "Every love has story,",
  heading: "And this is how our love grew💗",
  chapters: storyChapters,
};
