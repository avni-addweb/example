<template>
  <div>
    <h4>Home Page</h4>
    <v-btn rounded color="teal accent-3" dark @click="logout()">LOGOUT</v-btn>
    <h1>HELLO {{ name }}</h1>
    <h2>your email is: {{ email }}</h2>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import router from "@/router";
import axios from "axios";

export default {
  name: "HomePage",
  created() {
    if (localStorage.getItem("token") === null) {
      router.push("/signin");
    }
  },
  setup() {
    const name = ref();
    const email = ref();
    function logout() {
      localStorage.clear();
      router.push("/signin");
    }

    onMounted(() => {
      axios
        .get("http://localhost:5000/user", {
          headers: { token: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((res) => {
          name.value = res.data.user.name;
          email.value = res.data.user.email;
        });
    });
    return {
      logout,
      name,
      email,
    };
  },
};
</script>

<style></style>
