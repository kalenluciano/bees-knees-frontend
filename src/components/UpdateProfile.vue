<template>
    <form @submit="handleSubmit">
        <label for="firstName">First Name: </label>
        <input @input="handleChange" name="firstName" type="text" placeholder="John" :value="formValues.firstName" required/>
        <label for="lastName">Last Name: </label>
        <input @input="handleChange" name="lastName" type="text" placeholder="Doe" :value="formValues.lastName" required/>
        <label for="username">Username: </label>
        <input @input="handleChange" name="username" type="text" placeholder="johndoe" :value="formValues.username" required/>
        <label for="email">Email: </label>
        <input @input="handleChange" name="email" type="email" placeholder="example@example.com" :value="formValues.email" required/>
        <label for="password">Password: </label>
        <input @input="handleChange" name="password" type="password" placeholder="Enter a password" :value="formValues.password" />
        <label for="profilePic">Profile Picture: </label>
        <input @input="handleChange" name="profilePic" type="text" placeholder="Submit a link to a profile picture" :value="formValues.profilePic"/>
        <label for="coverPhoto">Cover Photo: </label>
        <input @input="handleChange" name="coverPhoto" type="text" placeholder="Submit a link to a cover photo" :value="formValues.coverPhoto"/>
        <label for="bio">Bio: </label>
        <input @input="handleChange" name="bio" type="text" placeholder="About Me" :value="formValues.bio" />
        <label for="dateOfBirth">Date Of Birth: </label>
        <input @input="handleChange" name="dateOfBirth" type="date" :value="formValues.dateOfBirth" />
        <button>Update Profile</button>
    </form>
    <button @click="goBack">Back</button>
    <p v-if="error">Looks like that email is already associated with another account.</p>
</template>

<script>
import { BASE_URL } from '../globals'
import Client from '../services/api'

export default {
    name: 'UpdateProfile',
    props: ['userInfo'],
    emits: ['updateUserInfo', 'navigateToUpdateForm'],
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
    mounted: function() {
        this.updateForm()
    },
    methods: {
        updateForm() {
            const reformattedDateOfBirth = this.userInfo.dateOfBirth.split("T")[0]
            this.formValues = {...this.userInfo, dateOfBirth: reformattedDateOfBirth}
        },
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value
        },
        async handleSubmit(e) {
            e.preventDefault()
            const dateOfBirth = new Date(this.formValues.dateOfBirth)
            const payload = await Client.put(`${BASE_URL}/users/${this.userInfo.id}`, {...this.formValues, dateOfBirth })
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
                this.$emit('navigateToUpdateForm', false)
                this.$emit('updateUserInfo', payload.data.payload[1][0]) 
            }           
        },
        goBack() {
            this.$emit('navigateToUpdateForm', false)
        }
    }
}
</script>