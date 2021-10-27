import React, { useState } from 'react';
import { Tooltip } from 'reactstrap';

const NewToolTip = (props) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const toggle = () => setTooltipOpen(!tooltipOpen);

    return (
        <div>
             <span className="tooltip-trigger">?</span>
            <Tooltip placement="top-start" isOpen={tooltipOpen} target="DisabledAutoHideExample" toggle={toggle}>
                text test
            </Tooltip>
        </div>
    );
}

export default NewToolTip;