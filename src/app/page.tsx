import { Button } from "@/components/ui/button";
import { ArrowLeftCircle } from "lucide-react";
export default function Home() {
  return (
   
      <main className="">
        <div className="flex gap-4 pt-2">

        <ArrowLeftCircle size={32} className="animate-bounce " />
       <h1 className="text-2xl pl-4">Welcome!</h1>
        </div>
       
      <div>
        {/* <Button>Button</Button> */}
        
      </div>
      </main>
     
  );
}
