<template>
<div class="container bg-dark text-white" v-if="category === '' && country === ''" style="box-shadow: rgb(0, 30, 57) 6px 3px 12px; width: fit-content; padding-inline: 1rem; border-radius: 4rem; font-family: cursive;">
  <h1 style="padding-block: .3rem; ">Top Headlines </h1>
</div>

<div class="container bg-dark text-white" v-if="category !== '' && country === ''" style="box-shadow: rgb(0, 30, 57) 6px 3px 12px; width: fit-content; padding-inline: 1rem; border-radius: 4rem; font-family: cursive;">
  <h1 style="padding-block: .3rem; ">{{ category }}</h1>
</div>

<div class="container bg-dark text-white" v-if="category === '' && country !== ''" style="box-shadow: rgb(0, 30, 57) 6px 3px 12px; width: fit-content; padding-inline: 1rem; border-radius: 4rem; font-family: cursive;">
  <h1 style="padding-block: .3rem; ">NEWS FROM {{ con }}</h1>
</div>
<div class="container bg-dark text-white" v-if="category !== '' && country !== ''" style="box-shadow: rgb(0, 30, 57) 6px 3px 12px; width: fit-content; padding-inline: 1rem; border-radius: 4rem; font-family: cursive;">
  <h1 style="padding-block: .3rem; ">NEWS FROM {{ con }} and Category {{ category }}</h1>
</div>


  <nav
    aria-label="Page navigation example"
    class="container ml-auto my-2 "
    v-if="!dataLoad && news.length >= itemsPerPage"
  >
    <ul class="pagination">
      <li class="page-item">
        <a
          href="#"
          class="page-link"
          style="cursor: pointer"
          @click="prevPage"
          :disabled="currentPage === 1"
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
  <div class="d-flex flex-wrap">

  
  <div class="container input-group" style="
  justify-content: center;
   align-content: center;
   align-items: center;
   gap: 1rem;
   width: 50%;
   outline: none;
    border: 1px solid #e7c5c5;
    border-radius: 4rem;
    background: #001e39;
    color: #e1d3fb;
     ">
    <label for="country" style="font-size: 2rem;"> Categories</label>
    <select
      class="custom-select"
      v-model="category"
      @change="handleCategoryChange"
      id="inputGroupSelect04"
      style="width: 25rem; height: 2rem;
      background: rgb(195 195 195);
      color: rgb(0 8 14);
      padding-inline: 1rem;
      border-radius: 4rem;"
    >
    <option value="" selected>..Select Categories</option>
      <option
        v-for="(ctg, value) in categories"
        :key="value"
        :value="value"
        placeholder="Select Countries"
      >
      {{ ctg }}
        <!-- ctg {{ ctg }} => value {{ value }} -->
      </option>
    </select>
    <!-- <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        @click="handlechange"
        type="button"
      >
        Button
      </button>
    </div> -->
  </div>
  <div class="container input-group" style="
  justify-content: center;
   align-content: center;
   align-items: center;
   gap: 1rem;
   width: 50%;
   outline: none;
    border: 1px solid #e7c5c5;
    border-radius: 4rem;
    background: #001e39;
    color: #e1d3fb;
     ">
    <label for="country" style="font-size: 2rem;"> Country</label>
    <select
      class="custom-select"
      v-model="country"
      @change="handleCountryChange"
      id="inputGroupSelect04"
      style="width: 25rem; height: 2rem;
      background: rgb(195 195 195);
      color: rgb(0 8 14);
      padding-inline: 1rem;
      border-radius: 4rem;"
    >
    <option value="" selected>..Select country</option>
      <option
        v-for="(code, countre) in countries"
        :key="code"
        :value="countre"
        placeholder="Select Countries"
      >
        {{ code }}
      </option>
    </select>
    <!-- <div class="input-group-append">
      <button
        class="btn btn-outline-secondary"
        @click="handlechange"
        type="button"
      >
        Button
      </button>
    </div> -->
  </div>
