import classnames from "classnames";

import "./container-layout.scss";

export const ContainerLayout = ({ className, children }) => (
  <div className={classnames("container", className)}>{children}</div>
);
