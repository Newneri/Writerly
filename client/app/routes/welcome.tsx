import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

export default function Welcome() {
    useAuth();
    return (
        <div className="min-h-screen w-[60%] mx-auto flex flex-row items-center justify-between">
            <div>
                <h1 className="text-8xl font-bold mb-4 text-text-primary">Welcome to Writerly</h1>
                <p className="text-text-secondary mb-8 text-2xl">
                    Join our community of writers and start sharing your stories today.
                </p>
            </div>
            <div className="w-[400px] p-8 text-center">
                <h2 className="text-2xl font-bold mb-6 text-text-primary">Join today.</h2>

                <button className="w-full mb-4 flex items-center justify-center bg-primary text-white hover:bg-primary-hover transition-colors rounded-full py-3 px-4">
                    <svg width="800px" height="800px" viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2">
                        <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Color-" transform="translate(-401.000000, -860.000000)">
                                <g id="Google" transform="translate(401.000000, 860.000000)">
                                    <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05">

                                    </path>
                                    <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335">

                                    </path>
                                    <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853">

                                    </path>
                                    <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4">

                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Sign Up with Google
                </button>

                <button className="w-full mb-4 flex items-center justify-center bg-primary text-white hover:bg-primary-hover transition-colors rounded-full py-3 px-4">
                    <svg width="800px" height="800px" viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 color-white">
                        <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                            <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="currentColor">
                                <g id="icons" transform="translate(56.000000, 160.000000)">
                                    <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" id="apple-[#173]">

                                    </path>
                                </g>
                            </g>
                        </g>
                    </svg>
                    Sign up with Apple
                </button>

                <h2 className="my-4 text-text-secondary">or</h2>

                <Link
                    to="/register"
                    className="w-full block mb-4 bg-secondary text-white rounded-full py-3 px-4 hover:bg-secondary-hover transition-colors"
                >
                    Create account
                </Link>

                <div className="text-sm text-text-secondary text-left mb-6">
                    By signing up, you agree to the Terms of Abdelhamid Akhatar. (im finna steal all your data)
                </div>

                <div className="flex flex-col justify-center items-left space-y-4">
                    <h3 className="text-text-secondary text-left">Already have an account?</h3>
                    <Link to="/login" className="text-text-primary bg-transparent rounded-full border-2 border-text-primary w-full py-2">
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}