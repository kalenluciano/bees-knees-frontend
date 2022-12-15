<template>
    <div class="sign-up-page-container">
        <div class="sign-up-page">
            <h1>Sign Up</h1>
            <form @submit="handleSubmit" class="sign-up-form">
                <input @input="handleChange" name="firstName" type="text" placeholder="First Name*" :value="formValues.firstName" required/>
                <input @input="handleChange" name="lastName" type="text" placeholder="Last Name*" :value="formValues.lastName" required/>
                <input @input="handleChange" name="username" type="text" placeholder="Username*" :value="formValues.username" required/>
                <input @input="handleChange" name="email" type="email" placeholder="Email*" :value="formValues.email" required/>
                <input @input="handleChange" name="password" type="password" placeholder="Password*" :value="formValues.password" required/>
                <input @input="handleChange" name="profilePic" type="text" placeholder="Profile Picture Link" :value="formValues.profilePic"/>
                <input @input="handleChange" name="coverPhoto" type="text" placeholder="Cover Photo Link" :value="formValues.coverPhoto"/>
                <textarea id="bio" @input="handleChange" name="bio" type="text" placeholder="Bio" :value="formValues.bio" />
                <div class="date-of-birth">
                    <label for="dateOfBirth">Date Of Birth: </label>
                    <input @input="handleChange" name="dateOfBirth" type="date" :value="formValues.dateOfBirth" />
                </div>
                <button>Sign Up</button>
            </form>
            <h3>Already have an account? <RouterLink to="/login" name="LoginPage">Login</RouterLink></h3>
        </div>
        <p v-if="error">Looks like that email is already associated with another account.</p>
    </div>
</template>

<script>
import { SignUpUser } from '../services/Auth'

export default {
    name: 'SignUp',
    data: () => ({
        formValues: {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            profilePic: '',
            coverPhoto: '',
            bio: '',
            dateOfBirth: ''
        }, 
        error: false
    }),
    methods: {
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value
        },
        async handleSubmit(e) {
            e.preventDefault()
            const dateOfBirth = new Date(this.formValues.dateOfBirth)
            const payload = await SignUpUser({...this.formValues, dateOfBirth })
            this.formValues = {
                firstName: '',
                lastName: '',
                username: '',
                email: '',
                password: '',
                profilePic: '',
                coverPhoto: '',
                bio: '',
                dateOfBirth: ''
            }
            if (payload === 'error') {
                this.error = true
            } else {
                this.error = false
                this.$router.push('/login')
            }            
        }
    }
}
</script>

<style>
.sign-up-page-container {
    height: 100vh;
    text-align: center;
    background-color: #F2DA02;
    color: #31495E;
}

.sign-up-page {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    height: 90vh;
}

.sign-up-form {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    width: 100vw;
}

.sign-up-form input, .sign-up-form textarea {
    margin: .25rem 0;
    border-radius: 5px;
    width: 60%;
    max-width: 400px;
    padding: .25rem 1rem;
}

.date-of-birth {
    border-radius: 5px;
    width: 60%;
    max-width: 400px;
    padding: .25rem 1rem;
    display: grid;
    grid-template-columns: 2fr 3fr;
}

.date-of-birth label, .date-of-birth input {
    display: flex;
    justify-content: center;
    align-items: center;
}

.sign-up-form button {
    margin-top: 1.5rem;
    margin-bottom: .5rem;
    border-radius: 5px;
    width: 5rem;
    height: 1.5rem;
    color: white;
    background-color: #31495E;
    transition: all 0.3s ease;
    cursor: pointer;
}

.sign-up-form button:hover {
    color: #31495E;
    background-color: white;
}

#bio {
    height: 10rem;
}

@media screen and (max-width: 400px) {
    .date-of-birth {
        font-size: .8rem;
    }
}

</style>