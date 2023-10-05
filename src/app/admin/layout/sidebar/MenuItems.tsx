import {
  IconBoxMultiple, IconCircleDot, IconHome, IconInfoCircle, IconLayout, IconLayoutGrid, IconPhoto, IconPoint, IconStar, IconTable, IconUser
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
    href: "/admin/ui-components/buttons",
    
  },
  {
    id: uniqueId(),
    title: "Add Students",
    icon: IconTable,
    href: "/admin/ui-components/forms",
  },
  {
    id: uniqueId(),
    title: "Alerts",
    icon: IconInfoCircle,
    href: "/admin/ui-components/alerts",
  },
  // {
  //   id: uniqueId(),
  //   title: "Ratings",
  //   icon: IconStar,
  //   href: "/admin/ui-components/ratings",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Images",
  //   icon: IconPhoto,
  //   href: "/admin/ui-components/images",
  // },
  {
    id: uniqueId(),
    title: "Calender",
    icon: IconCircleDot,
    href: "/admin/ui-components/pagination",
  },
  {
    id: uniqueId(),
    title: "Overview",
    icon: IconLayoutGrid,
    href: "/admin/ui-components/table",
  },
];

export default Menuitems;
