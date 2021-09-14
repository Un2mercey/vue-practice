import { createApp } from 'vue';
import App from '@/App';
import router from "@/router/router";
import components from '@/ui/index';
import directives from "@/directives/index";

const app = createApp(App);

components.forEach(c => app.component(c.name, c));
directives.forEach(d => app.directive(d.name, d));

app
    .use(router)
    .mount('#app');
