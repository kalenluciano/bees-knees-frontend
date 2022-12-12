<template>
    <div>
        <h1>Login Page</h1>
        <form @submit="handleSubmit">
            <label for="email">Email: </label>
            <input @input="handleChange" name="email" type="email" placeholder="example@example.com" :value="formValues.email" required/>
            <label for="password">Password: </label>
            <input @input="handleChange" name="password" type="password" placeholder="Enter a password" :value="formValues.password" required/>
            <button>Login</button>
        </form>
        <RouterLink to="/sign-up" name="SignUp">Sign Up</RouterLink>
        <p v-if="error">Incorrect email or password. Please try again.</p>
    </div>
</template>

<script>
import { LoginUser } from '../services/Auth'
import { useUserStore } from '../stores/UserStore'

export default {
    setup() {
        const user = useUserStore()
        return {user}
    },
    name: 'LoginPage',
    data: () => ({
        formValues: {
            email: '',
            password: ''
        },
        error: false
    }),
    methods: {
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value
        },
        async handleSubmit(e) {
            e.preventDefault()
            const payload = await LoginUser(this.formValues)
            if (payload === 'error') {
                this.error = true
            } else {
                this.error = false
                this.user.setUser(payload)
                this.user.setAuthenticated(true)
                this.$router.push('/')
            }
            this.formValues.email = ''
            this.formValues.password = ''
        }
    }
}
</script>

<style>

</style>