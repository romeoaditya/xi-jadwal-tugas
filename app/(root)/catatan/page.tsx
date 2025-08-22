"use client";

import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {format, set} from "date-fns";
import {Plus, Download, Trash2, PlusIcon} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {Calendar} from "@/components/ui/calendar";
import {Metadata} from "next";

interface Note {
  id: string;
  type: "text" | "image";
  description: string;
  date: string;
  content: string;
}

export default function CatatanPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  const [textInput, setTextInput] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch notes
  const fetchNotes = async () => {
    const {data, error} = await supabase
      .from("catatan")
      .select("*")
      .order("created_at", {ascending: false});
    if (error) toast.error("Gagal mengambil data catatan.");
    else setNotes(data as Note[]);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const resetForm = () => {
    setTextInput("");
    setDesc("");
    setDate(undefined);
  };
  const handleAddNote = async () => {
    // Upload gambar kalau ada
    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;
      const filePath = `catatan/${fileName}`;

      const {error: uploadError} = await supabase.storage
        .from("catatan-media")
        .upload(filePath, imageFile);

      if (uploadError) {
        toast.error("Gagal mengunggah gambar.");
        return;
      }
      if (!date) {
        toast.error("Silakan pilih tanggal terlebih dahulu.");
        return;
      }
      const formattedDate = format(date, "yyyy-MM-dd");

      const {data: publicUrlData} = supabase.storage
        .from("catatan-media")
        .getPublicUrl(filePath);

      if (publicUrlData?.publicUrl) {
        const {error: insertError} = await supabase.from("catatan").insert({
          type: "image",
          content: publicUrlData.publicUrl,
          description: desc.trim(),
          date: formattedDate,
        });

        if (insertError) {
          toast.error("Gagal menyimpan catatan gambar.");
          console.log(insertError);
          return;
        }

        toast.success("Catatan gambar ditambahkan!");
        setImageFile(null);
        resetForm();
        setSheetOpen(false);
        fetchNotes();
        return;
      }
    }

    // Kalau gaada gambar, cek teks
    if (textInput.trim()) {
      const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
      const {error} = await supabase.from("catatan").insert({
        type: "text",
        content: textInput.trim(),
        description: desc.trim(),
        date: formattedDate,
      });

      if (error) {
        toast.error("Gagal menyimpan catatan teks.");
        console.log(error);
        return;
      }

      toast.success("Catatan teks ditambahkan!");
      resetForm();
      setSheetOpen(false);
      fetchNotes();
      return;
    }

    toast.error("Isi teks atau unggah gambar terlebih dahulu.");
  };

  const handleDeleteNote = async (id: string) => {
    const {error} = await supabase.from("catatan").delete().eq("id", id);
    if (error) toast.error("Gagal menghapus catatan.");
    else {
      toast.success("Catatan dihapus.");
      setDialogOpen(false);
      location.reload();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Catatan</h1>

      {/* Form Tambah Catatan */}
      <Sheet
        open={sheetOpen}
        onOpenChange={(open) => {
          setSheetOpen(open);
        }}
      >
        <SheetTrigger asChild>
          <Button variant="default">
            <PlusIcon className="mr-2 h-4 w-4" /> Tambah Catatan
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Tambah Catatan</SheetTitle>
          </SheetHeader>

          <div className="grid flex-1 auto-rows-min gap-6 px-4">
            <Textarea
              placeholder="Tulis catatan (kosongkan jika mengunggah gambar)."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />

            <Input
              placeholder="Deskripsi / Mapel (opsional)"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
            {/* <Input
              type="date"
              value={date?.toISOString().split("T")[0] || ""}
              onChange={(e) => setDate(new Date(e.target.value))}
            /> */}
            <Calendar mode="single" selected={date} onSelect={setDate} />

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            <Button onClick={handleAddNote}>
              <Plus className="w-4 h-4 mr-1" />
              Tambah
            </Button>
          </div>
        </SheetContent>
      </Sheet>
      <div className="flex flex-col md:flex-row items-center gap-2">
        {/* Filter Hari */}

        {/* Filter Tanggal */}

        {/* Filter Tipe */}

        {/* Tombol Reset */}
      </div>

      {/* Catatan Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card
            key={note.id}
            onClick={() => {
              setSelectedNote(note);
              setDialogOpen(true);
            }}
            className="cursor-pointer hover:shadow-md transition"
          >
            <CardContent className="p-4">
              {note.type === "text" ? (
                <p className="truncate text-sm text-muted-foreground">
                  {note.content}
                </p>
              ) : (
                <div className="w-full h-40 overflow-hidden rounded">
                  <img
                    src={note.content}
                    alt="catatan-gambar"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
              <p className="mt-2 text-sm">{note.description}</p>
              <p className="text-xs text-muted-foreground mt-2">
                {format(new Date(note.date), "dd MMMM yyyy")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dialog Detail */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detail Catatan</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedNote?.type === "text" ? (
              <p className="whitespace-pre-wrap">{selectedNote.content}</p>
            ) : (
              <img
                src={selectedNote?.content}
                alt="catatan"
                className="w-full rounded"
              />
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <Button
              variant="destructive"
              onClick={() => handleDeleteNote(selectedNote!.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Hapus
            </Button>
            {selectedNote?.type === "image" && (
              <Button
                variant="outline"
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = selectedNote.content;
                  link.download = "catatan.jpg";
                  link.click();
                }}
              >
                <Download className="w-4 h-4 mr-1" /> Download
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
