"use client";
import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.bubble.css";

interface DescriptionInterfaceProps {
  description: string;
}

export default function Descriptioncard({
  description,
}: DescriptionInterfaceProps) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className=" text-sm mb-4">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    );
  }
  return (
    <div className=" m-5 mb-10">
      <ReactQuill value={description} readOnly={true} theme="bubble" />
    </div>
  );
}
