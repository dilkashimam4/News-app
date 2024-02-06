<template>
  <div class="container bg-dark text-white" :style="containerStyle">
    <h1 style="padding-block: 0.3rem">
      {{ category ? `NEWS FROM ${con} and Category ${category}` : (country ? `NEWS FROM ${con}` : 'Top Headlines')}}
    </h1>
  </div>

  <div class="d-flex flex-wrap">
    <div v-for="nw in paginatedNews" :key="nw.id">
      <a :href="nw.url" class="text-decoration-none">
        <div class="card mt-4 p-2" style="width: 18rem; height: 30rem">
          <p class="card-text author">Author: {{ nw.author }}</p>
          <img class="card-img-top" :src="nw.urlToImage" alt="Card image cap" @error="handleError" style="width: 100%; height: 10rem" />
          <div class="card-body">
            <h5 class="card-title">{{ nw.title }}</h5>
            <p class="card-text" style="font-size: xx-small">{{ nw.description }}</p>
            <p class="card-text published-at">{{ nw.publishedAt }}</p>
            <a :href="nw.url" class="btn btn-primary bottom-0">Go somewhere</a>
          </div>
        </div>
      </a>
    </div>
  </div>

  <nav aria-label="Page navigation example" class="container mx-auto my-5" v-if="!dataLoad && news.length >= itemsPerPage">
    <ul class="pagination">
      <li class="page-item"><a href="#" class="page-link" style="cursor: pointer" @click="prevPage" :disabled="currentPage === 1">Previous</a></li>
      <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item">
        <a href="#" class="page-link" @click="goToPage(pageNumber)" :class="{ active: currentPage === pageNumber }">{{ pageNumber }}</a>
      </li>
      <li class="page-item"><a href="#" class="page-link" @click="nextPage" :disabled="currentPage === totalPages">Next</a></li>
    </ul>
  </nav>

  <div v-if="dataLoad" class="position-absolute top-50 start-50 translate-middle" style="width: 5rem; height: 5rem">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  
  <div class="container text-center ml-auto mr-auto" v-else>
    <div class="row">
      <div class="col" v-for="nw in paginatedNews" :key="nw.id">
        <a :href="nw.url" class="text-decoration-none">
          <div class="card mt-4 p-2" style="width: 18rem; height: 30rem">
            <p class="card-text author">Author: {{ nw.author }}</p>
            <img
              class="card-img-top"
              :src="nw.urlToImage"
              alt="Card image cap"
              @error="handleError"
              style="width: 100%; height: 10rem"
            />
            <div class="card-body">
              <h5 class="card-title">{{ nw.title }}</h5>
              <p class="card-text" style="font-size: xx-small">
                {{ nw.description }}
              </p>

              <p class="card-text published-at">{{ nw.publishedAt }}</p>

              <a :href="nw.url" class="btn btn-primary bottom-0"
                >Go somewhere</a
              >
            
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "science",
  data() {
    return {
      news: [],
      dataLoad: true,
      country: "",
      category: "",
      categories: { business: "Business", sports: "Sports", entertainment: "Entertainment", general: "General", health: "Health", science: "Science", technology: "Technology" },
      currentPage: 1,
      itemsPerPage: 15,
      totalPages: "",
      apiKey: "cfd4e644fafc4f11813ea3d678c48729",
      countries: { /* ... */ },
      con: "",
    };
  },
  computed: {
    paginatedNews() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.news.slice(startIndex, endIndex);
    },
    containerStyle() {
      return {
        boxShadow: "rgb(0, 30, 57) 6px 3px 12px",
        width: "fit-content",
        paddingInline: "1rem",
        borderRadius: "4rem",
        fontFamily: "cursive",
      };
    },
  },
  methods: {
    searchNewsWithCatogory() {
      if (this.country !== "") {
        this.con = this.countries[this.country];
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=${this.apiKey}`;
        if (!this.country) {
          return;
        }
        this.search(apiUrl);
      } else if (this.category !== "") {
        if (!this.category) {
          return;
        }
        const apiUrl = ` https://newsapi.org/v2/everything?q=${this.category}&apiKey=${this.apiKey}`;
        this.search(apiUrl);
      }
      // https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=cfd4e644fafc4f11813ea3d678c48729
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.category}&apiKey=${this.apiKey}`;
      this.search(apiUrl);
      
    },
   
     search(apiUrl) {
      axios
        .get(apiUrl)
        .then((response) => {
          this.news = response.data.articles;
          this.totalPages = Math.ceil(this.news.length / this.itemsPerPage);
          this.dataLoad = false;
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
          this.dataLoad = true;
        });
    },
     loadData() {
      // const apiKey = import.meta.env.VUE_APP_API_KEY;
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfd4e644fafc4f11813ea3d678c48729`;
      const apiUrl = `https://newsapi.org/v2/everything?q=bitcoin&apiKey=${this.apiKey}`
      this.search(apiUrl);
    },
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      const totalPages = Math.ceil(this.news.length / this.itemsPerPage);
      if (this.currentPage < totalPages) {
        this.currentPage++;
      }
    },
    handleError() {
      console.error("can't load");
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-title {
  height: 2.4em; /* Set a fixed height for title */
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.5rem;
}

.author,
.published-at {
  height: 1.5em; /* Set a fixed height for author and publishedAt */
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6c757d; /* Add color to make them less prominent */
}
</style>
