<template>
    <styledSpinner :isLoading="isFetching" />
    <styledDialog
        :isOpened="isDialogVisible"
        @hideDialog="isDialogVisible = false"
    >
        <postForm @postCreated="onPostCreated" />
    </styledDialog>
    <div style="padding: 20px 20px 80px;">
        <div class="tittle">
            <h1 v-text="'Articles'" />
            <styledInput
                v-model="searchQuery"
                placeholder="Filter by"
                class="tittle__post-filter"
                type="text"
                v-focus
            />
            <div class="tittle__buttons">
                <styledButton
                    @click="openAddPostModal"
                    style="margin-right: 15px"
                    v-text="'Add post'"
                />
                <styledSelect
                    v-model="selectedPagination"
                    :options="paginationOptions"
                    style="margin-right: 15px"
                >
                    Pagination variant
                </styledSelect>
                <styledSelect
                    v-model="selectedSort"
                    :options="sortOptions"
                >
                    Sort by
                </styledSelect>
            </div>
        </div>
        <postList
            :posts="filteredPosts"
            :isPostsLoading="isFetching"
            :isFiltering="!!searchQuery.trim().length"
            @removePost="onRemovePost"
            @fetchPosts="loadPosts"
        />
        <styledPagination
            v-if="selectedPagination === 'classic'"
            :totalPages="totalPages"
            :currentPage="currentPage"
            @pageChange="loadPosts($event)"
        />
    </div>
    <div
        v-show="selectedPagination === 'endless'"
        ref="observer"
        class="observer" />
</template>

<script>
import postForm from "@/components/posts/post-form";
import postList from "@/components/posts/post-list";
import styledSpinner from "@/ui/styled-spinner";
import styledDialog from "@/ui/styled-dialog";
import styledInput from "@/ui/styled-input";
import styledButton from "@/ui/styled-button";
import styledSelect from "@/ui/styled-select";
import styledPagination from "@/ui/styled-pagination";
import focusDirective from "@/directives/focus.directive";
import { fetchPosts } from "@/service/post.service";
import { validatePost } from "@/utils/post-validator";

export default {
    components: {
        postForm,
        postList,
        styledSpinner,
        styledDialog,
        styledInput,
        styledButton,
        styledSelect,
        styledPagination
    },
    data() {
        return {
            posts: [],
            isFetching: false,
            isDialogVisible: false,
            selectedSort: "",
            selectedPagination: "endless",
            searchQuery: "",
            currentPage: 1,
            perPage: 10,
            totalPages: 0,
            paginationOptions: [
                {
                    value: "classic",
                    name: "Classic pagination"
                },
                {
                    value: "endless",
                    name: "Endless ribbon"
                }
            ],
            sortOptions: [
                {
                    value: "title",
                    name: "Sort by title"
                },
                {
                    value: "id",
                    name: "Sort by id"
                }
            ],
        };
    },
    computed: {
        sortedPosts() {
            return [...this.posts]
                .sort((a, b) => {
                    if (this.selectedSort === "title") {
                        return a[this.selectedSort]?.localeCompare(b[this.selectedSort]);
                    }
                    return a[this.selectedSort] > b[this.selectedSort];
                });
        },
        filteredPosts() {
            const sq = this.searchQuery.trim().toLowerCase();
            return this.sortedPosts.filter(p =>
                p.title.toLowerCase().includes(sq)
                || p.body.toLowerCase().includes(sq)
            );
        }
    },
    methods: {
        onPostCreated(newPost) {
            if (validatePost(newPost)) {
                this.posts.push(newPost);
            }
            this.isDialogVisible = false;
        },
        onRemovePost(post) {
            this.posts.splice(this.posts.indexOf(post), 1);
        },
        openAddPostModal() {
            this.isDialogVisible = true;
        },
        subscribeOnScroll() {
            const options = {
                rootMargin: "0px",
                threshold: 1.0
            };

            const callback = (entries) => {
                if (entries[0].isIntersecting
                    && this.currentPage < this.totalPages
                    && !this.searchQuery
                ) {
                    this.loadPosts(++this.currentPage);
                }
            };

            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer)
        },
        async loadPosts(page = this.currentPage) {
            this.isFetching = true;
            try {
                const response = await fetchPosts(page, this.perPage);
                switch (this.selectedPagination) {
                    case "endless":
                        this.posts = [...this.posts, ...response.data];
                        break;
                    case "classic":
                        this.posts = response.data;
                        break;
                }
                this.currentPage = page;
                this.totalPages = Math.ceil(response.headers["x-total-count"] / this.perPage);
                this.isFetching = false;
            } catch (e) {
                console.error(e);
                this.isFetching = false;
            }
        }
    },
    created() {
        this.loadPosts();
    },
    mounted() {
        this.subscribeOnScroll();
    },
    watch: {
        selectedPagination() {
            if (this.currentPage !== 1) {
                this.loadPosts(1);
            }
        }
    },
    directives: {
        focus: focusDirective
    }
}
</script>

<style scoped>
.tittle {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.tittle__buttons {
    display: flex;
    justify-content: space-between;
}
.tittle__post-filter {
    width: 500px !important;
    margin: unset !important;
}
</style>