</div>
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
  <nav
    aria-label="Page navigation example"
    class="container mx-auto my-5"
    v-if="!dataLoad && news.length >= itemsPerPage"
  >
    <ul class="pagination">
      <li class="page-item">
        <a
          href="#"
          class="page-link"
          style="cursor: pointer"
          @click="prevPage"
          :disabled="currentPage === 1"
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
</template>
<script>
import axios from "axios";

export default {
  name: "cards",
  data() {
    return {
      news: [],
      dataLoad: true,
      country: "",
      countryName:'',
      category:'',
      categories:{
        business:'Business',
        sports:'Sports',
        entertainment:'Entertainment',
        general:'General',
        health:'Health',
        science:'Science',
        technology:'Technology'
      },
      value:'',
      currentPage: 1,
      itemsPerPage: 15,
      totalPages: "",
      searchTerm: "",
      apiKey: "cfd4e644fafc4f11813ea3d678c48729",
      countries: {
        ae: "United Arab Emirates",
        ar: "Argentina",
        at: "Austria",
        au: "Australia",
        be: "Belgium",
        bg: "Bulgaria",
        br: "Brazil",
        ca: "Canada",
        ch: "Switzerland",
        cn: "China",
        co: "Colombia",
        cu: "Cuba",
        cz: "Czech Republic",
        de: "Germany",
        eg: "Egypt",
        fr: "France",
        gb: "United Kingdom",
        gr: "Greece",
        hk: "Hong Kong",
        hu: "Hungary",
        id: "Indonesia",
        ie: "Ireland",
        il: "Israel",
        in: "India",
        it: "Italy",
        jp: "Japan",
        kr: "South Korea",
        lt: "Lithuania",
        lv: "Latvia",
        ma: "Morocco",
        mx: "Mexico",
        my: "Malaysia",
        ng: "Nigeria",
        nl: "Netherlands",
        no: "Norway",
        nz: "New Zealand",
        ph: "Philippines",
        pl: "Poland",
        pt: "Portugal",
        ro: "Romania",
        rs: "Serbia",
        ru: "Russia",
        sa: "Saudi Arabia",
        se: "Sweden",
        sg: "Singapore",
        si: "Slovenia",
        sk: "Slovakia",
        th: "Thailand",
        tr: "Turkey",
        tw: "Taiwan",
        ua: "Ukraine",
        us: "United States",
        ve: "Venezuela",
        za: "South Africa",
        // ... (add more countries as needed)
      },
      con:''
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
    searchNews() {
      // const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=${this.apiKey}`;
      this.con = this.countries[this.country]
      console.log(this.con);
      if (!this.country) {
        // If no country is selected, return or handle it accordingly
        return;
      }
      // this.countryName = this.countrie[this.country]|| "world";
      const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=${this.apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.news = response.data.articles;
          this.totalPages = Math.ceil(this.news.length / this.itemsPerPage);
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
        });
    },
    searchNewsCatogory() {
      // const apiUrl = `https://newsapi.org/v2/top-headlines?country=${this.country}&apiKey=${this.apiKey}`;
      console.log(this.category);
      if (!this.category) {
        // If no country is selected, return or handle it accordingly
        return;
      }
      // https://newsapi.org/v2/everything?q=science&apiKey=cfd4e644fafc4f11813ea3d678c48729
      const apiUrl = ` https://newsapi.org/v2/everything?q=${this.category}&apiKey=${this.apiKey}`;

      axios
        .get(apiUrl)
        .then((response) => {
          this.news = response.data.articles;
          this.totalPages = Math.ceil(this.news.length / this.itemsPerPage);
        })
        .catch((error) => {
          console.error("Error fetching news data:", error);
        });
    },
    handleCountryChange() {
      this.currentPage = 1;
      this.searchNews();
    },
    handleCategoryChange() {
      this.currentPage = 1;
      this.searchNewsCatogory();
    },
    async loadData() {
      // const apiKey = import.meta.env.VUE_APP_API_KEY;
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=cfd4e644fafc4f11813ea3d678c48729`;
      try {
        let res = await axios.get(url);

        if (res.data.status === "ok") {
          console.log("Request successful");
          console.log(res.data.articles);
          this.news = res.data.articles;
          this.totalPages = Math.ceil(this.news.length / this.itemsPerPage);
          this.dataLoad = false;
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
