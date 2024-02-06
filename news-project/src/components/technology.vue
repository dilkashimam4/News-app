<template>
  <div class="container bg-dark text-white" style="width: fit-content; padding-inline: 1rem; border-radius: 4rem; font-family:cursive;">
    <h1>Technology</h1>
  </div>
    <nav aria-label="Page navigation example" class="container mx-auto my-5" v-if="!dataLoad && news.length >= itemsPerPage">
      <ul class="pagination">
        <li class="page-item">
          <a  href="#" class="page-link " style="cursor: pointer;" @click="prevPage" :disabled="currentPage === 1"
            >Previous</a
          >
        </li>
  
        <!-- Use v-for to generate pagination links -->
        <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item">
          <a
          href="#"
            class="page-link"
            @click="goToPage(pageNumber)"
            :class="{ active: currentPage === pageNumber }"
            >{{ pageNumber }}</a
          >
        </li>
  
        <li class="page-item">
          <a
          href="#"
            class="page-link"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  
    <div
      class="position-absolute top-50 start-50 translate-middle"
      style="width: 5rem; height: 5rem"
      v-if="dataLoad"
    >
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container text-center ml-auto mr-auto" v-else>
      <div class="row">
        <div class="col" v-for="nw in paginatedNews" :key="nw.id">
          <a :href="nw.url" class="text-decoration-none">
          <div class="card mt-4 p-2" style="width: 18rem; height: 30rem; ">
            <p class="card-text author">Author: {{ nw.author }}</p>
            <img
              class="card-img-top"
              :src="nw.urlToImage"
              alt="Card image cap"
              @error="handleError"
              style="width: 100%;
              height: 10rem;"
            />
            <div class="card-body">
              <h5 class="card-title">{{ nw.title }}</h5>
              <p class="card-text" style="font-size: xx-small;">{{ nw.description  }}</p>
  
              <p class="card-text published-at">{{ nw.publishedAt }}</p>
  
              <a :href="nw.url" class="btn btn-primary bottom-0">Go somewhere</a>
              <!-- <router-link
              :to="{ name: 'article', params: { id: nw.id } }"
              class="btn btn-primary"
            >
              Go somewhere
            </router-link> -->
            </div>
          </div>
        </a>
          <!-- <div class="col">
            <div class="card mt-4" style="width: 18rem">
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
                <router-link to="/about" class="btn btn-primary">Go somewhere</router-link>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card mt-4" style="width: 18rem">
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
                <router-link to="/about" class="btn btn-primary">Go somewhere</router-link>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card mt-4" style="width: 18rem">
              <img class="card-img-top" src="..." alt="Card image cap" />
              <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </p>
                <router-link to="/about" class="btn btn-primary">Go somewhere</router-link>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <nav aria-label="Page navigation example" class="container mx-auto my-5" v-if="!dataLoad && news.length >= itemsPerPage">
      <ul class="pagination">
        <li class="page-item">
          <a  href="#" class="page-link " style="cursor: pointer;" @click="prevPage" :disabled="currentPage === 1"
            >Previous</a
          >
        </li>
  
        <!-- Use v-for to generate pagination links -->
        <li v-for="pageNumber in totalPages" :key="pageNumber" class="page-item ">
          <a
          href="#"
            class="page-link"
            @click="goToPage(pageNumber)"
            :class="{ active: currentPage === pageNumber }"
            >{{ pageNumber }}</a
          >
        </li>
  
        <li class="page-item">
          <a
          href="#"
            class="page-link"
            @click="nextPage"
            :disabled="currentPage === totalPages"
            >Next</a
          >
        </li>
      </ul>
    </nav>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    name: "technology",
    data() {
      return {
        news: [],
        dataLoad: true,
        currentPage: 1,
        itemsPerPage: 21,
        totalPages: "",
      };
    },
    computed: {
      paginatedNews() {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
  
        return this.news.slice(startIndex, endIndex);
      },
    },
    methods: {
      async loadData() {
        let url =
          "https://newsapi.org/v2/everything?q=technology&apiKey=cfd4e644fafc4f11813ea3d678c48729";
        try {
          let res = await axios.get(url);
  
          if (res.data.status === "ok") {
            console.log("Request successful");
            // console.log(res.data.articles);
            this.news = res.data.articles;
            this.totalPages = Math.ceil(this.news.length / this.itemsPerPage);
            this.dataLoad = false;
            // console.log(this.news)
            // this.news.author = this.news.author;
            // this.news.url = this.news.url;
            // this.news.urlToImage = this.news.urlToImage;
            // console.log(this.news);
          } else {
            console.log("Request failed with status:", res.data.status);
            this.dataLoad = true;
          }
        } catch (error) {
          console.error("Error making the request:", error);
          this.dataLoad = true;
        }
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
        // Handle image loading errors
        console.error("can't load");
        // You can also update the image source with a fallback or placeholder
        // this.imageURL = '/path/to/fallback-image.jpg';
      },
  
      // let req = new Request(url);
  
      // fetch(req)
      //   .then(function(response) {
      //   console.log(response.json());
      //   })
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
  