<template>
    <div>
        <h1>Sign Up</h1>
        <form @submit="handleSubmit">
            <label for="firstName"><strong>*</strong>First Name: </label>
            <input @input="handleChange" name="firstName" type="text" placeholder="John" :value="formValues.firstName" required/>
            <label for="lastName"><strong>*</strong>Last Name: </label>
            <input @input="handleChange" name="lastName" type="text" placeholder="Doe" :value="formValues.lastName" required/>
            <label for="username"><strong>*</strong>Username: </label>
            <input @input="handleChange" name="username" type="text" placeholder="johndoe" :value="formValues.username" required/>
            <label for="email"><strong>*</strong>Email: </label>
            <input @input="handleChange" name="email" type="email" placeholder="example@example.com" :value="formValues.email" required/>
            <label for="password"><strong>*</strong>Password: </label>
            <input @input="handleChange" name="password" type="password" placeholder="Enter a password" :value="formValues.password" required/>
            <label for="profilePic">Profile Picture: </label>
            <input @input="handleChange" name="profilePic" type="text" placeholder="Submit a link to a profile picture" :value="formValues.profilePic"/>
            <label for="coverPhoto">Cover Photo: </label>
            <input @input="handleChange" name="coverPhoto" type="text" placeholder="Submit a link to a cover photo" :value="formValues.coverPhoto"/>
            <label for="bio">Bio: </label>
            <input @input="handleChange" name="bio" type="text" placeholder="About Me" :value="formValues.bio" />
            <label for="dateOfBirth">Date Of Birth: </label>
            <input @input="handleChange" name="dateOfBirth" type="date" :value="formValues.dateOfBirth" />
            <button>Sign Up</button>
        </form>
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

</style>