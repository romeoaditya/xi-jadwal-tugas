import {supabase} from "../supabase";

export async function tambahTugas({
  judul,
  deskripsi,
  tanggal,
}: {
  judul: string;
  deskripsi: string;
  tanggal: string; // format YYYY-MM-DD
}) {
  const hari = new Date(tanggal).toLocaleDateString("id-ID", {weekday: "long"});

  const {data, error} = await supabase.from("tugas").insert([
    {
      judul,
      deskripsi,
      tanggal,
      hari: hari.toLowerCase(), // simpan dalam format seperti 'senin', 'selasa'
    },
  ]);

  if (error) throw error;
  return data;
}
