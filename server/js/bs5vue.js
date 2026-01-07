const { createApp } = Vue;

const serviceApp = createApp({
  data() {
    return {
      even_card: []
    };
  },
  mounted() {
    this.loadEvents();
  },
  methods: {
    loadEvents() {
      $.ajax({
        url: "/even_card",
        method: "get",
        dataType: "json",
        success: (result) => {
          this.even_card = result;
          this.$nextTick(() => {
            this.initGsap();
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
    },
    initGsap() {
      gsap.registerPlugin(ScrollTrigger);

     
      gsap.from(this.$el.querySelectorAll(".col-sm-4"), {
        scrollTrigger: {
          trigger: this.$el,
          start: "top 85%",
          toggleActions: "play none none none"
        },
        opacity: 0,
        y: 80,
        duration: 0.8,
        stagger: 0.25,
        ease: "power3.out"
      });
    }
  }
}).mount("#even_card");