import Main from "@/pages/Main"
import PostPage from "@/pages/PostPage";
import SinglePostPage from "@/pages/SinglePostPage";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: "/",
        component: Main
    },
    {
        path: "/posts",
        component: PostPage
    },
    {
        path: "/post/:id",
        component: SinglePostPage
    }
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});

export default router;
