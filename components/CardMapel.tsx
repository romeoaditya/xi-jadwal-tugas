import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {Clock} from "lucide-react";

interface Jadwal {
  id: number;
  nama: string;
  waktu: string;
}

interface Props {
  data: Jadwal[];
}

export default function CarMapel({data}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted dark:bg-muted/30">
          <TableHead className="font-semibold text-primary">
            Mata Pelajaran
          </TableHead>
          <TableHead className="font-semibold text-primary">Waktu</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            className={
              item.nama.toLowerCase() === "istirahat"
                ? "bg-indigo-100 dark:bg-yellow-900/30 font-semibold"
                : ""
            }
          >
            <TableCell
              className={`font-medium ${
                item.nama.toLowerCase() === "istirahat" ? "font-semibold" : ""
              }`}
            >
              {item.nama}
            </TableCell>
            <TableCell className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              {item.waktu}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
