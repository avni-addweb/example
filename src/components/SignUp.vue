<template>
  <div>
    <v-container class="form_container" fluid>
      <v-card class="elevation-12 container" width="800px">
        <v-row class="fill-height p-5">
          <v-col cols="12">
            <v-card-text class="mt-12">
              <h1 class="text-center title mb-5">Create Account</h1>
              <!-- <div class="text-center mt-4">
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>fab fa-facebook-f</v-icon>
                    </v-btn>

                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>fab fa-google-plus-g</v-icon>
                    </v-btn>
                    <v-btn class="mx-2" fab color="black" outlined>
                      <v-icon>fab fa-linkedin-in</v-icon>
                    </v-btn>
                  </div> -->

              <v-form>
                <v-text-field
                  label="Name"
                  name="Name"
                  prepend-icon="person"
                  type="text"
                  color="teal accent-3"
                  v-model="name"
                  variant="outlined"
                  bg-color="white"
                  :rules="errors"
                />
                <Field name="email" type="email" :rules="validateEmail">
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="email"
                    type="text"
                    color="teal accent-3"
                    v-model="email"
                    variant="outlined"
                    bg-color="white"
                  />
                </Field>

                <v-text-field
                  id="password"
                  label="Password"
                  name="password"
                  prepend-icon="lock"
                  type="password"
                  color="teal accent-3"
                  v-model="password"
                  variant="outlined"
                  bg-color="white"
                  required
                />
              </v-form>
            </v-card-text>
            <div class="text-center mt-n5 mb-5">
              <v-btn
                rounded
                x-large
                width="200px"
                height="50px"
                color="teal accent-3"
                dark
                @click="signUp()"
                >SIGN UP</v-btn
              >
            </div>

            <div class="d-flex justify-center mb-12">
              Already have an account ?
              <span
                ><router-link to="/signin" class="link ml-2"
                  >Sign In</router-link
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
import { Field } from "vee-validate";

export default {
  name: "SignUp",
  components: {
    Field,
  },
  setup() {
    const name = ref();
    const email = ref();
    const password = ref();
    const error = ref();

    function validateEmail(value) {
      // if the field is empty
      if (!value) {
        return 'This field is required';
      }
      // if the field is not a valid email
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!regex.test(value)) {
        return 'This field must be a valid email';
      }
      // All is good
      return true;
    }

    function signUp() {
      let newUser = ref({
        name: name.value,
        email: email.value,
        password: password.value,
      });

      axios.post("http://localhost:5000/signup", newUser.value).then(
        (res) => {
          console.log(res);
          error.value = "";
          router.push("/signin");
        },
        (err) => {
          console.log(err);
          error.value = err.response.data.error;
        }
      );

      // console.log(newUser.value, "new user");
    }

    return {
      name,
      email,
      password,
      signUp,
      error,
      validateEmail 
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
  /* background-image: linear-gradient(
    to left top,
    #29075e,
    #10114e,
    #04113a,
    #050c25,
    #01040d
  ); */
  /* border-radius: 20px; */
  /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); */
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
