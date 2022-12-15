<template>
    <div class="login-body">
        <div class="login-page">
            <div class="login-left-side">
                <h1>Bees Knees</h1>
                <div class="login-list-container">
                    <div class="login-list">
                        <img class="login-icons" src="../assets/swarm.png" />
                        <h2>Follow your swarm</h2>
                    </div>
                    <div class="login-list">
                        <img id="bee-icon" class="login-icons" src="../assets/bee.png"/>
                        <h2>Hear the buzz</h2>
                    </div>
                    <div class="login-list">
                        <img class="login-icons" src="../assets/hive.png"/>
                        <h2>Join the hive</h2>
                    </div>
                </div>
            </div>
            <div class="login-right-side">
                <h1>Sign in to BeesKnees</h1>
                <form @submit="handleSubmit" class="login-form">
                    <input @input="handleChange" name="email" type="email" placeholder="Email" :value="formValues.email" required/>
                    <input @input="handleChange" name="password" type="password" placeholder="Password" :value="formValues.password" required/>
                    <button>Buzz In</button>
                </form>
                <h3>Don't have an account? <RouterLink to="/sign-up" name="SignUp">Sign Up</RouterLink></h3>
            </div>
            <p v-if="error">Incorrect email or password. Please try again.</p>
        </div>
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
                if (this.$route.path === '/') {
                    this.$router.go()
                } else {
                    this.$router.push('/')
                }
            }
            this.formValues.email = ''
            this.formValues.password = ''
        }
    }
}
</script>

<style >
.login-body h2 {
    font-size: 1.45rem;
}

.login-body {
    background-color: #F2DA02;
    color: #31495E;
    width: 100%;
}

.login-page {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.login-left-side, .login-right-side {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-flow: column wrap;
}

.login-right-side {
    background-color: #31495E;
    color: #F2DA02;
}

.login-form {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    width: 100%;
}

.login-icons {
    width: 3rem;
    height: 3rem;
    object-fit: cover;
    object-position: center;
    margin: 0 1rem;
}

.login-list {
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-list-container {
    display: flex;
    flex-flow: column wrap;
    align-items: flex-start;
}

.login-form input {
    margin: .25rem 0;
    border-radius: 5px;
    width: 70%;
    max-width: 400px;
    padding: .25rem 1rem;
}

.login-form button {
    margin-top: 1.5rem;
    margin-bottom: .5rem;
    border-radius: 5px;
    width: 5rem;
    height: 1.5rem;
    color: black;
    background-color: #F2DA02;
    transition: all 0.3s ease;
    cursor: pointer;
}

.login-form button:hover {
    color: #31495E;
    background-color: white;
}

.login-page a {
    text-decoration: none;
    color: white;
}

.login-page p {
    color: #F2DA02;
}

@media screen and (max-width: 800px) {

    .login-body {
        padding: 25% 0 0 0;
        height: 100vh;
        background-color: #F2DA02;
    }

    .login-page {
        display: flex;
        flex-flow: column wrap;
        justify-content: center;
        align-items: center;
    }

    .login-left-side {
        height: auto;
    }

    .login-right-side {
        height: auto;
        justify-content: flex-start;
        margin-top: 50px;
        color: #31495E;
        background-color: #F2DA02;
    }

    .login-form button {
        color: white;
        background-color: #31495E;
    }

    .login-right-side h1 {
        font-size: 1.5rem;
    }

    .login-page a {
        text-decoration: none;
        color: #31495E;
    }

    .login-page p {
        color: #31495E;
    }

}

</style>