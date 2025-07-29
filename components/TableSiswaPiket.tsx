import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface JadwalPiket {
  id: number;
  nama: string;
}

interface Props {
  data: JadwalPiket[];
}

export default function TabelSiswaPiket({data}: Props) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-muted dark:bg-muted/30">
          <TableHead className="font-semibold text-primary">Nama</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.nama}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
