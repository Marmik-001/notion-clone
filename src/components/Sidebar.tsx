"use client";
import { MenuIcon } from "lucide-react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewDocumentButton from "./NewDocumentButton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { useUser } from "@clerk/nextjs";
import {
  collectionGroup,
  DocumentData,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";
import { log } from "console";

//types

interface RoomDocument extends DocumentData {
  createdAt: String;
  role: "owner" | "editor";
  roomId: string; // if error changed romId to roomId
  userId: string;
}

function Sidebar() {
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });
  const menuOptions = (
    <>
      <NewDocumentButton />

      {/* my documents */}
      <div className="flex py-4 flex-col space-y-4   lg:max-w-36 overflow-x-clip">
        {groupedData.owner.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            {" "}
            No Document Found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 py-2  font-semibold text-sm">
              My Documents
            </h2>
            {groupedData.owner.map((doc) => (
              // <p key={doc.roomId}>{doc.roomId}</p>
              <SidebarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id} />
            ))}
          </>
        )}
      </div>

      {/* shared wth me */}

      <div className="flex py-4 flex-col space-y-4 md:max-w-36 overflow-x-clip">
        {groupedData.editor.length === 0 ? (
          <h2 className="text-gray-500 font-semibold text-sm">
            {" "}
            No Document Found
          </h2>
        ) : (
          <>
            <h2 className="text-gray-500 py-2  font-semibold text-sm">
              Shared with me
            </h2>
            {groupedData.editor.map((doc) => (
              // <p key={doc.roomId}>{doc.roomId}</p>
              <SidebarOption key={doc.id} href={`/doc/${doc.id}`} id={doc.id} />
            ))}
          </>
        )}
      </div>
      {/* list */}
    </>
  );
  const { user } = useUser();
  
  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return;
    console.log(data.docs);
    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, current) => {
        const roomData = current.data() as RoomDocument;
        if (roomData.role === "owner") {
          acc.owner.push({
            id: current.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: current.id,
            ...roomData,
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );
    setGroupedData(grouped);
  }, [data]);

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative ">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon
              size={40}
              className="p-2 text-gray-700 hover:text-black rounded-lg"
            />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <div className="flex flex-col">
                {/* options */}
                {menuOptions}
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline">{menuOptions}</div>
    </div>
  );
}
export default Sidebar;
