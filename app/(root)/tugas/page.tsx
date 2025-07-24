"use client";

import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Calendar} from "@/components/ui/calendar";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon, Plus, Trash2, Pencil} from "lucide-react";
import {format} from "date-fns";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea";
import {supabase} from "@/lib/supabase";

interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
}

export default function TugasPage() {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterDay, setFilterDay] = useState<string | undefined>();
  const [filterDate, setFilterDate] = useState<Date | undefined>();
  const [sheetOpen, setSheetOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState<Date | undefined>();

  const [editMode, setEditMode] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const {data, error} = await supabase
        .from("tugas")
        .select("*")
        .order("date", {ascending: true});

      if (error) {
        toast.error("Gagal mengambil data dari Supabase.");
        console.error(error);
      } else {
        setTasks(data as Task[]);
      }
    };

    fetchTasks();
  }, []);

  const resetForm = () => {
    setTitle("");
    setDesc("");
    setDate(undefined);
    setEditMode(false);
    setEditingTaskId(null);
  };

  const handleAddOrEdit = async () => {
    if (!title || !date) {
      toast.error("Judul dan tanggal harus diisi.");
      return;
    }

    if (editMode && editingTaskId) {
      const {error} = await supabase
        .from("tugas")
        .update({
          title,
          description: desc,
          date: date.toISOString().slice(0, 10), // format YYYY-MM-DD
        })
        .eq("id", editingTaskId);

      if (error) {
        toast.error("Gagal mengedit tugas.");
        return;
      }

      toast.success("Tugas berhasil diperbarui.");
    } else {
      const {error} = await supabase.from("tugas").insert({
        title,
        description: desc,
        date: date.toISOString().slice(0, 10),
      });

      if (error) {
        toast.error("Gagal menambahkan tugas.");
        return;
      }

      toast.success("Tugas ditambahkan!");
    }

    // Refresh tasks
    const {data} = await supabase.from("tugas").select("*");
    setTasks(data || []);

    resetForm();
    setSheetOpen(false);
  };

  const handleDelete = async (id: string) => {
    const {error} = await supabase.from("tugas").delete().eq("id", id);
    if (error) {
      toast.error("Gagal menghapus tugas.");
      return;
    }

    const {data} = await supabase.from("tugas").select("*");
    setTasks(data || []);

    toast.success("Tugas berhasil dihapus.");
  };

  const handleEdit = (task: Task) => {
    setTitle(task.title);
    setDesc(task.description);
    setDate(new Date(task.date));
    setEditMode(true);
    setEditingTaskId(task.id);
    setSheetOpen(true);
  };

  const getDayName = (dateStr: string) => {
    const date = new Date(dateStr);
    return format(date, "EEEE");
  };

  const filteredTasks = tasks.filter((t) => {
    const taskDate = new Date(t.date);

    const matchDate = filterDate
      ? taskDate.toDateString() === filterDate.toDateString()
      : true;

    const matchDay = filterDay ? getDayName(t.date) === filterDay : true;

    return matchDate && matchDay;
  });

  return (
    <div className="w-full px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-bold">Daftar Tugas</h1>
        <div className="flex gap-2 flex-wrap">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="text-sm">
                <CalendarIcon className="w-4 h-4 mr-2" />
                {filterDate
                  ? format(filterDate, "dd MMM yyyy")
                  : "Pilih Tanggal"}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-auto p-0">
              <Calendar
                mode="single"
                selected={filterDate}
                onSelect={setFilterDate}
              />
            </PopoverContent>
          </Popover>
          <select
            className="text-sm border rounded-md px-3 py-2"
            value={filterDay || ""}
            onChange={(e) => setFilterDay(e.target.value || undefined)}
          >
            <option value="">Semua Hari</option>
            <option value="Monday">Senin</option>
            <option value="Tuesday">Selasa</option>
            <option value="Wednesday">Rabu</option>
            <option value="Thursday">Kamis</option>
            <option value="Friday">Jumat</option>
            <option value="Saturday">Sabtu</option>
            <option value="Sunday">Minggu</option>
          </select>

          <Sheet
            open={sheetOpen}
            onOpenChange={(open) => {
              setSheetOpen(open);
              if (!open) resetForm();
            }}
          >
            <SheetTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" /> Tambah Tugas
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  {editMode ? "Edit Tugas" : "Tambah Tugas"}
                </SheetTitle>
              </SheetHeader>
              <div className="grid flex-1 auto-rows-min gap-6 px-4">
                <Input
                  placeholder="Judul tugas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Deskripsi (opsional)"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
                <Calendar mode="single" selected={date} onSelect={setDate} />
                <Button onClick={handleAddOrEdit} className="w-full">
                  {editMode ? "Simpan Perubahan" : "Simpan"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Tabel Tugas */}
      {filteredTasks.length === 0 ? (
        <p className="text-muted-foreground mt-16">
          Tidak ada tugas yang ditemukan.
        </p>
      ) : (
        <div className="w-full overflow-auto border rounded-lg">
          <table className="w-full text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="text-left px-4 py-2 w-1/4">Judul</th>
                <th className="text-left px-4 py-2 w-2/5">Deskripsi</th>
                <th className="text-left px-4 py-2 w-1/5">Tanggal</th>
                <th className="text-left px-4 py-2 w-1/6">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="px-4 py-2">{task.title}</td>
                  <td className="px-4 py-2">{task.description || "-"}</td>
                  <td className="px-4 py-2">
                    {format(new Date(task.date), "dd MMMM yyyy")}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(task)}
                    >
                      <Pencil className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setConfirmDeleteId(task.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Dialog
            open={!!confirmDeleteId}
            onOpenChange={() => setConfirmDeleteId(null)}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Konfirmasi Hapus</DialogTitle>
              </DialogHeader>
              <p>Apakah kamu yakin ingin menghapus tugas ini?</p>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setConfirmDeleteId(null)}
                >
                  Batal
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(confirmDeleteId!);
                    setConfirmDeleteId(null);
                  }}
                >
                  Hapus
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
}
