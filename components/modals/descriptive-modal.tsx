"use client";
import { useBusiness } from "@/app/context/business";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Brain, Loader2Icon, Send } from "lucide-react";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function DescriptiveModal() {
  const {
    openDescriptiveModal,
    setOpenDescriptiveModal,
    business,
    setBusiness,
    generateBusinessDescription,
    generateDescriptiveLoading,
    isEditPage,
    handleSubmit,
    updateBusiness,
    loading,
  } = useBusiness();
  return (
    <Dialog open={openDescriptiveModal} onOpenChange={setOpenDescriptiveModal}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Business Description</DialogTitle>
          <DialogDescription>
            Make changes to your description here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto">
          <ReactQuill
            theme="snow"
            onChange={(e) => setBusiness({ ...business, description: e })}
            value={business.description}
          />
        </div>

        <DialogFooter>
          <div className="flex justify-between items-center w-full">
            <Button
              variant="destructive"
              disabled={
                !business?.name ||
                !business?.category ||
                generateDescriptiveLoading
              }
              onClick={generateBusinessDescription}
            >
              {generateDescriptiveLoading ? (
                <Loader2Icon className="animate-spin mr-2" size={18} />
              ) : (
                <Brain size={18} className="mr-2" />
              )}{" "}
              Generat Description With AI
            </Button>
            <Button
              type="submit"
              className="my-5"
              onClick={() => setOpenDescriptiveModal(false)}
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
