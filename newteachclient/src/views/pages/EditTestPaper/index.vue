<template>
  <div>
    <make-testpaper
      :m_checkItems="multiCheck"
      :m_radio="radio"
      :m_paperName="paperName"
      :m_music_checked="checkedInstrument"
      :m_withMachine_checked="checkArtMachine"
      :m_art_checked="checkedArt"
      :m_grade="grade"
      :m_semester="semester"
      :m_musicUnit="musicUnit"
      :m_artUnit="artUnit"
      :m_difficult="difficult"
      :m_paperid="paperid"
    ></make-testpaper>
  </div>
</template>

<script>
import MakeTestpaper from "../MakeTestpaper/makeTestpaper";
export default {
  data() {
    return {
      items: {},
      // 试题类型
      multiCheck: [],
      // 选择教材
      radio: "",
      paperInfos: [],
      // 试卷名称
      paperName: "",
      // 小乐器
      checkedInstrument: false,
      // 美术上机
      checkedArt: false,
      // 美术笔试
      checkArtMachine: false,

      // 题目配置对象
      paperConf: {},
      // xiaoyueqi
      instrument_type: [],
      // 年级
      grade: "",
      // 学年   -1   ,1  ,2
      semester: "",

      // 音乐单元
      musicUnit: "",
      // 美术单元
      artUnit: "",

      // 难度
      difficult: "",

      // 试卷id
      paperid: "",
    };
  },
  methods: {
    multiChecks() {
      if (this.items.stype == "综合类") {
        this.paperInfos = [
          { type: 1, label: "苏少版" },
          { type: 2, label: "人教版" },
          { type: 5, label: "鲁教版" },
        ];
        return ["音乐类", "美术类"];
      } else if (this.items.stype == "音乐类") {
        this.paperInfos = [
          { type: 1, label: "苏少版" },
          { type: 2, label: "人教版" },
          { type: 3, label: "人音版" },
          { type: 4, label: "湘艺版" },
          { type: 5, label: "鲁教版" },
          { type: 6, label: "上教版" },
        ];
        return ["音乐类"];
      } else {
        this.paperInfos = [
          { type: 1, label: "苏少版" },
          { type: 2, label: "人教版" },
          { type: 3, label: "人美版" },
          { type: 4, label: "岭南版" },
          { type: 5, label: "鲁教版" },
          { type: 6, label: "湘美版" },
          { type: 7, label: "上教版" },
        ];
        return ["美术类"];
      }
    },
  },
  created() {
    this.items = this.$route.params.item;

    console.log("infos", this.items);
    // radio值   没匹配就返回个null 或者全部,在制作试卷页面也不做教材的强制选择,可以为空
    this.multiCheck = this.multiChecks();
    this.radio = "";
    this.paperInfos.forEach((m_item) => {
      if (this.items.paper_range && m_item.type == this.items.paper_range) {
        this.radio = m_item.label;
      }
    });
    this.paperName = this.items.name;

    // 判断小乐器,笔试题,美术题    暂时没看到小乐器的参数 (小乐器在musicconf里面)
    this.items.question_conf.music_conf.forEach((m_item) => {
      if (
        Object.prototype.hasOwnProperty.call(m_item, "instrument_type") &&
        m_item.instrument_type.length > 0
      ) {
        this.checkedInstrument = true;
        // 把小乐器对象加到this.paperConf中
        // console.log("jiaxiaoxyq", this.paperConf);
        this.instrument_type = m_item.instrument_type;
      }
    });
    this.checkArtMachine = this.items.question_conf.art_conf.length > 0;

    this.checkedArt = this.items.paper_question_conf.length > 0;

    // 封装一个各题的配置对象
    this.paperConf = this.items.question_conf;
    // 加笔试题
    this.paperConf.paper_question_conf = this.items.paper_question_conf;
    // 加小乐器
    this.paperConf.instrumentconf = this.instrument_type;
    // console.log("xyq", this.instrument_type);
    // console.log("index_paperConf", this.paperConf);

    // 删除musicconf里面的小乐器属性,因为放到外面了
    this.paperConf.music_conf.forEach((m_item) => {
      if (
        Object.prototype.hasOwnProperty.call(m_item, "instrument_type") &&
        m_item.instrument_type.length > 0
      ) {
        delete m_item.instrument_type;
      }
    });

    // 利用store传值
    this.$store.commit("editTestPaper/setEditPaperConf", this.paperConf);

    // 年级
    this.grade = (this.items.grade == "通用" && "所有年级") || this.items.grade;
    console.log("items", this.items);
    // 学年
    this.semester =
      (this.items.semester == -1 && "全部") ||
      (this.items.semester == 1 && "上学期") ||
      (this.items.semester == 2 && "下学期");

    // 音乐单元
    this.musicUnit = this.items.unit != "" && this.items.unit + "单元";
    // 美术单元
    this.artUnit = this.items.art_unit != "" && this.items.art_unit + "单元";

    // 难度   全部  0     易 1   2  3
    this.difficult =
      (this.items.difficult == 0 && "全部") ||
      (this.items.difficult == 1 && "易") ||
      (this.items.difficult == 2 && "中") ||
      (this.items.difficult == 3 && "难");

    // 试卷id
    this.paperid = this.items.id != "" && this.items.id;
  },
  components: {
    MakeTestpaper,
  },
};
</script>
<style lang="scss" scoped>
</style>