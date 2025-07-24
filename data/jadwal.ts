// data/jadwal.ts

let idCounter = 1;

function generateJadwal(data: {nama: string; waktu: string}[][]) {
  return data.map((hari) =>
    hari.map((item) => ({
      id: idCounter++,
      ...item,
    }))
  );
}

const [senin, selasa, rabu, kamis, jumat] = generateJadwal([
  [
    {nama: "Matematika", waktu: "07.10 - 07.50"},
    {nama: "Matematika", waktu: "07.50 - 08.30"},
    {nama: "Pendidikan Kewarganegaraan", waktu: "08.30 - 09.10"},
    {nama: "Istirahat", waktu: "09.10 - 09.55"},
    {nama: "Pendidikan Kewarganegaraan", waktu: "09.55 - 10.35"},
    {nama: "Matematika", waktu: "10.35 - 11.15"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "11.15 - 11.55"},
    {nama: "Istirahat", waktu: "11.55 - 12.55"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "12.55 - 13.35"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "13.35 - 14.15"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "14.15 - 14.55"},
  ],
  [
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "06.30 - 07.10"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "07.10 - 07.50"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "07.50 - 08.30"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "08.30 - 09.10"},
    {nama: "Istirahat", waktu: "09.10 - 09.55"},
    {nama: "Bahasa Indonesia", waktu: "09.55 - 10.35"},
    {nama: "Bahasa Indonesia", waktu: "10.35 - 11.15"},
    {nama: "Bahasa Indonesia", waktu: "11.15 - 11.55"},
    {nama: "Istirahat", waktu: "11.55 - 12.55"},
    {nama: "Pendidikan Agama Islam (PAI)", waktu: "12.55 - 13.35"},
    {nama: "Projek Kreatif dan Kewirausahaan (PKK)", waktu: "13.35 - 14.15"},
    {nama: "Projek Kreatif dan Kewirausahaan (PKK)", waktu: "14.15 - 14.55"},
  ],
  [
    {nama: "Bahasa Jepang", waktu: "06.00 - 07.10"},
    {nama: "Bahasa Jepang", waktu: "07.10 - 07.50"},
    {nama: "Komunikasi Kerja", waktu: "07.50 - 08.30"},
    {nama: "Komunikasi Kerja", waktu: "08.30 - 09.10"},
    {nama: "Istirahat", waktu: "09.10 - 09.55"},
    {nama: "Bahasa Inggris", waktu: "09.55 - 10.35"},
    {nama: "Bahasa Inggris", waktu: "10.35 - 11.15"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "11.15 - 11.55"},
    {nama: "Istirahat", waktu: "11.55 - 12.55"},
    {nama: "Rekayasa Perangkat Lunak (RPL)", waktu: "12.55 - 13.35"},
    {nama: "Projek Kreatif dan Kewirausahaan (PKK)", waktu: "13.35 - 14.15"},
    {nama: "Projek Kreatif dan Kewirausahaan (PKK)", waktu: "14.15 - 14.55"},
  ],
  [
    {nama: "Pendidikan Agama Islam (PAI)", waktu: "06.30 - 07.10"},
    {nama: "Pendidikan Agama Islam (PAI)", waktu: "07.10 - 07.50"},
    {nama: "Projek Kreatif dan Kewirausahaan (PKK)", waktu: "07.50 - 08.30"},
    {nama: "Projek Kreatif dan Kewirausahaan (PKK)", waktu: "08.30 - 09.10"},
    {nama: "Istirahat", waktu: "09.10 - 09.55"},
    {nama: "Bahasa Inggris", waktu: "09.55 - 10.35"},
    {nama: "Bahasa Inggris", waktu: "10.35 - 11.15"},
    {nama: "Sejarah", waktu: "11.15 - 11.55"},
    {nama: "Istirahat", waktu: "11.55 - 12.55"},
    {nama: "Sejarah", waktu: "12.55 - 13.35"},
    {nama: "Komunikasi Kerja", waktu: "13.35 - 14.15"},
    {nama: "Komunikasi Kerja", waktu: "14.15 - 14.55"},
  ],
  [
    {nama: "Desain Antarmuka", waktu: "07.50 - 08.30"},
    {nama: "Desain Antarmuka", waktu: "08.30 - 09.10"},
    {nama: "Istirahat", waktu: "09.10 - 09.55"},
    {nama: "Desain Antarmuka", waktu: "09.55 - 10.35"},
    {nama: "Desain Antarmuka", waktu: "10.35 - 11.15"},
  ],
]);

export const jadwalMapel = {
  senin,
  selasa,
  rabu,
  kamis,
  jumat,
};
