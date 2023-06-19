<template>
    <div 
        class="modal"
        :class="{ 'is-active': showUpsertMovie }"
    >
        <div class="modal-background" @click="closeUpsertMovie"></div>

        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">
                    Upsert Movie
                </p>

                <button 
                    class="delete" 
                    aria-label="close" 
                    @click="closeUpsertMovie"
                >
                </button>
            </header>

            <section class="modal-card-body">
                <form>
                    <div class="field">
                        <label class="label">
                            Name
                        </label>

                        <div class="control">
                            <input v-model="form.name" class="input" type="text" placeholder="Enter movie name">
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">
                            Type
                        </label>

                        <div class="select">
                            <select v-model="form.type">
                                <option 
                                    value='' 
                                    selected 
                                    disabled
                                >
                                    Type
                                </option>

                                <option value="MOVIE">
                                    MOVIE
                                </option>

                                <option value="SERIES">
                                    SERIES
                                </option>
                            </select>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">
                            Language
                        </label>
                        
                        <div class="tags are-medium">
                            <label 
                                v-for="language in availableLanguages"
                                :key="language"
                                class="checkbox tag is-info is-light"
                            >
                                <input type="checkbox" :value="language" class="mr-1" v-model="form.languages">

                                {{ language }}
                            </label>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">
                            Watched
                        </label>

                        <div class="control">
                            <label class="radio">
                                <input v-model="form.isWatched" type="radio" name="watched" :value="true">

                                Yes
                            </label>

                            <label class="radio">
                                <input v-model="form.isWatched" type="radio" name="watched" :value="false">

                                No
                            </label>
                        </div>
                    </div>
                </form>
            </section>

            <footer class="modal-card-foot">
                <button 
                    class="button is-success"
                    :class="{ 'is-loading': isUpsertMovie }"
                    @click="upsertMovie"
                >
                    Upsert
                </button>

                <button 
                    class="button" 
                    @click="closeUpsertMovie"
                >
                    Cancel
                </button>
            </footer>
        </div>
    </div>
</template>

<script>
import { db, collection, addDoc, serverTimestamp } from '@/firebase'

export default {
    name: 'upsert-movie',

    props: {
        showUpsertMovie: {
            type: Boolean,
            required: true
        }
    },

    data () {
        return {
            form: {
                name: '',
                type: '',
                languages: [],
                isWatched: null
            },
            availableLanguages: [
                'English',
                'Korean',
                'Japanese',
                'Tamil',
                'Hindi',
                'Kannada',
                'Telugu'
            ],
            isUpsertMovie: false
        }
    },

    methods: {
        async upsertMovie () {
            this.isUpsertMovie = true

            const data = {
                ...this.form,
                isFavorite: false,
                timeAdded: serverTimestamp()
            }

            await addDoc(collection(db, 'movieslist'), data)

            this.closeUpsertMovie()

            this.form = {
                name: '',
                type: '',
                languages: [],
                isWatched: null
            }

            this.isUpsertMovie = false
        },

        closeUpsertMovie () {
            this.$emit('close-upsert-movie')
        }
    }
}
</script>