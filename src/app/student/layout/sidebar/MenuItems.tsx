import {
  IconHome,IconScan
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/student",
  },
  {
    id: uniqueId(),
    title: "Scan QR",
    icon: IconScan,
    href: "/student/ui-components/scan",
  },

];

export default Menuitems;
