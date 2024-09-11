import { useState } from "react";

import "./menu-catalog.scss";
import { NavLink } from "react-router-dom";

export const MenuCatalog = ({ className, children, list }) => {
  const [active, setActive] = useState(false);

  return (
    <li
      onMouseLeave={() => setActive(false)}
      onMouseEnter={() => setActive(true)}
      className={className}
    >
      {children}
      {active && (
        <ul className={`${className}-activeList`}>
          {list.map((el) => (
            <li className={`${className}-activeItem`}>
              <NavLink to={`/${el.path}`}>{el.name}</NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};
