<template>
    <div>
        <header class="block">
            <TheHeader />
        </header>

        <main class="container is-fluid">
            <div class="block level">
                <div class="level-left">
                    <div class="level-item block">
                        <div class="field has-addons">
                            <div class="control">
                                <input v-model="searchKey" class="input" type="text" placeholder="Search for movie">
                            </div>
                        
                            <div class="control">
                                <button 
                                    class="button is-primary"
                                    @click="searchMovie"
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="level-right">
                    <div class="level-item">
                        <button 
                            class="button is-primary is-responsive" 
                            @click="addMovie"
                        >
                            Add Movie
                        </button>
                    </div>
                </div>
            </div>

            <div class="block" v-if="!isTableLoading">
                <div class="level">
                    <div class="level-item has-text-centered">
                        <div>
                            <p class="heading">
                                Count
                            </p>

                            <p class="title">
                                <span 
                                    v-for="letter in moviesCount" 
                                    :key="letter"
                                    class="num" 
                                >
                                    {{ letter }}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="tabs is-fullwidth is-boxed">
                <ul>
                    <li 
                        :class="{ 'is-active': type === 'MOVIE' }"
                        @click="getMoviesData('MOVIE')"
                    >
                        <a>Movies</a>
                    </li>

                    <li
                        :class="{ 'is-active': type === 'SERIES' }"
                        @click="getMoviesData('SERIES')"
                    >
                        <a>Series</a>
                    </li>
                </ul>
            </div>

            <BaseTable
                :titles="table.titles"
                :isDataLoading="isTableLoading"
                :data="table.data"
            >
                <template v-for="(item, index) in moviesData" :key="index" #[`customData-languages-${index}`]>
                    {{ item.languages.join(', ') }}
                </template>

                <template v-for="(item, index) in moviesData" :key="index" #[`customData-isWatched-${index}`]>
                    <span
                        class="tag"
                        :class="{
                            'is-success': item.isWatched,
                            'is-warning': !item.isWatched
                        }"
                    >
                        {{ item.isWatched ? 'Watched' : 'Not Watched' }}
                    </span>
                </template>

                <template v-for="(item, index) in moviesData" :key="index" #[`customData-isFavorite-${index}`]>
                    <button class="button is-white" @click="toggleFavorite(item.id, item.isFavorite)">
                        <span class="icon">
                            <HeartIcon :isFill="item.isFavorite" />
                        </span>
                    </button>
                </template>

                <template v-for="(item, index) in moviesData" :key="index" #[`customData-actions-${index}`]>
                    <button 
                        class="button is-small is-danger is-outlined is-responsive"
                        @click="deleteMovie(item.id)"
                    >
                        Delete
                    </button>
                </template>
            </BaseTable>

            <UpsertMovie 
                :showUpsertMovie="showUpsertMovie"
                @close-upsert-movie="showUpsertMovie = false"
                @upsert-movie="upsertMovie"
            />
        </main>
    </div>
</template>

<script>
import { db, collection, onSnapshot, doc, updateDoc, deleteDoc, query, orderBy, where } from '@/firebase'

import TheHeader from '@/components/TheHeader.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import UpsertMovie from '@/components/UpsertMovie.vue'
import BaseTable from '@/components/BaseTable.vue'

export default {
    name: 'app',

    components : {
        TheHeader,
        HeartIcon,
        UpsertMovie,
        BaseTable
    },

    data () {
        return {
            table: {
                titles: ['No', 'Movie / Series Name', 'Type', 'Language', 'Watched', 'Favorite', 'Actions'],
                data: []
            },
            moviesData: [],
            isTableLoading: false,
            showUpsertMovie: false,
            searchKey: '',
            moviesCount: '',
            type: ''
        }
    },

    created () {
        this.initTableData()
    },

    methods: {
        initTableData () {
            this.isTableLoading = true

            this.getMoviesData()
        },

        getMoviesData (type = 'MOVIE') {
            this.isTableLoading = true
            this.type = type

            const moviesListQuery = query(collection(db, 'movieslist'), where('type', '==', type), orderBy('timeAdded', 'desc'))

            onSnapshot(moviesListQuery, (querySnapshot) => {
                this.setTableData(querySnapshot)
            })
        },

        setTableData (querySnapshot) {
            let moviesCount = 0
            this.moviesData = []
            this.table.data = []

            querySnapshot.forEach((doc) => {
                moviesCount += 1

                this.moviesData.push({
                    id: doc.id,
                    name: doc.data().name,
                    type: doc.data().type,
                    languages: doc.data().languages,
                    isWatched: doc.data().isWatched,
                    isFavorite: doc.data().isFavorite,
                })

                this.table.data.push({
                    id: moviesCount,
                    name: doc.data().name,
                    type: doc.data().type,
                    languages: doc.data().languages,
                    isWatched: doc.data().isWatched,
                    isFavorite: doc.data().isFavorite,
                    actions: ''
                })
            })

            if (this.searchKey !== '') {
                const searchKey = this.searchKey.toLowerCase()

                this.moviesData = this.moviesData.filter((movie) => {
                    return movie.name.toLowerCase().search(searchKey) !== -1
                })

                this.table.data = this.table.data.filter((movie) => {
                    return movie.name.toLowerCase().search(searchKey) !== -1
                })
            }
            this.moviesCount = moviesCount.toString()

            this.isTableLoading = false
        },

        addMovie () {
            this.showUpsertMovie = true
        },

        async deleteMovie (id) {
            await deleteDoc(doc(db, 'movieslist', id))
        },

        async toggleFavorite (id, isFavorite) {
            await updateDoc(doc(db, 'movieslist', id), {
                isFavorite: !isFavorite
            })
        },

        searchMovie () {
            this.getMoviesData(this.type)
        }
    }
}
</script>

<style>
    span.num {
        background-color: rgba(0, 0, 0, 0.15);
        font-weight: bold;
        border-radius: 4px;
        padding: 1px 6px;
        margin: 0 2px;
        font-size: 1.5rem;
    }
</style>