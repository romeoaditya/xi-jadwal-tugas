"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {jadwalPiket} from "@/data/jadwalPiket";
import {motion} from "framer-motion";
import {useState} from "react";
import TabelSiswaPiket from "./TableSiswaPiket";

export default function TabDaysPiket() {
  const days = [
    {key: "senin", label: "Senin"},
    {key: "selasa", label: "Selasa"},
    {key: "rabu", label: "Rabu"},
    {key: "kamis", label: "Kamis"},
    {key: "jumat", label: "Jumat"},
  ];

  const [selectedTab, setSelectedTab] = useState("senin");

  return (
    <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
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
          {/* Hanya animasikan konten yang sedang aktif */}
          {selectedTab === day.key ? (
            <motion.div
              key={day.key}
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              exit={{opacity: 0, y: -10}}
              transition={{duration: 0.2}}
            >
              <TabelSiswaPiket
                data={jadwalPiket[day.key as keyof typeof jadwalPiket]}
              />
            </motion.div>
          ) : (
            // Render kosong agar tidak lompat layout
            <div className="invisible h-0 overflow-hidden"></div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
