import React, { useState } from "react";
import { Tooltip } from "reactstrap";
import shortid from "shortid";

const TooltipComponent = ({ tooltipTrigger, tooltTipContent, id }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  id = id ? "Tooltip" + id : "Tooltip";

  return (
    <>
      <span id={id} className="tooltip-trigger">
        {tooltipTrigger}
      </span>
      <Tooltip
        placement="top-start"
        isOpen={isOpen}
        target={id}
        toggle={toggle}
      >
        {tooltTipContent}
      </Tooltip>
    </>
  );
};

export default TooltipComponent;
