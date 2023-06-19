<template>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 2.56 2.56" xml:space="preserve">
        <path 
            :fill="isFill ? '#e74c3c' : 'none'"
            :stroke="isFill ? '#e74c3c' : '#000'"
            stroke-width=".08"
            stroke-miterlimit="10"
            d="M.04.84c0 .8 1.24 1.52 1.24 1.52S2.52 1.64 2.52.84c0-.331-.24-.64-.6-.64-.331 0-.64.229-.64.56C1.28.429.971.2.64.2.28.2.04.509.04.84z"
        />
    </svg>
</template>

<script>
export default {
    name: 'heart-icon',

    props: {
        isFill: {
            type: Boolean,
            required: true
        }
    }
}
</script>