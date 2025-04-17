import { Link } from "react-router";
import type { Route } from "./+types/dashboard";

export default function Dashboard() { 
    return (
        <>
        <section>
            <h1>Dashboard</h1>
            <p>Welcome to the dashboard!</p>
            <p>Here you can manage your posts, users, and settings.</p>
            <p>Use the navigation menu to access different sections of the dashboard.</p>
            <p>Feel free to explore and customize your experience.</p>
            <p>If you have any questions, check the documentation or contact support.</p>
            <p>Happy dashboarding!</p>
        </section>
        <section>
            <h1>Posts</h1>
            <div>
                <ul>
                    <li>
                        <Link to="/dashboard/post/31414">
                            Post 1
                        </Link>
                    </li>
                </ul>
            </div>
        </section>
        </>
    );
}