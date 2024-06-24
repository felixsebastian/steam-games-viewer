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

const formSchema = z.object({
  steamid: z
    .string()
    .regex(/^[0-9]*$/, {
      message: "Should only contain numbers",
    })
    .min(6, {
      message: "Should be at lest 6 digits",
    }),
});

interface Props {
  steamid?: string;
}

const SteamIdForm = ({ steamid = "" }: Props) => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { steamid },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (values.steamid === steamid) return;
    setPending(true);
    router.push(`/${values.steamid}`);
  };

  useEffect(() => {
    if (form.getValues().steamid == steamid) setPending(false);
  }, [form, steamid]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <FormLabel htmlFor="steamId">Steam ID</FormLabel>
          <div className="flex flex-row gap-2">
            <FormField
              name="steamid"
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

export default SteamIdForm;
