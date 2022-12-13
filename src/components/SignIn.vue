<template>
  <div>
    <v-container class="form_container">
      <v-card class="elevation-12 container" width="800px">
        <v-row class="fill-height p-5">
          <v-col cols="12">
            <v-card-text class="mt-12">
              <h1 class="text-center title mb-12">Sign In</h1>
              <v-form>
                <v-text-field
                  label="Email"
                  name="Email"
                  prepend-icon="email"
                  type="text"
                  color="teal accent-3"
                  v-model="email"
                  variant="outlined"
                  required
                />

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  color="teal accent-3"
                  v-model="password"
                  variant="outlined"
                  required
                />
              </v-form>
            </v-card-text>
            <div class="text-center mb-5 mt-5">
              <v-btn
                rounded
                x-large
                color="teal accent-3"
                width="200px"
                height="50px"
                dark
                @click="signIn()"
                >SIGN IN</v-btn
              >
            </div>
            <div class="d-flex justify-center mb-12">
              Not registered yet ?
              <span
                ><router-link to="/signup" class="link ml-2"
                  >Create Account</router-link
                ></span
              >
            </div>
            <div class="d-flex justify-center mb-12">
              {{ error }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import { ref } from "vue";
import axios from "axios";
import router from "@/router";

export default {
  name: "SignIn",
  setup() {
    const email = ref();
    const password = ref();
    const error = ref();

    function signIn() {
      let user = ref({
        email: email.value,
        password: password.value,
      });

      axios.post("http://localhost:5000/login", user.value).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            router.push("/");
          }
        },
        (err) => {
          console.log(err);
          error.value = err.response.data.error;
        }
      );

      // console.log(user.value, "new user");
    }

    function signUp() {
      router.push("/signup");
    }
    return {
      email,
      password,
      signIn,
      error,
      signUp,
    };
  },
};
</script>

<style scoped>
.form_container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.title {
  color: #009688;
}
.container {
  background: #f8f8f8;
  border-radius: 20px;
}
.link {
  text-decoration: none;
  color: purple;
  font-weight: bold;
}
</style>
