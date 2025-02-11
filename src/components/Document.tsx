"use client";
import { useEffect, useState, useTransition } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { log } from "console";
import CollabrativeEditor from "./CollabrativeEditor";
const Document = ({ id }: { id: string }) => {
  const [data, loading, error] = useDocumentData(doc(db, "documents", id));

  const [input, setInput] = useState<string>("");

  // const [isPending, startTransition] = useTransition();
  const [isUpdating , setIsUpdating] = useState(false)
  
  useEffect(() => {
    if (!data) return;

    // console.log('data : ',data)
    setInput(data.title);
  }, [data]);

  const updateTitle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (input.trim() === "") return;
    // if (input.trim()) {

    //   await updateDoc(doc(db, "documents", id), {
    //     title: input,
    //   });
    // }
    try {
      setIsUpdating(true)
      await updateDoc(doc(db, "documents", id), {
        title: input,
      });
      setIsUpdating(false)
    } catch (error) {
      setIsUpdating(false)
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-4 "> 
        {/* update the document title and ifOwner delete document , invite users(editors) */}
        <form className="flex justify-center"  onSubmit={updateTitle}>
          <div className="max-w-6xl w-full  flex gap-2 flex-row p-10  ">
          <Input value={input} className=" border-2 border-gray-600" onChange={(e) => setInput(e.target.value)} />
          <Button disabled={isUpdating} type="submit"className="">
            {isUpdating ? "Updating" : "Update"}
          </Button>
          </div>
        </form>
      </div>
      <div>{/* manage users  , avatars  */}</div>
      <div>
        {/* collabrative editor */}
        <CollabrativeEditor />
        </div>
    </div>
  );
};
export default Document;
