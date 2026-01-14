const { createApp } = Vue;

const videoApp = createApp({
  data() {
    return {
      videos: []
    };
  },
  mounted() {
    this.loadVideos();
  },
  methods: {
    loadVideos() {
      $.ajax({
        url: "/videos",
        method: "get",
        dataType: "json",
        success: (result) => {
          this.videos = result; 
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
}).mount("#videoApp"); 