"use client"

import { useMemo, useState, useEffect } from "react";

export default function Button(props: {
    className?: string,
    children?: any,
    onClick?: () => void,
    disabled?: boolean
}) {
    const { className, children, onClick, disabled } = props;
    const initSanitizedClassName = `flex flex-row justify-center rounded-full py-2 cursor-pointer ${className}`;
    const [sanitizedClassName, setSanitizedClassName] = useState(initSanitizedClassName);

    function handleClick(isBtnEnabled: boolean = false) {
        if(!isBtnEnabled && onClick) onClick();
    }
    
    useMemo(() => {
        if(disabled) {
            setSanitizedClassName(`${sanitizedClassName.replace("cursor-pointer", "cursor-not-allowed")} opacity-25`);
        } else {
            setSanitizedClassName(initSanitizedClassName);
        }
    }, [disabled]);

    useEffect(() => {
        if(disabled) {
            setSanitizedClassName(`${sanitizedClassName.replace("cursor-pointer", "cursor-not-allowed")} opacity-25`);
        } else {
            setSanitizedClassName(initSanitizedClassName);
        }
    }, [disabled]);

    return (
        <div className={sanitizedClassName} onClick={() => handleClick(disabled)}>
            {children}
        </div>
    )
}