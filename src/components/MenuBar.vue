<template>
  <div v-if="isAuthenticated" class="menubar-wrapper">
    <Menubar :model="items" class="menubar-custom" />
  </div>
</template>

<script>
import Menubar from "primevue/menubar";
import Ripple from "primevue/ripple";
import { ref } from "vue";

export default {
  components: {
    Menubar,
  },
  directives: {
    Ripple,
  },
  setup() {
    const isAuthenticated = ref(
      localStorage.getItem("isAuthenticated") === "true",
    );
    return {
      isAuthenticated,
    };
  },
  data() {
    return {
      items: [
        {
          label: "About",
          icon: "pi pi-fw pi-info",
          command: () => {
            window.location.href = "/about";
          },
        },
        {
          label: "User info",
          icon: "pi pi-fw pi-plus",
          command: () => {
            window.location.href = "/home";
          },
        },
        {
          label: "Data",
          icon: "pi pi-fw pi-table",
          command: () => {
            window.location.href = "/data";
          },
        },
        {
          label: "logout",
          icon: "pi pi-fw pi-power-off",
          command: () => {
            localStorage.removeItem("isAuthenticated");
            window.location.href = "/";
          },
        },
      ],
    };
  },
};
</script>

<style scoped>
.menubar-wrapper {
  padding: 1rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.menubar-custom {
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link {
  color: #3B82F6;
  font-weight: 600;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover {
  background-color: #3B82F6;
  color: #ffffff;
  border-radius: 4px;
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link .p-menuitem-icon {
  color: #3B82F6;
  margin-right: 0.75rem;
  font-size: 1.2rem;
  width: 1.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(59, 130, 246, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.menubar-custom .p-menubar-root-list > .p-menuitem > .p-menuitem-link:hover .p-menuitem-icon {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.menubar-custom .p-menubar-root-list > .p-menuitem:last-child > .p-menuitem-link {
  background-color: #EF4444;
  color: #ffffff;
  border-radius: 4px;
}

.menubar-custom .p-menubar-root-list > .p-menuitem:last-child > .p-menuitem-link:hover {
  background-color: #DC2626;
}

.menubar-custom .p-menubar-root-list > .p-menuitem:last-child > .p-menuitem-link .p-menuitem-icon {
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.2);
}

.menubar-custom .p-menubar-root-list > .p-menuitem:last-child > .p-menuitem-link:hover .p-menuitem-icon {
  background-color: rgba(255, 255, 255, 0.3);
}
</style>
