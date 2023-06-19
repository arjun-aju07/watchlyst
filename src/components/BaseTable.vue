<template>
    <div class="table-container">
        <progress
            v-if="isDataLoading"
            class="progress is-info"
            max="100"
        >
        </progress>

        <table v-else class="table is-fullwidth">
            <thead>
                <tr>
                    <th v-for="title, index in titles" :key="index">
                        {{ title }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(item, itemIndex) in data" :key="itemIndex">
                    <td v-for="value, key in item" :key="key">
                        <slot :name="`customData-${key}-${itemIndex}`">
                            {{ value }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'base-table',

    props: {
        isDataLoading: {
            type: Boolean,
            default: false
        },

        titles: {
            type: Array,
            required: true
        },

        data: {
            type: Array,
            required: true
        }
    }
}
</script>

<style></style>