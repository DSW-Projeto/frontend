import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: true, // Habilita o tema escuro
        themes: {
            dark: {
                primary: '#E0E0E0',
                secondary: '#303030',
                tertiary: '#444',
                accent: '#82B1FF',
                error: '#FF5252',
                info: '#2196F3',
                success: '#4CAF50',
                warning: '#FB8C00',
                'v-data-table': '#303030',
                background: '#1a1a1a',
            },
        },
    },
    iconfont: 'md',
});
