<template>
    <navigation-bar></navigation-bar>
    <div class="layout">
        <slot></slot>
    </div>
    <footer-blog></footer-blog>
</template>

<script>
import NavigationBar from '../nav/NavigationBar.vue'
import FooterBlog from '../nav/FooterBlog.vue';
export default {
    components: {
        NavigationBar,
        FooterBlog
    }
}
</script>