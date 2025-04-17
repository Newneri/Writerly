import { useParams } from "react-router";
import type { Route } from "././+types/post";

export  function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Dashboard" },
  ];
}
export default function Post({params}: Route.LoaderArgs) { 
    let { id } = params;
    return (
        <div>
            <h1>Post {id} </h1>
            <p>Welcome to the post page!</p>
            <p>Here you can view and manage your posts.</p>
            <p>Use the navigation menu to access different sections of the post.</p>
            <p>Feel free to explore and customize your experience.</p>
            <p>If you have any questions, check the documentation or contact support.</p>
            <p>Happy posting!</p>
        </div>
    );
}