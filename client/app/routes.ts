import { type RouteConfig, index, route, prefix} from "@react-router/dev/routes";

export default [
    index("routes/welcome.tsx"),

    ...prefix("dashboard", [
        index("routes/dashboard/dashboard.tsx"),
        route("post/:id", "routes/dashboard/post.tsx")
    ]),
    route("home", "routes/home.tsx"),
    route("login", "routes/login.tsx", ),
    route("register", "routes/register.tsx")

] satisfies RouteConfig;
