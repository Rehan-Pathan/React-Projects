import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [serverError, setServerError] = useState("");

    const login = async (data) => {
        setServerError("");
        try {
            const session = await authService.login(data);
            if (session) {
                const userData = await authService.getCurrentUser();
                if (userData) dispatch(authLogin(userData));
                navigate("/");
            }
        } catch (error) {
            setServerError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center w-full py-8">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have an account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {serverError && <p className="text-red-600 mt-4 text-center">{serverError}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                                    message: "Enter a valid email address",
                                },
                            })}
                            aria-invalid={!!errors.email}
                            aria-describedby="email-error"
                        />
                        {errors.email && (
                            <p id="email-error" className="text-red-600 text-sm pl-1">
                                {errors.email.message}
                            </p>
                        )}
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required",
                            })}
                            aria-invalid={!!errors.password}
                            aria-describedby="password-error"
                        />
                        {errors.password && (
                            <p id="password-error" className="text-red-600 text-sm pl-1">
                                {errors.password.message}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
