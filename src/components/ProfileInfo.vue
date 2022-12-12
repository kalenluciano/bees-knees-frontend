<template>
    <div v-if="userInfo">
        <img v-if="userInfo.coverPhoto" :src="userInfo.coverPhoto" />
        <img v-else src="../../assets/bees-knees-cover-photo.jpeg" />
        <h1>{{userInfo.username}}</h1>
    </div>
</template>

<script>
import axios from 'axios'
import { BASE_URL } from '../globals';

export default {
    name: 'ProfileInfo',
    data: () => ({
        userInfo: null
    }),
    methods: {
        async getUserInfo() {
            const response = await axios.get(`${BASE_URL}/users/${this.$route.params.user_id}`)
            this.userInfo = response.data
        }
    },
    mounted: function() {
        this.getUserInfo()
    }
}
</script>

<style>

</style>