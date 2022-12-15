<template>
    <div class="update-profile-form-page">
        <h2>Update Profile Information</h2>
        <form class="update-profile-form" @submit="handleSubmit">
            <input @input="handleChange" name="firstName" type="text" placeholder="First Name" :value="formValues.firstName" required/>
            <input @input="handleChange" name="lastName" type="text" placeholder="Last Name" :value="formValues.lastName" required/>
            <input @input="handleChange" name="username" type="text" placeholder="Username" :value="formValues.username" required/>
            <input @input="handleChange" name="email" type="email" placeholder="Email" :value="formValues.email" required/>
            <input @input="handleChange" name="password" type="password" placeholder="Password" :value="formValues.password" />
            <input @input="handleChange" name="profilePic" type="text" placeholder="Profile picture link" :value="formValues.profilePic"/>
            <input @input="handleChange" name="coverPhoto" type="text" placeholder="Cover photo link" :value="formValues.coverPhoto"/>
            <input @input="handleChange" name="bio" type="text" placeholder="Bio" :value="formValues.bio" />
            <div class="date-of-birth">
                <label for="dateOfBirth">Date Of Birth: </label>
                <input @input="handleChange" name="dateOfBirth" type="date" :value="formValues.dateOfBirth" />
            </div>
            <button>Update</button>
        </form>
        <button @click="goBack">Back</button>
        <p v-if="error">Looks like that email is already associated with another account.</p>
    </div>
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
            const reformattedDateOfBirth = this.userInfo.dateOfBirth?.split("T")[0]
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

<style>
.update-profile-form-page {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
}

.update-profile-form {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    width: 100vw;
}

.update-profile-form input, .update-profile-form textarea {
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

.update-profile-form button {
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

.update-profile-form button:hover {
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