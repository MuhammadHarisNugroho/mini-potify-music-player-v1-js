new Vue({
    el: "#app",
    data() {
      return {
        audio: null,
        circleLeft: null,
        barWidth: null,
        duration: null,
        currentTime: null,
        isTimerPlaying: false,
        tracks: [
                  {
            name: "Rumit ",
            artist: "Langit Sore",
            cover: "./assets/img/langit-sore.jpg",
            source: "./assets/mp3/Rumit-Langit-Sore.mp3",
            url: "https://www.youtube.com/watch?v=s3MSk_0Cnr8",
            favorited: true
          },
          {
            name: "Wherever You Are",
            artist: "One Ok Rock",
            cover: "./assets/img/wherever-you-are.jpg",
            source: "./assets/mp3/One-Ok-Rock-Wherever-You-Are.mp3",
            url: "https://www.youtube.com/watch?v=Ezhc8FJ8Uvc",
            favorited: true
          },
          {
            name: "Duka",
            artist: "Last Child",
            cover: "./assets/img/last-child.jpg",
            source: "./assets/mp3/Duka-Last-Child.mp3",
            url: "https://www.youtube.com/watch?v=8zwz2fVgfVM",
            favorited: false
          },
  
          {
            name: "Tak Segampang Itu",
            artist: "Anggi Marito",
            cover: "./assets/img/anggi-tak-segampang-itu.jpg",
            source: "./assets/mp3/Anggi-Marito-Tak-Segampang-Itu.mp3",
            url: "https://www.youtube.com/watch?v=6NsiA6GFAbU",
            favorited: true
          },
  
          {
            name: "April",
            artist: "Fiersa Besari",
            cover: "./assets/img/april-fiersa-besari.jpg",
            source: "./assets/mp3/April-Fiersa-Besari.mp3",
            url: "https://www.youtube.com/watch?v=T3X_9O9ACaU",
            favorited: false
          },
          {
            name: "Somewhere Only We Know",
            artist: "Keane",
            cover: "./assets/img/somewhere-only-we-know.jpg",
            source: "./assets/mp3/Keane-Somewhere-Only-We-Know.mp3",
            url: "https://www.youtube.com/watch?v=THw3gyON6Gk",
            favorited: true
          },
          {
            name: "Mayonaka no Orchestra",
            artist: "Aqua Timez",
            cover: "./assets/img/aqua-timez-mayonaka-no-orchestra.jpg",
            source: "./assets/mp3/Aqua-Timez-Mayonaka-no-Orchestra.mp3",
            url: "https://www.youtube.com/watch?v=oMkJNNjuaD0",
            favorited: false
          },
          {
            name: "Wish You Were Here",
            artist: "Nick Deep",
            cover: "./assets/img/wish-you-were-here.jpg",
            source: "./assets/mp3/Nick-Deep-Wish-You-Were-Here.mp3",
            url: "https://www.youtube.com/watch?v=VyPwEZTIpVc",
            favorited: true
          },
          {
            name: "Orang Yang Sama",
            artist: "Virgoun",
            cover: "./assets/img/orang-yang-sama-virgoun.jpg",
            source: "./assets/mp3/Orang-Yang-Sama-Virgoun.mp3",
            url: "https://www.youtube.com/watch?v=wY-SNa5ta44",
            favorited: false
          },
          {
            name: "Cheating On You",
            artist: "Charlie Puth",
            cover: "./assets/img/cheating-on-you-charlie-puth.jpg",
            source: "./assets/mp3/Charlie-Puth-Cheating-on-You.mp3",
            url: "https://www.youtube.com/watch?v=fOoSbUoayQE",
            favorited: false
          }
        ],
        currentTrack: null,
        currentTrackIndex: 0,
        transitionName: null
      };
    },
    methods: {
      play() {
        if (this.audio.paused) {
          this.audio.play();
          this.isTimerPlaying = true;
        } else {
          this.audio.pause();
          this.isTimerPlaying = false;
        }
      },
      generateTime() {
        let width = (100 / this.audio.duration) * this.audio.currentTime;
        this.barWidth = width + "%";
        this.circleLeft = width + "%";
        let durmin = Math.floor(this.audio.duration / 60);
        let dursec = Math.floor(this.audio.duration - durmin * 60);
        let curmin = Math.floor(this.audio.currentTime / 60);
        let cursec = Math.floor(this.audio.currentTime - curmin * 60);
        if (durmin < 10) {
          durmin = "0" + durmin;
        }
        if (dursec < 10) {
          dursec = "0" + dursec;
        }
        if (curmin < 10) {
          curmin = "0" + curmin;
        }
        if (cursec < 10) {
          cursec = "0" + cursec;
        }
        this.duration = durmin + ":" + dursec;
        this.currentTime = curmin + ":" + cursec;
      },
      updateBar(x) {
        let progress = this.$refs.progress;
        let maxduration = this.audio.duration;
        let position = x - progress.offsetLeft;
        let percentage = (100 * position) / progress.offsetWidth;
        if (percentage > 100) {
          percentage = 100;
        }
        if (percentage < 0) {
          percentage = 0;
        }
        this.barWidth = percentage + "%";
        this.circleLeft = percentage + "%";
        this.audio.currentTime = (maxduration * percentage) / 100;
        this.audio.play();
      },
      clickProgress(e) {
        this.isTimerPlaying = true;
        this.audio.pause();
        this.updateBar(e.pageX);
      },
      prevTrack() {
        this.transitionName = "scale-in";
        this.isShowCover = false;
        if (this.currentTrackIndex > 0) {
          this.currentTrackIndex--;
        } else {
          this.currentTrackIndex = this.tracks.length - 1;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      nextTrack() {
        this.transitionName = "scale-out";
        this.isShowCover = false;
        if (this.currentTrackIndex < this.tracks.length - 1) {
          this.currentTrackIndex++;
        } else {
          this.currentTrackIndex = 0;
        }
        this.currentTrack = this.tracks[this.currentTrackIndex];
        this.resetPlayer();
      },
      resetPlayer() {
        this.barWidth = 0;
        this.circleLeft = 0;
        this.audio.currentTime = 0;
        this.audio.src = this.currentTrack.source;
        setTimeout(() => {
          if(this.isTimerPlaying) {
            this.audio.play();
          } else {
            this.audio.pause();
          }
        }, 300);
      },
      favorite() {
        this.tracks[this.currentTrackIndex].favorited = !this.tracks[
          this.currentTrackIndex
        ].favorited;
      }
    },
    created() {
      let vm = this;
      this.currentTrack = this.tracks[0];
      this.audio = new Audio();
      this.audio.src = this.currentTrack.source;
      this.audio.ontimeupdate = function() {
        vm.generateTime();
      };
      this.audio.onloadedmetadata = function() {
        vm.generateTime();
      };
      this.audio.onended = function() {
        vm.nextTrack();
        this.isTimerPlaying = true;
      };
  
      // this is optional (for preload covers)
      for (let index = 0; index < this.tracks.length; index++) {
        const element = this.tracks[index];
        let link = document.createElement('link');
        link.rel = "prefetch";
        link.href = element.cover;
        link.as = "image"
        document.head.appendChild(link)
      }
    }
  });
  