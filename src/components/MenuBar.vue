<template>
    <div v-if="isAuthenticated">
        <Menubar :model="items" />
    </div>
   

</template>

<script>
import Menubar from 'primevue/menubar';
import Ripple from 'primevue/ripple';
import { ref } from 'vue'; 

export default {
    components: {
        Menubar,
    },
    directives: {
        Ripple
    },
    setup() {
       const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');
       return {
           isAuthenticated
       };
    },
    data() {
        return {
            items: [
                {
                    label: 'About',
                    command: () => {
                        this.$router.push('/about');
                    }
                },
                {
                    label: 'User info',
                    command: () => {
                        this.$router.push('/home');
                    }
                },
                {
                    label: 'logout',
                    command: () => {
                        localStorage.removeItem('isAuthenticated');
                        window.location.href = '/';
                    },
                }
            ]
        };
    }
};
</script>

<style scoped>
/* Your component's CSS styles go here */
.menubar-custom {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
  color: #495057;
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
  background-color: #e9ecef;
  color: #212529;
}
</style>