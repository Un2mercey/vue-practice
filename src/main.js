import { createApp } from 'vue';
import App from '@/App';
import router from "@/router/router";
// import components from '@/ui/index';

const app = createApp(App);
// components.forEach(c => app.component(c.name, c));

app
    .use(router)
    .mount('#app');
