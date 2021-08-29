<template>
    <StyledSpinner :isLoading="isFetching" />
    <StyledDialog v-model:isOpened="isDialogVisible">
        <PostForm @postCreated="onPostCreated" />
    </StyledDialog>
    <div style="padding: 20px 20px 80px;">
        <div class="tittle">
            <h1>Articles</h1>
            <StyledInput
                v-model="searchQuery"
                placeholder="Filter by"
                class="tittle__post-filter"
            />
            <div class="tittle__buttons">
                <StyledButton
                    @click="onAddPost"
                    style="margin-right: 15px"
                >
                    Add post
                </StyledButton>
                <StyledSelect
                    v-model="selectedPagination"
                    :options="paginationOptions"
                    style="margin-right: 15px"
                >
                    Pagination variant
                </StyledSelect>
                <StyledSelect
                    v-model="selectedSort"
                    :options="sortOptions"
                >
                    Sort by
                </StyledSelect>
            </div>
        </div>
        <PostList :posts="filteredPosts"
                  :isPostsLoading="isFetching"
                  :isFiltering="!!searchQuery.trim().length"
                  @removePost="onRemovePost"
                  @fetchPosts="loadPosts"
        />
        <StyledPagination
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
import PostForm from '@/components/posts/PostForm';
import PostList from '@/components/posts/PostList';
import { fetchPosts } from '@/service/post.service';
import { validatePost } from '@/utils/post-validator';

export default {
    name: 'PostsComponent',
    components: { PostList, PostForm },
    data() {
        return {
            posts: [],
            isFetching: false,
            isDialogVisible: false,
            selectedSort: '',
            selectedPagination: 'endless',
            searchQuery: '',
            currentPage: 1,
            perPage: 10,
            totalPages: 0,
            paginationOptions: [
                {
                    value: 'classic',
                    name: 'Classic pagination'
                },
                {
                    value: 'endless',
                    name: 'Endless ribbon'
                }
            ],
            sortOptions: [
                {
                    value: 'title',
                    name: 'Sort by title'
                },
                {
                    value: 'id',
                    name: 'Sort by id'
                }
            ],
        };
    },
    computed: {
        sortedPosts() {
            return [...this.posts]
                .sort((a, b) => {
                    if (this.selectedSort === 'title') {
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
        onAddPost() {
            this.isDialogVisible = true;
        },
        subscribeOnScroll() {
            const options = {
                rootMargin: '0px',
                threshold: 1.0
            };

            const callback = (entries, observer) => {
                if (entries[0].isIntersecting && this.currentPage < this.totalPages) {
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
                    case 'endless':
                        this.posts = [...this.posts, ...response.data];
                        break;
                    case 'classic':
                        this.posts = response.data;
                        break;
                }
                this.currentPage = page;
                this.totalPages = Math.ceil(response.headers['x-total-count'] / this.perPage);
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
        selectedPagination(val) {
            if (this.currentPage !== 1) {
                this.loadPosts(1);
            }
        }
    }
}
</script>

<style scoped>
h1 {
    color: teal;
    text-shadow: 0 1px 2px rgba(0, 0, 0, .7);
}
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
