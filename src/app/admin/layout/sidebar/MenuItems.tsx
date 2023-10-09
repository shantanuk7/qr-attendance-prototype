import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser,IconUserPlus
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconHome,
    href: "/admin",
  },
  {
    id: uniqueId(),
    title: "Teacher Management",
    icon: IconUser,
    href: "/admin/ui-components/teacher-management",
    
  },
  {
    id: uniqueId(),
    title: "Add Teacher",
    icon: IconTable,
    href: "/admin/ui-components/forms",
  },
  {
    id: uniqueId(),
    title: "Add Students",
    icon: IconUserPlus,
    href: "/admin/ui-components/addstudents",
  },

];

export default Menuitems;
