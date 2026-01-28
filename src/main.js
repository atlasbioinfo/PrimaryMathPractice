import { createApp } from 'vue'
import pinia from './stores'
import App from './App.vue'
import { createVueErrorHandler, setupGlobalErrorHandlers } from './utils/errorHandler'
import './styles/dark-theme.css'

// Set up global error handlers
setupGlobalErrorHandlers()

const app = createApp(App)

// Set up Vue error handler
app.config.errorHandler = createVueErrorHandler()

app.use(pinia)
app.mount('#app')
