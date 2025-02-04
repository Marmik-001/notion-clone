"use client";
import Document from "@/components/Document";
import { useParams } from "next/navigation";
import { use } from "react";
const DcoumentPage = () => {
  // console.log('id', id);
  const id = useParams().id as string;
  return (
    <div className="flex flex-col w-full min-h-screen flex-1">
      Dcoument : {id}
      <Document id={id} />
    </div>
  );
};
export default DcoumentPage;
