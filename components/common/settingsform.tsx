"use client";

import { useEffect, useState, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { debounce } from "lodash"; // Make sure to install lodash if not already installed

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
import { useAuth, useUser } from "@clerk/nextjs";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"; // Import your custom Tooltip component
import QrCode from "@/components/common/qrcode";

const phoneSchema = z.object({
  phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
    message: "Please enter a valid phone number in international format.",
  }),
});

const instructionsSchema = z.object({
  serviceInstructions: z.string().max(2000, {
    message: "Instructions must be 2000 characters or less.",
  }),
  customerAvailability: z.string().min(1, "Availability is required"),
  customerCompany: z.string().min(1, "Company name is required"),
});

const APIURL = "https://irkhexa2uc.execute-api.eu-central-1.amazonaws.com/api";

// Custom hook for setInterval with useState
function useInterval(callback: () => void, delay: number | null) {
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(callback, delay);
      return () => clearInterval(id);
    }
  }, [callback, delay]);
}

export function SettingsForm() {
  const [token, setToken] = useState<string | null>(null);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [pinCode, setPinCode] = useState<string | null>(null);
  const [verificationPhoneNumber, setVerificationPhoneNumber] = useState<
    string | null
  >(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [lastCheckTime, setLastCheckTime] = useState(0);

  const phoneForm = useForm<z.infer<typeof phoneSchema>>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phoneNumber: "" },
  });

  const instructionsForm = useForm<z.infer<typeof instructionsSchema>>({
    resolver: zodResolver(instructionsSchema),
    defaultValues: {
      serviceInstructions: "",
      customerAvailability: "24/7",
      customerCompany: "",
    },
  });

  const { getToken } = useAuth();
  const { user } = useUser();

  async function getServiceInstructions(token: string) {
    const response = await fetch(APIURL + "/settings", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const settings = await response.json();
    if (settings?.verified) {
      handleVerificationSuccess();
    }
    return settings?.serviceInstructions;
  }

  async function onPhoneSubmit(data: z.infer<typeof phoneSchema>) {
    console.log("Phone number submitted:", data.phoneNumber);
    const response = await fetch(APIURL + "/verify", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone_number: data.phoneNumber,
        user_name: user?.fullName,
      }),
    });
    const verificationResponse = await response.json();
    console.log("Verification response:", verificationResponse);
    setPinCode(verificationResponse.pin);
    setVerificationPhoneNumber(verificationResponse.receptionist_number);
    setIsCheckingStatus(true);
  }

  async function onInstructionsSubmit(
    data: z.infer<typeof instructionsSchema>
  ) {
    console.log("Saving service instructions:", data.serviceInstructions);
    const token = await getToken();
    const response = await fetch(APIURL + "/settings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ serviceInstructions: data.serviceInstructions }),
    });
    console.log("Response:", await response.json());
  }

  function handleVerificationSuccess() {
    setIsPhoneVerified(true);
    setVerificationPhoneNumber(null);
    setIsCheckingStatus(false);
  }

  const checkVerificationStatus = useCallback(async () => {
    if (!isCheckingStatus || !token) return;

    try {
      const instructions = await getServiceInstructions(token);
      if (instructions) {
        handleVerificationSuccess();
        instructionsForm.setValue("serviceInstructions", instructions);
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
    }
  }, [isCheckingStatus, token, instructionsForm]);

  useEffect(() => {
    const fetchTokenAndInstructions = async () => {
      const newToken = await getToken();
      setToken(newToken);
      if (!newToken) {
        console.log("No token");
        return;
      }
      try {
        const instructions = await getServiceInstructions(newToken);
        instructionsForm.setValue("serviceInstructions", instructions);
      } catch (error) {
        console.error("Error fetching service instructions:", error);
      }
    };
    fetchTokenAndInstructions();
  }, [getToken, instructionsForm]);

  useEffect(() => {
    if (isCheckingStatus) {
      const interval = setInterval(() => {
        setLastCheckTime(Date.now());
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isCheckingStatus]);

  useEffect(() => {
    if (isCheckingStatus) {
      checkVerificationStatus();
    }
  }, [lastCheckTime, checkVerificationStatus, isCheckingStatus]);

  const saveField = useCallback(
    async (fieldName: string, value: string) => {
      console.log(`Saving ${fieldName}:`, value);
      const currentToken = await getToken();
      const body = {
        [fieldName]: value,
        customer_name: user?.fullName,
      };
      const response = await fetch(APIURL + "/settings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      console.log("Response:", await response.json());
    },
    [getToken, user]
  );

  const debouncedSaveField = useCallback(
    debounce(
      (fieldName: string, value: string) => saveField(fieldName, value),
      500
    ),
    [saveField]
  );

  return (
    <div className="space-y-8">
      {!isPhoneVerified && (
        <Form {...phoneForm}>
          <form
            onSubmit={phoneForm.handleSubmit(onPhoneSubmit)}
            className="space-y-8"
          >
            <FormField
              control={phoneForm.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1234567890" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter your phone number in international format to receive a
                    PIN code.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-black text-white">
              {pinCode ? "Get new PIN" : "Get PIN"}
            </Button>
          </form>
        </Form>
      )}

      {pinCode && verificationPhoneNumber && !isPhoneVerified && (
        <Alert>
          <Phone className="h-4 w-4" />
          <AlertTitle>Verification Required</AlertTitle>
          <AlertDescription>
            Your PIN code is: <strong>{pinCode}</strong>
            <br />
            To get verified, please call{" "}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href={`tel:${verificationPhoneNumber}`}
                    className="underline cursor-help"
                  >
                    {verificationPhoneNumber}
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <QrCode value={verificationPhoneNumber} />
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>{" "}
            with the phone number you entered and type this PIN when prompted.
          </AlertDescription>
        </Alert>
      )}

      {isPhoneVerified && (
        <Form {...instructionsForm}>
          <form className="space-y-8">
            <FormField
              control={instructionsForm.control}
              name="customerCompany"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSaveField("customer_company", e.target.value);
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        debouncedSaveField("customer_company", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={instructionsForm.control}
              name="customerAvailability"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Availability</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSaveField(
                          "customer_availability",
                          e.target.value
                        );
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        debouncedSaveField(
                          "customer_availability",
                          e.target.value
                        );
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    e.g., "24/7" or "Mon-Fri 9AM-5PM"
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={instructionsForm.control}
              name="serviceInstructions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">
                    Service Instructions
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your instructions for the service..."
                      className="min-h-[300px] lg:min-h-[400px] text-base p-4 resize-vertical"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debouncedSaveField("customer_interest", e.target.value);
                      }}
                      onBlur={(e) => {
                        field.onBlur();
                        debouncedSaveField("customer_interest", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-sm mt-2">
                    Provide detailed instructions for how you'd like the service
                    to handle your calls. Your instructions are automatically
                    saved when you stop typing or leave this field.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
