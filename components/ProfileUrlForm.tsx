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
import HelpCard from "./HelpCard";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { HelpCircleIcon, Loader2 } from "lucide-react";
import profileUrlSchema from "@/lib/profileUrlSchema";
import { encodeProfileUrl } from "@/lib/encoding";
import useResults from "@/lib/client/useResults";

const formSchema = z.object({ profileUrl: profileUrlSchema });

interface Props {
  profileUrl?: string;
}

const ProfileUrlForm = ({ profileUrl = "" }: Props) => {
  const { isLoading } = useResults(profileUrl);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { profileUrl },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.profileUrl === profileUrl) return;
    router.push(`/${encodeProfileUrl(values.profileUrl)}`);
  };

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
                    <Input {...field} className="lg:w-96" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ? (
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
