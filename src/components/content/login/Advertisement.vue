<template>
  <div id="advertisement-div">
    <el-carousel height="500px">
      <el-carousel-item v-for="item in ads" :key="item.id">
        <a :href="item.linkUrl" target="_blank">
          <p>{{ item.title }}</p>
          <img :src="item.url">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Test',
  data () {
    return {
      ads: [
        {
          id: 1,
          url: 'http://www.the15373.com:8080/img/tengxunyun2.png',
          title: '【开年好云 钜惠来袭】2019新春采购节，30款云产品感恩回馈 ',
          linkUrl: 'https://cloud.tencent.com/redirect.php?redirect=1036&cps_key=34b67ba623161fdce4557e6e9ee70c8f&from=console'
        },
        {
          id: 2,
          url: 'http://www.the15373.com:8080/img/aliyun2.png',
          title: '【开年HI购季】爆款云产品5折',
          linkUrl: 'https://promotion.aliyun.com/ntms/yunparter/invite.html?userCode=1nps0pmx'
        },
        {
          id: 3,
          url: 'http://www.cqut.edu.cn/__local/E/57/C6/54ED068355A1FE57D7095772D75_C0BCB19D_1418E.jpg',
          title: '《重庆理工大学学报（社会科学）》在“2018年度人大复印报刊资料精选佳作（上）”获得佳绩',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18582.htm'
        },
        {
          id: 4,
          url: 'http://www.cqut.edu.cn//__local/A/61/AC/C76B4F3FC38A4B9031143004660_A5E58530_15079.jpg',
          title: '我校举办两性健康生理卫生讲座',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18578.htm'
        },
        {
          id: 5,
          url: 'http://www.cqut.edu.cn//__local/6/03/27/61EB6B24CD73CFD0C1E79B3501C_1E7BE098_13947.jpg',
          title: '我校成功举办2019届毕业生（财会、经管类）双选会',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18577.htm'
        }
      ]
    }
  },
  methods: {
    getAds () {
      this.axios.get(this.URLS.dochubapi + '/ads/getAds').then((response) => {
        if (response.data.status === '1') {
          this.ads = response.data.dat
        }
      })
    }
  },
  mounted () {
    this.getAds()
  }
}
</script>

<style>
#advertisement-div {
  height: 100%;
  width: 100%;
  text-align: center;
}
#advertisement-div a:hover {
  color: rgb(25, 0, 255);
  text-decoration: none;
}
#advertisement-div a {
  color: rgb(0, 0, 0);
  text-decoration: none;
}
#advertisement-div p {
  height: 15px;
}

#advertisement-div img {
  max-height: 480px;
  max-width: 96%;
}
</style>
