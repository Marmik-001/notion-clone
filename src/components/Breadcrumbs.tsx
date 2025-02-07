"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function Breadcrumbs() {
  const pathname = usePathname();
  // current url = localhost:3000/doc/asdfasjhgeirioe

  const segments = pathname.split("/").filter(Boolean);
  console.log("segments", segments);

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {segments.map((segment, index) => {
            return (
              <div key={index} className="flex items-center justify-center px-2"
              >
                
                {index === segments.length - 1 ? <BreadcrumbPage>{segment}</BreadcrumbPage> : 
                 <BreadcrumbItem>
                 <BreadcrumbLink className="pr-2"  href={`/${segments.slice(0, index + 1).join("/")}`}>
                   {segment}
                 </BreadcrumbLink>
               </BreadcrumbItem>
               
               }
               
                {index !== segments.length - 1 ? <BreadcrumbSeparator /> : null}
                
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
export default Breadcrumbs;
