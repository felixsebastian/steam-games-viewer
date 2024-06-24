"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import HelpCard from "./HelpCard";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { HelpCircleIcon, Loader2 } from "lucide-react";
import profileUrlSchema from "@/lib/profileUrlSchema";
import base64 from "base-64";

const formSchema = z.object({ profileUrl: profileUrlSchema });

interface Props {
  profileUrl?: string;
}

const ProfileUrlForm = ({ profileUrl = "" }: Props) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { profileUrl },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.profileUrl === profileUrl) return;
    setPending(true);
    router.push(`/${base64.encode(values.profileUrl)}`);
  };

  useEffect(() => {
    if (form.getValues().profileUrl == profileUrl) setPending(false);
  }, [form, profileUrl]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormLabel htmlFor="profileUrl">Steam profile URL</FormLabel>
          <div className="flex flex-row gap-2">
            <FormField
              name="profileUrl"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {pending ? (
              <Button disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Analysing
              </Button>
            ) : (
              <Button>Analyse</Button>
            )}
          </div>
          <FormDescription>
            <HelpCard>
              <span className="underline flex items-center gap-2 w-max">
                Where can I find this? <HelpCircleIcon size={14} />
              </span>
            </HelpCard>
          </FormDescription>
        </div>
      </form>
    </Form>
  );
};

export default ProfileUrlForm;
