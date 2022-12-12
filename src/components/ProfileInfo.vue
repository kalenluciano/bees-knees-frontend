<template>
    <div v-if="userInfo">
        <div v-if="!updateForm">
            <img v-if="userInfo.coverPhoto" :src="userInfo.coverPhoto" />
            <img v-else src="../../assets/bees-knees-cover-photo.jpeg" />
            <img v-if="userInfo.profilePic" :src="userInfo.profilePic" />
            <img v-else src="../../assets/bees-knees-profile-picture.jpeg" />
            <h1>{{userInfo.firstName}} {{userInfo.lastName}}</h1>
            <p>{{userInfo.bio}}</p>
            <p>Followers: {{userInfo.followerCount}}</p>
            <p>Following: {{userInfo.followingCount}}</p>
            <div v-if="userInfo.id === userStore.user.id && !deleteProfileConfirmation && !updateForm">
                <button @click="navigateToUpdateForm">Update</button>
                <button @click="setDeleteProfileConfirmation(true)">Delete</button>
            </div>
        </div>
        <div v-if="updateForm">
            <form v-if="updateForm" @submit="handleSubmit">
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
        </div>
        <div v-if="deleteProfileConfirmation" >
            <p>Are you sure you want to exterminate your account?</p>
            <p>This action can't be undone.</p>
            <button @click="setDeleteProfileConfirmation(false)">Never Mind</button>
            <button @click="deleteProfile">Delete</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Client from '../services/api';
import { BASE_URL } from '../globals';
import { useUserStore } from '../stores/UserStore'

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    name: 'ProfileInfo',
    data: () => ({
        userInfo: null,
        updateForm: false,
        deleteProfileConfirmation: false,
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
        async getUserInfo() {
            const response = await axios.get(`${BASE_URL}/users/${this.$route.params.user_id}`)
            this.userInfo = response.data
        },
        async deleteProfile() {
            await Client.delete(`${BASE_URL}/users/${this.userStore.user.id}`)
            this.userStore.setUser(null)
            this.userStore.setAuthenticated(false)
            localStorage.clear()
            this.$router.push('/')
        },
        setDeleteProfileConfirmation(state) {
            this.deleteProfileConfirmation = state
        },
        async navigateToUpdateForm(state) {
            this.updateForm = state
            const reformattedDateOfBirth = this.userInfo.dateOfBirth.split("T")[0]
            this.formValues = {...this.userInfo, dateOfBirth: reformattedDateOfBirth}
        },
        handleChange(e) {
            this.formValues[e.target.name] = e.target.value
        },
        async handleSubmit(e) {
            e.preventDefault()
            const dateOfBirth = new Date(this.formValues.dateOfBirth)
            const payload = await Client.put(`${BASE_URL}/users/${this.userStore.user.id}`, {...this.formValues, dateOfBirth })
            console.log(payload)
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
                this.updateForm = false
                this.userInfo = payload.data.payload[1][0]
            }            
        }
    },
    mounted: function() {
        this.getUserInfo()
    }
}
</script>

<style>

</style>