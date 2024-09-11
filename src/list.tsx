import { CgMenuGridO } from "react-icons/cg";
import { ImHome } from "react-icons/im";
import { FaCar } from "react-icons/fa";

export const MenuListArray = [
  {
    id: 1,
    title: "Все",
    list: [
      { name: "Транспорт", path: "cars" },
      { name: "Недвижимость", path: "building" },
      { name: "Электроника", path: "electronic" },
    ],
    icon: <CgMenuGridO />,
  },
  {
    id: 2,
    title: "Транспорт",
    list: [
      { name: "Автомобили", path: "avto" },
      { name: "Запчасти", path: "spare" },
      { name: "Шины", path: "tires" },
    ],
    icon: <FaCar />,
  },
  {
    id: 3,
    title: "Недвижимость",
    list: [
      { name: "Квартиры", path: "flats" },
      { name: "Дома", path: "homes" },
      { name: "Участки", path: "area" },
    ],
    icon: <ImHome />,
  },
];
