import React, { useState } from "react";
import { Tooltip } from "reactstrap";

const TooltipComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);
    return (
        <>
      <span  className="tooltip-trigger">
        {/*{tooltipTrigger}*/}
          test
      </span>
            <Tooltip
                placement="top-start"
                isOpen={isOpen}
                toggle={toggle}
            >
                text
            </Tooltip>
        </>
    );
};

export default TooltipComponent;