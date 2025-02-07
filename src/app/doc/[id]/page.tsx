"use client";
import Document from "@/components/Document";
import { doc } from "firebase/firestore";
import { useParams } from "next/navigation";
import { use } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../../../firebase";
const DcoumentPage = () => {
  // console.log('id', id);
  const id = useParams().id as string;
  const [data, loading, error ] = useDocumentData(doc(db, "documents", id));
  return (
    <div className="flex flex-col w-full min-h-screen flex-1">
      Dcoument : {data?.title}
      <Document id={id} />
    </div>
  );
};
export default DcoumentPage;
