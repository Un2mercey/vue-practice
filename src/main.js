import { createApp } from 'vue';
import App from '@/App';
import components from '@/ui/index';

const app = createApp(App);
components.forEach(c => app.component(c.name, c));
app.mount('#app');
