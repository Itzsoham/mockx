"use client";

import Image from "next/image";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "sign-in") {
        // Sign in logic
        console.log(`SIGN IN: ${values.email} ${values.password}`);
        toast.success("Signed in successfully!");
        router.push("/");
      } else {
        // Sign up logic
        console.log(
          `SIGN UP: ${values.name} ${values.email} ${values.password}`
        );
        toast.success("Account created successfully!");
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(`There was an error: ${error}`);
    }
  }

  const isSignIn = type === "sign-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src={"/logo.svg"} alt="Logo" height={32} width={38} />
          <h2 className="text-primary-100">Mock X</h2>
        </div>
        <h3>Practice job interview with AI</h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full form mt-4"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name={"name"}
                label="Name"
                placeholder="Enter your name"
              />
            )}
            <FormField
              control={form.control}
              name={"email"}
              label="Email"
              placeholder="Enter your email"
            />
            <FormField
              control={form.control}
              name={"password"}
              label="Password"
              type="password"
              placeholder="Enter your password"
            />

            <Button type="submit" className="btn">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>
        <p className="text-center">
          {isSignIn ? "No account yet?" : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="text-user-primary font-bold ml-1"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
