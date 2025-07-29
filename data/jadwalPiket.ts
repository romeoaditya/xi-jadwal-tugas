// data/jadwal.ts

let idCounter = 1;

function generateJadwal(data: {nama: string}[][]) {
  return data.map((hari) =>
    hari.map((item) => ({
      id: idCounter++,
      ...item,
    }))
  );
}

const [senin, selasa, rabu, kamis, jumat] = generateJadwal([
  [
    {nama: "M.Fahril"},
    {nama: "Romeo Aditya"},
    {nama: "M.Kevin Febrian"},
    {nama: "M.Arai Saputra"},
  ],
  [
    {nama: "Ahmad Zaky"},
    {nama: "Deyxdoro M.A"},
    {nama: "Yandhi Novian"},
    {nama: "M.Rizky Aditya"},
    {nama: "Haqqi Nur Fajri"},
  ],
  [
    {nama: "Fajar Febriansyah"},
    {nama: "Erlangga Wibisono"},
    {nama: "Azhar Dwi Prasetya"},
    {nama: "Abeeyasa Tirta W.B"},
  ],
  [
    {nama: "Ristrian Satrio Wibowo"},
    {nama: "Syahdan Rifa'iq"},
    {nama: "Kayra Sahadewa"},
    {nama: "Kiara Lutfiani"},
    {nama: "Sabrina"},
  ],
  [
    {nama: "Wahid Ilhamsyah"},
    {nama: "Satria Iqra"},
    {nama: "Altamis Azzam"},
    {nama: "Azka"},
    {nama: "Ihsan Pratama"},
  ],
]);

export const jadwalPiket = {
  senin,
  selasa,
  rabu,
  kamis,
  jumat,
};
