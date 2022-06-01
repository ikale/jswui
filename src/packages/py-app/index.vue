<template>
    <v-app>
        <py-zero></py-zero>
    </v-app>
</template>


<script>
import PyZero from './zero'
import { mapState} from 'pinia'
import uistore from '../store/uistore.js'


export default {
  name: 'py-app',
  components: {
    PyZero
  },
  props:{
    uri:String
  },
  data: () => ({
    opts:{tag:'div',props:{'class':'abc'},solts:{default:['没有数据']}}
  }),
  computed: {
    ...mapState(uistore,['uidatas'])
  },
  created() {
    const useUistore = uistore()
    useUistore.$patch(state=>{
      state.wsrui = this.uri
    })
  },
  mounted(){
    // function asyncdata(xiugai){
    //   return {
    //       tag:"div",
    //       props:{name:"ikale", age:18},
    //       events:{"click":"onclick"},
    //       solts:{
    //           default:[
    //               xiugai,
    //               {
    //                   tag:"v-text-field",
    //                   props:{name:"chao", age:25,value:"为爱加油"},
    //                   events:{"input":"input"},
    //                   solts:{
    //                       append:['我不知道'],
    //                       prepend:["爱是什么"]
    //                   }
    //               }
    //           ]
    //       }
    //   }
    // }

      // let a = 0
      // setInterval(()=>{
      //   a++
      //   // opts.solts.default[0] = `输入点能量吧,${a}`
      //   this.opts = asyncdata( `输入点能量吧,${a}`)
      //   console.log(this.opts.solts.default[0])
      // },1000)

      // var a= 0
      // setInterval(()=>{
      //   a++
      //   this.opts = {tag:'div',props:{'class':'abc',ddx:{name:12}},solts:{default:[
      //     {tag:"p",solts:{default:['这是首行数据']}},
      //     {tag:"p",solts:{default:[`这是动态数据${a}`]}},
      //     {tag:"p",solts:{default:['这是末尾数据']}},
      //     ]}}
      // },1000)
  }
};
</script>