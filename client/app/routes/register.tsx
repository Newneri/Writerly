import axios from 'axios';
import { Form, useNavigate } from "react-router";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '~/hooks/useAuth';

async function registerUser(data: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}) {
    const response = await axios.post('api/register', data);
    return response.data;
}

export default function Register() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const firstName = formData.get('firstName') as string;
        const lastName = formData.get('lastName') as string;
        const username = formData.get('username') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const confirmPassword = formData.get('confirmPassword') as string;

        const validationErrors: { [key: string]: string } = {};
        if (!firstName) validationErrors.firstName = 'First name is required';
        if (!lastName) validationErrors.lastName = 'Last name is required';
        if (!username) validationErrors.username = 'Username is required';
        if (!email) validationErrors.email = 'Email is required';
        if (!password) validationErrors.password = 'Password is required';
        if (password !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const data = { firstName, lastName, username, email, password };
            await registerUser(data);
            navigate('/login');
            console.log("Registration successful");
        } catch (error) {
            setErrors({ form: 'Registration failed. Please try again.' });
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center flex-col bg-background">
                <div className="max-w-md w-full space-y-8 p-8 bg-surface rounded-lg shadow">
                    <h2 className="text-center text-3xl font-bold text-text-primary">Create your account</h2>

                    <Form onSubmit={handleSubmit} className="mt-8 space-y-6 text-gray-700">
                        <div className="rounded-md shadow-sm p-4 space-y-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-text-secondary">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.firstName && (
                                    <p className="mt-1 text-sm text-danger">{errors.firstName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-text-secondary">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.lastName && (
                                    <p className="mt-1 text-sm text-danger">{errors.lastName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="username" className="block text-sm font-medium text-text-secondary">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.username && (
                                    <p className="mt-1 text-sm text-danger">{errors.username}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.email && (
                                    <p className="mt-1 text-sm text-danger">{errors.email}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-text-secondary">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.password && (
                                    <p className="mt-1 text-sm text-danger">{errors.password}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-secondary">
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="mt-1 block w-full px-3 py-2 rounded-md border-2 border-border
                                    focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-primary"
                                />
                                {errors.confirmPassword && (
                                    <p className="mt-1 text-sm text-danger">{errors.confirmPassword}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                bg-primary hover:bg-primary-hover transition-colors"
                            >
                                Create Account
                            </button>
                        </div>
                    </Form>
                </div>
                {errors.form && (
                    <p className="mt-1 text-sm text-danger">{errors.form}</p>
                )}
                <div className="mt-6 text-center">
                    <p className="text-sm text-text-secondary">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary hover:text-primary-hover">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}