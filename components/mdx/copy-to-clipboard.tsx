"use client";

import clsx from "clsx";
import { ReactNode, useRef, useState } from "react";

interface ICopyToClipboard {
  children: ReactNode;
}

const CheckSVG = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
  />
);

const CopySVG = () => (
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
  />
);

export const CopyToClipboard: React.FC<ICopyToClipboard> = ({ children }) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    setCopied(true);
    if (textInput.current !== null && textInput.current.textContent !== null)
      navigator.clipboard.writeText(textInput.current.textContent);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div ref={textInput} className="code-block relative">
      <div className="group">
      <button
        aria-label="Copy code"
        type="button"
        className={clsx(
          "absolute right-2 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800",
          {
            "border-green-400 focus:border-green-400 focus:outline-none":
              copied,
            "group-hover:border-gray-300 border-slate-500": !copied,
          }
        )}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className={
            copied ? "text-green-400" : "text-slate-500 group-hover:text-gray-300"
          }
        >
          {copied ? <CheckSVG /> : <CopySVG />}
        </svg>
      </button>
      </div>

      {children}
    </div>
  );
};
