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
          url: 'http://www.cqut.edu.cn/__local/E/57/C6/54ED068355A1FE57D7095772D75_C0BCB19D_1418E.jpg',
          title: '《重庆理工大学学报（社会科学）》在“2018年度人大复印报刊资料精选佳作（上）”获得佳绩',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18582.htm'
        },
        {
          url: 'http://www.cqut.edu.cn//__local/A/61/AC/C76B4F3FC38A4B9031143004660_A5E58530_15079.jpg',
          title: '我校举办两性健康生理卫生讲座',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18578.htm'
        },
        {
          id: 3,
          url: 'http://www.cqut.edu.cn//__local/6/03/27/61EB6B24CD73CFD0C1E79B3501C_1E7BE098_13947.jpg',
          title: '我校成功举办2019届毕业生（财会、经管类）双选会',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18577.htm'
        },
        {
          id: 4,
          url: 'http://www.cqut.edu.cn//__local/3/26/B8/D07566CAA1C06B4B966AAE9CA4F_E9B98530_14204.jpg',
          title: '校第三届教职工代表大会暨工会会员代表大会第三次会议胜利闭幕',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18572.htm'
        },
        {
          id: 5,
          url: 'http://www.cqut.edu.cn//__local/0/30/E7/9BEDA4D5BB87038EC27B31CD726_C060D2BE_1104C.jpg',
          title: '副校长廖林清一行到药学与生物工程学院调研',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18570.htm'
        },
        {
          id: 6,
          url: 'http://www.cqut.edu.cn//__local/8/02/65/FA388D12D261F87C2F951CA7181_5003CCD5_340CE.jpg',
          title: '学校选派4名干部赴万州区担任贫困村第一书记',
          linkUrl: 'http://www.cqut.edu.cn/info/1008/18569.htm'
        }
      ]
    }
  }
}
</script>

<style>
#advertisement-div {
  height: 100%;
  width: 100%;
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
  height: 480px;
  width: 96%;
}
</style>
