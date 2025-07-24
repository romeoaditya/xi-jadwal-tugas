import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {jadwalMapel} from "@/data/jadwal";
import CardMapel from "./CardMapel";

export default function TabDays() {
  const days = [
    {key: "senin", label: "Senin"},
    {key: "selasa", label: "Selasa"},
    {key: "rabu", label: "Rabu"},
    {key: "kamis", label: "Kamis"},
    {key: "jumat", label: "Jumat"},
  ];

  return (
    <Tabs defaultValue="senin" className="w-full">
      <TabsList className="bg-transparent flex-wrap">
        {days.map((day) => (
          <TabsTrigger
            key={day.key}
            value={day.key}
            className="data-[state=active]:bg-muted data-[state=active]:shadow-none"
          >
            {day.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {days.map((day) => (
        <TabsContent key={day.key} value={day.key} className="px-4 pt-4">
          <CardMapel data={jadwalMapel[day.key as keyof typeof jadwalMapel]} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
