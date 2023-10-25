import {
  IconHome,IconAnalyze
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/teacher",
  },
  {
    id: uniqueId(),
    title: "Create QR Code",
    icon: IconAnalyze,
    href: "/teacher/ui-components/qrcreate",
  },

];

export default Menuitems;
