<template>
    <div class="search">
      <div class="search-title">
        <span>Elasticsearch Search Demo</span>
      </div>
      <div class="search-input-wrap">
        <Input v-model="searchData" placeholder="Enter something..." type="text" style="width: 300px;">
          <Button slot="append" icon="ios-search" :loading="search_loading" @click="search"></Button>
        </Input>
      </div>
      <div class="search-result-1-wrap">
        <span class="title">财经新闻</span>
        <Table size="small" no-data-text="未找到数据" :columns="columns1" :data="data1" tooltip></Table>
      </div>
      <div class="search-result-2-wrap">
        <span class="title">Bilibili用户数据</span>
        <Table size="small" no-data-text="未找到数据" :columns="columns2" :data="data2" tooltip></Table>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchData: "",
                search_loading: false,
                data1: [],
                data2: [],
                columns1: [
                    { title: "标题", key: "title", width: 300, align: "center" },
                    { title: "内容", key: "content", align: "center" }
                ],
                columns2: [
                    { title: "用户id", key: "mid", align: "center" },
                    { title: "名称", key: "name", align: "center" },
                    { title: "签名", key: "sign", align: "center" }
                ],
            }
        },
        methods: {
            search() {
                let url = "http://127.0.0.1:47890/search";
                this.search_loading = true;
                this.$axios.request({
                    method: "GET",
                    url,
                    params: {
                        key: this.searchData,
                    },
                }).then(res => {
                    if (res.status === 200) {
                      this.data1 = res.data.msg.elastic_news;
                      this.data2 = res.data.msg.bilibili_sign;
                    } else {
                        this.$Message.error("网络错误");
                    }
                    this.search_loading = false;
                }).catch(e => {
                    this.$Message.error("网络错误");
                    this.search_loading = false;
                })
            }
        }
    }
</script>

<style lang="less">
  .search {
    display: flex;
    margin: 0 auto;
    padding-top: 60px;
    width: 800px;
    min-height: 500px;
    flex-direction: column;

    .search-title {
      display: flex;
      position: relative;
      justify-content: center;
      margin-bottom: 10px;
      font-family: 'meow';
      font-size: 30px;
    }

    .search-input-wrap {
      display: flex;
      position: relative;
      justify-content: center;
    }

    .search-result-1-wrap {
      margin-top: 30px;
      .title {
        font-family: meow;
        font-size: 20px;
      }
    }

    .search-result-2-wrap {
      margin-top: 30px;
      margin-bottom: 80px;
      .title {
        font-family: meow;
        font-size: 20px;
      }
    }
  }
</style>
