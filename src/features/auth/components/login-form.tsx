"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldError,
    FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import Image from "next/image";

const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const router = useRouter();

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        await authClient.signIn.email(
            {
                email: values.email,
                password: values.password,
                callbackURL: "/",
            },
            {
                onError: (ctx) => {
                    toast.error(ctx.error.message);
                },
            }
        );
    };

    const isPending = form.formState.isSubmitting;

    return (
        <div className="w-full">
            <Card className="mx-auto w-full max-w-md shadow-lg border-border/60">
                <CardHeader className="space-y-2 text-center">
                    <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
                    <CardDescription>
                        Sign in to continue to your account
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="w-full h-30"
                                type="button"
                                disabled={isPending}
                            >
                                <Image
                                    src={"./logos/github.svg"}
                                    width={30}
                                    height={30}
                                    alt="github"
                                />
                            </Button>

                            <Button
                                variant="outline"
                                className="w-full h-30"
                                type="button"
                                disabled={isPending}
                            >
                                <Image
                                    src={"./logos/google.svg"}
                                    width={30}
                                    height={30}
                                    alt="google"
                                />
                            </Button>
                        </div>

                        {/* Divider */}
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>

                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div className="space-y-5">
                            <Controller
                                name="email"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="email"
                                            placeholder="m@example.com"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />

                            <Controller
                                name="password"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <div className="flex items-center justify-between">
                                            <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                            {/* TODO: forgot password logic */}
                                            <Link
                                                href="/forgot-password"
                                                className="text-sm text-muted-foreground hover:text-primary hover:underline"
                                            >
                                                Forgot password?
                                            </Link>
                                        </div>

                                        <Input
                                            {...field}
                                            id={field.name}
                                            type="password"
                                            placeholder="••••••••"
                                            aria-invalid={fieldState.invalid}
                                        />

                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </div>

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full h-11"
                            disabled={isPending}
                        >
                            {isPending ? "Signing in..." : "Login"}
                        </Button>

                        {/* Footer */}
                        <p className="text-center text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-medium text-primary hover:underline"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;