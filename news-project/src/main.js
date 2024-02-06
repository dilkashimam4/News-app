import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.config.globalProperties.$filters = {
    truncateText(value, wordCount = 40) {
        const words = value.split(' ');
        if (words.length > wordCount) {
          const truncatedText = words.slice(0, wordCount).join(' ');
          return `${truncatedText} ... Read More`;
        } else {
          return value;
        }
      },
  };
app.use(router)

app.mount('#app')
