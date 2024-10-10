"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Phone } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
const profileFormSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number in international format.",
  }),
  serviceInstructions: z.string().max(2000, {
    message: "Instructions must be 2000 characters or less.",
  }),
});

const APIURL = "https://irkhexa2uc.execute-api.eu-central-1.amazonaws.com/api";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function SettingsForm() {
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [pinCode, setPinCode] = useState<string | null>(null);
  const [verificationPhoneNumber, setVerificationPhoneNumber] = useState<
    string | null
  >(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      phoneNumber: "",
      serviceInstructions: "",
    },
  });

  async function getServiceInstructions(token: string) {
    const response = await fetch(APIURL + "/settings", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const settings = await response.json();
    if (settings?.verified) {
      handleVerificationSuccess();
    }
    return settings?.serviceInstructions;
  }

  async function onSubmit(data: ProfileFormValues) {
    console.log("onSubmit", data);
    if (!isPhoneVerified) {
      const response = await fetch(
        APIURL + "/verify?phone_number=" + data.phoneNumber,
        {
          method: "GET",
        }
      );
      const verificationResponse = await response.json();
      console.log("Verification code:", verificationResponse.code);
      setPinCode(verificationResponse.code);
      setVerificationPhoneNumber(verificationResponse.phone_number);
    } else {
      // TODO: Implement saving service instructions
      const response = await fetch(APIURL + "/settings", {
        method: "POST",
        body: JSON.stringify({ serviceInstructions: data.serviceInstructions }),
      });
      console.log("Saving service instructions:", data.serviceInstructions);
      console.log("Response:", await response.json());
    }
  }

  // This function would be called by your backend after successful verification
  function handleVerificationSuccess() {
    setIsPhoneVerified(true);
    //setPinCode(null);
    setVerificationPhoneNumber(null);
  }

  const { getToken } = useAuth();

  // init the form by fetching settings from server
  useEffect(() => {
    const fn = async () => {
      const token = await getToken();
      if (!token) {
        console.log("No token");
        return;
      }
      console.log("Token:", token);
      getServiceInstructions(token).then((instructions) => {
        form.setValue("serviceInstructions", instructions);
      });
    };
    fn();
  }, [form, getToken, getServiceInstructions]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="+1234567890"
                  {...field}
                  disabled={isPhoneVerified}
                />
              </FormControl>
              <FormDescription>
                Enter your phone number in international format to receive a PIN
                code.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {pinCode && verificationPhoneNumber && !isPhoneVerified && (
          <Alert>
            <Phone className="h-4 w-4" />
            <AlertTitle>Verification Required</AlertTitle>
            <AlertDescription>
              Your PIN code is: <strong>{pinCode}</strong>
              <br />
              Please call {verificationPhoneNumber} and enter this PIN when
              prompted.
            </AlertDescription>
          </Alert>
        )}

        {isPhoneVerified && (
          <FormField
            control={form.control}
            name="serviceInstructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service Instructions</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your instructions for the service..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Provide instructions for how you&apos;d like the service to
                  handle your calls.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {!isPhoneVerified && (
          <Button type="submit" className="bg-black text-white">
            {pinCode ? "Get new PIN" : "Get PIN"}
          </Button>
        )}

        {isPhoneVerified && (
          <Button type="submit" className="bg-black text-white">
            Save Instructions
          </Button>
        )}
      </form>
    </Form>
  );
}
