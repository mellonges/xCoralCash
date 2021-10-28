import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipComponent = ({id, t}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    id = id ? "Tooltip" + id : "Tooltip";

    return (
        <>
      <span  className="tooltip-trigger">
         text
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
