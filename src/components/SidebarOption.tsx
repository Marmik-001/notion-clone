"use client";
import { doc } from "firebase/firestore";
import Link from "next/link";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { db } from "../../firebase";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const SidebarOption = ({ href, id }: { href: string; id: string }) => {


    const [data , loading , error] = useDocumentData(doc(db , "documents" , id));
    const pathName = usePathname();
    const isActive = href.includes(pathName) && pathName !== "/";

    if(!data) return null;

  return (
    <Link  href={href}>
    <Button className={`relative border w-full hover:bg-slate-300  p-2 rounded-md ${isActive ? "bg-white font-semibold text-black border-black shadow-2xl" : "text-slate-300 hover:bg-black hover:text-white"}`}>
      <p  className="truncate">{data?.title}</p>
    </Button>
    </Link> 
  );
};
export default SidebarOption;
