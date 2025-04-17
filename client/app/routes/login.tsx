import { Form, useNavigate } from "react-router-dom";
import { useState, useEffect, use} from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

async function loginUser(data: { email: string; password: string }) {
    const response = await axios.post('api/login', data, { withCredentials: true });
    return response.data;
}

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const navigate = useNavigate();
    
    useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setErrors({});

        try {
            await loginUser({ email, password });
            navigate('/home');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrors({form : error.response?.data?.error});
            } else {
                setErrors({ form:  'An unexpected error occurred' });
            }
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center flex-col bg-background">
                <div className="max-w-md w-full space-y-8 p-8 bg-surface rounded-lg shadow">
                    <h2 className="text-center text-3xl font-bold text-text-primary">Sign in to your account</h2>

                    <Form onSubmit={handleSubmit} className="mt-8 space-y-6 text-gray-700">
                        <div className="rounded-md shadow-sm p-4 space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-danger">{errors.password}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                bg-primary hover:bg-primary-hover transition-colors"
                            >
                                Sign in
                            </button>
                        </div>
                    </Form>
                </div>
                {errors.form && (
                    <p className="mt-1 text-sm text-danger">{errors.form}</p>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary">
                        Don't have an account?{' '}
                        <a href="/register" className="font-medium text-primary hover:text-primary-hover">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </>
    );
}