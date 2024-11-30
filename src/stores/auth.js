// auth.js
import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { csrfCookie, login, logout, register, getUser } from "@/http/auth-api";

export const useAuthStore = defineStore("authStore", () => {
  const user = ref(null);

  // Mengembalikan true jika user telah login, dan mengembalikan false jika tidak
  const isLoggedIn = computed(() => !!user.value);

  const fetchUser = async () => {
    const { data } = await getUser();
    user.value = data;
  };

  const handleLogin = async (credentials) => {
    // const csrfToken = await csrfCookie();
    await login(credentials);
    console.log(credentials);
    await fetchUser();
  };

  const handleRegister = async (newUser) => {
    await register(newUser);
    await handleLogin({
      email: newUser.email,
      password: newUser.password,
    });
  };

  const handleLogout = async () => {
    await logout();
    user.value = null;
  };

  return {
    user,
    isLoggedIn,
    fetchUser,
    handleLogin,
    handleRegister,
    handleLogout,
  };
});
