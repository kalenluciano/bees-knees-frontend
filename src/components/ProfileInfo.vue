<template>
    <div v-if="userInfo && userStore.user">
        <div v-if="!updateForm">
            <img class="coverPhoto" v-if="userInfo.coverPhoto" :src="userInfo.coverPhoto" />
            <img class="coverPhoto" v-else src="../assets/bees-knees-cover-photo.jpeg" />
            <img class="profilePic" v-if="userInfo.profilePic" :src="userInfo.profilePic" />
            <img class="profilePic" v-else src="../assets/bees-knees-profile-picture.jpeg" />
            <h1>{{userInfo.firstName}} {{userInfo.lastName}}</h1>
            <p>{{userInfo.bio}}</p>
            <p>Followers: {{userInfo.followerCount}}</p>
            <p>Following: {{userInfo.followingCount}}</p>
            <div v-if="userInfo.id === userStore.user.id && !deleteProfileConfirmation && !updateForm">
                <button @click="navigateToUpdateForm">Update</button>
                <button @click="setDeleteProfileConfirmation(true)">Delete</button>
            </div>
            <div v-else-if="userInfo.id !== userStore.user.id">
                <button v-if="!followingUser" @click="changeFollowUserStatus">Follow</button>
                <button v-else @click="changeFollowUserStatus">Unfollow</button>
            </div>
        </div>
        <div v-if="updateForm">
            <UpdateProfile :userInfo="userInfo" @updateUserInfo="updateUserInfo" @navigateToUpdateForm="navigateToUpdateForm" />
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
import UpdateProfile from '../components/UpdateProfile.vue'

export default {
    setup() {
        const userStore = useUserStore()
        return {userStore}
    },
    watch: {
        userInfo(newUserInfo) {
            if (newUserInfo) {
                this.getFollowStatus()
            }
        }
    },
    name: 'ProfileInfo',
    components: {
        UpdateProfile
    },
    data: () => ({
        userInfo: null,
        updateForm: false,
        deleteProfileConfirmation: false,
        followingUser: false
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
            this.$router.push('/')
            localStorage.clear()
        },
        setDeleteProfileConfirmation(state) {
            this.deleteProfileConfirmation = state
        },
        navigateToUpdateForm(state) {
            this.updateForm = state
        },
        updateUserInfo(newUserInfo) {
            this.userInfo = newUserInfo
        },
        async changeFollowUserStatus() {
            await Client.post(`${BASE_URL}/users/${this.userStore.user.id}/followed-user/${this.userInfo.id}`, {followingUser: this.followingUser})
            this.followingUser = !this.followingUser
            await this.getFollowStatus()
            await this.getUserInfo()
        },
        async getFollowStatus() {
            const response = await axios.get(`${BASE_URL}/users/${this.userStore.user.id}/followed-user/${this.userInfo.id}`)
            if (response.data.length > 0) {
                this.followingUser = true
            }
        }
    },
    mounted: function() {
        this.getUserInfo()
    }
}
</script>

<style>
.coverPhoto {
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center;
}

.profilePic {
    width: 50px
}
</style>