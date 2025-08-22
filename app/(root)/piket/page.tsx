import TabDaysPiket from "@/components/TabDaysPiket";
import {Metadata} from "next";

export const metadata: Metadata = {
  title: "Piket",
};

export default function PiketPage() {
  return (
    <div>
      <TabDaysPiket />
    </div>
  );
}
