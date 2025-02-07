"use client";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNewDocument } from "../../actions/actions";
function NewDocumentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  // const handleCreateNewDocument = () => {
  //   startTransition(async () => {
  //     //create new doc
  //     const { docId } = await createNewDocument();
  //     router.push(`/doc/${docId}`);
  //   });
  // };
  const handleCreateNewDocument = async () => {
    const { docId } = await createNewDocument();
    startTransition(() => {
      router.push(`/doc/${docId}`); // ✅ No async inside useTransition()
    });
  };
  return (
    <Button onClick={handleCreateNewDocument} disabled={isPending}>
      {isPending ? "Creating" : "New Document"}{" "}
    </Button>
  );
}
export default NewDocumentButton;
