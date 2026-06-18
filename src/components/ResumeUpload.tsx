'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { uploadAndParseResume } from "@/app/actions/user";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";

export default function ResumeUpload({ initialResume }: { initialResume?: string | null }) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadAndParseResume(formData);
      toast({
        title: "Resume uploaded",
        description: "Your resume has been parsed and is ready for AI matching.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Upload failed",
        description: "There was an error parsing your resume.",
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resume Configuration</CardTitle>
        <CardDescription>
          Upload your resume in PDF format. Our AI will use this to match you against job descriptions.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900/50">
          {initialResume ? (
            <div className="text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto" />
                <p className="font-medium text-sm">Resume Active</p>
                <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                    Content parsed successfully.
                </p>
            </div>
          ) : (
            <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
          )}
          
          <label className="mt-4 cursor-pointer">
            <span className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              {isUploading ? (
                <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              ) : null}
              {initialResume ? "Replace Resume" : "Upload PDF"}
            </span>
            <Input 
              type="file" 
              className="hidden" 
              accept="application/pdf"
              onChange={handleUpload}
              disabled={isUploading}
            />
          </label>
        </div>
      </CardContent>
    </Card>
  );
}
