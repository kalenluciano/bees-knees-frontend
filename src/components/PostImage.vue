<template>
    <div>
        <img :src="image"/>
    </div>
</template>

<script>
export default {
    name: "PostImage",
    props: ['image']
}
</script>